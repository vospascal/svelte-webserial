<script>
    import {getContext, onDestroy, onMount} from 'svelte';
    import Chart from 'chart.js/auto';

    let message = getContext('WSC-message');

    let chartContainer = null; //ref
    let chartInstance = null;

    const chartOption = {
        showLines: true,
        animation: false,
        // responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    pointStyle: 'circle'
                }
            }
        },
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
        const newChartInstance = new Chart(chartContainer.getContext('2d'), {
            type: 'line',
            data: chartData,
            options: chartOption
        });
        chartInstance = newChartInstance;
    })


    function adddata({throttle, brake, clutch}) {
        if (chartInstance.data.labels.length > 30) {
            chartInstance.data.labels.splice(0, 1);
        }
        chartInstance.data.labels.push("");

        if (chartInstance.data.datasets[0].data.length > 30) {
            chartInstance.data.datasets[0].data.splice(0, 1);
        }
        chartInstance.data.datasets[0].data.push(throttle);

        if (chartInstance.data.datasets[1].data.length > 30) {
            chartInstance.data.datasets[1].data.splice(0, 1);
        }
        chartInstance.data.datasets[1].data.push(brake);

        if (chartInstance.data.datasets[2].data.length > 30) {
            chartInstance.data.datasets[2].data.splice(0, 1);
        }
        chartInstance.data.datasets[2].data.push(clutch);
        chartInstance.update();
    }


    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            adddata({
                throttle: {
                    x: "",
                    y: msg.throttle.after,
                },
                brake: {
                    x: "",
                    y: msg.brake.after,
                },
                clutch: {
                    x: "",
                    y: msg.clutch.after,
                }
            })
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    onDestroy(() => {
        chartInstance.destroy();
        chartInstance.stop();
        unsubscribeMessage.unsubscribe()
    })

</script>

<div style="width: 850px">
    <canvas height="150" bind:this={chartContainer}/>
</div>