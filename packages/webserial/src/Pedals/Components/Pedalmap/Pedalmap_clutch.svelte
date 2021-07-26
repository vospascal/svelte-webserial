<script>
    import {getContext, onDestroy} from 'svelte';
    import VerticalProgress from "../VerticalProgress/VerticalProgress.svelte";
    import D3PedalMap_clutch from "../D3PedalMap/D3PedalMap_clutch.svelte";

    let message = getContext('WSC-message');
    let pedalMap = getContext("WSC-pedalMap");
    let invertedMap = getContext("WSC-invertedMap");
    let smoothMap = getContext("WSC-smoothMap");

    let progress = 0;
    let pedalMapNumbers = [0, 20, 40, 60, 80, 100]
    let smooth = false;
    let inverted = false;

    const updateContext = (e) => {
        pedalMapNumbers[e.target.name] = parseInt(e.target.value)
        pedalMap.update(existing => {
            return {...existing, ...{clutchMap: pedalMapNumbers}}
        });
    }

    const checkIfMatchCurveList = (clutchMap) => {
        const curve = JSON.stringify(clutchMap)
        if (curve === JSON.stringify(linearMap)) {
            return "linearMap";
        }
        if (curve === JSON.stringify(slowCurveMap)) {
            return "slowCurveMap";
        }
        if (curve === JSON.stringify(verySlowCurveMap)) {
            return "verySlowCurveMap";
        }
        if (curve === JSON.stringify(fastCurveMap)) {
            return "fastCurveMap";
        }
        if (curve === JSON.stringify(veryFastCurveMap)) {
            return "veryFastCurveMap";
        }
        if (curve === JSON.stringify(sCurveFastSlowMap)) {
            return "sCurveFastSlowMap";
        }
        if (curve === JSON.stringify(sCurveSlowFastMap)) {
            return "sCurveSlowFastMap";
        }
        return "";
    }

    const updateSmooth = (e) => {
        smoothMap.update(existing => {
            return {...existing, ...{clutchSmooth: e.target.checked ? "1" : "0"}}
        });
    }
    const updateInverted = (e) => {
        invertedMap.update(existing => {
            return {...existing, ...{clutchInverted: e.target.checked ? "1" : "0"}}
        });
    }

    const updateMapNumbers = (e) => {
        const selectedCurve = getMatchingCurve(e.target.value);
        pedalMap.update(existing => {
            return {...existing, ...{clutchMap: selectedCurve}}
        });
    }
    const getMatchingCurve = (selectedValue) => {
        if (selectedValue === "linearMap") {
            return linearMap.concat();
        }
        if (selectedValue === "slowCurveMap") {
            return slowCurveMap.concat();
        }
        if (selectedValue === "verySlowCurveMap") {
            return verySlowCurveMap.concat();
        }
        if (selectedValue === "fastCurveMap") {
            return fastCurveMap.concat();
        }
        if (selectedValue === "veryFastCurveMap") {
            return veryFastCurveMap.concat();
        }
        if (selectedValue === "sCurveFastSlowMap") {
            return sCurveFastSlowMap.concat();
        }
        if (selectedValue === "sCurveSlowFastMap") {
            return sCurveSlowFastMap.concat();
        }
    }

    let curves = "linearMap";
    const linearMap = [0, 20, 40, 60, 80, 100];
    const slowCurveMap = [0, 9, 21, 39, 63, 100];
    const verySlowCurveMap = [0, 4, 11, 25, 48, 100];
    const fastCurveMap = [0, 37, 61, 79, 91, 100];
    const veryFastCurveMap = [0, 52, 75, 89, 96, 100];
    const sCurveFastSlowMap = [0, 60, 75, 80, 85, 100];
    const sCurveSlowFastMap = [0, 31, 46, 54, 69, 100];

    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            progress = msg.clutch.after || 0
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    smoothMap.subscribe((value) => {
        if (value) {
            smooth = value.clutchSmooth === "1"
        }
    })

    invertedMap.subscribe((value) => {
        if (value) {
            inverted = value.clutchInverted === "1"
        }
    })

    pedalMap.subscribe((value) => {
        if (JSON.stringify(value) !== '{}') {
            const {clutchMap} = value
            pedalMapNumbers = clutchMap;
            curves = checkIfMatchCurveList(clutchMap);
        }
    })

    onDestroy(() => {
        unsubscribeMessage.unsubscribe()
    })
</script>

<div>
    <div style="display: inline-block;  vertical-align: top;">
        <div>
            <strong>clutch</strong>
        </div>
        <div style="display: inline-block">
            <div>
                <label style="width: 50px; display: inline-block">0%</label>
                <input min="0" max="100" type="number" on:input={(e) => updateContext(e)} name="0"
                       value={pedalMapNumbers[0]}></div>
            <div>
                <label style="width: 50px; display: inline-block">20%</label>
                <input min="0" max="100" type="number" on:input={(e) => updateContext(e)} name="1"
                       value={pedalMapNumbers[1]}></div>
            <div>
                <label style="width: 50px; display: inline-block">40%</label>
                <input min="0" max="100" type="number" on:input={(e) => updateContext(e)} name="2"
                       value={pedalMapNumbers[2]}></div>
            <div>
                <label style="width: 50px; display: inline-block">60%</label>
                <input min="0" max="100" type="number" on:input={(e) => updateContext(e)} name="3"
                       value={pedalMapNumbers[3]}></div>
            <div>
                <label style="width: 50px; display: inline-block">80%</label>
                <input min="0" max="100" type="number" on:input={(e) => updateContext(e)} name="4"
                       value={pedalMapNumbers[4]}></div>
            <div>
                <label style="width: 50px; display: inline-block">100%</label>
                <input min="0" max="100" type="number" on:input={(e) => updateContext(e)} name="5"
                       value={pedalMapNumbers[5]}></div>
            <div>
                <label style="width: 50px; display: inline-block"></label>
                <select name="curves" value={curves} on:input={(e) => updateMapNumbers(e)}>
                    <option value="">custom curve</option>
                    <option value="linearMap">linear</option>
                    <option value="slowCurveMap">slow curve</option>
                    <option value="verySlowCurveMap">very slow curve</option>
                    <option value="fastCurveMap">fast curve</option>
                    <option value="veryFastCurveMap">very fast curve</option>
                    <option value="sCurveFastSlowMap">s curve fast slow</option>
                    <option value="sCurveSlowFastMap">s curve slow fast</option>
                </select>
            </div>
            <div>
                <label><input type="checkbox" on:input={(e) =>updateSmooth(e)} checked={smooth}>smooth</label>
                <label><input type="checkbox" on:input={(e) =>updateInverted(e)} checked={inverted}>inverted</label>
            </div>
        </div>
        <D3PedalMap_clutch/>
    </div>
    <div style="display: inline-block; vertical-align: top;">
        <VerticalProgress progress={progress} height="470"/>
    </div>
</div>