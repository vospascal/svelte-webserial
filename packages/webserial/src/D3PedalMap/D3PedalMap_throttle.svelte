<style>

    * :global(.line) {
        stroke-width: 2;
        fill: none;
    }

    * :global(.axis path) {
        stroke: black;
    }

    * :global(.text) {
        font-size: 12px;
    }

    * :global(.title-text) {
        font-size: 12px;
    }

    * :global(.grid line) {
        stroke: lightgrey;
        stroke-opacity: 0.7;
        shape-rendering: crispEdges;
    }

</style>

<script>
    import {getContext, onDestroy, onMount} from "svelte";
    import render from "./render_map"

    let message = getContext('WSC-message');
    let pedalMap = getContext("WSC-pedalMap");
    let pedalMapNumbers = [0, 20, 40, 60, 80, 100]


    var data = [
        {
            name: "default",
            values: [
                {increment: 0, position: 0},
                {increment: 20, position: 20},
                {increment: 40, position: 40},
                {increment: 60, position: 60},
                {increment: 80, position: 80},
                {increment: 100, position: 100}
            ]
        },
        {
            name: "curve",
            values: [
                {increment: 0, position: 0},
                {increment: 20, position: 20},
                {increment: 40, position: 40},
                {increment: 60, position: 60},
                {increment: 80, position: 80},
                {increment: 100, position: 100}
            ]
        },
        {
            name: "input",
            values: [{increment: 0, position: 0}]
        }
    ];

    /* Add SVG */
    onMount(() => {
        render({selector: "#throttleChart", data});
    });

    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            data[2].values = [{increment: msg.throttle.after, position: msg.throttle.before}]
            render({selector: "#throttleChart", data});
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    pedalMap.subscribe((value) => {
        console.log(value)

        if (JSON.stringify(value) !== '{}') {
            const {throttleMap} = value
            pedalMapNumbers = throttleMap;

            data[1].values = [
                {increment: 0, position: throttleMap[0]},
                {increment: 20, position: throttleMap[1]},
                {increment: 40, position: throttleMap[2]},
                {increment: 60, position: throttleMap[3]},
                {increment: 80, position: throttleMap[4]},
                {increment: 100, position: throttleMap[5]}
            ]
            render({selector: "#throttleChart", data});
        }
    })

    onDestroy(() => {
        unsubscribeMessage.unsubscribe()
    })
</script>

<div>
    <div id="throttleChart">
        <svg></svg>
    </div>
</div>