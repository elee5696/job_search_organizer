import React from 'react';

export default class PostDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    this.props.toggleDeleteModal();
  }

  onConfirm() {
    this.props.delete(this.props.id);
  }

  render() {
    return (
      <div className="delete modal-container">
        <div className="delete modal container">
          <div>Delete this post?</div>
          <div className="container">
            <div className="button" onClick={this.onConfirm}>Confirm</div>
            <div className="button" onClick={this.onCancel}>Cancel</div>
          </div>
        </div>
      </div>
    );
  }
}
