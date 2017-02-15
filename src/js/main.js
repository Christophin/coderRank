import $ from 'jquery'

var BASE_URL = "https://api.github.com"

function getRepoStats (event)  {
  event.preventDefault();

  var user = $("#user-name").val();
  var repo = $("#repo-name").val();

  $.ajax({
    url: `${BASE_URL}/repos/${user}/${repo}/stats/contributors`,
    dataType: "json",
    sucess: function (data) {
      console.log(data);
    }
  });
}

var form = $("form");

form.submit(getRepoStats);
