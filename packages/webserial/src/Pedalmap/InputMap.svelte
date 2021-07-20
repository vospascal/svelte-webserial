<script>
    import {getContext} from "svelte";
    let pedalMap = getContext("WSC-pedalMap");

    export let type;
    let curves = "linearMap";
    let inputMap_0 = 0;
    let inputMap_20 = 20;
    let inputMap_40 = 40;
    let inputMap_60 = 60;
    let inputMap_80 = 80;
    let inputMap_100 = 100;

    const linearMap = [0, 20, 40, 60, 80, 100];
    const slowCurveMap = [0, 9, 21, 39, 63, 100];
    const verySlowCurveMap = [0, 4, 11, 25, 48, 100];
    const fastCurveMap = [0, 37, 61, 79, 91, 100];
    const veryFastCurveMap = [0, 52, 75, 89, 96, 100];
    const sCurveFastSlowMap = [0, 60, 75, 80, 85, 100];
    const sCurveSlowFastMap = [0, 31, 46, 54, 69, 100];


    pedalMap.subscribe((value) => {
        if (JSON.stringify(value) !== '{}') {
            if (type === "throttle") {
                const {throttleMap} = value;
                console.log(throttleMap, 'throttleMap')
                inputMap_0 = throttleMap[0];
                inputMap_20 = throttleMap[1];
                inputMap_40 = throttleMap[2];
                inputMap_60 = throttleMap[3];
                inputMap_80 = throttleMap[4];
                inputMap_100 = throttleMap[5];
            }
            if (type === "brake") {
                const {brakeMap} = value;
                console.log(brakeMap, 'brakeMap')
                inputMap_0 = brakeMap[0];
                inputMap_20 = brakeMap[1];
                inputMap_40 = brakeMap[2];
                inputMap_60 = brakeMap[3];
                inputMap_80 = brakeMap[4];
                inputMap_100 = brakeMap[5];
            }
            if (type === "clutch") {
                const {clutchMap} = value;
                console.log(clutchMap, 'clutchMap')
                inputMap_0 = clutchMap[0];
                inputMap_20 = clutchMap[1];
                inputMap_40 = clutchMap[2];
                inputMap_60 = clutchMap[3];
                inputMap_80 = clutchMap[4];
                inputMap_100 = clutchMap[5];
            }
        }
    })
</script>


<div style="display: inline-block">
    <div>
        <label style="width: 50px; display: inline-block">0%</label>
        <input type="number" bind:value={inputMap_0}></div>
    <div>
        <label style="width: 50px; display: inline-block">20%</label>
        <input type="number" bind:value={inputMap_20}></div>
    <div>
        <label style="width: 50px; display: inline-block">40%</label>
        <input type="number" bind:value={inputMap_40}></div>
    <div>
        <label style="width: 50px; display: inline-block">60%</label>
        <input type="number" bind:value={inputMap_60}></div>
    <div>
        <label style="width: 50px; display: inline-block">80%</label>
        <input type="number" bind:value={inputMap_80}></div>
    <div>
        <label style="width: 50px; display: inline-block">100%</label>
        <input type="number" bind:value={inputMap_100}></div>
    <div>
        <label style="width: 50px; display: inline-block"></label>
        <select name="curves" bind:value={curves} >
            <option value=""></option>
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
        <label><input type="checkbox">smooth</label>
        <label><input type="checkbox">inverted</label>
    </div>
</div>