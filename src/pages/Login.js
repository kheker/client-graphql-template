import React from 'react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Login = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  errors,
}) => (
  <div>
    <form>
      <input
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button disabled={isSubmitting} onClick={handleSubmit}>
        Login
      </button>
    </form>
    {errors.length > 0 ? (
      <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
    ) : null}
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
    handleSubmit: async (
      values,
      { props, setSubmitting, resetForm, setErrors },
    ) => {
      const {
        data: { login },
      } = await props.mutate({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const { ok, token, refreshToken, errors } = login;
      if (ok) {
        localStorage.setItem('x-token', token);
        localStorage.setItem('x-refresh-token', refreshToken);
        props.history.push('/');
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
