<style>
    * :global(.bullet .marker) {
        stroke: #000;
        stroke-width: 2px;
    }

    * :global(.bullet .tick line) {
        stroke: #666;
        stroke-width: 0.5px;
    }

    * :global(.bullet .measure.s0) {
        fill: lightsteelblue;
    }

    * :global(.bullet .measure.s1) {
        fill: steelblue;
    }

    * :global(.bullet .marker.s0) {
        stroke: blue;
    }

    * :global(.bullet .marker.s1) {
        stroke: red;
    }

    * :global(.bullet .marker.s2) {
        stroke: green;
    }

    * :global(.bullet .marker.s3) {
        stroke: orange;
    }

    * :global(.bullet .title) {
        font-weight: bold;
    }

    * :global(.bullet .subtitle) {
        fill: #999;
    }
</style>

<script>
    import * as d3 from "d3";
    import {getContext, onDestroy, onMount} from "svelte";
    import "./BulletGraph"

    let message = getContext('WSC-message');
    let calibrationMap = getContext('WSC-calibrationMap');
    let bitsMap = getContext('WSC-bitsMap');

    let calibrationMapNumbers = null
    let bitsMapNumbers = null

    /////////////////////////
    var margin = {top: 5, right: 40, bottom: 30, left: 40},
        width = 875 - margin.left - margin.right,
        height = 75 - margin.top - margin.bottom;


    var svg

    var data = [
        {
            title: "0",
            subtitle: "",
            measures: [0, 1023],
            markers: [0, 0, 0, 0]
        },
    ];

    onMount(() => {
        var chart = d3.bullet().width(width).height(height).ticks(10);
        svg = d3
            .select("#bullet_chart_brake_raw")
            .selectAll("svg")
            .data(data)
            .enter()

            .append("svg")
            .attr("class", "bullet")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(chart);

        var title = svg
            .append("g")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + height / 2 + ")");

        title
            .append("text")
            .attr("class", "title")
            .text(function (d) {
                return d.title;
            });

        title
            .append("text")
            .attr("class", "subtitle")
            .attr("dy", "1em")
            .text(function (d) {
                return d.subtitle;
            });

        updateGraph();
    });

    const update = (msg) => {
        if (bitsMapNumbers && calibrationMapNumbers) {
            var select = d3.select("#bullet_chart_brake_raw .bullet g");
            select.selectAll(".title").text(() => msg.brake.raw)
            const measures1 = (width / +bitsMapNumbers[0]) * msg.brake.raw
            select.selectAll(".measure.s1").attr("width", measures1);
        }
    }

    const updateGraph = () => {
        if (bitsMapNumbers && calibrationMapNumbers) {
            var select = d3.select("#bullet_chart_brake_raw .bullet g");
            const markers0 = (width / +bitsMapNumbers[0]) * +calibrationMapNumbers[0];
            select.selectAll(".marker.s0").attr("x1", markers0).attr("x2", markers0)

            const markers1 = (width / +bitsMapNumbers[0]) * +calibrationMapNumbers[1];
            select.selectAll(".marker.s1").attr("x1", markers1).attr("x2", markers1)

            const markers2 = (width / +bitsMapNumbers[0]) * +calibrationMapNumbers[2];
            select.selectAll(".marker.s2").attr("x1", markers2).attr("x2", markers2)

            const markers3 = (width / +bitsMapNumbers[0]) * +calibrationMapNumbers[3];
            select.selectAll(".marker.s3").attr("x1", markers3).attr("x2", markers3)
        }
    }



    //reactive to subscriptions
    $: bitsMapNumbers, calibrationMapNumbers, updateGraph()

    calibrationMap.subscribe((value) => {
        const {brakeCalibration} = value
        calibrationMapNumbers = brakeCalibration
    })

    bitsMap.subscribe((value) => {
        const {brakeBits} = value
        bitsMapNumbers = brakeBits
    })

    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            update(msg)
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    onDestroy(() => {
        unsubscribeMessage.unsubscribe()
    })
</script>


<div>
    <div id="bullet_chart_brake_raw"></div>
</div>
