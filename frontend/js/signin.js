const signin = function(event) {
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    axios.get(`/auth/signin?username=${username}&password=${password}`)
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



const form = document.getElementById("form");

form.addEventListener("submit", signin, true);