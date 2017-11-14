
$(document).ready(function() {
	// Define margins
	var margin = {top: 10, right: 10, bottom: 25, left: 25};
		
	//Width and height
	var outer_width = 500;
	var outer_height = 500;
	var svg_width = outer_width - margin.left - margin.right;
	var svg_height = outer_height - margin.top - margin.bottom;

	// The year to display
	display_year = 2013;

	// define a function that filters data by year
	function yearFilter(value){
		return (value.Year == display_year)
	}

	//Create SVG element as a group with the margins transform applied to it
	var svg = d3.select("body")
				.append("svg")
				.attr("width", svg_width + margin.left + margin.right)
				.attr("height", svg_height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create a scale to scale market share values nicely for bar heights
	var yScale = d3.scaleLinear()
                     .range([svg_height, 0]);
                     // .range([ 0, svg_height]);

	// Create a scale object to nicely take care of positioning bars along the horizontal axis
	// We don't set the domain yet as data isn't loaded
	var xScale = d3.scaleLinear()
					.range([0, svg_width]);

	var populationScale = d3.scaleLinear()
							.range([1,20]);

	//Define Y axis
	var yAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(5);

	// Create an x-axis connected to the x scale
	var xAxis = d3.axisBottom()
				 .scale(xScale)
				 .ticks(5);
				  


	// Define a fucntion to draw a simple bar chart
	function generateVis(){
		// Filter the data to only include the current year
		var filtered_datset = dataset.filter(yearFilter);
			
	   	/******** PERFORM DATA JOIN ************/
	     	// Join new data with old elements, if any.
	   	var points = svg.selectAll("circle")
	   						.data(filtered_datset, function key(d) {
	   							return d.Country;
	   						});
	   						// .data(filtered_datset);

	 	/******** HANDLE UPDATE SELECTION ************/
	  	// Update the display of existing elelemnts to mathc new data
	  	points
		  	.transition()
		  	.duration(1000)
	  		// .append("circle")
		  	.attr("cx", function(d){
		  		return xScale(d.GDP);
		  	})
		  	.attr("cy", function(d){
		  		return yScale(d.LifeExp);
		  	})
		  	.attr("r", 0)
			.ease(d3.easeBounce)
		  	.attr("r", function(d){
		  		return populationScale(d.Population);
		  	})
		  	.style("fill", "red");
			   

		/******** HANDLE ENTER SELECTION ************/
	  	// Create new elements in the dataset
	  	// points
	  	points.enter()
		  	.append("circle")
		  	.attr("cx", function(d){
		  		return xScale(d.GDP);
		  	})
		  	.attr("cy", function(d){
		  		return yScale(d.LifeExp);
		  	})
		  	.attr("r", 0)
		  	.transition()
		  	.duration(1000)
			.ease(d3.easeBounce)
		  	.attr("r", function(d){
		  		return populationScale(d.Population);
		  	})
		  	.style("fill", "black");


		/******** HANDLE EXIT SELECTION ************/
		// Remove bars that not longer have a matching data eleement
		points.exit().remove();
	  		
		// Set the year label
		d3.select("#year_header").text("Year: " + display_year)
		// console.log("end generate viz")
	}

	// Load the file data.csv and generate a visualisation based on it
	d3.csv("./data/test.csv", function(error, data){
		
		// handle any data loading errors
		if(error){
			console.log("Something went wrong");
			console.log(error);
		}else{
			console.log("Data Loaded");
			
			// Assign  the data object loaded to the global dataset variable
			dataset = data;

			dataset.forEach(function(d){ 
						d['Year'] = +d['Year'];
						d['Population'] = +d['Population'];
						d['LifeExp'] = +d['LifeExp'];
						d['GDP'] = +d['GDP'];
						d['Area'] = +d['Area'];
						d['Coastline'] = +d['Coastline']; 
					}); 


			// Set the domains of the x and y scales using the data
			var max_gdp = d3.max(dataset, function(d) { return d.GDP;} );
			var max_lifeExp = d3.max(dataset, function(d) { return d.LifeExp;} );
			var max_population = d3.max(dataset, function(d) { return d.Population;} );
			var min_population = d3.min(dataset, function(d) { return d.Population;} );

			xScale.domain([0, max_gdp]);
			yScale.domain([0, max_lifeExp]);

			populationScale.domain([min_population, max_population]);
			// Create the x-axis
			svg.append("g")
				.attr("class", "axis")
				.attr("id", "x-axis")
				.attr("transform", "translate(0," + svg_height + ")")
				.call(xAxis);
				
			// Create the y axis
			svg.append("g")
				.attr("class", "axis")
				.attr("id", "y-axis")
				.call(yAxis)
				.append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 6)
				      .attr("dy", ".71em")
				      .style("text-anchor", "end")
				      .text("Price ($)");

		      // Generate the visualisation
		      generateVis();

			// Iterate through our avilable years.
			setInterval(function() {
				display_year = display_year + 1;
				if(display_year > 2015){
					display_year = 2013;
				}
			  	generateVis();
			}, 1000);
		}
	});
});

