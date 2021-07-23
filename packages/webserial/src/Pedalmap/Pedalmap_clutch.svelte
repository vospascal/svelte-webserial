<script>
    import {setContext, getContext, onMount, onDestroy} from 'svelte';
    import Chart from 'chart.js/auto';
    import VerticalProgress from "../VerticalProgress/VerticalProgress.svelte";
    import {chartData, chartOption} from "./chartConfig_clutch";

    let message = getContext('WSC-message');
    let pedalMap = getContext("WSC-pedalMap");
    let invertedMap = getContext("WSC-invertedMap");
    let smoothMap = getContext("WSC-smoothMap");

    let chartContainer = null; //ref
    let chartInstance = null;
    let progress = 0;
    let pedalMapNumbers = [0, 20, 40, 60, 80, 100]
    let smooth = false;
    let inverted = false;

    onMount(() => {
        const newChartInstance = new Chart(chartContainer.getContext('2d'), {
            type: 'line',
            data: chartData,
            options: chartOption
        });
        chartInstance = newChartInstance;
    })

    function adddata(msg) {
        if (chartInstance === null) {
            return
        }

        chartInstance.data.datasets[0].data[0] = {
            x: msg.clutch.after || 0,
            y: msg.clutch.before || 0,
            r: 3 //ticks size
        }
        progress = msg.clutch.after || 0
        chartInstance.update();
    }

    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            adddata(msg)
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    const unsubscribeSmoothMap = smoothMap.subscribe((value) => {
        if (value) {
            smooth = value.clutchSmooth === "1"
        }
    })

    const unsubscribeInvertedMap = invertedMap.subscribe((value) => {
        if (value) {
            inverted = value.clutchInverted === "1"
        }
    })

    const unsubscribePedalMap = pedalMap.subscribe((value) => {
        if (JSON.stringify(value) !== '{}' && chartInstance !== null) {
            const {clutchMap} = value
            pedalMapNumbers = clutchMap;
            chartInstance.data.datasets[1].data = clutchMap;
            chartInstance.update();
            curves = checkIfMatchCurveList(clutchMap);
        }
    })

    const updateContext = (e) => {
        if (chartInstance === null) {
            return
        }
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
        console.log(selectedCurve)
        pedalMap.update(existing => {
            return {...existing, ...{clutchMap: selectedCurve}}
        });
    }
    const getMatchingCurve = (selectedValue) => {
        if (selectedValue === "linearMap") {
            return linearMap;
        }
        if (selectedValue === "slowCurveMap") {
            return slowCurveMap;
        }
        if (selectedValue === "verySlowCurveMap") {
            return verySlowCurveMap;
        }
        if (selectedValue === "fastCurveMap") {
            return fastCurveMap;
        }
        if (selectedValue === "veryFastCurveMap") {
            return veryFastCurveMap;
        }
        if (selectedValue === "sCurveFastSlowMap") {
            return sCurveFastSlowMap;
        }
        if (selectedValue === "sCurveSlowFastMap") {
            return sCurveSlowFastMap;
        }
        return linearMap;
    }

    let curves = "linearMap";
    const linearMap = [0, 20, 40, 60, 80, 100];
    const slowCurveMap = [0, 9, 21, 39, 63, 100];
    const verySlowCurveMap = [0, 4, 11, 25, 48, 100];
    const fastCurveMap = [0, 37, 61, 79, 91, 100];
    const veryFastCurveMap = [0, 52, 75, 89, 96, 100];
    const sCurveFastSlowMap = [0, 60, 75, 80, 85, 100];
    const sCurveSlowFastMap = [0, 31, 46, 54, 69, 100];

    onDestroy(() => {
        chartInstance.destroy();
        chartInstance.stop();
        unsubscribeMessage.unsubscribe()
        // unsubscribePedalMap.unsubscribe()
        // unsubscribeSmoothMap.unsubscribe()
        // unsubscribeInvertedMap.unsubscribe()
    })
</script>

<div>
    <div style="display: inline-block;  vertical-align: top;">
        <div>clutch</div>
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
        <canvas height="250" width="250" id="clutch" bind:this={chartContainer}/>
    </div>
    <div style="display: inline-block; vertical-align: top;">
        <VerticalProgress progress={progress} height="470"/>
    </div>
</div>