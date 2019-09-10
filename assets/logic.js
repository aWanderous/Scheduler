
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

var date = new Date();
$("#time").html("Current time: " + date);
    
$("button").click(function(event){
    event.preventDefault();

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
});


$(document).ready(function(){
    
    renderInfo();
});

function renderInfo () {
    $("#info").empty();
    database.ref().on("child_added", function(snapshot){
        var newRow = $("<tr>")
        .appendTo("tbody")
        $("<td>").text(snapshot.val().name)
        .appendTo(newRow);
        $("<td>").text(snapshot.val().destination)
        .appendTo(newRow);
        $("<td>").text(snapshot.val().rate)
        .appendTo(newRow);
        $("<td>").text(moment().diff(moment(snapshot.val().started, "DD/MM/YYYY"), "months"))
        .appendTo(newRow);
        $("<td>").text(snapshot.val().rate * moment().diff(moment(snapshot.val().started, "DD/MM/YYYY"), "months"))
        .appendTo(newRow);
    }, function(errorObject) {
        console.log("error with " + errorObject.code);
    });
};