<script>
    import {getContext, onMount} from 'svelte';
    import Chart from 'chart.js/auto';

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

    function adddata({throttle, brake, clutch}) {
        if (type === "throttle") {
            chartInstance.data.datasets[0].data[0] = throttle
            progress = throttle.x;
        }

        if (type === "brake") {
            chartInstance.data.datasets[0].data[0] = brake
            progress = brake.x;
        }

        if (type === "clutch") {
            chartInstance.data.datasets[0].data[0] = clutch
            progress = clutch.x;
        }

        chartInstance.update();
    }


    message.subscribe({
        next: (msg) => {
            adddata({
                throttle: {
                    x: msg.throttle.after || 0,
                    y: msg.throttle.before || 0,
                    r: 3 //ticks size
                },
                brake: {
                    x: msg.brake.after || 0,
                    y: msg.brake.before || 0,
                    r: 3 //ticks size
                },
                clutch: {
                    x: msg.clutch.after || 0,
                    y: msg.clutch.before || 0,
                    r: 3 //ticks size
                },
            })
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });



    pedalMap.subscribe((value) => {
        if (JSON.stringify(value) !== '{}') {
            if (type === "throttle") {
                const {throttleMap} = value
                chartInstance.data.datasets[1].data = throttleMap
            }
            if (type === "brake") {
                const {brakeMap} = value
                chartInstance.data.datasets[1].data = brakeMap
            }
            if (type === "clutch") {
                const {clutchMap} = value
                chartInstance.data.datasets[1].data = clutchMap
            }
            chartInstance.update();
        }
    })


</script>

<div>
    <div>
        <canvas height="300" width="300" bind:this={chartContainer}/>
    </div>
    <!--    <div>-->
    <!--        <VerticalProgress progress={progress} height="300"/>-->
    <!--    </div>-->
</div>