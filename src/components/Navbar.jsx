import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {/* <li className=" text-bl py-2 px-2 rounded-3">Vizz Web Test</li> */}
          </ul>
          <form class="d-flex" role="search">
            <Link to={"./login"}>
              <button
                class="btn btn-outline-success text-black bg-white"
                type="submit"
              >
                Log Out
              </button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
