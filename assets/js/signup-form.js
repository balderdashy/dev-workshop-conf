$(function onReady () {


  ////////////////////////////////////////////////////////
  // Handle submission of signup form
  ////////////////////////////////////////////////////////

  $('#signup').submit(function whenFormIsSubmitted (e) {
    var $form = $(e.currentTarget);

    // Show loading spinner
    // .......

    // formerly:
    // <form method="POST" action="/signup">
    $.post('/signup', {
      email: $form.find('input[name="email"]').val(),
      password: $form.find('input[name="password"]').val(),
      name: $form.find('input[name="name"]').val()
    }, function serverSaidOK(responseData) {
      console.log('Server responded with...',responseData);

      // Go to the home page
      window.location = '/';
    })
    .fail(function serverSaidNuhUh(responseError) {
      console.error('The server said ERROR:',responseError);
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
