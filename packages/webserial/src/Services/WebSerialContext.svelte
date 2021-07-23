<script>
    import {setContext, onMount, afterUpdate} from 'svelte';
    import {writable} from 'svelte/store';

    import WebSerialRxjs from "./WebSerialRxjs";
    import {interval, map, Subject} from "rxjs";

    import pedalCalibrationFilter from "./Filters/pedalCalibrationFilter";
    import pedalInvertedFilter from "./Filters/pedalInvertedFilter";
    import pedalBitsFilter from "./Filters/pedalBitsFilter";
    import pedalSmoothFilter from "./Filters/pedalSmoothFilter";
    import cleanString from "./Filters/cleanString";
    import pedalMapFilter from "./Filters/pedalMapFilter";
    import generalFilter from "./Filters/generalFilter";
    import {sample} from "rxjs/operators";

    const serialrxjs = new WebSerialRxjs();

    let connected = writable(false);
    let pedalMap = writable({});
    let pedalMapSerial = writable("")

    let calibrationMap = writable({});
    let calibrationMapSerial = writable("")

    let invertedMap = writable({});
    let invertedMapSerial = writable("")

    let smoothMap = writable({});
    let smoothMapSerial = writable("")

    let bitsMap = writable({});
    let bitsMapSerial = writable("")

    let message = new Subject();


    let getStream = null;

    var findMatch = (cleanString) => {
        const regex = /(T:((\d+\.\\d+|\d+)+[;,])+)(B:((\d+\.\d+|\d+)+[;,])+)(C:((\d+\.\d+|\d+)+[;,])+)/gm;
        return !!cleanString.match(regex);
    }

    function throttle(callback, wait, immediate = false) {
        let timeout = null
        let initialCall = true

        return function () {
            const callNow = immediate && initialCall
            const next = () => {
                callback.apply(this, arguments)
                timeout = null
            }

            if (callNow) {
                initialCall = false
                next()
            }

            if (!timeout) {
                timeout = setTimeout(next, wait)
            }
        }
    }

    afterUpdate(async () => {
        if ($connected) {
            serialrxjs.writeHandler("GetMap");
            serialrxjs.writeHandler("GetCali");
            serialrxjs.writeHandler("GetInverted");
            serialrxjs.writeHandler("GetSmooth");
            serialrxjs.writeHandler("GetBits");

            getStream = await serialrxjs.stream()
            getStream
                // .pipe(sample(300))
                .pipe(map(value => cleanString(value)))
                .subscribe({
                    next: (msg) => {
                        //dont match normal input
                        if (findMatch(msg)) {
                            message.next(generalFilter(msg));
                            return
                        }
                        if (!findMatch(msg)) {
                            console.log(msg)
                            const pedal_map = pedalMapFilter(msg)
                            if (pedal_map) {
                                pedalMap.set(pedal_map);
                            }

                            const cali_map = pedalCalibrationFilter(msg);
                            if (cali_map) {
                                calibrationMap.set(cali_map);
                            }

                            const inver_map = pedalInvertedFilter(msg);
                            if (inver_map) {
                                invertedMap.set(inver_map);
                            }

                            const smooth_map = pedalSmoothFilter(msg);
                            if (smooth_map) {
                                smoothMap.set(smooth_map);
                            }

                            const bits_map = pedalBitsFilter(msg);
                            if (bits_map) {
                                bitsMap.set(bits_map);
                            }
                        }

                    },
                    complete: () => {
                        console.log("[readLoop] DONE");
                    },
                })

        }
        // if (!$connected && getStream) {
        //     getStream.unsubscribe();
        //     console.log(getStream)
        // }
    });

    setContext("WSC-actions", {
        connect: async () => {
            console.log('connect')
            await serialrxjs.connectHandler();
            connected.set(true);
        },
        disconnect: async () => {
            await serialrxjs.disconnectHandler();
            connected.set(false);
        },
        write: async (msg) => await serialrxjs.writeHandler(msg),
    });


    pedalMap.subscribe((value) => {
        //TMAP:0-20-40-60-80-100,BMAP:0-60-75-80-85-100,CMAP:0-52-75-89-96-100
        if (value && value.throttleMap && value.brakeMap && value.clutchMap) {
            pedalMapSerial.set("TMAP:" + value.throttleMap.join("-") + "," + "BMAP:" + value.brakeMap.join("-") + "," + "CMAP:" + value.clutchMap.join("-"));
        }
    });

    calibrationMap.subscribe((value) => {
        //TCALI:73-466-75-1023,BCALI:73-391-75-1023,CCALI:74-474-75-1023
        if (value && value.throttleCalibration && value.brakeCalibration && value.clutchCalibration) {
            calibrationMapSerial.set("TCALI:" + value.throttleCalibration.join("-") + "," + "BCALI:" + value.brakeCalibration.join("-") + "," + "CCALI:" + value.clutchCalibration.join("-"));
        }
    });

    invertedMap.subscribe((value) => {
        //INVER:0-0-0
        if (value && value.throttleInverted && value.brakeInverted && value.clutchInverted) {
            invertedMapSerial.set("INVER:" + value.throttleInverted + "-" + value.brakeInverted + "-" + value.clutchInverted);
        }
    });

    smoothMap.subscribe((value) => {
        //SMOOTH:0-0-0
        if (value && value.throttleSmooth && value.brakeSmooth && value.clutchSmooth) {
            smoothMapSerial.set("SMOOTH:" + value.throttleSmooth + "-" + value.brakeSmooth + "-" + value.clutchSmooth);

        }
    });

    bitsMap.subscribe((value) => {
        //BITS:1023-1023-1023-1023-1023-1023
        if (value && value.throttleBits && value.brakeBits && value.clutchBits) {
            bitsMapSerial.set("BITS:" + value.throttleBits.join("-") + "-" + value.brakeBits.join("-") + "-" + value.clutchBits.join("-"));
        }
    });

    setContext("WSC-connected", connected);

    setContext("WSC-pedalMap", pedalMap);
    setContext("WSC-pedalMapSerial", pedalMapSerial);

    setContext("WSC-calibrationMap", calibrationMap);
    setContext("WSC-calibrationMapSerial", calibrationMapSerial);

    setContext("WSC-invertedMap", invertedMap);
    setContext("WSC-invertedMapSerial", invertedMapSerial);

    setContext("WSC-smoothMap", smoothMap);
    setContext("WSC-smoothMapSerial", smoothMapSerial);

    setContext("WSC-bitsMap", bitsMap);
    setContext("WSC-bitsMapSerial", bitsMapSerial);

    setContext("WSC-message", message.pipe(sample(interval(30))));
</script>

<slot/>
