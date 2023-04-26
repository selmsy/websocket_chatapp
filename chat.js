
//Functionalities
$(function () {
    $(".button-open").hide();
    $(".button-close").bind("click", function () {
      $(".box").hide(100);        
  
      if ($(this).attr("class") == "button-close")
      {
        $(".button-open").show();
      }
    });
  });
  
  $(".button-open").bind("click", function () {
      $(".box").show(100);        
      if ($(this).attr("class") == "button-open")
      {
        $(".button-open").hide();
      }
    });