const colors = ["red", "blue", "yellow","green"];

var gamepattern = [];
var userpattern = [];

var started = false;
var level = 0;


$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started = true;
  }

})

$(".btn").click(function(){
  var usercolor = $(this).attr("id");
  userpattern.push(usercolor);

  playSound(usercolor);
  animate(usercolor);

  check(userpattern.length-1);
})

function check(currentlevel){
  if(gamepattern[currentlevel] === userpattern[currentlevel]){
    console.log("success");

    if(userpattern.length === gamepattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("GameOver, Press any key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

function nextSequence(){
  userpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = colors[randomNumber];
  gamepattern.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  }

function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.volume = 0.003;
  audio.play();

}

function animate(curcolor){
$("#" + curcolor).addClass("pressed");
setTimeout(function () {
        $("#" + curcolor).removeClass("pressed");
}, 100);
}

function startOver(){
  level = 0;
  gamepattern = [];
  started = false;
}
