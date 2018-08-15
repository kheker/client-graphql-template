import React, { Component, Fragment } from 'react';
import * as Yup from 'yup';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class createCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      publicCard: false,
      errors: [],
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  toggleCheckbox = () => this.setState({ publicCard: !this.state.publicCard });

  handleSubmit = async e => {
    e.preventDefault();
    const { name, publicCard } = this.state;
    const { mutate, show, refetch } = this.props;
    try {
      const {
        data: { createCard },
        data,
      } = await mutate({
        variables: { name, publicCard },
      });
      const { ok, errors, card } = createCard;
      if (ok) {
        this.setState({ errors: [] });
        await refetch();
        show();
      } else {
        const err = [];

        errors.forEach(({ message }) => {
          err.push(message);
        });
        this.setState({ errors: err });
        // this.setState({ errors });
      }
    } catch (err) {
      console.log(err.graphQLErrors.map(error => error.message));
    }
  };

  render() {
    const { name, publicCard, errors } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name card"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="public">Public card</label>
          <input
            id="public"
            type="checkbox"
            name="publicCard"
            value={publicCard}
            checked={publicCard}
            onChange={this.toggleCheckbox}
          />
          {errors.length ? errors.map(err => <div key={err}>{err}</div>) : null}
          <button type="submit">Create card</button>
        </form>
      </Fragment>
    );
  }
}

const createCardMutation = gql`
  mutation($name: String!, $publicCard: Boolean) {
    createCard(name: $name, publicCard: $publicCard) {
      ok
      card {
        _id
        name
        publicCard
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createCardMutation)(createCard);
