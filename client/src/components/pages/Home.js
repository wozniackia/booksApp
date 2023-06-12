import Hero from "../Hero";
import TopRated from "../TopRated";
import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "BooksApp"
  })
  return (
    <div>
        <Hero />
        <TopRated />
    </div>
  );
}

export default Home;
