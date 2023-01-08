function darkMode() {
    let lightElements = ['bg-light', 'navbar-light', 'btn-light', 'text-dark']
    let darkElements = ['bg-dark', 'navbar-dark', 'btn-dark', 'text-light']

    if(localStorage.getItem('darkmode') == 'true') {
        for(let i = 0; i < 4; i++) {
            let dark = document.getElementsByClassName(lightElements[i])
            for(const element of dark) {
                element.classList.add(darkElements[i])
            }
            while(dark.length > 0) {
                dark[0].classList.remove(lightElements[i])
            }
        }
    } else {
        for(let i = 0; i < 4; i++) {
            let dark = document.getElementsByClassName(darkElements[i])
            for(const element of dark) {
                element.classList.add(lightElements[i])
            }
            while(dark.length > 0) {
                dark[0].classList.remove(darkElements[i])
            }
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