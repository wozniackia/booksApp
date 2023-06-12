import axios from "axios";
import { useEffect, useState } from "react";
import SignedInOnly from "../SignedInOnly";
import { isValid } from "../../globals";

function Add() {
  const [bookName, setBookName] = useState();
  useEffect(() => {
    document.title = "BooksApp - Add books"
    isValid()
  })
  return (
    <>
      <SignedInOnly />
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="d-flex needs-validation" id="formularz">
          <input
            className="form-control me-2"
            type="search"
            id="bookName"
            placeholder="Book name"
            aria-label="Search"
            onChange={(e) => setBookName(e.target.value)}
          />
          <div className="invalid-feedback">Please provide a valid name.</div>
          <button
            id="searchButton"
            className="btn btn-light"
            onClick={() => {
              document.getElementById("searchButton").innerHTML =
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
              let uri = "https://openlibrary.org/search.json?q=" + bookName;
              axios.get(uri).then((res) => {
                document.getElementById("searchButton").innerHTML = "Search";
                let sendRequest = () => {
                  document.getElementById("addButton").innerHTML =
                    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                  let uri2 =
                    "http://localhost:4000/books/addBook?name=" +
                    String(res.data.docs[0]["title"]).replaceAll(" ", "+");
                  axios.post(uri2).then(function (response) {
                    document.getElementById("addButton").innerHTML = "Add";
                    document.getElementById("bookAddedModal").style.display =
                      "block";
                  });
                };
                document.getElementById("listName").innerHTML =
                  res.data.docs[0]["title"];
                document.getElementById("listAuthor").innerHTML =
                  res.data.docs[0]["author_name"][0];
                document.getElementById("listDate").innerHTML =
                  res.data.docs[0]["first_publish_year"];
                document.getElementById("addButton").onclick = sendRequest;
              });
            }}
          >
            Search
          </button>
        </div>

        <ul class="list-group" id="lista">
          <li class="list-group-item">
            Book name: <div id="listName"></div>
          </li>
          <li class="list-group-item">
            Author: <div id="listAuthor"></div>
          </li>
          <li class="list-group-item">
            Release date: <div id="listDate"></div>
          </li>
          <button type="button" class="btn btn-light" id="addButton">
            Add
          </button>
        </ul>
      </div>
      <div class="modal" id="bookAddedModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Book added</h5>
              <button
                id="closeModal"
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Book added succesfully!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
