<style>
    svg {
        font-family: Sans-Serif, Arial;
    }
    .line {
        stroke-width: 2;
        fill: none;
    }

    .axis path {
        stroke: black;
    }

    .text {
        font-size: 12px;
    }

    .title-text {
        font-size: 12px;
    }

    .grid line {
        stroke: lightgrey;
        stroke-opacity: 0.7;
        shape-rendering: crispEdges;
    }

</style>

<script>
    import * as d3 from "d3";
    import {getContext, onMount} from "svelte";

    let message = getContext('WSC-message');

    var svg;
    var data = [
        {
            name: "default",
            values: [
                { increment: 0, position: 0 },
                { increment: 20, position: 20 },
                { increment: 40, position: 40 },
                { increment: 60, position: 60 },
                { increment: 80, position: 80 },
                { increment: 100, position: 100 }
            ]
        },
        {
            name: "curve",
            values: [
                { increment: 0, position: 0 },
                { increment: 20, position: 31 },
                { increment: 40, position: 46 },
                { increment: 60, position: 54 },
                { increment: 80, position: 69 },
                { increment: 100, position: 100 }
            ]
        },
        {
            name: "input",
            values: [{ increment: 0, position: 0 }]
        }
    ];
    var width = 250;
    var height = 250;
    var margin = 35;
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
        .range([0, width - margin]);


    const update = (msg) => {
        var oldData = d3.select(".container g").selectAll("circle").data();
        var newItem = {
            increment:  msg.clutch.after,
            position: msg.clutch.before
        };

        const newData = oldData.map((item, index) => {
            if (oldData.length - 1 === index) {
                return newItem;
            }
            return item;
        });

        d3.select(".container g")
            .selectAll("circle")
            .data(newData)
            .attr("cx", (d) => xScale(d.increment))
            .attr("cy", (d) => yScale(d.position))
            .attr("r", circleRadius);
    }


    /* Add SVG */
     onMount(() => {
         var color = d3.scaleOrdinal(d3.schemeCategory10);
         svg = d3
             .select("#clutchChart")
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
             .attr("class", "line-group")
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
             .style("fill", (d, i) => color(i))
             .selectAll("circle")
             .data((d) => d.values)
             .enter()
             .append("g")
             .attr("class", "circle")
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
     });


    message.subscribe({
        next: (msg) => {
            update(msg)
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });

</script>

<div>
    <button on:click={update}></button>
    <div id="clutchChart"></div>
</div>