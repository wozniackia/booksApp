function darkMode() {
    let ifDark = localStorage.getItem('darkmode')
    if(ifDark == 'true') {
        let dark = document.getElementsByClassName('bg-light')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('bg-dark')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('bg-light')
        }
        dark = document.getElementsByClassName('navbar-light')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('navbar-dark')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('navbar-light')
        }
        dark = document.getElementsByClassName('btn-light')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('btn-dark')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('btn-light')
        }
        dark = document.getElementsByClassName('text-dark')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('text-light')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('text-dark')
        }
    } else {
        let dark = document.getElementsByClassName('bg-dark')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('bg-light')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('bg-dark')
        }
        dark = document.getElementsByClassName('navbar-dark')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('navbar-light')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('navbar-dark')
        }
        dark = document.getElementsByClassName('btn-dark')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('btn-light')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('btn-dark')
        }
        dark = document.getElementsByClassName('text-light')
        for(let i = 0; i < dark.length; i++) {
            dark[i].classList.add('text-dark')
        }
        while(dark.length > 0) {
            dark[0].classList.remove('text-light')
        }
    }
}

function toggleLocalStorage() {
    if(localStorage.getItem('darkmode') == 'true') {
        localStorage.setItem('darkmode', 'false')
    } else {
        localStorage.setItem('darkmode', 'true')
    }
}