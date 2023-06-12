import axios from "axios";
import React, { useEffect, useState } from "react";
import PaginationItem from "./PaginationItem";

function Pagination() {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    pagination().then(function (result) {
      setPages(result);
    });
  }, []);
  return (
    <nav aria-label="pagination">
      <ul id="pagination" className="pagination justify-content-center">
        {pages}
      </ul>
    </nav>
  );
}

async function pagination() {
  let items = [];
  await axios
    .get("http://localhost:4000/books")
    .then(function (response) {
      for (let i = 0; i < Math.floor(response.data.length / 9); i++) {
        items.push(<PaginationItem i={i} />);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return items;
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
      // bookName1.innerHTML = response.data[0+(pageNum-1)*9].name
      // bookCover1.src = response.data[0+(pageNum-1)*9].cover
      // bookName2.innerHTML = response.data[1+(pageNum-1)*9].name
      // bookCover2.src = response.data[1+(pageNum-1)*9].cover
      // bookName3.innerHTML = response.data[2+(pageNum-1)*9].name
      // bookCover3.src = response.data[2+(pageNum-1)*9].cover
      // bookName4.innerHTML = response.data[3+(pageNum-1)*9].name
      // bookCover4.src = response.data[3+(pageNum-1)*9].cover
      // bookName5.innerHTML = response.data[4+(pageNum-1)*9].name
      // bookCover5.src = response.data[4+(pageNum-1)*9].cover
      // bookName6.innerHTML = response.data[5+(pageNum-1)*9].name
      // bookCover6.src = response.data[5+(pageNum-1)*9].cover
      // bookName7.innerHTML = response.data[6+(pageNum-1)*9].name
      // bookCover7.src = response.data[6+(pageNum-1)*9].cover
      // bookName8.innerHTML = response.data[7+(pageNum-1)*9].name
      // bookCover8.src = response.data[7+(pageNum-1)*9].cover
      // bookName9.innerHTML = response.data[8+(pageNum-1)*9].name
      // bookCover9.src = response.data[8+(pageNum-1)*9].cover
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default Pagination;
