
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  getLocalStored } from "../localStored";
import { axiosClient } from "../axios";
import { useEffect, useState } from "react";
import Loading from "../loadingScreen/loadingScreen";

export default function Regis() {
  
  const [load, setLoad] = useState(false)

  // set formik
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: '',
      age: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: Yup.string().required("Please enter password"),
      name: Yup.string(),
      age: Yup.string()
    }),
    ////
    //post user login to API
    onSubmit: async (values) => {
      setLoad(true)
      const data = values
      try {
        await axiosClient.post('user/register', data)
        navigate('/')
        
        setLoad(false)
      } catch (error) {
        alert('Sign Up false')
        setLoad(false)
      }
    
////////////////////////


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
  //////////
  return (
    <Contaner>
      <Loading load={load}/>
      <Wrapper>
        <h1>SIGN UP</h1>
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
          <StyledInput
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter Your Name"
          />
          
          <StyledInput
            id="age"
            name="age"
            type="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            placeholder="Enter Your Age"
          />
         
          <button type="submit">Sign Up</button>
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
  height: 350px;
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
  `