import {  Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../State/Auth/Action.js";

const RegisterForm = () => {
  const jwt = localStorage.getItem("jwt") 
// console.log(jwt);

  const auth = useSelector((store) => store);
  const navigate = useNavigate();

  
 
  // reducer

  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(getUser(jwt));
  }, [jwt, auth.jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    dispatch(register(userData));

  };

  return (
    <div className="w-full max-w-sm mx-auto  p-5 border shadow-lg rounded-md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{ padding: ".8rem 2rem", backgroundColor: "#4f46e5" }}
              type="submit"
            >
           {auth.isLoading ? (
                <div className="flex items-center justify-center gap-2 ">
                  <span>Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center p-2 items-center">
        <div className="flex items-center justify-center ">
          <p>Already have an account</p>
          <Button
            size="small"
            className="ml-3"
            onClick={() => {
              navigate("/login");
            }}
          >
            login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
