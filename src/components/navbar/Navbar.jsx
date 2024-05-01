import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">WorkNest</span>
          </Link>
        </div>
        <div className="links">
          {/* <span>Fiverr Business</span> */}
          <span>Explore</span>
          <span>English</span>
          {/* {!currentUser?.isSeller && <span>Become a Seller</span>} */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  {/* <Link className="link" to="/messages">
                    Messages
                  </Link> */}
                  <Link className="link" to="/completedorders">
                    Completed Orders
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            {/* <Link className="link menuLink" to="/gigs?cat=Graphics&Design">
              Graphics & Design
            </Link> */}
            <Link className="link menuLink" to="/gigs?cat=Graphics_Design">
              Graphics Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Video_Animation">
              Video Animation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Writing_Translation">
              Writing Translation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Music_Audio">
              Music Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Programming_Tech">
              Programming Tech
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Photography">
              Photography
            </Link>
            <Link className="link menuLink" to="/gigs?cat=AIServices">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Digital_Marketing">
              Digital Marketing
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
