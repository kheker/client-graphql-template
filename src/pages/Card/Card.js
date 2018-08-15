import React from 'react';

export default ({ card }) => (
  <div className="card">
    <div className="card-content">
      <div className="card-name">{card.name}</div>
      <div className="card-description">{card.description}</div>
      <div className="card-meta">{card.createdAt}</div>
    </div>
  </div>
);
