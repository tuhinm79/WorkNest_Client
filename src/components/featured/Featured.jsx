import React, { useState } from "react";
import "./Featured.css";
import { useNavigate, Link } from "react-router-dom";
import man from "../../assets/mman.png";
function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            {/* Find the right <br />
            <span>freelance </span>
            service, right away */}
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                // placeholder='Try "building mobile app"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(); // Call the submit function when Enter key is pressed
                  }
                }}
              />
            </div>
            <button className="popbutton" onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <Link
              className="link menuLink popbutton"
              to="/gigs?cat=Music_Audio"
            >
              Music Audio
            </Link>
            <Link
              className="link menuLink popbutton"
              to="/gigs?cat=Photography"
            >
              Photography
            </Link>
            <Link
              className="link menuLink popbutton"
              to="/gigs?cat=Video_Animation"
            >
              Video Animation
            </Link>
            <Link
              className="link menuLink popbutton"
              to="/gigs?cat=AIServices"
            >
              AI Services
            </Link>
            {/* <button cl>Web Design</button> */}
            {/* <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button> */}
          </div>
        </div>
        <div className="right">
          {/* <img src={man} /> */}
        </div>
      </div>
    </div>
  );
}

export default Featured;
