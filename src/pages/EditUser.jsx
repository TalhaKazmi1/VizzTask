import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "../components/DatePicker";
import bcrypt from "bcryptjs";
import Navbar from "../components/Navbar";

function EditUser() {
  const { userId } = useParams();
  // console.log(userid);

  useEffect(() => {
    fetch("http://localhost:3000/users/" + userId)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setFirstName(resp.firstName);
        setLastName(resp.lastName);
        setId(resp.id);
        setDate(resp.date);
        setPassword(resp.decryptPass);
        setConfirmPassword(resp.decryptPass);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
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
      errormessage += " id";
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        )
      ) {
      } else {
        isproceed = false;
        toast.warning("Password must contain at least 8 characters");
      }
    }
    return isproceed;
  };

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const age = calculate_age(new Date(date));

  const handleSubmit = (e) => {
    e.preventDefault();

    const decryptPass = password;
    const hashPassword = bcrypt.hashSync(password, 3);
    var Created_At = new Date();
    let obj = {
      firstName,
      lastName,
      age,
      date,
      id,
      hashPassword,
      decryptPass,
      Created_At,
    };
    if (isValidate()) {
      // console.log(obj);

      fetch("http://localhost:3000/users/" + userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((res) => {
          toast.success("Success");
          navigate("/");
        })
        .catch((err) => {
          // console.log(err);
          toast.error(err.message);
        });
    }
  };

  function refreshPage() {
    navigate("/");
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      <section class="">
        <div class="container py-5 h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-9 col-xl-7">
              <div class="card shadow-2-strong card-registration">
                <div class="card-body p-4 p-md-5 ">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                    Update User
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

                    {/* <div className="py-2 mt-5">
                    <input id="checkbox" type="checkbox" required />
                    <label for="checkbox ">
                    {" "}
                    I agree to these <a href="#">Terms and Conditions</a>.
                    </label>
                  </div> */}

                    <div class="mt-4 pt-2 ">
                      <input
                        class="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
                      <Link onClick={refreshPage}>
                        <input
                          class="btn btn-danger btn-lg mx-2"
                          type="button"
                          value="Back"
                        />
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditUser;
