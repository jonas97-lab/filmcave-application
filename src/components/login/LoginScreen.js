import React, { useRef } from "react";
import { auth } from "../../firebase";
import styled from "styled-components";
import { css } from "styled-components";

const Form = styled.form`
  position: relative;
  overflow: hidden;
`;

const FormBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(315deg, #2a2a72 0%, #0073cf 74%);
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const FormContent = styled.div`
  border-radius: 10px;
  background: #fff;
  max-width: 450px;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const FormTitle = styled.h3`
  text-transform: uppercase;
  margin: 50px 25px 20px 25px;
  font-size: 28px;
  font-weight: 500;

  span {
    font-weight: 700;
  }
`;

const formInput = css`
  font-family: "Poppins", sans-serif;
  background-color: #f6f6f6;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 15px 80px;
  text-align: center;
  font-size: 14px;
  margin: 10px;
`;

const FormInputEmail = styled.input`
  ${formInput}
`;

const FormInputPassword = styled.input`
  ${formInput}
`;

const FormTagline = styled.p`
  font-size: 14px;

  span {
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FormButtons = styled.div`
  button {
    font-family: "Poppins", sans-serif;
    border: none;
    outline: none;
    border-radius: 5px;
    margin: 30px 5px 40px;
    cursor: pointer;
    color: #fff;
    padding: 10px 60px;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1px;
    transition: 0.2s ease-in;
    background-color: #0073cf;
  }
`;

function LoginScreen() {
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <Form>
      <FormBackground>
        <FormWrapper>
          <FormContent>
            <FormTitle>
              Log in to your <br />
              <span>FilmCave</span> account
            </FormTitle>
            <FormInputEmail
              ref={emailRef}
              placeholder="Email address"
              type="email"
            />
            <FormInputPassword
              ref={passwordRef}
              placeholder="Password"
              type="password"
            />
            <FormTagline>
              New to FilmCave? <span onClick={register}>Sign Up now!</span>
            </FormTagline>
            <FormButtons>
              <button onClick={signIn}>Log In</button>
            </FormButtons>
          </FormContent>
        </FormWrapper>
      </FormBackground>
    </Form>
  );
}

export default LoginScreen;
