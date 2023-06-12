import axios from "axios";

function genContent(number, content) {
  let arr = [];
  for (let i = 0; i < number; i++) {
    arr.push(content);
  }
  return arr;
}

const isValid = () => {
  const singinLink = document.getElementById("signin-link");
  if(sessionStorage.getItem("token-username") != null) {
      singinLink.innerHTML = sessionStorage.getItem("token-username");
  }
  
  if (sessionStorage.getItem("token") != null) {
      axios.get(`http://localhost:4000/auth/validate?token=${sessionStorage.getItem("token")}`)
          .then(function (response) {
              if (response.status == 400) {
                  singinLink.innerHTML = sessionStorage.getItem("token-username");
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("token-datetime");
                  sessionStorage.removeItem("token-username");
              } else {
                  if(document.title == "BooksApp - Sign in") {
                      document.getElementById('signout').classList.remove('visually-hidden');
                      document.getElementById('to-hide').classList.add('visually-hidden');
                      document.getElementById('username').innerHTML = sessionStorage.getItem("token-username");
                  } else if(document.title == "BooksApp - Add books") {
                      document.getElementById('signedonly').classList.add('visually-hidden')
                  }
              }
          })
          .catch(function (error) {
              singinLink.innerHTML = sessionStorage.getItem("token-username");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("token-datetime");
              sessionStorage.removeItem("token-username");
          });
  }
}

export {genContent, isValid}