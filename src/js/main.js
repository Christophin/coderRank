import $ from 'jquery'
import GH_TOKEN from './token.js'

var BASE_URL = "https://api.github.com"
var retryCount = 0;


// li a href=user_profile user-name
//    p Username made x number of commits adding y line and deleting z lines of code
function rankingTemplate (user, contributions) {
  return `
    <li>
      <p><a href="${user.html_url}">${user.login}</a> made ${contributions.commits} number of commits
      adding ${contributions.added} lines and deleting
      ${contributions.deleted} lines of code.
      </p>
    </li>
  `;
}


function fetchData()  {
  var user = $("#user-name").val();
  var repo = $("#repo-name").val();

  $.ajax({
    url: `${BASE_URL}/repos/${user}/${repo}/stats/contributors`,
    dataType: "json",
    headers: {
      "Authorization": `token ${GH_TOKEN}`
    },
    success: displayStats
  });
}

function displayStats (data, status, request) {
  if (request.status === 202) {
    var messages = $("messages");
    retryCount++;
    messages.empty();
    messages.append(`<p>This is retry number ${retryCount}.</p>`)
    messages.append("<p>The data for that project is being processed.</p>");
    messages.append("<p>We will resend your request in 60 second</p>");
    setTimeout(function() {fetchData(); }, 60000);
  } else {
    $(".rankings").empty();
    data.forEach(function(rank) {
      var weeks = rank.weeks;
      var totals = {added: 0, deleted: 0, commits: 0}
      weeks.forEach(function(week)  {
        totals.added += week.a;
        totals.deleted += week.d;
        totals.commits += week.c;
      })
      var html = rankingTemplate(rank.author, totals);
      $(".rankings").prepend(html);
    });
  };
}

function getRepoStats (event)  {
  event.preventDefault();
  fetchData();
}

var form = $("form");

form.submit(getRepoStats);
