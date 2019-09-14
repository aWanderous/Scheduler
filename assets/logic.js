
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

    $("#newShips")[0].reset();

}
});

// time
setInterval(function clock(){ 
$("#time").html("Current time: " + moment().format("HH:mm:ss"))
}, 1000);

$(document).ready(function(){
    
    renderInfo();
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

        var firstTimeConverted = moment(snapshot.val().started, "hh:mm").subtract(1, "years");

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % snapshot.val().frequenucy;
        var minutesAway = snapshot.val().frequenucy - tRemainder;
        var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

        // next arrival time
        $("<td>").text(nextArrival)
        .appendTo(newRow);
        
        // minutes away
        $("<td>").text(minutesAway)
        .appendTo(newRow);
    }, function(errorObject) {
        console.log("error with " + errorObject.code);
    });
};