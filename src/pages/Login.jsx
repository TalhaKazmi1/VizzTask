import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from '../Shared/hooks/useLocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserAsync, getUserAsync } = useLocalStorage();

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      fetch('http://localhost:3000/users/' + email)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          // if (Object.keys(resp).length === 0) {
          if (resp.id != email) {
            toast.error('Please Enter valid Email');
          } else {
            if (resp.decryptPass === password) {
              toast.success('Success');
              setUserAsync(resp);
              navigate('/')
              // sessionStorage.setItem("userrole", resp.role);
            } else {
              toast.error('Please Enter valid credentials');
            }
          }
        })
        .catch((err) => {
          toast.error('Login Failed due to :' + err.message);
        });
    }
  };

  useEffect(() => {
    if (getUserAsync) {
      navigate('/');
    }
  }, [getUserAsync]);

  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      toast.warning('Please Enter email');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  function refreshPage() {
    navigate('/signup');
    window.location.reload();
  }

  return (
    <section class='vh-100 bg-primary'>
      <div class='container py-5 h-100'>
        <div class='row d-flex justify-content-center align-items-center h-100'>
          <div class='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div class='card  text-white'>
              <div class='card-body p-5 text-center'>
                <div class='mb-md-5 mt-md-4 pb-5'>
                  <h2 class='fw-bold mb-2 text-uppercase text-dark'>Login</h2>
                  <p class='mb-5 text-dark'>
                    Please enter your login and password!
                  </p>
                  <form onSubmit={ProceedLogin}>
                    <div class='form-outline form-white mb-4'>
                      <label
                        class=' form-label text-dark text-start'
                        style={{ float: 'left' }}
                        for='typeEmailX'
                      >
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        id='typeEmailX'
                        class='form-control form-control-lg'
                      />
                    </div>

                    <div class='form-outline form-white mb-4'>
                      <label
                        style={{ float: 'left' }}
                        class='form-label text-dark'
                        for='typePasswordX'
                      >
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        id='typePasswordX'
                        class='form-control form-control-lg'
                      />
                    </div>

                    <button
                      class='btn btn-primary px-5 text-white'
                      type='submit'
                    >
                      Login
                    </button>
                  </form>
                </div>

                <div>
                  <p class='mb-0 text-dark'>
                    Don't have an account?{' '}
                    <Link onClick={refreshPage}>
                      <a href='#!' class='text-dark-50 fw-bold text-primary'>
                        Sign Up
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
