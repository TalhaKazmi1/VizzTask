import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function DetailsUser() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/users/" + userId)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUser(resp);
        // console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function refreshPage() {
    navigate("/signup");
    // window.location.reload();
  }
  return (
    <>
      <Navbar />
      <div className="fw-bold text-center " style={{ margin: "20px" }}>
        <h1>User Details</h1>
      </div>
      <div class="col-lg-8 mx-auto">
        <div class="card mb-4 ">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">First Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{user.firstName}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Last Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{user.lastName}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Date of Birth</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{user.date}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{user.id}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {" "}
        <Link to={"/"}>
          <input
            //   onClick={refreshPage}
            class="btn btn-danger btn-lg mx-2"
            type="button"
            value="Back To Dashboard"
          />
        </Link>
      </div>
    </>
  );
}

export default DetailsUser;
