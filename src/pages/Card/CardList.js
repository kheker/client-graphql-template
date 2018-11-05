import React from 'react';

export default ({ list }) => (
  <div className="modal-list-container">
    <div className="list-header">
      <div className="list-title">{list.name}</div>
      <div className="list-description">{list.description}</div>
      <div className="list-content">
        <div className="list-task-container">tasks</div>
      </div>
    </div>
  </div>
);
