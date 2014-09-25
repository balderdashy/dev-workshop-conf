$(function onReady () {


  ////////////////////////////////////////////////////////
  // Handle click of our logout button
  ////////////////////////////////////////////////////////

  $('#logout').click(function () {
    $.post('/logout', function serverSaidOK(responseData) {
      // Redirect to login page
      window.location = '/login';
    });
  });


  ////////////////////////////////////////////////////////
  // Handle submission of login form
  ////////////////////////////////////////////////////////

  $('#login').submit(function whenFormIsSubmitted (e) {
    var $form = $(e.currentTarget);

    var parameters = {
      email: $form.find('input[name="email"]').val(),
      password: $form.find('input[name="password"]').val()
    };

    // Show loading spinner
    // .......

    // formerly:
    // <form method="POST" action="/login">
    $.post('/login', parameters, function serverSaidOK(responseData) {
      console.log('Server responded with...',responseData);

      // Go to the home page
      window.location = '/';
    })
    .fail(function serverSaidNuhUh() {
      alert('invalid username/password combination');
    })
    .always(function (){
      // Hide loading spinner
      // .......
    });

    // Prevents default browser form behavior
    e.preventDefault();
    return false;

  });

});
