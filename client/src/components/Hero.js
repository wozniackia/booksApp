import Icon from "./svg/Logo";

import "../css/bootstrap.min.css"

function Hero() {
  return (
    <section className="text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light text-white">
            <Icon />
            BooksApp
          </h1>
          <p className="lead text-white">Simple app to rate books</p>
          <p>
            <a href="./browse" className="btn my-2 btn-light">
              Browse books
            </a>
            <a href="./add" className="btn btn-secondary my-2">
              Add book
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
