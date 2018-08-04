import React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const Login = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  errors,
}) => (
  <div className="form-box">
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <Link to="resetPassword" className="resetPassword">
          forgot the password ?
        </Link>
        {Object.keys(errors).length ? (
          <div className="message-error">
            <ul className="list">
              {Object.keys(errors).map(e => (
                <li key={e}>{errors[e]}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="Sign-up">Sign Up</Link>
      </p>
    </div>
  </div>
);

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        message
        path
      }
    }
  }
`;

export default compose(
  graphql(loginMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    handleSubmit: async (
      values,
      { props: { mutate, history }, setSubmitting, resetForm, setErrors },
    ) => {
      const {
        data: { login },
      } = await mutate({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const { ok, token, refreshToken, errors } = login;
      if (ok) {
        localStorage.setItem('x-token', token);
        localStorage.setItem('x-refresh-token', refreshToken);
        history.push('/');
        resetForm(true);
        setSubmitting(false);
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
)(Login);
