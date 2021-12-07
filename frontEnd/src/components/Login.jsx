import React from "react";
import logo from "./../min.png";
import styled from "styled-components";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { authAPI } from "../services/auth";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
	padding: 16px;
    margin: 32px;
	background-color: #312440;
	color: white;
    align-items: center;
    height: 100vh;
    justify-content: center; 
`;

const Logo = styled.img`
  padding: 16px;
  width: 150px;
`;


const userSchema = Yup.object().shape({
  username: Yup.string().required("Required Field"),
  password: Yup.string().required("Required Field"),
});
const Login = ({setCurrentUser}) => {

  const handleSubmit = async (values) => {
    try {
      const {status, data} = await authAPI.login(values)
      console.log("response: ", data)
      if (status === 200) {
        setCurrentUser ({username: values.username, ...data})
      }
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <Formik 
    initialValues={{}} 
    validationSchema={userSchema}
      onSubmit = {(values) => {
        handleSubmit(values);
      }}
      >
      {({ isSubmitting, isValid, values, handleChange, touched, errors }) => {
        return (
            <>
            <FormContainer>
            <Logo src={logo} className="App-logo" alt="Min App Logo" />
          <Form>
            
            <TextField
              style={{ marginBottom: "16px "}}
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
             
            <TextField
              style={{ marginBottom: "32px "}}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
           
            <Button
            fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Login
            </Button>
           
          </Form>
          </FormContainer>
          </>
        );
      }}
    </Formik>
  );
};

export { Login };
