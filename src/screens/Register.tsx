import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpValues } from '../interfaces/FormValues';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../redux/hooks';
import { registerUser } from '../redux/reducers/authReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

//FORM VALIDATION SCHEMA
const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full Name must be at least 3 characters.')
    .max(40, 'Full name cannot be more than 40 characters.')
    .required('Full Name is required'),
  email: Yup.string()
    .email('please enter a valid email.')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be atleast 8 characters.')
    .required('Password is required'),
  cnfPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

//INITIAL VALUES OF THE FORM
const initialValues: SignUpValues = {
  fullName: '',
  email: '',
  password: '',
  cnfPassword: '',
};

//MAIN COMPONENT
const Register: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  const userRegister = (values: SignUpValues) => {
    dispatch(registerUser(values));
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
          validationSchema={signUpSchema}
          onSubmit={(values, actions) => {
            userRegister(values);
          }}
        >
          {() => (
            <Form className="col-md-4 mx-auto py-5 mt-md-5 col-12">
              <h2 className="mb-4">SIGN UP</h2>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  className="form-control"
                  id="fullName"
                />
                <div className="text-danger">
                  <ErrorMessage name="fullName" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
                <div className="text-danger">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
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
              <div className="mb-3">
                <label htmlFor="cnfPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="cnfPassword"
                  className="form-control"
                  id="cnfPassword"
                />
                <div className="text-danger">
                  <ErrorMessage name="cnfPassword" />
                </div>
              </div>
              <div className="mb-3 d-flex">
                <p className="form-check-label">Already have an account?</p>
                <Link to="/login" className="ms-2">
                  Login
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

export default Register;
