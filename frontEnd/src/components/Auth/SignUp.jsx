import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../ctx/AuthContext/Auth";
import { authAPI } from "../../services/auth";

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

const SignUp = () => {
  const history = useNavigate();
  const userSchema = Yup.object().shape({
    email: Yup.string().required("Required Field"),
    password: Yup.string().required("Required Field"),
  });

  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    console.log("submitted: ", values);
    try {
      const {status, data} = await authAPI.signup(values);
      if (status ===200){
        setUser(data.user);
        history('/');
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, values, handleChange, touched, errors }) => {
          return (
            <>
              <Form>
                <TextField
                  style={{ marginBottom: "16px " }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  style={{ marginBottom: "32px " }}
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
                  Create Account
                </Button>
              </Form>
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export { SignUp };
