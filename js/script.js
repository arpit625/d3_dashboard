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

var allYears = [1900, 1910, 1920, 1930, 1940, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
var yearIndex = 0;

$(document).ready(function() {

/*	for (var i=0; i<allYears.length; i++) {
	            console.log(allYears[i]);
	            //a b c
	        }*/

        // console.log(allYears);

	// Define margins
	var margin = {top: 10, right: 10, bottom: 40, left: 25};
		
	//Width and height
	var outer_width = 900;
	var outer_height = 500;
	var svg_width = outer_width - margin.left - margin.right;
	var svg_height = outer_height - margin.top - margin.bottom;

	// The year to display
	var display_year = allYears[0];

	function isInArray(array, search) {
	    return array.indexOf(search) >= 0;
	}

	// define a function that filters data by year
	function yearFilter(value){
		return (value.Year == display_year)
	}

	//Create SVG element as a group with the margins transform applied to it
	var svg = d3.select("#mainCanvas")
				.append("svg")
				.attr("width", svg_width + margin.left + margin.right)
				.attr("height", svg_height + margin.top + margin.bottom)
				//.style("background",'#66737c')
				.append("g")
				.attr("transform", "translate(40,10)");
				// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//Create SVG element as a group with the margins transform applied to it
	var svgRightOne = d3.select("#rightCanvasOne")
				.append("svg")
				.attr("width", 350)
				.attr("height", 249)
				//.style("background",'#66737c')
				.append("g")
				.attr("transform", "translate(110,10)");

	//Create SVG element as a group with the margins transform applied to it
	var svgRightTwo = d3.select("#rightCanvasTwo")
				.append("svg")
				.attr("width", 350)
				.attr("height", 249)
				//.style("background",'#66737c')
				.append("g")
				.attr("transform", "translate(110,10)");

	// Create a scale to scale market share values nicely for bar heights
	var yScale = d3.scaleLinear()
                     .range([svg_height, 0]);
                     // .range([ 0, svg_height]);

	// Create a scale object to nicely take care of positioning bars along the horizontal axis
	// We don't set the domain yet as data isn't loaded
	var xScale = d3.scaleLinear()
					// .range([0, svg_width]);
					.rangeRound([0, 90, 180, 270, 360, 450, 540, 630, 720, 810])
					// .rangeRound([0, 100, 200, 300, 400, 500, 600, 700, 800, 900])
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
			.style("stroke",function(d){
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
			.style("stroke",function(d){
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
		d3.select("#yearText").text(display_year)
		/*svg.append('text')
			.attr("y",100)
			.attr("x",200)
			.style("text-anchor", "end")
			.text(display_year);*/

		/*svg.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", -40)
		    .attr("x",-250)
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
		    .text("GDP");

	    svg.append("text")
	        .attr("y", 470)
	        .attr("x",405)
	        .attr("dy", "1em")
	        .style("text-anchor", "middle")
	        .text("Population");*/

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
		generateVisR2(filtered_datset);
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
	        .attr("height", yScale.bandwidth()-2)
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
		   .attr("height", yScale.bandwidth()-2)
		   .attr("width", function(d) {
		   		return xScale(+d.value);
		   })
		   .attr("fill", "blue");

	   plot.exit().remove();

	   	/*svgRightOne.append("text")
	   	    .attr("transform", "rotate(-90)")
	   	    .attr("y", -110)
	   	    .attr("x",-100)
	   	    .attr("dy", "1em")
	   	    .style("text-anchor", "middle")
	   	    .text("Region");

       svgRightOne.append("text")
           .attr("y", 215)
           .attr("x",100)
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .text("Countries");*/

	}

		function generateVisR2(filtered_datset){

			// Create a scale to scale market share values nicely for bar heights
			var xScale = d3.scaleLinear()
		                     .domain([0, 130])
		                     .range([0, 220]);

			// Create a scale object to nicely take care of positioning bars along the horizontal axis
			var yScale = d3.scaleBand()
	          				.domain(dataset.map(function(d) { return d.Government; }))
							.range([200, 0]);

			// Create an x-axis connected to the x scale
			var xAxis = d3.axisBottom()
						  .scale(xScale)
						  .ticks(5);

			//Define Y axis
			var yAxis = d3.axisLeft()
							  .scale(yScale);
						  
			// Call the x-axis
			svgRightTwo.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0,200)")
				.call(xAxis);
				
			// Call the y axis
			svgRightTwo.append("g")
				.attr("class", "axis")
				.call(yAxis);

			var dataR1 = d3.nest()
						  .key(function(d) { return d.Government;})
						  .rollup(function(d) { 
						   return d3.sum(d, function(g) {return 1; });
						  }).entries(filtered_datset);

			var plot = svgRightTwo.selectAll("rect")
								.data(dataR1, function key(d) {
									return d.Government;
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
		        		return yScale(d.key);
		        })
		        .attr("height", yScale.bandwidth()-2)
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
		        		return yScale(d.key);
		        })
			   .attr("height", yScale.bandwidth()-2)
			   .attr("width", function(d) {
			   		return xScale(+d.value);
			   })
			   .attr("fill", "blue");

		   plot.exit().remove();

   	   	/*svgRightTwo.append("text")
   	   	    .attr("transform", "rotate(-90)")
   	   	    .attr("y", -115)
   	   	    .attr("x",-100)
   	   	    .attr("dy", "1em")
   	   	    .style("text-anchor", "middle")
   	   	    .text("Government");

      svgRightTwo.append("text")
          .attr("y", 215)
          .attr("x",100)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Countries");*/

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

			// gridlines in x axis function
			function make_x_gridlines() {		
			    return d3.axisBottom(xAxis)
			        .ticks(5)
			}

			// Create the x-axis
			svg.append("g")
				.attr("class", "grid")
				.attr("id", "x-axis")
				.attr("transform", "translate(0," + svg_height + ")")
				.call(xAxis);

/*			// add the X gridlines
			svg.append("g")			
			    .attr("class", "grid")
			    .attr("transform", "translate(0," + svg_height + ")")
			    .call(make_x_gridlines()
			        .tickSize(-svg_height)
			        .tickFormat("")
			    )*/
				
			// Create the y axis
			svg.append("g")
				.attr("class", "grid")
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
		display_var = $('#textYear').val();
		display_var = parseInt(display_var);
		// if(display_year != '' && (display_year > 1949 && display_year < 2017)){
		if(allYears.includes(display_var)){
			// display_year = +display_year;
			display_year = +display_var;
			console.log("True case");
			yearIndex = allYears.indexOf(display_var);
			// display_year = allYears.indexOf(display_var);
			generateVis();
		}
		else{
			console.log("False case");
			alert("Enter year between: 1910, 1920, 1930, 1940, 1950 and 2016");
		}
	});
	$("#playPause").click(function() {
		if($("#playPause").text() == "Play"){
			console.log('play')
			$("#playPause").text("Pause");
			// if(display_year < 1950 || display_year > 2015)
			if(yearIndex > 71)
			{
				// display_year = 1950;
				yearIndex = 0;
				display_year = allYears[yearIndex];
			}
				generateVis();
				yearInterval = setInterval(function() {
					// display_year = display_year + 1;
					display_year = allYears[yearIndex];
					yearIndex = yearIndex + 1;
					// if(display_year > 2015){
					if(yearIndex > 71){
						$("#playPause").text("Play");
						clearInterval(yearInterval);
					}
					generateVis();

					if(yearIndex > 71){
						yearIndex = 0;
						display_year = allYears[yearIndex];
					}

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