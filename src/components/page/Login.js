import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setLocalStored, getLocalStored } from "../localStored";
import { axiosClient } from "../axios";

export default function Login() {
  // set formik
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: Yup.string().required("Please enter password"),
    }),
    ////
    //post value login on API and set value on localstored
    onSubmit: async (values) => {
      const data = values;
      try {
        const res = await axiosClient.post("user/login", data);
        setLocalStored("auth", res?.data);
        navigate("app");
        alert("Login Success");
      } catch (error) {
        alert("Login false");
      }
    },
  });
  ///////
  // logic ghi nho user da dang nhap
  const user = getLocalStored("auth");
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, []);
  ////////
  return (
    <Contaner>
      <Wrapper>
        <h1>SIGN IN</h1>
        <form className="form" onSubmit={formik.handleSubmit}>
          <StyledInput
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter Your Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="error">{formik.errors.email}</span>
          ) : null}
          <StyledInput
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter Your Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}

          <button type="submit">Login</button>
          <Link to="/regis">Sign Up</Link>
        </form>
      </Wrapper>
    </Contaner>
  );
}

const Contaner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightcyan;
  height: 100vh;
`;
const Wrapper = styled.div`
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 320px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  h1 {
    margin-top: 1rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    width: 80%;
    max-width: 350px;
    min-width: 250px;
    height: 35px;
    margin: 1rem 0;
    border-radius: 8px;
    background-color: #dedede;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
`;
const StyledInput = styled.input`
  height: 25px;
  max-width: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0 30px;
  margin: 8px;
`;
