import React from "react";
import styled from "styled-components";

import Input from "./Input";

const Sidebar = () => {
  return (
    <Container>
      <LogoWrapper>
       
        <h1>
          Get <span>Started</span>
        </h1>
      </LogoWrapper>
      <Form>
        <h1>Sign cIn</h1>

        <Input />
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h2>
          Already have an account? <span>Sign In</span>
        </h2>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #666666;
    margin-bottom: 2rem;
  }
  button {
    width: 75%;
    border: none;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    margin: 1rem 0;
    box-shadow: 0px 14px 31px -23px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 6rem;
  }
  h1 {
    text-align: center;
    color: #ff8d8d;
    font-size: 22px;
  }
  span {
    font-weight: 300;
    font-size: 18px;
    color: #5dc399;
  }
`;

const Container = styled.div`
  min-width: 400px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }
  h2 {
    font-size: 13px;
    font-weight: bold;
    margin-top: 2rem;
    color: #808080;
    span {
      color: #ff8d8d;
    }
  }
`;

export default Sidebar;
