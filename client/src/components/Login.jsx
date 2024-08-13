import { Button, hexToRgb, TextField } from "@mui/material";
import React, { useState } from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { BaseURL } from "../apiBaseURL/BaseURL";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const loginPatient = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    try {
      setLoading(true);

      const res = await axios.post(`${BaseURL}/login`, {
        email: email,
        password: password,
      });
      // Setting token in local storage
      const token = localStorage.setItem(
        "token",
        JSON.stringify(res.data.token)
      );
      console.log(res.data.token);
      toast.success("Login Successful");
      setTimeout(() => {
        navigate("/dashboard/patientHome");
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {/* <!-- Section: Design Block --> */}
      <section className="">
        {/* <!-- Jumbotron --> */}
        <div className="px-4 py-5 px-md-5 text-center h-100 text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Gluco Guide <br />
                  <span className="text-primary">
                    Your personal health assistant
                  </span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Gluco Guide is a digital health companion designed to help you
                  manage your health effectively. By tracking your blood
                  pressure, sugar levels, and other vital information, it
                  provides personalized insights and dietary recommendations.
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card shadow">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={(e) => loginPatient(e)}>
                      {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                      <div className="row">
                        <h1 className="display-5 fw-bold ls-tight text-center text-primary">
                          Login
                        </h1>
                        <p className="text-center fw-bold">
                          Enter Your Credentials
                        </p>
                      </div>
                      {/* <!-- Email input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <TextField
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          type="email"
                          label="Email"
                          variant="outlined"
                        />
                      </div>
                      {/* <!-- Password input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <TextField
                          fullWidth
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          label="Password"
                          variant="outlined"
                        />
                      </div>
                      {/* <!-- Submit button --> */}
                      <Button
                        variant="contained"
                        disabled={loading}
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block mb-4"
                      >
                        {loading ? "Loading..." : "Login"}
                      </Button>
                    </form>
                    <div>
                      <p>
                        Don't have an account?{" "}
                        <Link
                          to="/signup"
                          className="text-primary text-decoration-none"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Jumbotron --> */}
      </section>

      {/* //Footer Component */}
      <Footer />
      {/* Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Login;
