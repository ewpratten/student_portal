// Here is the API spec for this file: https://github.com/Ewpratten/tvdsb-student-api#timetable

function generateSemesterTable(semester, rows) {
  // Create a header / identifier
  var semstr = "<br><h3 class='restrictedwidth'>Semester " + semester + "</h3>";

  // Create table head
  var thead =
    "<table class='table restrictedwidth'>\
            <thead class='thead-light'>\
                <tr>\
                    <th scope='col'>Course Code</th>\
                    <th scope='col'>Period</th>\
                    <th scope='col'>Time</th>\
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

function generateCourseRow(code, period, start, end) {
  return (
    "<tr><th scope='row'>" +
    code +
    "</th><td>" +
    period +
    "</td><td>" +
    start +
    "-" +
    end +
    "</td></tr>"
  );
}

function generateEntireSemester(semester, data) {
  var rows = [];

  data.forEach((clazz) => {
    rows.push(
      generateCourseRow(
        clazz.course_code,
        clazz.period,
        clazz.start_time,
        clazz.end_time
      )
    );
  });

  return generateSemesterTable(semester, rows);
}

function getTimetable(callback) {
  // Make info call
  const Http = new XMLHttpRequest();
  const url = API_ENDPOINT + "/tvdsb/student/timetable";
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
