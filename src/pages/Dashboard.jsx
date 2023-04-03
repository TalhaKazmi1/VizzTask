import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import CreateUser from "./CreateUser";
// import Modal from "../components/Modal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditUser from "./EditUser";
// import { useAuth } from "../Shared/hooks/AuthProvider";
import DashTBody from "../components/DashTBody";

function Dashboard() {
  // const { isLoggedIn } = useAuth()
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [users, setUsers] = useState([]);

  return (
    <>
      <Navbar />
      <div
        className="container overflow-hidden"
        style={{ marginTop: "20px", width: "3000px" }}
      >
        <div className="card">
          <div className="card-title">
            <h2 className="text-center mt-4">User Listing</h2>
            <div
              // className="btn btn-success"
              style={{ float: "right", marginRight: "20px" }}
            >
              {" "}
              <Button className="btn-info text-white" onClick={handleShow}>
                Add User (+)
              </Button>
              <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                  <Modal.Title>Create</Modal.Title>
                </Modal.Header>
                <Modal.Body className="col-lg-12">
                  <CreateUser handleClose={handleClose} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered ">
              <thead className="bg-dark text-white">
                <tr>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Email</td>
                  <td>Date of birth</td>
                  <td>Age</td>
                  <td>Created At</td>
                  <td>Decrypted Password</td>
                  {/* <td>Encrypted Password</td> */}
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                <DashTBody />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
