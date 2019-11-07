import React from 'react';
import PostEditForm from './post-edit-form';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: ''
    };
    this.delete = this.delete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel(event) {
    this.setState({ edit: '' });
  }

  delete() {
    this.props.delete(this.props.id);
  }

  toggleEdit(event) {
    this.setState({ edit: event.target.id });
  }

  render() {
    return (
      <tr>
        {
          this.state.edit === 'company'
            ? <PostEditForm
              id={this.props.id}
              field="company"
              type="text"
              edit={this.props.edit}
              onCancel={this.onCancel}/>
            : <td className="post-entry" id="company" align="left" onDoubleClick={this.toggleEdit}>{this.props.company}</td>
        }
        {
          this.state.edit === 'date_applied'
            ? <PostEditForm
              id={this.props.id}
              field="date_applied"
              type="date"
              edit={this.props.edit}
              onCancel={this.onCancel} />
            : <td className="post-entry" id="date_applied" align="left" onDoubleClick={this.toggleEdit}>{this.props.dateApplied}</td>
        }
        {
          this.state.edit === 'response_date'
            ? <PostEditForm
              id={this.props.id}
              field="response_date"
              type="date"
              edit={this.props.edit}
              onCancel={this.onCancel} />
            : <td className="post-entry" id="response_date" align="left" onDoubleClick={this.toggleEdit}>{this.props.responseDate}</td>
        }
        <td align="left">
          <div className="functions container">
            <div className="delete button" onClick={this.delete}>Delete</div>
            <div className="expand button" onClick={this.expand}>Expand</div>
          </div>
        </td>
      </tr>
    );
  }
}
