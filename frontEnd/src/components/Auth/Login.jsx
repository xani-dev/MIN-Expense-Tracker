import React, {useContext} from "react";
import logo from "./../../min.png";
import styled from "styled-components";
import { AuthContext } from "../../ctx/AuthContext/Auth";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



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
  email: Yup.string().required("Required Field"),
  password: Yup.string().required("Required Field"),
});
const Login = () => {
  const { setUser, firebase } = useContext(AuthContext);
  const handleSubmit = async (values) => {
    console.log ("Values submitted: ", values);
    const { email, password } = values;
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      setUser(user)
      // ...
    })
    .catch((error) => {
      console.log(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
  };
  return (
    <Formik
      initialValues={{}}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, values, handleChange, touched, errors }) => {
        return (
          <>
            <FormContainer>
              <Logo src={logo} className="App-logo" alt="Min App Logo" />
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
