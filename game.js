
var userClickedPattern = [];
var gamePattern = [];
var startGame = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function() {
  if (!startGame){
  level = 0;
  $("#level-title").text("Level"+level);
  nextSequence();
  startGame= true;

}
});
function nextSequence() {
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}


$(".btn").click(function() {
  var userChosenColour =  $(this).attr("id");
  //or alternative var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour){
    $( "#"+currentColour).addClass( "pressed");
    setTimeout(function() {
        $( "#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }


  }else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
  function startOver() {
    level = 0;
    gamePattern = [];
    startGame = false;
  }
