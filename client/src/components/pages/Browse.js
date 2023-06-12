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
      console.log(response.data.length / 9);
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
        for (let j = 0; j < avg; j++) {
          stars[j].firstChild.style.fill = "#FFD700";
        }
      });
  }
}

export default Browse;
