import React from "react";
import { useState, useEffect } from "react";
//import ContactCards from "./ContactCard";
import Pagination from "./Pagination";

import "./styles.css";

const About = () => {
  const [myApi, setMyApi] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=15")
      .then((data) => data.json())
      .then((json_result) => {
        setData(json_result.results);
        let myApi = renderData(json_result.results);
        setMyApi(myApi);
      });
  }, []);

  const renderData = (data) => {
    return data.map((item, idx) => {
      return (
        <div key={idx} className="contact-card">
          <img src={item.picture.thumbnail} alt="" /> {item.name.first}
          <hr />
        </div>
      );
    });
  };

  // get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myApi?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //next and previous handle events
  const handleNext = (event) => {
    event.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      {currentPosts}
      <Pagination
        className="pagination"
        postsPerPage={postsPerPage}
        totalPosts={myApi?.length}
        paginate={paginate}
      />
      <button className="prev" onClick={handlePrevious}>
        Prev
      </button>
      <button className="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default About;
