<script>
    import {setContext, onMount, afterUpdate} from 'svelte';
    import { writable } from 'svelte/store';

    import WebSerialRxjs from "./WebSerialRxjs";
    import {map} from "rxjs";

    import pedalCalibrationFilter from "./Filters/pedalCalibrationFilter";
    import pedalInvertedFilter from "./Filters/pedalInvertedFilter";
    import pedalBitsFilter from "./Filters/pedalBitsFilter";
    import pedalSmoothFilter from "./Filters/pedalSmoothFilter";
    import cleanString from "./Filters/cleanString";
    import pedalMapFilter from "./Filters/pedalMapFilter";

    const serialrxjs = new WebSerialRxjs();

    const init = () => {
        serialrxjs.writeHandler("GetMap");
        serialrxjs.writeHandler("GetCali");
        serialrxjs.writeHandler("GetInverted");
        serialrxjs.writeHandler("GetSmooth");
        serialrxjs.writeHandler("GetBits");
        console.log('init')
    }

    let connected = writable(false);
    let pedalMap = writable({});
    let calibrationMap = writable({});
    let invertedMap = writable({});
    let smoothMap = writable({});
    let bitsMap = writable({});

    let getStream = null;

    var findMatch = (cleanString) => {
        const regex = /(T:((\d+\.\\d+|\d+)+[;,])+)(B:((\d+\.\d+|\d+)+[;,])+)(C:((\d+\.\d+|\d+)+[;,])+)/gm;
        return !!cleanString.match(regex);
    }


    onMount(async () => {
        console.log('context mounted')
    });

    afterUpdate(async () => {
        // let once = [2, 1, 0];
        if ($connected) {
            init();
            getStream = await serialrxjs.stream()
            getStream
                // .pipe(once.length > 0 ? delay(300) : delay(0))
                .pipe(map(value => cleanString(value)))
                .subscribe({
                    next: (message) => {
                        console.log('123')
                        //dont match normal input
                        if (!findMatch(message)) {
                            console.log(message)
                            const pedal_map = pedalMapFilter(message)
                            if (pedal_map) {
                                pedalMap.set(pedal_map);
                            }

                            const cali_map = pedalCalibrationFilter(message);
                            if (cali_map) {
                                calibrationMap.set(cali_map);
                            }

                            const inver_map = pedalInvertedFilter(message);
                            if (inver_map) {
                                invertedMap.set(inver_map);
                            }

                            const smooth_map = pedalSmoothFilter(message);
                            if (smooth_map) {
                                smoothMap.set(smooth_map);
                            }

                            const bits_map = pedalBitsFilter(message);
                            if (bits_map) {
                                bitsMap.set(bits_map);
                            }
                        }
                        // if (once.length > 0) {
                        //     once.shift(0, -1)
                        //     init();
                        // }

                    },
                    complete: () => {
                        console.log("[readLoop] DONE");
                    },
                })

        }
        if (!$connected && getStream) {
            getStream.unsubscribe();
            // once = [2, 1, 0];
        }
    });

    if ($connected) {
        init();
    }

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
        stream: async () => await serialrxjs.stream(),
        write: async (msg) => await serialrxjs.writeHandler(msg),
    });

    setContext("WSC-connected", connected);
    setContext("WSC-pedalMap", pedalMap);
    setContext("WSC-calibrationMap", calibrationMap);
    setContext("WSC-invertedMap", invertedMap);
    setContext("WSC-smoothMap", smoothMap);
    setContext("WSC-bitsMap", bitsMap);


</script>

<slot/>