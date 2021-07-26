<script>
    import * as d3 from "d3";
    import {getContext, onDestroy, onMount} from "svelte";
    import "./BulletGraph"

    let message = getContext('WSC-message');
    let calibrationMap = getContext('WSC-calibrationMap');
    let bitsMap = getContext('WSC-bitsMap');

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
            markers: [0]
        },
    ];

    onMount(() => {
        var chart = d3.bullet().width(width).height(height).ticks(10);
        svg = d3
            .select("#bullet_chart_brake_hid")
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
    });

    const update = (msg) => {
        if ($bitsMap && $bitsMap.brakeBits) {
            var select = d3.select("#bullet_chart_brake_hid .bullet g");

            select.selectAll(".title").text(() => msg.brake.hid)

            const measures1 = (width / +$bitsMap.brakeBits[1]) * msg.brake.hid
            select.selectAll(".measure.s1").attr("width", measures1);
        }
    }

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
        opacity: 0;
    }

    * :global(.bullet .marker.s1) {
        opacity: 0;
    }

    * :global(.bullet .marker.s2) {
        opacity: 0;
    }

    * :global(.bullet .marker.s3) {
        opacity: 0;
    }

    * :global(.bullet .title) {
        font-weight: bold;
    }

    * :global(.bullet .subtitle) {
        fill: #999;
    }
</style>


<div>
    <div id="bullet_chart_brake_hid"></div>
</div>
