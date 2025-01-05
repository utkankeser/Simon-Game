var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;


$(document).keydown(function (isFirstTime) {
  if(!started){
    nextSequence();
    started=true;
  }
})


$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);


})


function nextSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);

var  randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);


$("#"+randomChosenColour).fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);//flash effect

playSound(randomChosenColour);





}


function playSound(m) {
  var audio = new Audio("sounds/"+m+".mp3");//audio playing
  audio.play();
}


function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");

  setTimeout(function () {
    $("."+currentColor).removeClass("pressed"); } , 100);
}



function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence(),1000);
    }
  }else {
    $("body").addClass("game-over");

    var audio = new Audio("sounds/wrong.mp3");//audio playing
    audio.play();

    setTimeout(function () {
      $("body").removeClass("game-over"); } , 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();
  }
}



function startOver() {
  level = 0;
  gamePattern = [];
  started=false;

}
