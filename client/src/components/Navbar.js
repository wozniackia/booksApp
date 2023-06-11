import Icon from "./Icon";
import "./css/bootstrap.min.css"
import "./css/album.css";
import "./css/style.css";

function Navbar() {
  return (
    <div className="Navbar">
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="./">
            <Icon />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="./">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./browse">
                  Browse books
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./add">
                  Add books
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./search">
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./signin" id="signin-link">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-light"
            onClick={() => {
                toggleLocalStorage();
                darkMode();
            }}
          >
            <i className="bi bi-lightbulb-fill"></i>
          </button>
        </div>
      </nav>
      <script
        src="https://kit.fontawesome.com/28100bcb2a.js"
        crossOrigin="anonymous"
      ></script>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>

      <script src="./scripts/index.js"></script>
      <script src="./scripts/loading.js"></script>
      <script src="./scripts/get-rating.js"></script>
      <script src="./scripts/dark-mode.js"></script>
      <script src="./scripts/validate-login.js"></script>
    </div>
  );
}

function toggleLocalStorage() {
    if(localStorage.getItem('darkmode') == 'true') {
        localStorage.setItem('darkmode', 'false')
    } else {
        localStorage.setItem('darkmode', 'true')
    }
}

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

export default Navbar;
