(function($) {
  var URL = 'https://xp88goliw6.execute-api.us-east-1.amazonaws.com/prod/contact_form'
  var $contactForm = $('#contact-form');
  var $fields = $contactForm.find('input,textarea,button');
  $('#contact-form').submit(function (event) {
    event.preventDefault();
    $fields.prop('disabled',true);
    $contactForm.find('.alert').remove();
    var data = {
      'name': $contactForm.find('[name=name]').val(),
      'email': $contactForm.find('[name=email]').val(),
      'description': $contactForm.find('[name=message]').val()
    };
    $.ajax({
      type: 'POST',
      url: URL,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function () {
        $contactForm.replaceWith('<div class="alert alert-success" role="alert">Thank you for reaching out! I will be in touch soon.</div>');
      },
      error: function () {
        $fields.prop('disabled',false);
        $contactForm.find('*').first().before('<div class="alert alert-danger" role="alert">There was an error submitting your request. Please try again shortly.</div>');
      }
    })
  });
})(jQuery);
