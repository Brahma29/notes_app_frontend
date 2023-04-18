import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LoginValues } from '../interfaces/FormValues';
import { loginUser } from '../redux/reducers/authReducer';
import { useAppDispatch } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

//SCHEMA TO VALIDATE THE FIELDS
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required'),
  password: Yup.string().required('Password is required.'),
});

//INITIAL VALUES OF THE FORM
const initialValues: LoginValues = {
  email: '',
  password: '',
};

//MAIN COMPONENT
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  const userLogin = (values: LoginValues) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <section>
      <div className="container ">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => userLogin(values)}
        >
          {() => (
            <Form className="col-md-4 mx-auto py-5 mt-md-5 col-12">
              <h2 className="mb-4">LOGIN</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
                <div className="text-danger">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                />
                <div className="text-danger">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="mb-3 d-flex">
                <p className="form-check-label">Don't have an account?</p>
                <Link to="/signup" className="ms-2">
                  Register
                </Link>
              </div>
              <button type="submit" className="btn btn-primary">
                Let's Go
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
