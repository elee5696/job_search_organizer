import React from 'react';
import PostEntryForm from './post/post-entry-form';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClose, false);
  }

  handleClose(event) {
    let node = document.querySelector('.post-form.container.modal');
    if (node.contains(event.target)) {
      return;
    }
    this.props.toggleAddModal();
  }

  render() {
    return (
      <div className="modal-container">
        <PostEntryForm modal={true} add={this.add} />
      </div>
    );
  }
}
