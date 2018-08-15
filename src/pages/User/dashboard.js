import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Modal from '../../components/modal';
import CreateCard from '../Card/createCard';
import Card from '../Card/Card';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onShow = () => this.setState(prevState => ({ show: !prevState.show }));

  onKeyDown = ({ keyCode }) => keyCode === 27 && this.onShow();

  render() {
    const { show } = this.state;
    const {
      data: { getMyCards = [] },
      data,
    } = this.props;
    if (data.loading) return null;

    const publicCardFilter = getMyCards.filter(
      card => (card.publicCard ? card : null),
    );

    const privateCardFilter = getMyCards.filter(
      card => (!card.publicCard ? card : null),
    );

    const privateCards = privateCardFilter.map(card => (
      <Link to={`/card/${card._id}`} key={card._id}>
        {' '}
        <Card card={card} />
      </Link>
    ));
    const publicCards = publicCardFilter.map(card => (
      <Link to={`/card/${card._id}`} key={card._id}>
        {' '}
        <Card card={card} />
      </Link>
    ));
    const mymodal = show ? (
      <Modal title="Create Card" onShow={this.onShow}>
        <CreateCard show={this.onShow} refetch={data.refetch} />
      </Modal>
    ) : null;
    return (
      <div className="dashboard">
        <div className="profile">
          {' '}
          perfil
          <button type="button" onClick={this.onShow}>
            show{' '}
          </button>
        </div>
        <div className="cards-container">
          {getMyCards.length === 0 ? (
            <div>you don have any card</div>
          ) : (
            <Fragment>
              <div className="card-grid public">
                <h3>Public Cards</h3>
                {publicCards}
              </div>
              <div className="card-grid private">
                <h3>Private Cards</h3>
                {privateCards}
              </div>
            </Fragment>
          )}
        </div>
        {mymodal}
      </div>
    );
  }
}

const allCards = gql`
  {
    getMyCards {
      _id
      name
      publicCard
    }
  }
`;

export default graphql(allCards)(Dashboard);
