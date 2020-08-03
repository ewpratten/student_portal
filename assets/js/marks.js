// Here is the API spec for this file: https://github.com/Ewpratten/tvdsb-student-api#marks

function generateYearTable(semester, rows) {
  // Create a header / identifier
  var semstr = "<br><h3>Year: " + semester + "</h3>";

  // Create table head
  var thead =
    "<table class='table'>\
              <thead class='thead-light'>\
                  <tr>\
                      <th scope='col'>Date</th>\
                      <th scope='col'>Course Code</th>\
                      <th scope='col'>Mark</th>\
                      <th scope='col'>Comment</th>\
                       </tr></thead><tbody>";
  // Create table foot
  var tfoot = "</tbody></table>";

  // Fill in table body
  var tbody = "";

  rows.forEach((row) => {
    tbody += row;
  });

  return semstr + thead + tbody + tfoot;
}

function generateCourseRow(date, code, mark, comment) {
  return (
    "<tr><th scope='row'>" +
    date +
    "</th><td>" +
    code +
    "</td><td>" +
    mark +
    "%</td><td>" +
    comment +
    "</td></tr>"
  );
}

function generateEntireYear(year, data) {
  var rows = [];

  data.forEach((clazz) => {
    rows.push(
      generateCourseRow(clazz.date, clazz.course, clazz.mark, clazz.comment)
    );
  });

  return generateYearTable(year, rows);
}

function getMarks(callback) {
  // Make info call
  const Http = new XMLHttpRequest();
  const url = API_ENDPOINT + "/tvdsb/student/marks";
  Http.open("GET", url);
  Http.setRequestHeader("Authorization", "Basic " + getCookie("auth_token_2"));
  Http.send();

  // Handle response
  Http.onreadystatechange = (e) => {
    // Get response data
    var response = JSON.parse(Http.response);

    // Call callback
    callback(response);
  };
}
