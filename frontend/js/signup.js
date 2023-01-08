const signup = function(event) {
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    console.log(username);
    console.log(password);

    axios.post(`/auth/signup?username=${username}&password=${password}`)
      .then(function (response) {
        console.log(response.status);
      });
      document.getElementById('to-show').classList.remove('visually-hidden');
      document.getElementById('to-hide').classList.add('visually-hidden');
    event.preventDefault();
};



const form = document.getElementById("form");

form.addEventListener("submit", signup, true);