import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function NotFound() {
  const navigate = useNavigate();
  function refreshPage() {
    navigate("/login");
    window.location.reload();
  }
  return (
    <section class="page_404 ">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 " style={{ marginLeft: "80px" }}>
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <Link onClick={refreshPage}>
                  <a href="" class="link_404">
                    Go to Home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
