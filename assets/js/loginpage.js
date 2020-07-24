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
  const url = "https://api.retrylife.ca/tvdsb/student/auth";
  Http.open("POST", url);
  Http.send(form);

  // Handle response
	Http.onreadystatechange = (e) => {

		// Get response data
		var response = JSON.parse(Http.response);

		console.log(response)

		// Stop the spinner
		spinner.classList.add("hidden");
	  
		// Handle failed auth
		if (!response.success) {
			document.getElementById("invalid-login").classList.remove("hidden");
		} else {
			
			// Set the cookie
			setCookie("auth_token", response.token);
			document.location = "/";
		}
  };
}