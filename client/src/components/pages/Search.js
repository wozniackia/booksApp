import axios from "axios";
import MagnifyingGlass from "../svg/MagnifyingGlass";

import "../../css/search.css";

function Search() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="" id="search-container">
        <div className="search-box">
          <button
            className="btn-search"
            id="search-button"
            onClick={() => {
              const bar = document.getElementById("search-bar");
              const album = document.getElementsByClassName("album");
              const cover = document.getElementById("bookCover");
              const title = document.getElementById("bookName");
              const author = document.getElementById("bookAuthor");
              const rating = document.getElementById("bookRating");
              let query = bar.value;
              axios
                .get("http://localhost:4000/books?name=" + query)
                .then(function (response) {
                  if (response.data.name) {
                    if (album[0].classList.contains("visually-hidden")) {
                      album[0].classList.remove("visually-hidden");
                    }
                    cover.src = response.data.cover;
                    title.innerHTML = response.data.name;
                    author.innerHTML = response.data.author[0];
                    rating.innerHTML = response.data.average;
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            <MagnifyingGlass />
          </button>
          <input
            autoComplete="off"
            type="text"
            id="search-bar"
            className="input-search"
            placeholder="Type to Search..."
          />
        </div>
      </div>

      <div className="album visually-hidden">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <img
                  id="bookCover"
                  src=""
                  alt="Book cover"
                  className="img-fluid"
                ></img>

                <div className="card-body">
                  <p className="card-text" id="bookName"></p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted" id="bookAuthor"></small>
                    <div className="text-muted" id="bookRating"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
