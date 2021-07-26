<script>
    import {getContext, onDestroy} from "svelte";
    import CalibrationOverlay from "./CalibrationOverlay.svelte";

    let message = getContext('WSC-message');
    let calibrationMap = getContext('WSC-calibrationMap');
    let bitsMap = getContext('WSC-bitsMap');
    let calibrationInProgress = false;

    let calibrationMapNumbers = [0, 1023, 0, 1023]
    let bitsMapNumbers = [1023, 1023]

    const updateContext = (e) => {
        calibrationMapNumbers[e.target.name] = parseInt(e.target.value)
        calibrationMap.update(existing => {
            return {...existing, ...{throttleCalibration: calibrationMapNumbers}}
        });
    }

    const calibrateStart = () => {
        calibrationInProgress = true;
        calibrationMapNumbers[0] = null;
        calibrationMapNumbers[1] = null;
    }
    const calibrateDone = () => {
        calibrationInProgress = false;
        calibrationMap.update(existing => {
            return {...existing, ...{throttleCalibration: calibrationMapNumbers}}
        })
    }

    calibrationMap.subscribe((value) => {
        const {throttleCalibration} = value
        calibrationMapNumbers = throttleCalibration
    })

    bitsMap.subscribe((value) => {
        const {throttleBits} = value
        bitsMapNumbers = throttleBits
    })

    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            if (calibrationInProgress) {
                if (calibrationMapNumbers[0] === null) {
                    calibrationMapNumbers[0] = msg.throttle.raw;
                }
                if (msg.throttle.raw < calibrationMapNumbers[0]) {
                    calibrationMapNumbers[0] = msg.throttle.raw;
                }
                if (calibrationMapNumbers[1] === null) {
                    calibrationMapNumbers[1] = msg.throttle.raw;
                }
                if (msg.throttle.raw > calibrationMapNumbers[1]) {
                    calibrationMapNumbers[1] = msg.throttle.raw;
                }
            }
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    onDestroy(() => {
        unsubscribeMessage.unsubscribe()
    })
</script>
<div style="position: relative">
    <CalibrationOverlay show={calibrationInProgress}>
        <p style="text-align: center; font-size: 18px; margin: 5px;">
            Step 1. Make sure the throttle is in neutral position.
        </p>
        <p style="text-align: center; font-size: 18px; margin: 5px;">
            Step 2. Press the throttle all the way down and then release.
        </p>
        <p style="text-align: center; font-size: 18px; margin: 5px;">
            Step 3. Press done to finish calibration.
        </p>

        <div style=" text-align: center; font-size: 18px;">
            <button on:click={calibrateDone}>done</button>
        </div>

        <p style="text-align: center;">
            <span>start <strong>{calibrationMapNumbers[0]}</strong></span>
            <span> | </span>
            <span>end <strong>{calibrationMapNumbers[1]}</strong></span>
        </p>
    </CalibrationOverlay>

    <slot />

    <div style="padding: 0px 25px 0px 35px; display: flex; justify-content: space-between;">
        <div>
            deadzone: start
            <input min="0" max="1023" type="number" on:input={(e) => updateContext(e)} name="2"
                   value={calibrationMapNumbers[2]} style="text-align: left">
        </div>
        <button on:click={calibrateStart}>calibrate</button>

        <div>
            deadzone: end
            <input min="0" max="1023" type="number" on:input={(e) => updateContext(e)} name="3"
                   value={calibrationMapNumbers[3]} style="text-align: right">
        </div>
    </div>
</div>
