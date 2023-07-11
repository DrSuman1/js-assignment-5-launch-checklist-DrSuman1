// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let destinationPlanet = document.getElementById("missionTarget");
   destinationPlanet.innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
   
}

function validateInput(testInput) {
    if(testInput === "") {
        return "Empty"; 
     } else if(isNaN(Number(testInput)) == true){
         return "Not a Number";
     } else {
         return "Is a Number";
     }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let launchStatus = document.getElementById("launchStatus");
    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
    } else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Enter correct input type!");
    } else{
            list.style.visibility = "visible";
        let pilotStatus = document.getElementById("pilotStatus");
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        let copilotStatus = document.getElementById("copilotStatus");
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        let fuelStatus = document.getElementById("fuelStatus");
            fuelStatus.innerHTML =  "Fuel level high enough for launch";
        let cargoStatus = document.getElementById("cargoStatus");
            cargoStatus.innerHTML =  "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
                    launchStatus.style.color = "rgb(65, 159, 106)"; 
        if(fuelLevel < 10000) {
            list.style.visibility = "visible";
            //let launchStatus = document.getElementById("launchStatus");
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "rgb(199, 37, 78)";
            fuelStatus.innerHTML =  "Fuel level too low for launch";
            }
        
        if(cargoLevel > 10000) {
            list.style.visibility = "visible";
            //let launchStatus = document.getElementById("launchStatus");
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "rgb(199, 37, 78)";
            cargoStatus.innerHTML =  "Cargo mass too heavy for launch";
            }
           
    }
   
   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });//.catch((error) => console.log(error));

    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    return planets[planetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
