import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: '',
      company: '',
      date_applied: '',
      response_date: ''
    };
    this.delete = this.delete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  toggleEdit(event) {
    this.setState({ edit: event.target.id });
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    let target = event.target.id;
    this.props.edit(this.props.id, target, this.state[target]);
    this.setState({ edit: '' });
  }

  onCancel(event) {
    this.setState({ edit: '', [event.target.id]: '' });
  }

  render() {
    return (
      <tr>
        {
          this.state.edit === 'company'
            ? <td align="left">
              <div className="cancel-input-container">
                <input id="company" className="cancel-input" type="text" value={this.state.company} onChange={this.onChange} />
                <div id="company" className="cancel button" onClick={this.onCancel}>Cancel</div>
                <div id="company" className="cancel button" onClick={this.onSubmit}>Submit</div>
              </div>
            </td>
            : <td className="post-entry" id="company" align="left" onDoubleClick={this.toggleEdit}>{this.props.company}</td>
        }
        {
          this.state.edit === 'date_applied'
            ? <td align="left">
              <div className="cancel-input-container">
                <input id="date_applied" className="cancel-input" type="date" value={this.state.date_applied} onChange={this.onChange} />
                <div id="date_applied" className="cancel button" onClick={this.onCancel}>Cancel</div>
                <div id="date_applied" className="cancel button" onClick={this.onSubmit}>Submit</div>
              </div>
            </td>
            : <td className="post-entry" id="date_applied" align="left" onDoubleClick={this.toggleEdit}>{this.props.dateApplied}</td>
        }
        {
          this.state.edit === 'response_date'
            ? <td align="left">
              <div className="cancel-input-container">
                <input id="response_date" className="cancel-input" type="date" value={this.state.response_date} onChange={this.onChange} />
                <div id="response_date" className="cancel button" onClick={this.onCancel}>Cancel</div>
                <div id="response_date" className="cancel button" onClick={this.onSubmit}>Submit</div>
              </div>
            </td>
            : <td className="post-entry" id="response_date" align="left" onDoubleClick={this.toggleEdit}>{this.props.responseDate}</td>
        }
        <td align="left">
          <div className="functions container">
            <div className="delete button" onClick={this.delete}>Delete</div>
            <div className="expand button" onClick={this.delete}>Expand</div>
          </div>
        </td>
      </tr>
    );
  }
}
