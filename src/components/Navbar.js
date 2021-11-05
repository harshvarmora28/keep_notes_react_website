import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Navbar.css";



const Navbar = () => {
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/signin")
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
      <div className="container-fluid" id="nav__div">
        <Link className="navbar-brand" id="nav__title" to="/#">
          Keep Notes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? <form className="d-flex">
            <Link className="btn mx-3 nav__btn" id="nav__signin" to="/signin" role="button">Sign in</Link>
            <Link className="btn nav__btn" id="nav__signup" to="/signup" role="button">Sign up</Link>
          </form>: <button onClick={handleLogout} className="btn nav__btn" id="nav__logout">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
