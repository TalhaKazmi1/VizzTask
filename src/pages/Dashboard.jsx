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

  const LoadEdit = (id) => {
    navigate("/Edit/" + id);
  };

  const LoadUser = (id) => {
    navigate("/Detail/" + id);
  };

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUsers(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // // Reusable
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, []);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const callAlert = (id) =>
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:3000/users/" + id, {
            method: "DELETE",
          })
            .then((res) => {
              // alert('Removed successfully.');
              // window.location.reload();
            })
            .catch((err) => {
              console.log(err.message);
            });

          swalWithBootstrapButtons
            .fire("Deleted!", "Your file has been deleted.", "success")
            .then(function () {
              // location.reload();
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });

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
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.id}</td>
                      <td>{user.date}</td>
                      <td>{user.age}</td>
                      <td>{user.Created_At}</td>
                      {/* <td>{user.hashPassword}</td> */}
                      <td>{user.decryptPass}</td>
                      <td className="d-flex justify-content-between">
                        <a
                          onClick={() => {
                            LoadUser(user.id);
                          }}
                          className="btn btn-primary"
                        >
                          View
                        </a>

                        {/* <Button variant="primary" onClick={handleShow}>
                          Add
                        </Button> */}

                        <Modal show={show} onHide={handleClose} size="xl">
                          <Modal.Header closeButton>
                            <Modal.Title>Create</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="col-lg-12">
                            <CreateUser handleClose={handleClose} />
                          </Modal.Body>
                        </Modal>
                        <a
                          onClick={() => {
                            LoadEdit(user.id);
                            // EditAlert(user.id);
                          }}
                          className="btn btn-success"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            callAlert(user.id);
                          }}
                          className="btn btn-danger"
                        >
                          Del
                        </a>

                        {/* <Button variant="primary" onClick={handleShow1}>
                          Launch demo modal
                        </Button>

                        <Modal show={show1} onHide={handleClose1} size="xl">
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <EditUser
                              handleClose1={handleClose1}
                              userid={user.id}
                            />
                          </Modal.Body>
                          {/* <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleClose1}>
                              Save Changes
                            </Button>
                          </Modal.Footer> */}
                        {/* </Modal>  */}
                      </td>
                    </tr>
                  ))}
                {/* {empdata &&
                  empdata.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <a
                          onClick={() => {
                            LoadEdit(item.id);
                          }}
                          className="btn btn-success"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            Removefunction(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </a>
                        <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                          className="btn btn-primary"
                        >
                          Details
                        </a>
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
