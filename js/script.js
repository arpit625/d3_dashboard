var yearInterval = '';
var africaColor = '#00D5E9';
var asiaColor = '#FF5872';
var australiaColor = '#2E86C1';
var cenAmeColor = '#16A085';
var europeColor = '#E67E22';
var norAmeColor = '#7E5109';
var oceanicColor = '#922B21';
var souAmeColor = '#A569BD';
var colorFlag = 1;
$(document).ready(function() {
	// Define margins
	var margin = {top: 10, right: 10, bottom: 25, left: 25};
		
	//Width and height
	var outer_width = 900;
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
	var svg = d3.select("#mainCanvas")
				.append("svg")
				.attr("width", svg_width + margin.left + margin.right)
				.attr("height", svg_height + margin.top + margin.bottom)
				.style("background",'#66737c')
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//Create SVG element as a group with the margins transform applied to it
	var svgRightOne = d3.select("#rightCanvasOne")
				.append("svg")
				.attr("width", 330)
				.attr("height", 230)
				.style("background",'#66737c')
				.append("g")
				.attr("transform", "translate(100,10)");

	// Create a scale to scale market share values nicely for bar heights
	var yScale = d3.scaleLinear()
                     .range([svg_height, 0]);
                     // .range([ 0, svg_height]);

	// Create a scale object to nicely take care of positioning bars along the horizontal axis
	// We don't set the domain yet as data isn't loaded
	var xScale = d3.scaleLinear()
					// .range([0, svg_width]);
					.rangeRound([0, 90, 180, 270, 360, 450, 540, 630, 720, 810, 900])
					.domain([0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000]);

	// xScale.domain([0, 500, 1000, 5000, 20000, 50000,100000]);

	var populationScale = d3.scaleLinear()
							.range([1,25]);

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
	var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);			  


	// Define a fucntion to draw a simple bar chart
	function generateVis(){

		d3.select("#year_header").text("Year: ")
		// d3.select("#year_header").text("Year: " + display_year)

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
		  	//.attr("r", 2)
		  	.attr("r", function(d){
		  		return populationScale(d.Population)*1.25;
		  	})
		  	.style("fill", function(d){
				var region = d.Region;
				if(region == "Africa"){
					return africaColor;
				}
				else if(region == "Asia"){
					return asiaColor;
				}
				else if(region == "Australia"){
					return australiaColor;
				}
				else if(region == "Central America"){
					return cenAmeColor;
				}
				else if(region == "Europe"){
					return europeColor;
				}
				else if(region == "North America"){
					return norAmeColor;
				}
				else if(region == "Oceanic"){
					return oceanicColor;
				}
				else if(region == "South America"){
					return souAmeColor;
				}
				
			});
			   

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
			.on("mouseover", function(d) {		
				div.transition()		
					.duration(200)		
					.style("opacity", .9);		
				div.html(d.Country + "<br/>"+ "Ïncome:"+d.GDP+"<br/> Life Expectency:"+d.LifeExp)	
					.style("left", (xScale(d.GDP)) + "px")		
					.style("top", (yScale(d.LifeExp)) + "px");	
            })
			.on("mouseout", function(d) {		
				div.transition()		
					.duration(500)		
					.style("opacity", 0);
			})
		  	.style("fill", function(d){
				var region = d.Region;
				if(region == "Africa"){
					return africaColor;
				}
				else if(region == "Asia"){
					return asiaColor;
				}
				else if(region == "Australia"){
					return australiaColor;
				}
				else if(region == "Central America"){
					return cenAmeColor;
				}
				else if(region == "Europe"){
					return europeColor;
				}
				else if(region == "North America"){
					return norAmeColor;
				}
				else if(region == "Oceanic"){
					return oceanicColor;
				}
				else if(region == "South America"){
					return souAmeColor;
				}
				
			});


		/******** HANDLE EXIT SELECTION ************/
		// Remove bars that not longer have a matching data eleement
		points.exit().remove();
	  		
		// Set the year label
		d3.select("#year_header").text("Year: " + display_year)

		svg.append('text')
			.attr("y",100)
			.attr("x",200)
			.style("text-anchor", "end")
			.text(display_year);

/*		svg.selectAll('text')
			.data(dataset)
			.enter()
				.append('text')
				.attr("y",100)
				.attr("x",200)
				.style("text-anchor", "end")
				.text(display_year);*/

		// console.log("end generate viz")
		generateVisR1(filtered_datset);
	}

	function generateVisR1(filtered_datset){

		// Create a scale to scale market share values nicely for bar heights
		var xScale = d3.scaleLinear()
	                     .domain([0, 55])
	                     .range([0, 220]);

		// Create a scale object to nicely take care of positioning bars along the horizontal axis
		var yScale = d3.scaleBand()
          				.domain(dataset.map(function(d) { return d.Region; }))
						.range([200, 0]);

		// Create an x-axis connected to the x scale
		var xAxis = d3.axisBottom()
					  .scale(xScale)
					  .ticks(5);

		//Define Y axis
		var yAxis = d3.axisLeft()
						  .scale(yScale);
					  
		// Call the x-axis
		svgRightOne.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0,200)")
			.call(xAxis);
			
		// Call the y axis
		svgRightOne.append("g")
			.attr("class", "axis")
			.call(yAxis);

		var dataR1 = d3.nest()
					  .key(function(d) { return d.Region;})
					  .rollup(function(d) { 
					   return d3.sum(d, function(g) {return 1; });
					  }).entries(filtered_datset);

		var plot = svgRightOne.selectAll("rect")
							.data(dataR1, function key(d) {
								return d.Region;
							});

		  // console.log(dataR1);
		  // console.log(display_year);
		  // console.log(plot);

		     // Add rectangles
	     plot
	        .append("rect")
	        .attr("x", 1)
	        // .attr("x", function(d) {
	        		// return xScale(d.value);
	        // })
	        .attr("y", function(d) {
	        		return yScale(d.key) ;
	        })
	        .attr("height", yScale.bandwidth())
	        .attr("width", function(d) {
	        		return xScale(+d.value);
	        		// return 220 - xScale(+d.value);
	        })
	        .attr("fill", "blue");

		// Add rectangles
		plot
		   .enter()
		   .append("rect")
		   .attr("x", 1)
		   .attr("y", function(d) {
		   		return yScale(d.key) ;
		   })
		   .attr("height", yScale.bandwidth())
		   .attr("width", function(d) {
		   		return xScale(+d.value);
		   })
		   .attr("fill", "blue");

	   plot.exit().remove();

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
				.call(yAxis);

				// .append("text")
				      // .attr("transform", "rotate(-90)")
				      // .attr("y", 6)
				      // .attr("dy", ".71em")
				      // .style("text-anchor", "end")
				      // .text("Price ($)");

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
		if(display_year != '' && (display_year > 1949 && display_year < 2017)){
			display_year = +display_year;
			generateVis();
		}
		else{
			alert("Enter year between 1950 and 2016");
		}
	});
	$("#playPause").click(function() {
		if($("#playPause").text() == "Play"){
			console.log('play')
			$("#playPause").text("Pause");
			if(display_year < 1950 || display_year > 2015)
			{
				display_year = 1950;
			}
				generateVis();
				yearInterval = setInterval(function() {
					display_year = display_year + 1;
					if(display_year > 2015){
						$("#playPause").text("Play");
						clearInterval(yearInterval);
					}
					generateVis();
				}, 100);
			/*}
			else{
				generateVis();
				yearInterval = setInterval(function() {
					display_year = display_year + 1;
					if(display_year > 2015){
						$("#playPause").text("Play");
						clearInterval(yearInterval);
					}
					generateVis();
				}, 100);
			}*/
		}
		else if( $("#playPause").text() == "Pause" ){
				$("#playPause").text("Play");
				clearInterval(yearInterval);
		}
		
	});
	$("#colorChange").click(function(){
		colorBlind();
	});
	
	function colorBlind(){console.log('change');
		if(colorFlag == 0){console.log('no');
			africaColor = '#00D5E9';
			asiaColor = '#FF5872';
			australiaColor = '#2E86C1';
			cenAmeColor = '#16A085';
			europeColor = '#E67E22';
			norAmeColor = '#7E5109';
			oceanicColor = '#922B21';
			souAmeColor = '#A569BD';
			colorFlag = 1;
			generateVis();
			$("#colorChange").text("Colorblind Eyes");
		}
		else{console.log('yes');
			africaColor = '#66C2A5';
			asiaColor = '#FC8D62';
			australiaColor = '#8DA0CB';
			cenAmeColor = '#E78AC3';
			europeColor = '#A6D854';
			norAmeColor = '#FFD92F';
			oceanicColor = '#E5C494';
			souAmeColor = '#B3B3B3';
			colorFlag = 0;
			generateVis();
			$("#colorChange").text("Normal Eyes");
		}
	}
});