// Render in the SVG with id 'chart2'
const width = 1000;
const height = 400;
const paddingX = 60;
const paddingY = 60;

d3.json("nodeLink.json").then(nodeLink => {
    const svg = d3.select("#chart2")
        .attr("width", width)
        .attr("height", height);

    const nodeById = new Map(nodeLink.nodes.map(d => [d.id, d]));

    // Dynamically create layers for each group
    const groupNames = Array.from(new Set(nodeLink.nodes.map(d => d.group)));
    const layers = {};
    groupNames.forEach(g => layers[g] = []);

    nodeLink.nodes.forEach((d) => {
        layers[d.group].push(d);
    });

    // Add padding to node positions
    Object.entries(layers).forEach(([group, nodes], i) => {
        nodes.forEach((node, j) => {
            const groupCount = groupNames.length;
            const layerSpacing = 220;
            const totalLayoutWidth = (groupCount - 1) * layerSpacing;
            const offsetX = (width - totalLayoutWidth) / 2;

            node.x = offsetX + i * layerSpacing;
            node.y = paddingY + j * 26 - 30;
        });
    });

    // Adjust SVG viewBox for padding
    svg.attr("viewBox", [0, 0, width, height]);

    // Use d3.linkHorizontal() for links
    const linkGen = d3.linkHorizontal()
        .x(d => d.x)
        .y(d => d.y);

    svg.selectAll("path")
        .data(nodeLink.links)
        .enter().append("path")
        .attr("d", d => {
            const r = 8; // node radius
            const source = nodeById.get(d.source);
            const target = nodeById.get(d.target);
            // Determine direction: left to right or right to left
            const dx = target.x - source.x;
            // Offset horizontally by 5px from each node
            const sourceX = source.x + (dx > 0 ? r : -r);
            const targetX = target.x - (dx > 0 ? r : -r);
            return linkGen({
                source: {x: sourceX, y: source.y},
                target: {x: targetX, y: target.y}
            });
        })
        .attr("fill", "none")
        .attr("stroke", d => {
            const redNodes = [
                "NYC flood zones",
                "NYC building",
                "building height",
                "property value",
                "Linear regression",
                "bivariate choropleth map"
            ];
            return (redNodes.includes(d.source) && redNodes.includes(d.target)) ? "#ff0000ff" : "black";
        })
        .attr("stroke-width", d => {
            const redNodes = [
                "NYC flood zones",
                "NYC building",
                "building height",
                "property value",
                "Linear regression",
                "bivariate choropleth map"
            ];
            return (redNodes.includes(d.source) && redNodes.includes(d.target)) ? 0.6 : 0.6;
        })
        .attr("stroke-opacity", d => {
            const redNodes = [
                "NYC flood zones",
                "NYC building",
                "building height",
                "property value",
                "Linear regression",
                "bivariate choropleth map"
            ];
            return (redNodes.includes(d.source) && redNodes.includes(d.target)) ? 1.0 : 0.12;
        });

    svg.selectAll("circle")
        .data(nodeLink.nodes)
        .enter().append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 3)
        .attr("fill", d => [
            "NYC flood zones",
            "NYC building",
            "building height",
            "property value",
            "Linear regression",
            "bivariate choropleth map"
        ].includes(d.id) ? "#ff0000ff" : "#000000ff");

    svg.selectAll("text")
        .data(nodeLink.nodes)
        .enter().append("text")
        .attr("x", d => {
            if (d.group === "geometry Data (shp, geojson)") return d.x - 7;
            if (d.group === "property Data (csv)" || d.group === "Analytical Models (python)") return d.x;
            return d.x + 7;
        })
        .attr("y", d => {
            if (d.group === "property Data (csv)" || d.group === "Analytical Models (python)") return d.y - 9;
            return d.y;
        })
        .attr("text-anchor", d => {
            if (d.group === "geometry Data (shp, geojson)") return "end";
            if (d.group === "property Data (csv)" || d.group === "Analytical Models (python)") return "middle";
            return "start";
        })
        .text(d => d.id)
        .attr("alignment-baseline", "middle")
        .attr("font-size", 9)
        .attr("fill", d => [
            "NYC flood zones",
            "NYC building",
            "building height",
            "property value",
            "Linear regression",
            "bivariate choropleth map"
        ].includes(d.id) ? "#ff0000ff" : "#000000ff")
        .attr("font-weight", d => [
            "NYC flood zones",
            "NYC building",
            "building height",
            "property value",
            "Linear regression",
            "bivariate choropleth map"
        ].includes(d.id) ? "bold" : "normal");
});
