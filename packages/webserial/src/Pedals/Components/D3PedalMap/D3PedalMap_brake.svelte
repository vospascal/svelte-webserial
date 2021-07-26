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
    import * as d3 from "d3";
    import {getContext, onDestroy, onMount} from "svelte";

    let message = getContext('WSC-message');
    let pedalMap = getContext("WSC-pedalMap");
    let pedalMapNumbers = [0, 20, 40, 60, 80, 100]

    var svg;
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
    var width = 230;
    var height = 230;
    var margin = 25;
    var lineOpacity = "0.25";
    var circleOpacity = "0.85";
    var circleRadius = 3;


    /* Scale */
    var xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, width - margin]);
    var yScale = d3
        .scaleLinear()
        .domain([100, 0])
        .range([0, height - margin]);

    const update = (msg) => {
        var select = d3.select("#brakeChart")

        const cx_circle_s0 = (width - margin) / 100 * msg.brake.after;
        const cy_circle_s0 = (width - margin) - ((height - margin) / 100 * msg.brake.before);
        select.selectAll(".input .circle.s0 circle").attr("cx", cx_circle_s0).attr("cy", cy_circle_s0)
    }


    /* Add SVG */
    onMount(() => {
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        svg = d3
            .select("#brakeChart")
            .append("svg")
            .attr("class", "container")
            .attr("width", width + margin + "px")
            .attr("height", height + margin + "px")
            .append("g")
            .attr("transform", `translate(${margin}, ${margin})`);
        ////////begin draw grid ///////
        var gridlinesx = d3
            .axisTop()
            .tickFormat("")
            .ticks(5)
            .tickSize(-(width - margin))
            .scale(xScale);

        var gridlinesy = d3
            .axisTop()
            .tickFormat("")
            .ticks(5)
            .tickSize((height - margin))
            .scale(yScale);

        svg.append("g").attr("class", "grid").call(gridlinesx);
        svg
            .append("g")
            .attr("class", "grid")
            .attr("transform", "rotate(90)")
            .call(gridlinesy);

        ////////end draw grid ///////

        /* Add line into SVG */
        var line = d3
            .line()
            .x((d) => xScale(d.increment))
            .y((d) => yScale(d.position));

        let lines = svg.append("g").attr("class", "lines");

        lines
            .selectAll(".line-group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", function (d, i) {
                return "line-group" + " " + d.name
            })
            .append("path")
            .attr("class", "line")
            .attr("d", (d) => line(d.values))
            .style("stroke", (d, i) => color(i))
            .style("opacity", lineOpacity);

        /* Add circles in the line */
        lines
            .selectAll("circle-group")
            .data(data)
            .enter()
            .append("g")
            .style("fill", (d, i) => {
                return color(i)
            })
            .attr("class", function (d, i) {
                return d.name
            })
            .selectAll("circle")
            .data((d) => d.values)
            .enter()
            .append("g")
            .attr("class", function (d, i) {
                return "circle s" + i;
            })
            .append("circle")
            .attr("cx", (d) => xScale(d.increment))
            .attr("cy", (d) => yScale(d.position))
            .attr("r", circleRadius)
            .style("opacity", circleOpacity);

        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);

        svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height - margin})`)
            .call(xAxis);

        svg.append("g").attr("class", "y axis").call(yAxis);

        updateGraph();
    });


    const updateGraph = () => {
        var select = d3.select("#brakeChart")

        const cx_circle_s0 = (width - margin) / 100 * 0;
        const cy_circle_s0 = (width - margin) - ((height - margin) / 100 * pedalMapNumbers[0]);

        const cx_circle_s1 = (width - margin) / 100 * 20;
        const cy_circle_s1 = (width - margin) - ((height - margin) / 100 * pedalMapNumbers[1]);

        const cx_circle_s2 = (width - margin) / 100 * 40;
        const cy_circle_s2 = (width - margin) - ((height - margin) / 100 * pedalMapNumbers[2]);

        const cx_circle_s3 = (width - margin) / 100 * 60;
        const cy_circle_s3 = (width - margin) - ((height - margin) / 100 * pedalMapNumbers[3]);

        const cx_circle_s4 = (width - margin) / 100 * 80;
        const cy_circle_s4 = (width - margin) - ((height - margin) / 100 * pedalMapNumbers[4]);

        const cx_circle_s5 = (width - margin) / 100 * 100;
        const cy_circle_s5 = (width - margin) - ((height - margin) / 100 * pedalMapNumbers[5]);

        const line = "M" +
            cx_circle_s0 + "," + cy_circle_s0 + "L" +
            cx_circle_s1 + "," + cy_circle_s1 + "L" +
            cx_circle_s2 + "," + cy_circle_s2 + "L" +
            cx_circle_s3 + "," + cy_circle_s3 + "L" +
            cx_circle_s4 + "," + cy_circle_s4 + "L" +
            cx_circle_s5 + "," + cy_circle_s5

        select.selectAll(".line-group.curve .line").attr("d", line)
        select.selectAll(".curve .circle.s0 circle").attr("cx", cx_circle_s0).attr("cy", cy_circle_s0)
        select.selectAll(".curve .circle.s1 circle").attr("cx", cx_circle_s1).attr("cy", cy_circle_s1)
        select.selectAll(".curve .circle.s2 circle").attr("cx", cx_circle_s2).attr("cy", cy_circle_s2)
        select.selectAll(".curve .circle.s3 circle").attr("cx", cx_circle_s3).attr("cy", cy_circle_s3)
        select.selectAll(".curve .circle.s4 circle").attr("cx", cx_circle_s4).attr("cy", cy_circle_s4)
        select.selectAll(".curve .circle.s5 circle").attr("cx", cx_circle_s5).attr("cy", cy_circle_s5)
    }

    const unsubscribeMessage = message.subscribe({
        next: (msg) => {
            update(msg)
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

    pedalMap.subscribe((value) => {
        if (JSON.stringify(value) !== '{}') {
            const {brakeMap} = value
            pedalMapNumbers = brakeMap;
            updateGraph();
        }
    })

    onDestroy(() => {
        unsubscribeMessage.unsubscribe()
    })
</script>

<div>
    <div id="brakeChart"></div>
</div>