<script>
    import {setContext, onMount, afterUpdate} from 'svelte';
    import { writable } from 'svelte/store';

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
    let calibrationMap = writable({});
    let invertedMap = writable({});
    let smoothMap = writable({});
    let bitsMap = writable({});
    let message = writable("");

    let getStream = null;

    var findMatch = (cleanString) => {
        const regex = /(T:((\d+\.\\d+|\d+)+[;,])+)(B:((\d+\.\d+|\d+)+[;,])+)(C:((\d+\.\d+|\d+)+[;,])+)/gm;
        return !!cleanString.match(regex);
    }

    function throttle(callback, wait, immediate = false) {
        let timeout = null
        let initialCall = true

        return function() {
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

    let abc = new Subject();



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
                        } else {
                            abc.next(generalFilter(msg));
                            // throttle(message.set(generalFilter(msg), 500));
                        }

                    },
                    complete: () => {
                        console.log("[readLoop] DONE");
                    },
                })

        }
        if (!$connected && getStream) {
            getStream.unsubscribe();
        }
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
        // stream: async () => await serialrxjs.stream(),
        write: async (msg) => await serialrxjs.writeHandler(msg),
    });

    setContext("WSC-connected", connected);
    setContext("WSC-pedalMap", pedalMap);
    setContext("WSC-calibrationMap", calibrationMap);
    setContext("WSC-invertedMap", invertedMap);
    setContext("WSC-smoothMap", smoothMap);
    setContext("WSC-bitsMap", bitsMap);
    setContext("WSC-message", abc.pipe(sample(interval(50))));


</script>

<slot/>