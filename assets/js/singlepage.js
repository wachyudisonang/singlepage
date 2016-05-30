var swapiModule = function(){};

swapiModule.prototype = {

	iteratorFirstLoad: 1,
	iteratorPeople: 1,
	iteratorPlanets: 1,
	iteratorStarships: 1,

	initFirstLoad: function(callback) {

		this.swapi(null, "people");
		this.swapi(null, "planets");
		this.swapi(null, "starships");
		this.iteratorFirstLoad = this.iteratorFirstLoad - 2;

		//if a callback function is sent, run it
		if(callback && typeof callback === "function") {
			callback();
		} 
	},

	initPeople: function(callback) {
		this.swapi(null, "people");
		if(callback && typeof callback === "function") {
			callback();
		} 
	},

	initPlanets: function(callback) {
		this.swapi(null, "planets");
		if(callback && typeof callback === "function") {
			callback();
		} 
	},
			
	initStarships: function(callback) {
		this.swapi(null, "starships");
		if(callback && typeof callback === "function") {
			callback();
		} 
	},

	swapi: function(callback, swapiObj) {
		
		// show the loading image
		var loading = ["loader", "overlay"];
		for (var i = 0; i < loading.length; i++) {
			document.getElementById(loading[i]).style.display = "block";
		}

		var self = this;
		var swPage = self.iteratorFirstLoad;

		if (swapiObj == "people") {
			swPage = self.iteratorPeople;
		} else if (swapiObj == "planets") {
			swPage = self.iteratorPlanets;
		}
		if (swapiObj == "starships") {
			swPage = self.iteratorStarships;
		}

		var xhr = new XMLHttpRequest();
		xhr.open("GET", encodeURI("http://swapi.co/api/"+swapiObj+"?page="+swPage+"&format=json"));
		xhr.onload = function(response) {

			// success
			if (xhr.readyState == 4 && xhr.status == 200) {
				self.parseSwapi(JSON.parse(xhr.responseText), swapiObj, swPage);

				if (swapiObj == "people") {
					self.iteratorPeople++;
					// console.log("iteratorPeople: " + self.iteratorPeople);
				}
				if (swapiObj == "planets") {
					self.iteratorPlanets++;
					// console.log("iteratorPlanets: " + self.iteratorPlanets);
				}
				if (swapiObj == "starships") {
					self.iteratorStarships++;
					// console.log("iteratorStarships: " + self.iteratorStarships);
				} else {
					self.iteratorFirstLoad++;
				}

			// fail
			} else {
					// console.log(response);
					alert('Request failed '+xhr.status+'\n\nSorry, ' +swapiObj+ ' not found\nPlease try again.' );
			}

			// hide the loading image
			for (var i = 0; i < loading.length; i++) {
				document.getElementById(loading[i]).style.display = "none";
			}
			document.getElementById(swapiObj).focus();

		};
		xhr.send();
		
		//if a callback function is sent, run it
		if(callback && typeof callback === "function") {
			callback();
		}
	},

	parseSwapi: function(response, swapiObj, swPage) {
		var resultArray = response.results;
		// console.log(resultArray);

		var i = 0;
		var num = swPage * 10 - 9;

		resultArray.forEach(function() {

			// prevent it from adding the same person twice
			var el = document.getElementById('val-'+swapiObj),
					elChild = document.createElement('div');

			if (swapiObj == "people") {
				if( !document.querySelectorAll('[data-info="'+ resultArray[i].name.toLowerCase() +'"]').length) {
						elChild.innerHTML = '<div class="col-md-3"><div class="list-wrapper"><div class="content" data-info="' + resultArray[i].name.toLowerCase() + '"><h3 class="name">' + num + ". " +resultArray[i].name + '</h3><p>Height: ' + resultArray[i].height + ' cm</p><p>Weight: ' + resultArray[i].mass + ' kg</p><p>Eyes: ' + resultArray[i].eye_color + '</p><p>Hair: ' + resultArray[i].hair_color + '</p></div></div></div>';
						el.appendChild(elChild);
					// i++;
				} 
			}
			if (swapiObj == "planets") {
				if( !document.querySelectorAll('[data-info="'+ resultArray[i].name.toLowerCase() +'"]').length) {
						elChild.innerHTML = '<div class="col-md-3"><div class="list-wrapper"><div class="content" data-info="' + resultArray[i].name.toLowerCase() + '"><h3 class="name">' + num + ". " +resultArray[i].name + '</h3><p>Diameter: ' + resultArray[i].diameter + '</p><p>Climate: ' + resultArray[i].climate + '</p><p>Gravity: ' + resultArray[i].gravity + '</p><p>Population: ' + resultArray[i].population + '</p></div></div></div>';
						el.appendChild(elChild);
					// i++;
				} 
			}
			if (swapiObj == "starships") {
				if( !document.querySelectorAll('[data-info="'+ resultArray[i].name.toLowerCase() +'"]').length) {
						elChild.innerHTML = '<div class="col-md-3"><div class="list-wrapper"><div class="content" data-info="' + resultArray[i].name.toLowerCase() + '"><h3 class="name">' + num + ". " +resultArray[i].name + '</h3><p>Model: ' + resultArray[i].model + '</p><p>Length: ' + resultArray[i].length + '</p><p>Crew: ' + resultArray[i].crew + '</p><p>Passengers: ' + resultArray[i].passengers + '</p></div></div></div>';
						el.appendChild(elChild);
					// i++;
				} 
			}
			i++;
			num++;

		})
	}
}

function TopscrollTo() {
	if(window.scrollY!=0) {
		setTimeout(function() {
			 window.scrollTo(0,window.scrollY-30);
				TopscrollTo();
		}, 10);
	}
}

//initFirstLoad module once
var newSwapi = new swapiModule();
newSwapi.initFirstLoad();

function morePeople() {
	newSwapi.initPeople();
}

function morePlanets() {
	newSwapi.initPlanets();
}

function moreStarships() {
	newSwapi.initStarships();
}

