function login() {
  // Read username and password
  var username = document.getElementById("sidInput").value;
  var password = document.getElementById("password").value;

  // Enable "waiting for auth" spinner
  var spinner = document.getElementById("waiting_for_auth");
  spinner.classList.remove("hidden");

  // Build form data
  var form = new FormData();
  form.append("username", username);
  form.append("password", password);

  // Make auth call
  const Http = new XMLHttpRequest();
  const url = API_ENDPOINT + "/tvdsb/student/auth";
  Http.open("POST", url);
  Http.send(form);

  // Handle response
  Http.onreadystatechange = (e) => {
    // Get response data
    var response = JSON.parse(Http.response);

    // Handle failed auth
    if (!response.success) {
      // Show the "invalid login" page
      document.getElementById("invalid-login").classList.remove("hidden");

      // Stop the spinner
      spinner.classList.add("hidden");
    } else {
      // Set the cookie
      setCookie("auth_token_2", response.token);

      // Make secondary API call to get student info
      _getStudentInfo();
    }
  };
}

function _getStudentInfo() {
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

    // Store student info
    setCookie("fname", response.timetable.student_info.name[0]);
    setCookie("lname", response.timetable.student_info.name[1]);
    setCookie("grade", response.timetable.student_info.grade);
    setCookie("locker", response.timetable.student_info.locker_number);
    setCookie("oen", response.timetable.student_info.ontario_education_number);
    setCookie("sin", response.timetable.student_info.student_number);

    // Go to main page
    document.location = "/";
  };

  setTimeout(() => {
    // Go to main page
    document.location = "/";
  }, 5000);
}
