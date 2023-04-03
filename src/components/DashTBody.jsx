import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import CreateUser from "../pages/CreateUser";
import Swal from "sweetalert2";

function DashTBody() {
  const navigate = useNavigate();
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
              // alert("Removed successfully.");
              // window.location.reload();
            })
            .catch((err) => {
              console.log(err.message);
            });

          swalWithBootstrapButtons
            .fire("Deleted!", "Your file has been deleted.", "success")
            .then(function () {
              location.reload();
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
      {users &&
        users.map((user) => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.id}</td>
            <td>{user.date}</td>
            <td>{user.age}</td>
            <td>{user.Created_At}</td>

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
            </td>
          </tr>
        ))}
    </>
  );
}

export default DashTBody;
