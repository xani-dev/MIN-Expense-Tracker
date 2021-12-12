import React, { useContext } from "react";
import styled from "styled-components";
import firebase from "../../ctx/AuthContext/firebaseConfig";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../ctx/AuthContext/Auth";

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
  const userSchema = Yup.object().shape({
    email: Yup.string().required("Required Field"),
    password: Yup.string().required("Required Field"),
  });

  const { setUser } = useContext(AuthContext);

  const handleSubmit = (values) => {
    console.log("submitted: ", values);
    const { email, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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