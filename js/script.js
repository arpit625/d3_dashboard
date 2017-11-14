
$(document).ready(function() {
	// Define margins
	var margin = {top: 10, right: 10, bottom: 25, left: 25};
		
	//Width and height
	var outer_width = 500;
	var outer_height = 300;
	var svg_width = outer_width - margin.left - margin.right;
	var svg_height = outer_height - margin.top - margin.bottom;

	// The year to display
	display_year = 2013;

	// define a function that filters data by year


	//Create SVG element as a group with the margins transform applied to it
	var svg = d3.select("body")
				.append("svg")
				.attr("width", svg_width + margin.left + margin.right)
				.attr("height", svg_height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create a scale to scale market share values nicely for bar heights
	var yScale = d3.scaleLinear()
		                     .domain([0, 50])
		                     .range([svg_height, 0]);

	// Create a scale object to nicely take care of positioning bars along the horizontal axis
	// We don't set the domain yet as data isn't loaded
	var xScale = d3.scaleBand()
					.range([0, svg_width], 0.1)
					.paddingInner(0.05)
					.paddingOuter(0.05);
				
	//Define Y axis
	var yAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(5);

	// Create an x-axis connected to the x scale
	var xAxis = d3.axisBottom()
				 .scale(xScale);
				  
	// Call the y axis
	svg.append("g")
		.attr("class", "axis")
		.attr("id", "y-axis")
		.call(yAxis);
			
	// All but call the x-axis
	svg.append("g")
		.attr("class", "axis")
		.attr("id", "x-axis")
		.attr("transform", "translate(0," + svg_height + ")");
	
	function yearFilter(value){
		return (value.Year == display_year)
	}

	// Define a fucntion to draw a simple bar chart
	function generateVis(){
			console.log("Inside viz")
		// Filter the data to only include the current year
		var filtered_datset = dataset.filter(yearFilter);
			
	 	/******** PERFORM DATA JOIN ************/
	  	// Join new data with old elements, if any.
	  	var bars = 	svg.selectAll("rect")
		   .data(filtered_datset, function key(d) {
									return d.Company;
								});

	 	/******** HANDLE UPDATE SELECTION ************/
	  	// Update the display of existing elelemnts to mathc new data
	  	bars
			.transition()
			.duration(500)
			.ease(d3.easeBounce)
			.attr("x", function(d) {
		   		return xScale(d.Company);
		   })
		   .attr("y", function(d) {
		   		return yScale(+d.Share) ;
		   })
		   .attr("width", xScale.bandwidth())
		   .attr("height", function(d) {
		   		return svg_height - yScale(+d.Share);
		   })
		   .style("fill", "Green");
			   

		/******** HANDLE ENTER SELECTION ************/
	  	// Create new elements in the dataset
	  	bars.enter()
		   .append("rect")
			.transition()
			.duration(500)
			.ease(d3.easeBounce)
		   .attr("x", function(d, i) {
		   		return xScale(d.Company);
		   })
		   .attr("y", function(d) {
		   		return yScale(+d.Share) ;
		   })
		   .attr("width", xScale.bandwidth())
		   .attr("height", function(d) {
		   		return svg_height - yScale(+d.Share);
		   })
		   .style("fill", "Blue");

		/******** HANDLE EXIT SELECTION ************/
		// Remove bars that not longer have a matching data eleement
		bars.exit().remove();
	  		
		// Set the year label
		d3.select("#year_header").text("Year: " + display_year)

	}

	// Load the file data.csv and generate a visualisation based on it
	d3.csv("./data/BroadbandMarketshare2013_2015.csv", function(error, data){
		
		// handle any data loading errors
		if(error){
			console.log("Something went wrong");
			console.log(error);
		}else{
			console.log("Data Loaded");
			
			// Assign  the data object loaded to the global dataset variable
			dataset = data;
			
			// Update the domain of the x scale
			xScale.domain(dataset.map(function(d) { return d.Company; }));
			// Call the x-axis
			svg.select("#x-axis").call(xAxis);

			// Generate the visualisation
			generateVis();

			// Iterate through our avilable years.
			setInterval(function() {
				display_year = display_year + 1;
				if(display_year > 2015){
					display_year = 2013;
				}
			  	generateVis();
			}, 4000);
		}
	});
});


