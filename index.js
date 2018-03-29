"use strict"

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrX4F9_fyKPyawW_3uDQG7LUwdR2oeD18",
    authDomain: "class-project-67949.firebaseapp.com",
    databaseURL: "https://class-project-67949.firebaseio.com",
    projectId: "class-project-67949",
    storageBucket: "class-project-67949.appspot.com",
    messagingSenderId: "1023344180543"
};

firebase.initializeApp(config);

// Create a variable to reference the database
let database = firebase.database();

$(".btn").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    let trainName = $("#name").val().trim();
    let trainDest = $("#destination").val();
    let trainTime = $("#train-time").val().trim();
    let trainFreq = $("#freq").val().trim();

    // Creates local "temporary" object for holding employee data
    let newTrain = {
        tname: trainName,
        tdest: trainDest,
        tstart: trainTime,
        tfreq: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#freq").val("");

});

// Upon receiving a new entry, output the data to the database

database.ref().on("child_added", function (contents) {

    // Retrieve current time
    let now = moment();
    let currentTime = now.format("H:mm")
    $("#current-time").text(`Current time: ${currentTime}`);

    // Place items retrieved by firebase into variables
    let trainName = contents.val().tname;
    let trainDest = contents.val().tdest;
    let trainTime = contents.val().tstart;
    let trainFreq = contents.val().tfreq;

    //change time between trains to an number, and the output into hours and minutes
    let freqNumber = parseInt(trainFreq, 10);
    let outputFreq = minToHourAndMin(freqNumber);

    //calculate next arrival

    //make the strings into numbers
    let minutesAway = 0;
    let firstTrainTime = moment.duration(trainTime).asMinutes();
    let timeNow = moment.duration(currentTime).asMinutes();

    console.log("timeNow ", timeNow);
    console.log("originalfirstTrainTime ", firstTrainTime);

    if (timeNow <= firstTrainTime) {
        minutesAway = firstTrainTime - timeNow;
    } else {
        while (timeNow > firstTrainTime) {
            firstTrainTime = firstTrainTime + freqNumber;
        }
        minutesAway = firstTrainTime - timeNow;
    };

    console.log("firstTrainTime ", firstTrainTime);
    console.log("minutesAway ", minutesAway);

// at this point, firstTrainTime IS the next arrival and minutesAway is minutes away
// need to reformat them so that we can output them

    //change minutes away to minutes and hours
    let minAway = minToHourAndMin(minutesAway);

    //change next arrival time to hh:mm
    let nextArrival = getTimeFromMins(firstTrainTime);
    console.log("nextArrival ", nextArrival);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        outputFreq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

});


// convert minutes to hours and minutes

function minToHourAndMin (numMinutes){
    let string = "";
    let hourString = "";
    let hours = Math.floor(numMinutes/60);

    if (hours === 0) { 
        hourString = ""
    } else {
        hourString = hours.toString() + "h";
    };
    let minutes = numMinutes % 60;
    string = hourString + minutes.toString() + "m";
    return string;
}

function getTimeFromMins(min) {
    let string = "";
    let h = Math.floor(min / 60);
    let m = min % 60;
    let ampm = "am"
    if (h > 12 && h < 24){
        h = h - 12;
        ampm = "pm";
    }
    if (h === 24) {
        h = h - 12
    }
    let hrs = h.toString();
    let mins = m.toString();
    if (m < 10 ) {
        mins = "0" + mins;
    }
    string = hrs + ":" + mins + ampm;
    console.log ("string ", string)
    return string;
};

var newTime = moment.duration("23:59").asMinutes();
console.log("23:59 as minutes ", newTime);

