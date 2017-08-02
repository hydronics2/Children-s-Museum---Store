


$(document).ready(function() {
  var number = "";
  var numberTwo = "";
  var selectedOperator = "";
  var result = $("#display");


  // clear display
  $('.clear').click(function() {
    number = "";
    numberTwo = "";
    selectedOperator = "";
    $('#display').text("0");
  })

    //sloppy +/- change
    function signChange(){
      number *= -1;
      $('#display').text(number);
      console.log("signchange: "+ number);

    }
  //var pnsignClick = document.getElementById("pnsign");
  //pnsignClick.addEventListener("click", signChange);


  //enter numbers and decimal
  $('.number').click(function() {
    number += $(this).text();
    $('#display').text(number);
    console.log(number);
    if(number == 1){
      var audioUrl = "audio/one.mp3";
      var audio = new Audio(audioUrl);
      audio.play();
    }
    if(number == 2){
      var audioUrl = "audio/two.mp3";
      var audio = new Audio(audioUrl);
      audio.play();
    }
    if(number == 3){
      var audioUrl = "audio/three.mp3";
      var audio = new Audio(audioUrl);
      audio.play();
    }
  })

  $(".operator").not("#eval").click(function() {
    selectedOperator = $(this).text();
    numberTwo = number;
    number = "";
    console.log("op:"+selectedOperator);
    console.log("2:"+numberTwo);
    console.log("1:"+number);
    //result.text("");
  });

  //do the operation
  $('#eval').click(function() {

    if (selectedOperator === "+") {
      number = (parseFloat(numberTwo) + parseFloat(number));
    } else if (selectedOperator === "-") {
      number = (parseFloat(numberTwo) - parseFloat(number));
    }
    result.text(number);
    number = "";
    numberTwo = "";

  })

});
