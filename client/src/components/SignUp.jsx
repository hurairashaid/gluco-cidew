import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { BaseURL } from "../apiBaseURL/BaseURL";
const SignUp = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Register Patient
  const registerPatient = async (e) => {
    e.preventDefault();
    //Check if fields are empty
    if (!name || !age || !weight || !email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${BaseURL}/signup`, {
        name: name,
        age: age,
        weight: weight,
        email: email,
        password: password,
        height: height,
      });
      console.log(res.data);
      const token = res.data.token;
      const loginToken = localStorage.setItem("token", JSON.stringify(token));
      console.log(token, "LOGIN TOKEN");
      toast.success("Registration Successful");
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard/patientHome");
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
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
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div className="row">
                      <h1 className="display-5 fw-bold ls-tight text-center text-primary">
                        Sign Up
                      </h1>
                      <p className="text-center fw-bold">
                        Register Your Account
                      </p>
                    </div>
                    <form onSubmit={(e) => registerPatient(e)}>
                      {/* <!-- Name input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <TextField
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                          label="Name"
                          variant="outlined"
                        />
                      </div>
                      {/* <!-- Age and Weight input --> */}
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {/* Age Field */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            onChange={(e) => setAge(e.target.value)}
                            autoComplete="given-name"
                            name="age"
                            type="number"
                            fullWidth
                            id="age"
                            label="Age"
                            autoFocus
                          />
                        </Grid>
                        {/* Weight Field */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            onChange={(e) => setWeight(e.target.value)}
                            fullWidth
                            type="number"
                            id="weight"
                            label="Weight"
                            name="weight"
                            autoComplete="family-name"
                          />
                        </Grid>
                      </Grid>

                      {/* <!-- Height input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <TextField
                          onChange={(e) => setHeight(e.target.value)}
                          fullWidth
                          type="number"
                          label="Height"
                          variant="outlined"
                        />
                      </div>
                      {/* <!-- Email input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <TextField
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          label="Email"
                          variant="outlined"
                        />
                      </div>
                      {/* <!-- Password input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <TextField
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          type="password"
                          label="Password"
                          variant="outlined"
                        />
                      </div>
                      {/* <!-- Submit button --> */}
                      <Button
                        variant="contained"
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        disabled={loading}
                        className="btn btn-primary btn-block mb-4"
                      >
                        {loading ? "Loading..." : "Sign Up"}
                      </Button>
                    </form>
                    <div>
                      <p>
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-primary text-decoration-none"
                        >
                          Login
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

export default SignUp;
