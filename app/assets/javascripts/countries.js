//what happens when dropdown form is submitted (which will be when page loads) - to populate dropdown
$(document).on('submit', '#dropdown_form', function() {
  $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data) {
        var countries = data['countries'];
        var country_list = "";
        for(x in countries) {
          country_list += "<option>" + countries[x]['name'] + "</option>";
        }
        $('#dropdown').append(country_list);
      },
      "json"
  );
  return false;
});

//submit form to populate dropdown (happens right away on page load)
$('#dropdown_form').submit();

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
            "<img src='assets/images/flags/" + data['country_info']['name'] + ".png' onerror=" + unknown + ">" +
            "<p>Country: " + data['country_info']['name'] + "</p>" +
            "<p>Continent: " + data['country_info']['continent'] + "</p>" +
            "<p>Region: " + data['country_info']['region'] + "</p>" +
            "<p>Population: " + data['country_info']['population'] + "</p>" +
            "<p>Life Expectancy: " + data['country_info']['lifeexpectancy'] + "</p>" +
            "<p>Government Form: " + data['country_info']['governmentform'] + "</p>");
      },
      "json"
  );
  return false;
});

//country form submits when dropdown option is changed
$(document).on('change', '#dropdown', function() {
  $('#country_form').submit();
});
