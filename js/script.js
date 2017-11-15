
$(document).ready(function() {
	// Define margins
	var margin = {top: 10, right: 10, bottom: 25, left: 25};
		
	//Width and height
	var outer_width = 500;
	var outer_height = 500;
	var svg_width = outer_width - margin.left - margin.right;
	var svg_height = outer_height - margin.top - margin.bottom;

	// The year to display
	var display_year = 1950;

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
					// .range([0, svg_width]);
					.rangeRound([0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500])
					.domain([0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000]);

	// xScale.domain([0, 500, 1000, 5000, 20000, 50000,100000]);

	var populationScale = d3.scaleLinear()
							.range([1,30]);

	//Define Y axis
	var yAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(5);

	// Create an x-axis connected to the x scale
	var xAxis = d3.axisBottom()
				 .scale(xScale)
				 .ticks(5)
				 .tickFormat(function (d) {
				       if ((d / 1000) >= 1) {
				         d = d / 1000 + "K";
				       }
				       return d;
				     })
				 .tickValues([0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000]);
				  


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
		  	.duration(300)
			.ease(d3.easeBounce)
	  		// .append("circle")
		  	.attr("cx", function(d){
		  		return xScale(d.GDP);
		  	})
		  	.attr("cy", function(d){
		  		return yScale(d.LifeExp);
		  	})
		  	.attr("r", 2)
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
	// d3.csv("./data/test.csv", function(error, data){
	d3.csv("./data/Gapminder_All_Time.csv", function(error, data){
		
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

			// xScale.domain([0, 500, 1000, 5000, 20000, 50000,100000]);
			// xScale.domain([0, max_gdp]);
			// yScale.domain([0, max_lifeExp]);
			yScale.domain([15, 90]);

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

			// Iterate through our varilable years.
			/*var yearInterval = setInterval(function() {
				display_year = display_year + 1;
				if(display_year > 2015){
					clearInterval(yearInterval);
				}
			  	generateVis();
			}, 100);*/
		}
	});
	$("#showData").click(function() {
		display_year = $('#textYear').val();
		display_year = +display_year;
		//console.log(display_year);
		generateVis();
	});
	$("#playPause").click(function() {
		//console.log('click')
		//var state = $("#playPause").text();console.log(state);
		if($("#playPause").text() == "Play"){
			console.log('play')
			$("#playPause").text("Pause");
			//console.log(display_year);
			if(display_year > 2015)
			{
				display_year = 1950;
				generateVis();
				var yearInterval = setInterval(function() {
					display_year = display_year + 1;
					if(display_year > 2015){
						$("#playPause").text("Play");
						clearInterval(yearInterval);
					}
					generateVis();
				}, 100);
			}
			else{
				//console.log(display_year);
				generateVis();
				var yearInterval = setInterval(function() {
					display_year = display_year + 1;
					if(display_year > 2015){
						$("#playPause").text("Play");
						clearInterval(yearInterval);
					}
					generateVis();
				}, 100);
			}
		}
		else if( $("#playPause").text() == "Pause" ){
			console.log('pause');
			//console.log()
			clearInterval(yearInterval);
			//generateVis();
		}
		
	});
});


