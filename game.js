var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var gameStarted = false;
var level = 0;


$(document).on("keypress", function() {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);  
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;  
    $("#level-title").text("Level " + level);  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/" +name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        //your code to be executed after 1 second
        $("#"+currentColour).removeClass("pressed");
      }, 100);

}

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       console.log("success");
       if(gamePattern.length === userClickedPattern.length){
           setTimeout(() => {
               nextSequence();
           }, 1000);
       }
   }
   else{
       console.log("wrong");
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();
       $("body").addClass("game-over");
       $("h1").text("Game Over, Press Any Key to Restart");
       setTimeout(() => {
           $("body").removeClass("game-over");
       }, 200);
       startOver();
       
   }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}