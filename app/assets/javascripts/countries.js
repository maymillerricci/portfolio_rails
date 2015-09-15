//what happens when country form is submitted
$(document).on('submit', '#country_form', function() {
  $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data) {
        var unknown = "this.src=''";
        // var unknown = "this.src='assets/images/flags/unknown.png'";
        $('#country_info').html(
            "<h2>Country Information</h2>" +
            //"<img src='assets/images/flags/" + data['country_info']['name'] + ".png' onerror=" + unknown + ">" +
            "<p>Country: " + data.name + "</p>" +
            "<p>Continent: " + data.continent + "</p>" +
            "<p>Region: " + data.subregion + "</p>" +
            "<p>Nationality: " + data.nationality + "</p>" +
            "<p>Currency: " + data.currency + "</p>");
      },
      "json"
  );
  return false;
});

//country form submits when dropdown option is changed
$(document).on('change', '#dropdown', function() {
  $('#country_form').submit();
});
