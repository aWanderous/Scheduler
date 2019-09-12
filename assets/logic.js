
var firebaseConfig = {
    apiKey: "AIzaSyDQ3mdt1BcAlNPbhd1ZlPWsnVV5yctEaEc",
    authDomain: "click-counter-fa4ec.firebaseapp.com",
    databaseURL: "https://click-counter-fa4ec.firebaseio.com",
    projectId: "click-counter-fa4ec",
    storageBucket: "click-counter-fa4ec.appspot.com",
    messagingSenderId: "558313563597",
    appId: "1:558313563597:web:944018767c68a5116c5084"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();



$("button").click(function(event){
    event.preventDefault();
    
    // prevent empty values entered 
    if ($("#name").val() === "" ||
    $("#place").val() === "" ||
    $("#started").val() === "" ||
    $("#rate").val() === "") {
        
        alert("Please fill in all details to add new ship");
        
    } else {
        
    var name = $("#name").val();
    var place = $("#place").val();
    var started = $("#started").val();
    var rate = $("#rate").val();
    
    database.ref().push({
        name: name,
        destination: place,
        started: started,
        frequenucy: rate
    });
}
});

// time
$("#time").html("Current time: " + moment().format("HH:mm:ss"));

setInterval(function clock(){ 
$("#time").html("Current time: " + moment().format("HH:mm:ss"))
}, 1000);

$(document).ready(function(){
    
    renderInfo();
    clock();
});

function renderInfo () {
    $("#info").empty();
    database.ref().on("child_added", function(snapshot){
        var newRow = $("<tr>")
        .appendTo("tbody");
        // ship name
        $("<td>").text(snapshot.val().name)
        .appendTo(newRow);
        // destination
        $("<td>").text(snapshot.val().destination)
        .appendTo(newRow);
        // frequenucy
        $("<td>").text(snapshot.val().frequenucy)
        .appendTo(newRow);
        // next arrival time
        
        // snapshot.val().started returns 00:34
        // then you need to generate a string with the current date
        // concatenate the date + hour
        // moment of the concatenated variable
        console.log(moment(snapshot.val().started));
        var nextShip = moment().diff(moment(snapshot.val().started), "minutes");
        //  % (snapshot.val().frequenucy, "mm"))
        console.log(nextShip)

        // $("<td>").text(.format("HH:mm"))
        // .appendTo(newRow);
        $("<td>").text(moment().diff(moment(snapshot.val().started)));
        // .appendTo(newRow);
    }, function(errorObject) {
        console.log("error with " + errorObject.code);
    });
};