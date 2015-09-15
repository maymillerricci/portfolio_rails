//what happens when country form is submitted
$(document).on('submit', '#country_form', function() {
  $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data) {
        $('#country_info').html(
            "<h2>Country Information</h2>" +
            "<img src='" + data.asset_path + "' alt='" + data.name + " flag'>" +
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
