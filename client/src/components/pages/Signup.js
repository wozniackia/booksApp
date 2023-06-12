import axios from "axios";

function Signup() {
  return (
    <>
      <div
        className="position-absolute top-50 start-50 translate-middle"
        id="to-hide"
      >
        <form id="form">
          <div className="mb-3">
            <label for="usernameInput" class="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="usernameInput"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="passwordInput" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="passwordInput" />
          </div>
          <button onClick={signup} className="btn btn-primary" id="submitButton">
            Sign up
          </button>
        </form>
        <a className="" style={{color: "#000"}} href="./signin">
          already have an account? Sign in
        </a>
      </div>

      <div
        className="position-absolute top-50 start-50 translate-middle visually-hidden"
        id="to-show"
      >
        Registration successful!
        <a className="" style={{color: "#000"}} href="./signin">
          Sign in
        </a>
      </div>
    </>
  );
}

const signup = function(event) {
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  console.log(username);
  console.log(password);

  axios.post(`http://localhost:4000/auth/signup?username=${username}&password=${password}`)
    .then(function (response) {
      console.log(response.status);
    });
    document.getElementById('to-show').classList.remove('visually-hidden');
    document.getElementById('to-hide').classList.add('visually-hidden');
  event.preventDefault();
};

export default Signup;
