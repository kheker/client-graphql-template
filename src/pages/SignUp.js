import React from 'react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SignUp = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleBlur,
}) => (
  <div>
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
      <button type="submit" disabled={isSubmitting}>
        SignUp
      </button>
    </form>
    {errors.length > 0 ? (
      <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
    ) : null}
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
    handleSubmit: async (
      values,
      { props, setSubmitting, resetForm, setErrors },
    ) => {
      const {
        data: { signup },
      } = await props.mutate({
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
