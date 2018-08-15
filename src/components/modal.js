import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    const { children } = this.props;
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      children,
      // A DOM element
      this.el,
    );
  }
}

export default ({title, children, onShow}) => (
  <Modal>
  <div className="modal">
    <div className="modal-container">
      <div className="modal-title">
        <h2>{title}</h2>
      </div>
      <div className="modal-content">
        {children}
      </div>
      <button type="button" className="close" onClick={onShow}>
        &times;
      </button>
    </div>
  </div>
</Modal>
)