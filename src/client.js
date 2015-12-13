$(document).ready(function(){
  setTimeout(function(){
    // $('#intro-buttons').append('<button data-toggle="modal" data-target="#loginModal" class="intro btn btn-default fadeIn animated" id="login"> Login </button>');
     $('#intro-buttons').append('<button data-toggle="modal" data-target="#startedModal" class="intro btn btn-default fadeIn animated" id="started"> Get Started </button>');

  }, 1100);

  $('#login).click(function(){
    console.log('clicked started!');
  })

});
