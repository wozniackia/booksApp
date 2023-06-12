import React, { useEffect } from "react";
import axios from "axios";

function PaginationItem(props) {
  return (
    <li
      className="page-item"
      onClick={() => {
        fetchCovers(props.i + 1);
        setTimeout(getRating, 2000);
      }}
      // fetchRatings(${i + 1});
      // setTimeout(updateRating,1000);"
    >
      <a className="page-link" href="#">
        {props.i + 1}
      </a>
    </li>
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
    for (let j = 0; j < 5; j++) {
      stars[j].firstChild.style.fill = "#6c757d";
    }
  }
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

export default PaginationItem;
