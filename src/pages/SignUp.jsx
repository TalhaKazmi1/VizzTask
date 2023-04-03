import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "../components/DatePicker";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import * as yup from "yup";
import { generateToken } from "../Shared/utils/GenerateToken";
import { CalculateAge } from "../Shared/utils/CaluclateAge";
import { callAlert } from "../Shared/utils/Terms";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const Validation = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (firstName === null || firstName === "") {
      isproceed = false;
      errormessage += " First Name";
    }
    if (lastName === null || lastName === "") {
      isproceed = false;
      errormessage += " Last Name";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (confirmPassword === null || confirmPassword === "") {
      isproceed = false;
      errormessage += " Confirm Password";
    }
    if (date === null || date === "") {
      isproceed = false;
      errormessage += " Date of Birth";
    }
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(id)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid Email");
      }
      if (password !== confirmPassword) {
        isproceed = false;
        toast.warning("Password and Confirm Password do not match");
      }
      if (
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        //   password
        // )

        /.{8,}/.test(password)
      ) {
      } else {
        isproceed = false;
        toast.warning("Password must contain at least 8 characters");
      }
      if (/(?=.*?[#?!@$%^&*-])/.test(password)) {
      } else {
        isproceed = false;
        toast.warning("Password must contain at least 1 Special character");
      }
      if (/(?=.*?[0-9])/.test(password)) {
      } else {
        isproceed = false;
        toast.warning("Password must contain at least 1 Digit");
      }
      if (/(?=.*?[A-Z])/.test(password)) {
      } else {
        isproceed = false;
        toast.warning("Password must contain at least 1 Uppercase character");
      }
      if (/(?=.*?[a-z])/.test(password)) {
      } else {
        isproceed = false;
        toast.warning("Password must contain at least 1 Lowercase character");
      }
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = CalculateAge(new Date(date));
    const token = generateToken(10);
    const decryptPass = password;
    const hashPassword = bcrypt.hashSync(password, 1);
    var Created_At = new Date();
    let obj = {
      firstName,
      lastName,
      age,
      date,
      id,
      hashPassword,
      decryptPass,
      token,
      Created_At,
    };
    if (Validation()) {
      // console.log(obj);

      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((res) => {
          toast.success("Success");
          navigate("/login");
        })
        .catch((err) => {
          // console.log(err);
          toast.error(err.message);
        });
    }
  };

  function SweetAlert() {
    callAlert();
  }

  function refreshPage() {
    navigate("/Login");
    window.location.reload();
  }
  return (
    <section class="vh-100 bg-primary">
      <div class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div class="card shadow-2-strong card-registration">
              <div class="card-body p-4 p-md-5 ">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                  Registration Form
                </h3>
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="firstName">
                          First Name
                        </label>
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          id="firstName"
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="lastName">
                          Last Name
                        </label>
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          id="lastName"
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <label class="form-label" for="id">
                          Email
                        </label>
                        <input
                          value={id}
                          onChange={(e) => setId(e.target.value)}
                          type="id"
                          id="id"
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>

                    <DatePicker value={date} setDate={setDate} />
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="password">
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="password"
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <label class="form-label" for="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          id="confirmPassword"
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="row border rounded-2 "
                    style={{
                      border: "20px",
                      // width: "650px",
                      margin: "auto",
                    }}
                  >
                    <div class="col-12">
                      <div class="d-flex justify-content-between">
                        <div class="p-2 bd-highlight">Hobbies</div>
                        <div class="p-2 bd-highlight">(Optional)*</div>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          value="option1"
                        />
                        <label class="form-check-label " for="inlineCheckbox1">
                          Cricket
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value="option2"
                        />
                        <label class="form-check-label" for="inlineCheckbox2">
                          Chess
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox3"
                          value="option3"
                        />
                        <label class="form-check-label" for="inlineCheckbox3">
                          Football
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox3"
                          value="option3"
                        />
                        <label class="form-check-label" for="inlineCheckbox3">
                          Hockey
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox3"
                          value="option3"
                        />
                        <label class="form-check-label" for="inlineCheckbox3">
                          Soccer
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox3"
                          value="option3"
                        />
                        <label class="form-check-label" for="inlineCheckbox3">
                          Songs
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 mt-5">
                    <input id="checkbox" type="checkbox" required />
                    <label for="checkbox ">
                      {" "}
                      <p className="px-2">
                        I agree to these{" "}
                        <a
                          className="text-primary"
                          href="#"
                          onClick={() => {
                            SweetAlert();
                          }}
                        >
                          Terms and Conditions
                        </a>
                        .
                      </p>
                    </label>
                  </div>
                  <div class="mt-4 pt-2 text-center">
                    <input
                      class="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div>

                  <div className="py-2 text-center">
                    Already Have an Account?{" "}
                    <Link onClick={refreshPage}>
                      <a href="#" className="fw-bold text-primary">
                        Log In
                      </a>
                      .
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
