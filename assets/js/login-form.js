$(function onReady () {

  $('#login').submit(function whenFormIsSubmitted (e) {
    var $form = $(e.currentTarget);

    var parameters = {
      email: $form.find('input[name="email"]').val(),
      password: $form.find('input[name="password"]').val()
    };

    // formerly:
    // <form method="POST" action="/login">
    $.post('/login', parameters, function whenServerResponds(responseData){
      console.log('Server responded with...',responseData);
    });

    // Prevents default browser form behavior
    e.preventDefault();
    return false;

  });

});
