var yearInterval="",africaColor="#00D5E9",asiaColor="#FF5872",australiaColor="#2E86C1",cenAmeColor="#16A085",europeColor="#E67E22",norAmeColor="#7E5109",oceanicColor="#922B21",souAmeColor="#A569BD",colorFlag=1,allYears=[1900,1910,1920,1930,1940,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016],yearIndex=0;$(document).ready(function(){function t(t){return t.Year==u}function a(){return d3.axisBottom().scale(f).tickValues([0,500,1e3,2e3,4e3,8e3,16e3,32e3,64e3,128e3,256e3])}function e(){return d3.axisLeft().scale(p).tickValues([20,30,40,50,60,70,80])}function r(){var a=dataset.filter(t),e=d.selectAll("circle").data(a,function(t){return t.Country});e.transition().duration(300).ease(d3.easeBounce).attr("cx",function(t){return f(t.GDP)}).attr("cy",function(t){return p(t.LifeExp)}).attr("r",function(t){return 1.25*m(t.Population)}).style("stroke","black").style("fill",function(t){var a=t.Region;return"Africa"==a?africaColor:"Asia"==a?asiaColor:"Australia"==a?australiaColor:"Central America"==a?cenAmeColor:"Europe"==a?europeColor:"North America"==a?norAmeColor:"Oceanic"==a?oceanicColor:"South America"==a?souAmeColor:void 0}),e.enter().append("circle").attr("cx",function(t){return f(t.GDP)}).attr("cy",function(t){return p(t.LifeExp)}).attr("r",function(t){return m(t.Population)}).on("mouseover",function(t){x.transition().duration(200).style("opacity",.9),x.html(t.Country+"<br/>Ïncome:"+t.GDP+"<br/> Life Expectency:"+t.LifeExp).style("left",f(t.GDP)+"px").style("top",p(t.LifeExp)+"px")}).on("mouseout",function(t){x.transition().duration(500).style("opacity",0)}).style("stroke","black").style("fill",function(t){var a=t.Region;return"Africa"==a?africaColor:"Asia"==a?asiaColor:"Australia"==a?australiaColor:"Central America"==a?cenAmeColor:"Europe"==a?europeColor:"North America"==a?norAmeColor:"Oceanic"==a?oceanicColor:"South America"==a?souAmeColor:void 0}),e.exit().remove(),d3.select("#year_header").text("Year: "+u),d3.select("#yearText").text(u),n(a),o(a)}function n(t){var a=d3.nest().key(function(t){return t.Region}).rollup(function(t){return d3.sum(t,function(t){return 1})}).entries(t),e=g.selectAll("rect").data(a,function(t){return t.Region});e.append("rect").attr("x",1).attr("y",function(t){return v(t.key)}).attr("height",v.bandwidth()-2).attr("width",function(t){return h(+t.value)}).attr("fill","blue"),e.enter().append("rect").attr("x",1).attr("y",function(t){return v(t.key)}).attr("height",v.bandwidth()-2).attr("width",function(t){return h(+t.value)}).attr("fill","blue"),e.exit().remove()}function o(t){var a=d3.nest().key(function(t){return t.Government}).rollup(function(t){return d3.sum(t,function(t){return 1})}).entries(t),e=E.selectAll("rect").data(a,function(t){return t.Government});e.append("rect").attr("x",1).attr("y",function(t){return b(t.key)}).attr("height",b.bandwidth()-2).attr("width",function(t){return P(+t.value)}).attr("fill","blue"),e.enter().append("rect").attr("x",1).attr("y",function(t){return b(t.key)}).attr("height",b.bandwidth()-2).attr("width",function(t){return P(+t.value)}).attr("fill","blue"),e.exit().remove()}function l(){0==colorFlag?(africaColor="#00D5E9",asiaColor="#FF5872",australiaColor="#2E86C1",cenAmeColor="#16A085",europeColor="#E67E22",norAmeColor="#7E5109",oceanicColor="#922B21",souAmeColor="#A569BD",colorFlag=1,r(),$("#colorChange").text("Colorblind Friendly")):(africaColor="#66C2A5",asiaColor="#FC8D62",australiaColor="#8DA0CB",cenAmeColor="#E78AC3",europeColor="#A6D854",norAmeColor="#FFD92F",oceanicColor="#E5C494",souAmeColor="#B3B3B3",colorFlag=0,r(),$("#colorChange").text("Normal Colors"))}var i={top:10,right:10,bottom:40,left:25},c=900-i.left-i.right,s=500-i.top-i.bottom,u=allYears[0],d=d3.select("#mainCanvas").append("svg").attr("width",c+i.left+i.right).attr("height",s+i.top+i.bottom).append("g").attr("transform","translate(40,10)"),p=d3.scaleLinear().range([s,0]),f=d3.scaleLinear().rangeRound([0,80,160,240,320,400,480,560,640,720,800]).domain([0,500,1e3,2e3,4e3,8e3,16e3,32e3,64e3,128e3,256e3]),m=d3.scaleLinear().range([1,25]),y=d3.axisLeft().scale(p).tickValues([20,30,40,50,60,70,80]),C=d3.axisBottom().scale(f).ticks(5).tickFormat(function(t){return t/1e3>=1&&(t=t/1e3+"K"),t}).tickValues([0,500,1e3,2e3,4e3,8e3,16e3,32e3,64e3,128e3,256e3]),x=d3.select("body").append("div").attr("class","tooltip").style("opacity",0),g=d3.select("#rightCanvasOne").append("svg").attr("width",350).attr("height",249).append("g").attr("transform","translate(110,10)"),h=d3.scaleLinear().domain([0,55]).range([0,220]),v=d3.scaleBand().range([200,0]),A=d3.axisBottom().scale(h).ticks(5),k=d3.axisLeft().scale(v),E=d3.select("#rightCanvasTwo").append("svg").attr("width",350).attr("height",249).append("g").attr("transform","translate(110,10)"),P=d3.scaleLinear().domain([0,130]).range([0,220]),b=d3.scaleBand().range([200,0]),L=d3.axisBottom().scale(P).ticks(5),D=d3.axisLeft().scale(b);d3.csv("./data/Gapminder_All_Time.csv",function(t,n){if(t)console.log("Something went wrong"),console.log(t);else{console.log("Data Loaded"),dataset=n,dataset.forEach(function(t){t.Year=+t.Year,t.Population=+t.Population,t.LifeExp=+t.LifeExp,t.GDP=+t.GDP,t.Area=+t.Area,t.Coastline=+t.Coastline});d3.max(dataset,function(t){return t.GDP}),d3.max(dataset,function(t){return t.LifeExp});var o=d3.max(dataset,function(t){return t.Population}),l=d3.min(dataset,function(t){return t.Population});p.domain([15,90]),v.domain(dataset.map(function(t){return t.Region})),b.domain(dataset.map(function(t){return t.Government})),m.domain([l,o]),d.append("g").attr("class","grid").attr("id","x-axis").attr("transform","translate(0,"+s+")").style("stroke-dasharray","2 2").call(a().tickSize(-s,0,0).tickFormat("")),d.append("g").attr("class","grid").attr("id","x-axis").attr("transform","translate(0,"+s+")").call(C),d.append("g").attr("class","grid").attr("id","y-axis").style("stroke-dasharray","2 2").call(e().tickSize(-c,0,0).tickFormat("-")),d.append("g").attr("class","grid").attr("id","y-axis").call(y),g.append("g").attr("class","axis").attr("transform","translate(0,200)").call(A),g.append("g").attr("class","axis").call(k),E.append("g").attr("class","axis").attr("transform","translate(0,200)").call(L),E.append("g").attr("class","axis").call(D),r()}}),$("#showData").click(function(){display_var=$("#textYear").val(),display_var=parseInt(display_var),allYears.includes(display_var)?(u=+display_var,yearIndex=allYears.indexOf(display_var),r()):alert("Enter year between: 1910, 1920, 1930, 1940, 1950 and 2016")}),$("#playPause").click(function(){"Play"==$("#playPause").text()?($("#playPause").text("Pause"),yearIndex>71&&(u=allYears[yearIndex=0]),r(),yearInterval=setInterval(function(){u=allYears[yearIndex],(yearIndex+=1)>71&&($("#playPause").text("Play"),clearInterval(yearInterval)),r()},100)):"Pause"==$("#playPause").text()&&($("#playPause").text("Play"),clearInterval(yearInterval))}),$("#colorChange").click(function(){l()})});