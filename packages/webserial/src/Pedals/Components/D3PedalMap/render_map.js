import * as d3 from "d3";

const render = ({selector, data}) => {
    var svg;
    var width = 230;
    var height = 230;
    var margin = 20;
    var lineOpacity = "0.85";
    var circleOpacity = "1";
    var circleRadius = 3;

    var xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, width - margin]);
    var yScale = d3
        .scaleLinear()
        .domain([100, 0])
        .range([0, height - margin]);


    d3.selectAll(selector + " svg > *").remove();

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    svg = d3
        .select(selector + " svg")
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


}

export default render