import $ from 'jquery'

var BASE_URL = "https://api.github.com"

function getRepoStats (event)  {
  event.preventDefault();

  var user = $("#user-name").val();
  var repo = $("#repo-name").val();

  $.ajax({
    url: `${BASE_URL}/repos/${user}/${repo}/stats/contributors`,
    dataType: "json",
    success: function (data, status, request) {
      if (request.status === 202) {
        //tell user to wait
        //reschedule request on timeout
      } else {
        console.log(data);
      };
    }
  });
}

var form = $("form");

form.submit(getRepoStats);
