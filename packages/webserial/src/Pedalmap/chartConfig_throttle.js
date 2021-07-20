
export const chartOption = {
    showLines: true,
    animation: false,
    responsive: false,
    aspectRatio: 1,
    plugins: {
        legend: {
            display: false
        }
    },
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

export const chartData = {
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
            data: [0, 20, 40, 60, 80, 100],
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
