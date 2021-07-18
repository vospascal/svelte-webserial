<script>
    import {getContext, onMount} from 'svelte';
    import Chart from 'chart.js/auto';
    import timelineFilter from "./timelineFilter";

    let message = getContext('WSC-message');

    let chartContainer = null; //ref
    let chartInstance = null;

    const chartOption = {
        showLines: true,
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    stepSize: 1,
                    fixedStepSize: 1,
                }
            },
            y: {
                display: true,
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    fixedStepSize: 1,
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            }
        }
    };

    const chartData = {
        labels: [""],
        datasets: [
            {
                label: "throttle",
                fill: false,
                data: [0],
                borderWidth: 1,
                borderColor: "red"
            },
            {
                label: "brake",
                fill: false,
                data: [0],
                borderWidth: 1,
                borderColor: "blue"
            },
            {
                label: "clutch",
                fill: false,
                data: [0],
                borderWidth: 1,
                borderColor: "green"
            }
        ]
    };

    onMount(() => {
        const newChartInstance = new Chart(chartContainer, {
            type: 'line',
            data: chartData,
            options: chartOption
        });
        chartInstance = newChartInstance;
    })


    function adddata({throttle, brake, clutch}) {
        if (chartInstance.data.labels.length > 50) {
            chartInstance.data.labels.splice(0, 1);
        }
        chartInstance.data.labels.push("");

        if (chartInstance.data.datasets[0].data.length > 50) {
            chartInstance.data.datasets[0].data.splice(0, 1);
        }
        chartInstance.data.datasets[0].data.push(throttle);

        if (chartInstance.data.datasets[1].data.length > 50) {
            chartInstance.data.datasets[1].data.splice(0, 1);
        }
        chartInstance.data.datasets[1].data.push(brake);

        if (chartInstance.data.datasets[2].data.length > 50) {
            chartInstance.data.datasets[2].data.splice(0, 1);
        }
        chartInstance.data.datasets[2].data.push(clutch);
        chartInstance.update();
    }

    const handleMessages = async () => {
        const result = timelineFilter($message)
        if (result && $message) {
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


</script>

<div>
    <canvas height="200" bind:this={chartContainer}/>
</div>