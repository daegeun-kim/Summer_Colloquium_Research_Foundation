document.addEventListener("DOMContentLoaded", function() {
  // Debug mode: set to true to show node coordinates
  const DEBUG = true;
  // Sample data for 5 nodes and links
  const nodes = [
    {id: "GIS", group: 1, x: 454, y: 350, fx: 454, fy: 350},
    {id: "Artificial Intelligence", group: 2, x: 664, y: 668, fx: 664, fy: 668},
    {id: "Data Science", group: 1, x: 264, y: 668, fx: 264, fy: 668},
    {id: "Critical Cartography", group: 5, x: 648, y: 256, fx: 648, fy: 256},
    {id: "Data Perception", group: 2, x: 927, y: 336, fx: 927, fy: 336},
    {id: "Urban Data Democratization", group: 3, x: 686, y: 359, fx: 686, fy: 359},
    {id: "Digital Equity", group: 5, x: 681, y: 451, fx: 681, fy: 451},
    {id: "Environmental Justice", group: 5, x: 863, y: 519, fx: 863, fy: 519},
    {id: "Spatial AI", group: 5, x: 953, y: 642, fx: 983, fy: 642},
    {id: "Natural Language Interface", group: 5, x: 874, y: 772, fx: 874, fy: 772},
    {id: "Participatory Mapping", group: 5, x: 659, y: 855, fx: 659, fy: 855},
    {id: "Algorithmic Fairness", group: 5, x: 416, y: 853, fx: 416, fy: 853},
    {id: "Data Epistemology", group: 5, x: 188, y: 831, fx: 188, fy: 831},
    {id: "Predictive Modeling", group: 5, x: 62, y: 753, fx: 62, fy: 753},
    {id: "Deep Learning", group: 5, x: -19, y: 636, fx: -19, fy: 636},
    {id: "Platform Urbanism", group: 5, x: -12, y: 505, fx: -12, fy: 505},
    {id: "D3.js", group: 5, x: 17, y: 350, fx: 17, fy: 350},
    {id: "Machine Learning", group: 1, x: 157, y: 385, fx: 157, fy: 385},
    {id: "Data Visualization", group: 3, x: 240, y: 239, fx: 240, fy: 239},
    {id: "Data Bias", group: 4, x: 439, y: 743, fx: 439, fy: 743}
  ];
  // Separate out the links between the 3 major nodes
  const majorLinks = [
    {source: "Artificial Intelligence", target: "GIS"},
    {source: "Artificial Intelligence", target: "Data Science"},
    {source: "GIS", target: "Data Science"}
  ];
  // All other links
  const links = [
    {source: "Machine Learning", target: "GIS", value: 1},
    {source: "Machine Learning", target: "Artificial Intelligence", value: 1},
    {source: "Data Science", target: "Data Visualization", value: 1},
    {source: "Artificial Intelligence", target: "Data Perception", value: 1},
    {source: "Artificial Intelligence", target: "Data Visualization", value: 1},
    {source: "Data Visualization", target: "Data Perception", value: 1},
    {source: "Artificial Intelligence", target: "Data Bias", value: 1},
    {source: "Data Perception", target: "Urban Data Democratization", value: 1},
    {source: "Data Visualization", target: "Urban Data Democratization", value: 1},
    {source: "Data Perception", target: "Data Bias", value: 1},
    {source: "Machine Learning", target: "Data Bias", value: 1},
    {source: "Data Science", target: "Machine Learning", value: 1},
    {source: "Algorithmic Fairness", target: "Data Science", value: 1},
    {source: "Algorithmic Fairness", target: "Data Bias", value: 1},
    {source: "Predictive Modeling", target: "Machine Learning", value: 1},
    {source: "Predictive Modeling", target: "Data Science", value: 1},
    {source: "Natural Language Interface", target: "Artificial Intelligence", value: 1},
    {source: "Natural Language Interface", target: "Data Perception", value: 1},
    {source: "D3.js", target: "Data Visualization", value: 1},
    {source: "D3.js", target: "Data Science", value: 1},
    {source: "Digital Equity", target: "Artificial Intelligence", value: 1},
    {source: "Digital Equity", target: "Urban Data Democratization", value: 1},
    {source: "Participatory Mapping", target: "Data Science", value: 1},
    {source: "Participatory Mapping", target: "Artificial Intelligence", value: 1},
    {source: "Critical Cartography", target: "GIS", value: 1},
    {source: "Critical Cartography", target: "Data Perception", value: 1},
    {source: "Platform Urbanism", target: "GIS", value: 1},
    {source: "Platform Urbanism", target: "Data Science", value: 1},
    {source: "Spatial AI", target: "Artificial Intelligence", value: 1},
    {source: "Spatial AI", target: "GIS", value: 1},
    {source: "Spatial AI", target: "Data Perception", value: 1},
    {source: "Deep Learning", target: "Machine Learning", value: 1},
    {source: "Deep Learning", target: "Data Science", value: 1},
    {source: "Environmental Justice", target: "Urban Data Democratization", value: 1},
    {source: "Environmental Justice", target: "Artificial Intelligence", value: 1},
    {source: "Data Epistemology", target: "Data Science", value: 1},
    {source: "Data Epistemology", target: "Data Bias", value: 1}
  ];

  const width = 900;
  const height = 1100;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto");

  // Draw static lines between the 3 major nodes
  const majorLinkGroup = svg.append("g")
      .attr("stroke", "#c7c7c7")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.9);
    majorLinkGroup.selectAll("line")
      .data(majorLinks)
      .join("line")
      .attr("x1", d => nodes.find(n => n.id === d.source).x)
      .attr("y1", d => nodes.find(n => n.id === d.source).y)
      .attr("x2", d => nodes.find(n => n.id === d.target).x)
      .attr("y2", d => nodes.find(n => n.id === d.target).y);

  // Draw all other links with force simulation
  const link = svg.append("g")
    .attr("stroke", "#bdbdbdff")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 0)
    .selectAll("ellipse")
    .data(nodes)
    .join("ellipse")
    .attr("rx", d => ["Artificial Intelligence", "Data Science", "GIS"].includes(d.id) ? 15 : 15)
    .attr("ry", d => ["Artificial Intelligence", "Data Science", "GIS"].includes(d.id) ? 15 : 15)
    .attr("fill", "white")
    .attr("fill-opacity", 1)
    .attr("stroke-opacity", 0);

  node.append("title")
    .text(d => d.id);

  // Add labels to nodes
  const labels = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", d => ["Artificial Intelligence", "Data Science", "GIS"].includes(d.id) ? "25px" : "11px")
    .attr("font-weight", "bold")
    .attr("pointer-events", "none")
    .style("user-select", "none")
    .attr("fill", d => ["Artificial Intelligence", "Data Science", "GIS"].includes(d.id) ? "#222" : "#888")
    .text(d => d.id);

  // Debug: log coordinates to console on dragend

  node.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));


  // Draw everything statically at initial node positions
  function renderStatic() {
    link
      .attr("x1", d => getNode(d.source).x)
      .attr("y1", d => getNode(d.source).y)
      .attr("x2", d => getNode(d.target).x)
      .attr("y2", d => getNode(d.target).y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("x", d => d.x)
      .attr("y", d => d.y);

    labels
      .attr("x", d => d.x)
      .attr("y", d => d.y);

    majorLinkGroup.selectAll("line")
      .attr("x1", d => nodes.find(n => n.id === d.source).x)
      .attr("y1", d => nodes.find(n => n.id === d.source).y)
      .attr("x2", d => nodes.find(n => n.id === d.target).x)
      .attr("y2", d => nodes.find(n => n.id === d.target).y);
  }

  function getNode(idOrObj) {
    if (typeof idOrObj === 'object') return idOrObj;
    return nodes.find(n => n.id === idOrObj);
  }

  renderStatic();



  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    // Keep fx and fy set so node stays at dragged position
    if (DEBUG) {
      // Log the node's id and coordinates to the console
      console.log(`Node '${event.subject.id}': x=${Math.round(event.subject.x)}, y=${Math.round(event.subject.y)}`);
    }
  }
});