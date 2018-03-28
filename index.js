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

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
});





// firebase.initializeApp(config);

// // Create a variable to reference the database
// let database = firebase.database();

// $("#add-employee-btn").on("click", function (event) {
//     // This line allows us to take advantage of the HTML "submit" property
//     // This way we can hit enter on the keyboard and it registers the search
//     // (in addition to clicks). Prevents the page from reloading on form submit.
//     event.preventDefault();

//     // Grabs user input
//     let empName = $("#employee-name-input").val().trim();
//     let empRole = $("#role-input").val().trim();
//     let empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
//     let empRate = $("#rate-input").val().trim();

//     // Creates local "temporary" object for holding employee data
//     let newEmp = {
//         name: empName,
//         role: empRole,
//         start: empStart,
//         rate: empRate,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP
//     };

//     // Uploads employee data to the database
//     database.ref().push(newEmp);

//     // Logs everything to console
//     console.log(newEmp.name);
//     console.log(newEmp.role);
//     console.log(newEmp.start);
//     console.log(newEmp.rate);

//     // Alert
//     //  alert("Employee successfully added");

//     // Clears all of the text-boxes
//     $("#employee-name-input").val("");
//     $("#role-input").val("");
//     $("#start-input").val("");
//     $("#rate-input").val("");

// });

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

// //     let sv = snapshot.val();
// //     console.log(snapshot);
// //     console.log(snapshot.val().name);

// database.ref().on("child_added", function (childSnapshot, prevChildKey) {

//     console.log(childSnapshot.val());

//     // Store everything into a variable.
//     var empName = childSnapshot.val().name;
//     var empRole = childSnapshot.val().role;
//     var empStart = childSnapshot.val().start;
//     var empRate = childSnapshot.val().rate;

//     // Employee Info
//     console.log(empName);
//     console.log(empRole);
//     console.log(empStart);
//     console.log(empRate);

//     // Prettify the employee start
//     var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

//     // Calculate the months worked using hardcore math
//     // To calculate the months worked
//     var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//     console.log(empMonths);

//     // Calculate the total billed rate
//     var empBilled = empMonths * empRate;
//     console.log(empBilled);

//     // Add each train's data into the table
//     $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//         empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");


// });