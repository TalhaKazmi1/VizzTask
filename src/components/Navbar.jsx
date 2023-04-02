import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  function refreshPage() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <nav class='navbar navbar-expand-lg bg-primary'>
      <div class='container-fluid'>
        <div class='collapse navbar-collapse' id='navbarScroll'>
          <ul class='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            {/* <li className=" text-bl py-2 px-2 rounded-3">Vizz Web Test</li> */}
          </ul>
          <form onSubmit={refreshPage} class='d-flex' role='search'>
              <button
                class='btn btn-outline-success text-black bg-white'
                type='submit'
              >
                Log Out
              </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
