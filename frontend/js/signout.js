const signout = () => {
    console.log(sessionStorage.getItem('token-username'));
    console.log(sessionStorage.getItem('token'));
    axios.post(`/auth/signout?username=${sessionStorage.getItem('token-username')}&token=${sessionStorage.getItem('token')}`)
        .then(function (response) {
            console.log(response.status);
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        });
    
};