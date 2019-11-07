import React from 'react';

export default class PostEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClose, false);
  }

  handleClose(event) {
    let node = document.querySelector('.edit-input-container');
    if (node.contains(event.target)) {
      return;
    }
    this.props.onCancel();
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    let target = event.target.id;
    this.props.edit(this.props.id, target, this.state.value);
    this.props.onCancel();
  }

  render() {
    return (
      <td align="left">
        <div className="edit-input-container">
          <input id={this.props.field} className="edit-input" type={this.props.type} value={this.state.company} onChange={this.onChange} />
          <div id={this.props.field} className="edit button" onClick={this.onSubmit}>Submit</div>
          <div id={this.props.field} className="edit button" onClick={this.props.onCancel}>Cancel</div>
        </div>
      </td>
    );
  }
}
