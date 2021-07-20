<script>
    import {getContext, onMount} from 'svelte';
    import Chart from 'chart.js/auto';
    import VerticalProgress from "../VerticalProgress/VerticalProgress.svelte";
    import {chartData, chartOption} from "./chartConfig";

    let message = getContext('WSC-message');
    let pedalMap = getContext("WSC-pedalMap");

    let chartContainer = null; //ref
    let chartInstance = null;
    let progress = 0;
    let pedalMapNumbers = [0, 20, 40, 60, 80, 100]

    onMount(() => {
        const newChartInstance = new Chart(chartContainer.getContext('2d'), {
            type: 'line',
            data: chartData,
            options: chartOption
        });
        chartInstance = newChartInstance;
    })

    function adddata(msg) {
        chartInstance.data.datasets[0].data[0] = {
            x: msg.brake.after || 0,
            y: msg.brake.before || 0,
            r: 3 //ticks size
        }
        progress = msg.brake.after || 0
        chartInstance.update();
    }

    message.subscribe({
        next: (msg) => {
            adddata(msg)
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    pedalMap.subscribe((value) => {
        if (JSON.stringify(value) !== '{}') {
            const {brakeMap} = value
            pedalMapNumbers = brakeMap;
            chartInstance.update();
        }
    })


    let curves = "linearMap";
    const linearMap = [0, 20, 40, 60, 80, 100];
    const slowCurveMap = [0, 9, 21, 39, 63, 100];
    const verySlowCurveMap = [0, 4, 11, 25, 48, 100];
    const fastCurveMap = [0, 37, 61, 79, 91, 100];
    const veryFastCurveMap = [0, 52, 75, 89, 96, 100];
    const sCurveFastSlowMap = [0, 60, 75, 80, 85, 100];
    const sCurveSlowFastMap = [0, 31, 46, 54, 69, 100];

    $: console.log(pedalMapNumbers);

</script>

<div>
    <div style="display: inline-block">
        <div style="display: inline-block">
            <div>
                <label style="width: 50px; display: inline-block">0%</label>
                <input type="number" bind:value={pedalMapNumbers[0]}></div>
            <div>
                <label style="width: 50px; display: inline-block">20%</label>
                <input type="number" bind:value={pedalMapNumbers[1]}></div>
            <div>
                <label style="width: 50px; display: inline-block">40%</label>
                <input type="number" bind:value={pedalMapNumbers[2]}></div>
            <div>
                <label style="width: 50px; display: inline-block">60%</label>
                <input type="number" bind:value={pedalMapNumbers[3]}></div>
            <div>
                <label style="width: 50px; display: inline-block">80%</label>
                <input type="number" bind:value={pedalMapNumbers[4]}></div>
            <div>
                <label style="width: 50px; display: inline-block">100%</label>
                <input type="number" bind:value={pedalMapNumbers[5]}></div>
            <div>
                <label style="width: 50px; display: inline-block"></label>
                <select name="curves" bind:value={curves}>
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
        <canvas height="250" width="250" bind:this={chartContainer}/>
    </div>
    <div style="display: inline-block">
        <VerticalProgress progress={progress} height="250"/>
    </div>
</div>