// Here is the API spec for this file: https://github.com/Ewpratten/tvdsb-student-api#attendance

function generateAttendanceTable(records) {
  // Create table head
  var thead =
    "<table class='table'>\
              <thead class='thead-light'>\
                  <tr>\
                      <th scope='col'>Date</th>\
                      <th scope='col'>Course Code</th>\
                      <th scope='col'>Period</th>\
                      <th scope='col'>Code</th>\
                      <th scope='col'>Reason</th>\
                       </tr></thead><tbody>";
  // Create table foot
  var tfoot = "</tbody></table>";

  // Fill in table body
  var tbody = "";

  records.forEach((record) => {
    tbody += record;
  });

  return thead + tbody + tfoot;
}

function generateRecordRow(date, course, period, code, reason) {
  return (
    "<tr><th scope='row'>" +
    date +
    "</th><td>" +
    course +
    "</td><td>" +
    period +
    "</td><td>" +
    code +
    "</td><td>" +
    reason +
    "</td></tr>"
  );
}

function getAttendance(callback) {
  // Make info call
  const Http = new XMLHttpRequest();
  const url =
    "https://api.retrylife.ca/tvdsb/student/attendance?token=" +
    getCookie("auth_token");
  Http.open("GET", url);
  Http.send();

  // Handle response
  Http.onreadystatechange = (e) => {
    // Get response data
    var response = JSON.parse(Http.response);

    // Call callback
    callback(response);
  };
}
