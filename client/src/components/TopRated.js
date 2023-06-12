import axios from "axios";
import React, { useEffect } from "react";
import BookCard from "./BookCard";
import {genContent} from "../globals";

function TopRated() {
  useEffect(() => {
    getBooks();
    setTimeout(getRating, 1000);
  });
  return (
    <div className="album py-5 bg-light">
      <div className="text-center text-dark fs-1">Top rated books</div>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {genContent(3, <BookCard />)}
        </div>
      </div>
    </div>
  );
}

function getBooks() {
  const covers = document.getElementsByClassName("cover");
  const names = document.getElementsByClassName("card-text");
  axios
    .get("http://localhost:4000/books/top")
    .then(function (response) {
      for (let i = 0; i < 3; i++) {
        covers[i].src = response.data[i].cover;
        names[i].innerHTML = response.data[i].name;
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

export default TopRated;
