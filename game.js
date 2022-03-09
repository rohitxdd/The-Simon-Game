// pattern for user 
var userChosenPattern = [];
var length = 0;

// Array for randomly generated pattern
var gamePattern = [];

var buttonColors = ["green", "red", "blue", "yellow"];



function nextSquence(){
    userChosenPattern = [];
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
    level++;
    $("h1").text("Level "+level);
}

// Detecting userInput 

$(".bt").on("click", function(event){
    var userChosenColor = event.target.id;
    userChosenPattern.push(userChosenColor);
    var btnAudio = new Audio("sounds/"+userChosenColor+".mp3");
    btnAudio.play();
    animatePress(this);
    length = userChosenPattern.length-1;
    checkAnswer(length);
    console.log(userChosenPattern);
})

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(()=>$(currentColor).removeClass("pressed"), 100);
}



// To keep track of game level 
var level = 0;

// Detecting key press to start Game 

$(".btn").click(start);
var started = false;
function start(){
    if (!started){
        nextSquence();
        started = true;
    }
    $(".btn").addClass("hidden");
}

// To Check answer 
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userChosenPattern[currentLevel]){
        console.log("success");
        if(userChosenPattern.length === gamePattern.length){
            setTimeout(nextSquence ,1000);
        }
    }else if(started){
        $("body").addClass("game-over");
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        setTimeout(()=>$("body").removeClass("game-over"),200);
        $("h1").text("Game Over");
        $(".btn").removeClass("hidden");
        $(".btn").text("try again");
        started = false;
        level = 0;
        gamePattern = [];
    }
}



