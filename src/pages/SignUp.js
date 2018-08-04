import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

const SignUp = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleBlur,
}) => (
  <div className="form-box">
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          name="fullName"
          placeholder="fullName"
          value={values.fullName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {Object.keys(errors).length ? (
          <div className="message-error">
            <ul className="list">
              {Object.keys(errors).map(e => (
                <li key={e}>{errors[e]}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <button type="submit" disabled={isSubmitting}>
          SignUp
        </button>
      </form>
      <p>
        Already have an account? <Link to="login">LogIn</Link>
      </p>
    </div>
  </div>
);

const signupMutation = gql`
  mutation(
    $email: String!
    $password: String!
    $username: String!
    $fullName: String!
  ) {
    signup(
      email: $email
      username: $username
      fullName: $fullName
      password: $password
    ) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(signupMutation),
  withFormik({
    mapPropsToValues: () => ({
      email: '',
      username: '',
      fullName: '',
      password: '',
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password need to be longer'),
      fullName: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
    }),
    handleSubmit: async (
      values,
      { props: { mutate, history }, setSubmitting, resetForm, setErrors },
    ) => {
      const {
        data: { signup },
      } = await mutate({
        variables: {
          email: values.email,
          username: values.username,
          fullName: values.fullName,
          password: values.password,
        },
      });
      const { ok, token, refreshToken, errors } = signup;
      if (ok) {
        setSubmitting(false);
        resetForm(true);
        localStorage.setItem('x-token', token);
        localStorage.setItem('x-refresh-token', refreshToken);
      } else {
        setSubmitting(false);
        const err = [];

        errors.forEach(({ message }) => {
          err.push(message);
        });
        setErrors(err);
      }
    },
  }),
)(SignUp);
