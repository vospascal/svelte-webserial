<script>
    import {getContext, onMount} from 'svelte';
    import Chart from 'chart.js/auto';
    import pedalmapPositionFilter from "./pedalmapPositionFilter";
    import VerticalProgress from "../VerticalProgress/VerticalProgress.svelte";

    let message = getContext('WSC-message');
    let pedalMap = getContext("WSC-pedalMap");

    let chartContainer = null; //ref
    let chartInstance = null;
    let progress = 0;

    export let type;


    const chartOption = {
        showLines: true,
        animation: false,
        responsive: false,
        aspectRatio: 1,
        scales: {
            x: {
                type: 'linear',
                display: true,
                ticks: {
                    stepSize: 20,
                    fixedStepSize: 1,
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            },
            y: {
                type: 'linear',
                display: true,
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                    fixedStepSize: 1,
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            },
        }
    };

    const chartData = {
        labels: ["0", "20", "40", "60", "80", "100"],
        datasets: [
            {
                type: 'bubble',
                label: "current",
                fill: true,
                data: [{
                    x: 0,
                    y: 0,
                    r: 3
                }],
                borderWidth: 1,
                borderColor: "green",
                backgroundColor: "green",
            },
            {
                type: 'line',
                label: "pedal",
                fill: false,
                data: [0, 31, 46, 54, 69, 100],
                borderWidth: 1,
                borderColor: "blue"
            },
            {
                type: 'line',
                label: "baseline",
                fill: false,
                data: [0, 20, 40, 60, 80, 100],
                borderWidth: 1,
                borderColor: "red"
            },
        ]
    };

    onMount(() => {
        const newChartInstance = new Chart(chartContainer.getContext('2d'), {
            type: 'line',
            data: chartData,
            options: chartOption
        });
        chartInstance = newChartInstance;
    })

    function handleUpdateMap() {
        if(JSON.stringify($pedalMap) !== '{}' ){
            const {brakeMap} = $pedalMap
            chartInstance.data.datasets[1].data = brakeMap
            chartInstance.update();
        }
    }

    function adddata({throttle, brake, clutch}) {
        if(type === "throttle"){
            chartInstance.data.datasets[0].data[0] = throttle
            progress = throttle.x;
        }

        if(type === "brake"){
            chartInstance.data.datasets[0].data[0] = brake
            progress = brake.x;
        }


        if(type === "clutch"){
            chartInstance.data.datasets[0].data[0] = clutch
            progress = clutch.x;
        }

        chartInstance.update();
    }


    const handleMessages = async () => {
        if ($message) {
            const result = pedalmapPositionFilter($message)
            adddata({
                throttle: result.throttle,
                brake: result.brake,
                clutch: result.clutch
            })
        }
    }

    $: {
        $message, handleMessages()
    }

    $: {
        $pedalMap, handleUpdateMap()
    }


</script>

<div >
    <div>
        <canvas height="300" width="300" bind:this={chartContainer}/>
    </div>
<!--    <div>-->
<!--        <VerticalProgress progress={progress} height="300"/>-->
<!--    </div>-->
</div>