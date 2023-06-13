import axios from "axios";
import BookCard from "../BookCard";
import Pagination from "../Pagination";
import {genContent} from "../../globals";

import React, { useEffect } from "react";

function Browse() {
  useEffect(() => {
    document.title = "BooksApp - Browse"
    fetchCovers(1)
    setTimeout(getRating, 1000);
    giveRating()
  });

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {genContent(9, <BookCard />)}
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
}

function fetchCovers(pageNum) {
  const covers = document.getElementsByClassName("cover");
  const names = document.getElementsByClassName("card-text");

  axios
    .get("http://localhost:4000/books?items=" + 9 * pageNum)
    .then(function (response) {
      for (let i = 0; i < 9; i++) {
        names[i].innerHTML = response.data[i + (pageNum - 1) * 9].name;
        covers[i].src = response.data[i + (pageNum - 1) * 9].cover;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getRating() {
  const names = document.getElementsByClassName("card-text");
  const containers = document.getElementsByClassName("text-muted");

  for (let i = 0; i < containers.length; i++) {
    const stars = containers[i].getElementsByClassName("star");
    axios
      .get("http://localhost:4000/books?name=" + names[i].innerHTML)
      .then(function (response) {
        let avg = Math.floor(response.data.average);
        avg = avg > 5 ? 5 : avg
        for (let j = 0; j < avg; j++) {
          stars[j].firstChild.style.fill = "#FFD700";
        }
      });
  }
}

function giveRating() {
  const containers = document.getElementsByClassName("text-muted");

  for (let i = 0; i < containers.length; i++) {
    const stars = containers[i].getElementsByClassName("star-icon");
    for (let j = 0; j < stars.length; j++) {
      stars[j].addEventListener("mouseenter", () => {
        for (let k = 0; k <= j; k++) {
          stars[k].style.fill = "#FFD700";
        }
        for (let k = j+1; k < 5; k++) {
          stars[k].style.fill = "#6c757d";
        }
      });
      stars[j].addEventListener("mouseleave", () => {
        getRating();
      });
      stars[j].removeEventListener("click", (e) => {
        setRating(j);
      });
      stars[j].addEventListener("click", (e) => {
        setRating(i, j);
      });
    }
  }
}

function setRating(i, j) {
  let names = document.getElementsByClassName('card-text');
  let uri = `http://localhost:4000/books/addReview?name=${names[i].innerHTML}&review=${j}`
  axios.post(uri).then(function (response) {
    axios
      .get(`http://localhost:4000/books?name=${names[i].innerHTML}`)
      .then(function (response) {
        window.location.reload()
      });
  });
}

export default Browse;
