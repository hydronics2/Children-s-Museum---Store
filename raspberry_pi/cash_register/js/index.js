
function countUp() {
  var countEl = document.querySelector('.counter');
  var countBar = document.querySelector('.progress-bar');
  var x = 0;

  function clearNum() {

    x = 0;
    countEl.innerHTML = x;
    console.log(x)
  }

  function addNum() {
    x += 1;
    countEl.innerHTML = x;
    console.log(x)
  }
  document.onkeypress=function(e){
    console.log("key pressed");
    console.log(e.keyCode);
    if(e.keyCode == 114){ //keycode for r or reset
      console.log("clearing");
      clearNum();
      var audioUrl = "audio/beep.mp3";
      var audio = new Audio(audioUrl);
      audio.play();
    }
    if(e.keyCode == 97){ //keycode for a or add number
      addNum();
      var audioUrl = "audio/cash_register.mp3";
      var audio = new Audio(audioUrl);
      audio.play();
    }
  }
  document.onclick = function(e){
    console.log("clearing");
    clearNum();
    var audioUrl = "audio/beep.mp3";
    var audio = new Audio(audioUrl);
    audio.play();
  }
}

countUp();
