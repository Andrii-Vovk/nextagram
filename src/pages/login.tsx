import { Formik, Form } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import * as Yup from "yup";

import one from "../../public/images/1.png";
import two from "../../public/images/2.png";
import three from "../../public/images/3.png";
import mockup from "../../public/images/phone-mockup.png";
import { login, signUp } from "../core/store/authSlice/thunks";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import Navbar from "../ui/components/Navbar/Navbar";
import FormInput from "../ui/components/common/input/FormInput";
import Spinner from "../ui/components/spinner/Spinner";
import buttons from "../ui/style/buttons.module.scss";
import styles from "../ui/style/login.module.scss";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(32, "Too Long!")
    .required("Please, enter your password"),
});

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(32, "Too Long!")
    .required("Please, enter your password"),
  username: Yup.string()
    .min(3, "Too Short!")
    .max(16, "Too Long!")
    .required("Please, enter your username")
    .matches(/^[a-z0-9_-]{3,16}$/, "Username contains invalid symbols!"),
});

interface LoginInitialValue {
  email: string;
  password: string;
}

interface SignUpInitialValue extends LoginInitialValue {
  username: string;
}

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  function switchAndClearStates() {
    setIsSignUp(!isSignUp);
  }

  const initialValues: LoginInitialValue = {
    email: "",
    password: "",
  };

  const signUpinitialValues: SignUpInitialValue = {
    email: "",
    password: "",
    username: "",
  };

  return (
    <>
      <Navbar variant="LoginPage" />
      <div className={styles.loginWrapper}>
        <div className={styles.mockup}>
          <Image src={mockup} alt="phone withs photos" />
          <div className={styles.one}>
            <Image src={one} alt="phone withs photos" />
          </div>
          <div className={styles.two}>
            <Image src={two} alt="phone withs photos" />
          </div>
          <div className={styles.three}>
            <Image src={three} alt="phone withs photos" />
          </div>
        </div>
        <div className={styles.loginForm}>
          {!isSignUp && (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                validateOnChange
                validateOnBlur
                onSubmit={(values) => {
                  dispatch(
                    login({ login: values.email, password: values.password })
                  );
                }}
              >
                {() => (
                  <Form>
                    <h1>Log In</h1>

                    <FormInput
                      type="email"
                      labelText="Email"
                      placeholder="email@mail.com"
                      name="email"
                    />
                    <FormInput
                      type="password"
                      labelText="Password"
                      placeholder="Your password"
                      name="password"
                    />

                    <button className={buttons.blueBtn} type="submit">
                      Submit
                    </button>
                    {authStatus === "pending" && <Spinner />}
                    {authStatus === "error" && <Spinner error />}
                  </Form>
                )}
              </Formik>

              <div className={styles.signUpLinks}>
                <span className="subtext">Dont have an account?</span>
                <button
                  onClick={() => switchAndClearStates()}
                  className="pseudolink"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {isSignUp && (
            <>
              <Formik
                initialValues={signUpinitialValues}
                validationSchema={SignUpSchema}
                validateOnChange
                validateOnBlur
                onSubmit={(values) => {
                  dispatch(
                    signUp({
                      login: values.email,
                      username: values.username,
                      password: values.password,
                    })
                  );
                }}
              >
                {() => (
                  <Form>
                    <h1>Sign Up</h1>

                    <FormInput
                      type="email"
                      labelText="Email"
                      placeholder="email@mail.com"
                      name="email"
                    />
                    <FormInput
                      type="text"
                      labelText="Username"
                      placeholder="Your password"
                      name="username"
                    />
                    <FormInput
                      type="password"
                      labelText="Password"
                      placeholder="Alex..."
                      name="password"
                    />

                    <button className={buttons.blueBtn} type="submit">
                      Submit
                    </button>
                    {authStatus === "pending" && <Spinner />}
                    {authStatus === "error" && <Spinner error />}
                  </Form>
                )}
              </Formik>

              <div className="sign-up-links">
                <span className="subtext">Already have an account?</span>
                <button
                  onClick={() => switchAndClearStates()}
                  className="pseudolink"
                  type="button"
                >
                  Log In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
