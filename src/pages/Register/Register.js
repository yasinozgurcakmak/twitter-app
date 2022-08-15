import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAction } from "../../store/actionCreators";
import s from "./Register.module.scss";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import * as yup from "yup";
import { Formik, Form, Field } from "formik";

const registerFormSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values) => {
    await dispatch(registerAction(values));
    navigate("/");
  };
  return (
    <div className={s.registerWrapper}>
      <Card padding>
        <h1>Register Page</h1>

        <div>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={register}
            validationSchema={registerFormSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={Input}
                  label="Username"
                  placeholder="Enter your username..."
                  name="username"
                />

                <Field
                  as={Input}
                  label="Email"
                  placeholder="Enter your email..."
                  name="email"
                  type="email"
                />

                <Field
                  as={Input}
                  label="Password"
                  placeholder="Enter your password..."
                  name="password"
                  type="password"
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="regular"
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
}

export default Register;
