import axios from "axios";
import md5 from "md5";
import { isValid } from "../../globals";
import { useEffect } from "react";

function Signin() {
  useEffect(() => {
    document.title = "BooksApp - Sign in"
    isValid()
  })
  return (
    <>
      <div
        className="position-absolute top-50 start-50 translate-middle"
        id="to-hide"
      >
        <form id="form">
          <div className="mb-3">
            <label for="usernameInput" className="form-label">
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
            <input
              type="password"
              className="form-control"
              id="passwordInput"
            />
          </div>
          <button onClick={signin} className="btn btn-success" id="submitButton">
            Sign in
          </button>
        </form>
        <a className="" style={{ color: "#000" }} href="./signup">
          no account yet? Sign up
        </a>
      </div>

      <div
        class="position-absolute top-50 start-50 translate-middle visually-hidden"
        id="signout"
      >
        <div class="mb-3" id="username"></div>
        <button
          type="submit"
          class="btn btn-danger"
          id="signoutButton"
          onClick={signout}
        >
          Sign out
        </button>
      </div>

      <div
        class="position-absolute top-50 start-50 translate-middle visually-hidden"
        id="to-show"
      >
        Login successful!
      </div>
    </>
  );
}

const signin = function(event) {
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  axios.get(`http://localhost:4000/auth/signin?username=${username}&password=${md5(password)}`)
      .then(function (response) {
          sessionStorage.setItem("token", response.data.token,);
          sessionStorage.setItem("token-datetime", response.data.datetime);
          sessionStorage.setItem("token-username", response.data.username);
      });
  document.getElementById('to-show').classList.remove('visually-hidden');
  document.getElementById('to-hide').classList.add('visually-hidden');
  setTimeout(() => {
      window.location.href = "/";
  }, 500);
  event.preventDefault();
};

const signout = () => {
  axios.post(`http://localhost:4000/auth/signout?username=${sessionStorage.getItem('token-username')}&token=${sessionStorage.getItem('token')}`)
      .then(function (response) {
          console.log(response.status);
          setTimeout(() => {
              window.location.href = "/";
          }, 500);
      });
  
};

export default Signin;
