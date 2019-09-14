
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

        var timeNow = new Date();
        var m = timeNow.getMinutes();
        var h = timeNow.getHours();
        if(h == '0') {h = 24}
        var currentTime = h+"."+m;
        console.log(currentTime)
        var timeStart = snapshot.val().started;
        var time = timeStart.split(":");
        var hour = time[0];
        var min = time[1];
        
        var inputTime = hour+"."+min;
        var totalTime = currentTime - inputTime;
        var times = snapshot.val().frequenucy;
        var divide = totalTime / times;
        var nextTime = times - divide;
        var nextShip = Number(currentTime) + nextTime
        
        console.log(nextTime)
        // next arrival time
        // $("<td>").text(h+":"+m)
        // .appendTo(newRow);
        
        console.log(nextShip)

        $("<td>").text(moment().diff(moment(snapshot.val().started)));
        // .appendTo(newRow);
    }, function(errorObject) {
        console.log("error with " + errorObject.code);
    });
};