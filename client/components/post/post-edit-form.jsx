import React from 'react';

export default class PostEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '' || this.props.data.value
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
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
    this.props.callbacks.onCancel();
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    let field = event.target.id;
    this.props.callbacks.edit(this.props.data.id, field, this.state.value);
    this.setState({ value: '' });
    this.props.callbacks.onCancel();
  }

  render() {
    return (
      <div className="edit-container">
        {
          this.props.data.field === 'salary'
            ? <div className="edit-input-header">
          Salary:
            </div>
            : null
        }
        <div className="edit-input-container">
          <input id={this.props.data.field} className="edit-input" type={this.props.data.type} value={this.state.value} onChange={this.onChange} />
          <div id={this.props.data.field} className="edit button" onClick={this.onSubmit}>Submit</div>
          <div id={this.props.data.field} className="edit button" onClick={this.props.callbacks.onCancel}>Cancel</div>
          {
            this.props.data.field.includes('question_')
              ? <div id={this.props.data.field} className="edit button" onClick={this.props.callbacks.delete}>Delete</div>
              : null
          }
        </div>
      </div>
    );
  }
}
