var firebaseConfig = {
    apiKey: "AIzaSyA89lflMaa0TOnON-QHii8FP0biY8V_KCE",
    authDomain: "fir-demo-ce9d0.firebaseapp.com",
    databaseURL: "https://fir-demo-ce9d0.firebaseio.com",
    projectId: "fir-demo-ce9d0",
    storageBucket: "fir-demo-ce9d0.appspot.com",
    messagingSenderId: "838408487017",
    appId: "1:838408487017:web:76ca413239b22e1278a2f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var player = 0;
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var playerOneChoice = "0";
var playerTwoChoice = "0";
var p1wins = 0;
var p1losses = 0;
var p1ties = 0;
var p2wins = 0;
var p2losses = 0;
var p2ties = 0;
var selected;
$("#setPlayer").on("click", function () {
    player = $(this).attr("data-player");
    player = ("/" + player);
    console.log(player);
    database.ref("/one").on("value", function(snapshot){
        if(snapshot.val().player != "one"){

            selected = "one";
            database.ref("/one").set({
                player: selected
            });
            database.ref(player).on("value", function (snapshot) {
                p1wins = snapshot.val().wins;
                p1losses = snapshot.val().losses;
                p1ties = snapshot.val().ties;
                $("#win").text("Wins: " + snapshot.val().wins + " Losses: " + snapshot.val().losses + " Ties: " + snapshot.val().ties);
            });
        }else{
            console.log(snapshot.val().player);
        }
    });
    
});
$("#setPlayer2").on("click", function () {
    player = $(this).attr("data-player");
    player = ("/" + player);
    console.log(player);
    database.ref(player).on("value", function (snapshot) {
        p2wins = snapshot.val().wins;
        p2losses = snapshot.val().losses;
        p2ties = snapshot.val().ties;
        $("#win").text("Wins: " + snapshot.val().wins + " Losses: " + snapshot.val().losses + " Ties: " + snapshot.val().ties);
    });
});

connectedRef.on("value", function (snap) {
    if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});

connectionsRef.on("value", function (snapshot) {
    $("#watchers").text(snapshot.numChildren());
});

connectionsRef.on("value", function (snapshot) {
    if (snapshot.numChildren() === 2) {

    }
});

$("#something").on("click",function(){
    database.ref("/player-One").set({
        wins: 0,
        losses: 0,
        ties: 0
    })
    database.ref("/player-Two").set({
        wins: 0,
        losses: 0,
        ties: 0
    })
    database.ref("/one").set({
        plater:0
    });
});



$("#rps1").on("click", function () {
    if (player === 0) {
        alert("select a player");
    } else {
        var playerChoice = $(this).attr("data-choice");
        database.ref(player).on("value", function (snapshot) {
            playerOne = snapshot.val().picked;
            console.log(playerOne);

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        if (player === "/player-One") {
            database.ref(player + "/picked").set({
                picked: playerChoice,
            })
        } else if (player === "/player-Two") {
            database.ref(player + "/picked").set({
                picked: playerChoice,
            })
        }

    }


});
$("#rps2").on("click", function () {
    if (player === 0) {
        alert("select a player");
    } else {
        var playerChoice = $(this).attr("data-choice");
        database.ref(player).on("value", function (snapshot) {
            playerOne = snapshot.val().picked;
            console.log(playerOne);

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        if (player === "/player-One") {
            database.ref(player + "/picked").set({
                picked: playerChoice,
            })
        } else if (player === "/player-Two") {
            database.ref(player + "/picked").set({
                picked: playerChoice,
            })
        }
    }


});
$("#rps3").on("click", function () {
    if (player === 0) {
        alert("select a player");
    } else {
        var playerChoice = $(this).attr("data-choice");
        database.ref(player).on("value", function (snapshot) {
            playerOne = snapshot.val().picked;
            console.log(playerOne);

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        if (player === "/player-One") {
            database.ref(player + "/picked").set({
                picked: playerChoice,
            })
        } else if (player === "/player-Two") {
            database.ref(player + "/picked").set({
                picked: playerChoice,
            })
        }
    }


});
database.ref("/player-One/picked").on("value", function (snapshot) {
    playerOneChoice = snapshot.val().picked;
});
database.ref("/player-Two/picked").on("value", function (p2) {
    playerTwoChoice = p2.val().picked;
});


setInterval(function(){
    console.log("hello");

    console.log(playerOneChoice);
    console.log(playerTwoChoice);




if ((playerOneChoice === "r" && playerTwoChoice === "s" )||( playerOneChoice === "p" && playerTwoChoice === "r" )||( playerOneChoice === "s" && playerTwoChoice === "p")) {
    console.log("wins");
    $("#you").text("Player One: " + playerOneChoice);
    $("#other").text("Player Two: " + playerTwoChoice);
    playerOneChoice = "0";
    playerTwoChoice = "0";
    p1wins++
    p2losses++

    database.ref("/player-One").set({
        wins: p1wins,
        losses: p1losses,
        ties: p1ties
    })
    database.ref("/player-Two").set({
        wins: p2wins,
        losses: p2losses,
        ties: p2ties
    })
} else if (playerOneChoice === playerTwoChoice && playerTwoChoice != "0") {
    console.log("tie");
    $("#you").text("Player One: " + playerOneChoice);
    $("#other").text("Player Two: " + playerTwoChoice);
    playerOneChoice = "0";
    playerTwoChoice = "0";
    p1ties++
    p2ties++

    database.ref("/player-One").set({
        wins: p1wins,
        losses: p1losses,
        ties: p1ties
    })
    database.ref("/player-Two").set({
        wins: p2wins,
        losses: p2losses,
        ties: p2ties
    })
} else if(playerOneChoice != "0" && playerTwoChoice != "0"){
    console.log("player two wins");
    $("#you").text("Player One: " + playerOneChoice);
    $("#other").text("Player Two: " + playerTwoChoice);
    playerOneChoice = "0";
    playerTwoChoice = "0";
    p1losses++
    p2wins++

    database.ref("/player-One").set({
        wins: p1wins,
        losses: p1losses,
        ties: p1ties
    })
    database.ref("/player-Two").set({
        wins: p2wins,
        losses: p2losses,
        ties: p2ties
    })
}

},1000);


$("#submit").on("click", function(event){
    var name = $("#name").val().trim();
    var message = $("#message").val().trim();
    database.ref("/conversation").push({
        name,message
    });
});
database.ref("/conversation").on("child_added",function(snapshot){
    $("#conversation").append($("<p>").text(snapshot.val().name + ": " + snapshot.val().message))
},
function(error){

});