import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"

export default function Navbar({ userData , logOut }) {
  let navigate = useNavigate();
  function warning() {
    if (window.confirm("Are you sure ?") === true) {
      logOut();
      navigate('/login')
    }
  }
  userData = "0"
  return (
    <>
      <nav className="navbar navbar-expand-lg  shadow navbar-dark">
        <div className="container">
          <Link className="navbar-brand logo pe-5" to="/home">
            <img src={logo} className="" alt="" />
            Game Over
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
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="all">
                    All
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Platforms
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className=" dropdown-item " to="platforms/pc">
                        pc
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="platforms/browser">
                        browser
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href=""
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    sort-by
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className=" dropdown-item "
                        to="sort-by/release-date"
                      >
                        release-date
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="sort-by/popularity">
                        popularity
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="sort-by/alphabetical">
                        alphabetical
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="sort-by/relevance">
                        relevance
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className=" dropdown-item " to="category/racing">
                        racing
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/sports">
                        sports
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/social">
                        social
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/shooter">
                        shooter
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/open-world">
                        open-world
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/zombie">
                        zombie
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/fantasy">
                        fantasy
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/action-rpg">
                        action-rpg
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/action">
                        action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/flight">
                        flight
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData && userData !== "0" ? (
                <li>
                  <Link className="nav-link px-3 mx-1" to="profile">
                    Profile
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li>
                <Link
                  className=" btn  btn-outline-success px-3 mx-1"
                  to="login"
                >
                  Login
                </Link>
              </li>

              <li className="">
                {userData && userData !== "0" && (
                  <div
                    onClick={warning}
                    className="btn btn-outline-info px-3 mx-1"
                  >
                    log out
                  </div>
                )   (
                  <Link
                    className="btn btn-outline-info px-3 mx-1"
                    to="register"
                  >
                    Join Free
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
