import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getLocalStored } from "../localStored";
import { axiosClient } from "../axios";
import { useState } from "react";

export default function UpdateUser() {
  const auth = getLocalStored("auth");
  // set formik

  const formik = useFormik({
    initialValues: {
      age: "",
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      age: Yup.string(),
    }),
    ////
    //updare user to API
    onSubmit: async (values) => {
      const data = values;
      try {
        await axiosClient.put("user/me", data, {
          headers: { Authorization: "Bearer " + auth.token },
        });

        alert("Update success");
      } catch (error) {
        alert("Update false");
      }
    },
  });
  ///////////
  const [picture, setPicture] = useState({});
  ///////// post image to API
  const handleUpload = (e) => {
    setPicture({
      pictureFile: e.target.files[0],
    });
  };
  async function handleImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", picture.pictureFile);

    const headers = {
      Authorization: "Bearer " + auth.token,
    };
    try {
      await axiosClient.post(
        "user/me/avatar",

        formData,
        {
          headers,
        }
      );
      alert("upload image success");
    } catch (error) {
      alert(error);
    }
  }

  ///////////////

  return (
    <Contaner>
      <Wrapper>
        <h1>Update User Profile</h1>
        <form className="form" onSubmit={handleImage}>
          <StyledInput
            name="image"
            type="file"
            onChange={(e) => handleUpload(e)}
          />
          <button type="submit">Upload Image</button>
        </form>

        <form className="form" onSubmit={formik.handleSubmit}>
          <StyledInput
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter Your New Name"
          />
          <StyledInput
            id="age"
            name="age"
            type="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            placeholder="Enter Your New Age"
          />

          <button type="submit">Update</button>
        </form>
        <Link to="/app">Go Back</Link>
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
  height: 380px;
  width: 320px;
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
