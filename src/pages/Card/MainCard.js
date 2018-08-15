import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MainCard = ({ data }) => (
  <div className="main-card">
    {data.loading ? (
      <div>Loading</div>
    ) : (
      <div className="list-container">
        Card Name : {data.getCard.name}
        <ul className="list-items">
          {data.getCard.lists.map(list => (
            <li key={list._id} className="list-item">
              <a>{list.name}</a>
              <div>{list.description}</div>
            </li>
          ))}
        </ul>
      </div>
    )}{' '}
    hola 2
  </div>
);

const cardQuery = gql`
  query($_id: ID!) {
    getCard(_id: $_id) {
      _id
      name
      lists {
        _id
        name
        description
        expirationDate
        createdAt
        updatedAt
      }
      owner {
        email
      }
      team {
        _id
        name
        members {
          _id
          role
          user {
            _id
            username
            email
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default graphql(cardQuery, {
  options: ({
    match: {
      params: { id },
    },
  }) => ({ variables: { _id: id } }),
})(MainCard);
