import React from 'react';
import PostEditForm from './post-edit-form';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: '',
      isExpanded: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  onCancel(event) {
    this.setState({ edit: '' });
  }

  handleDelete() {
    this.props.callbacks.delete(this.props.job.id);
  }

  toggleEdit(event) {
    this.setState({ edit: event.target.id });
  }

  handleExpand() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    return (
      <>
        <tr>
          {
            this.state.edit === 'company'
              ? <PostEditForm
                data={{ id: this.props.job.id, field: 'company', type: 'text' }}
                callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }}/>
              : <td className="post-entry" id="company" align="left" onDoubleClick={this.toggleEdit}>{this.props.job.company}</td>
          }
          {
            this.state.edit === 'date_applied'
              ? <PostEditForm
                data={{ id: this.props.job.id, field: 'date_applied', type: 'date' }}
                callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
              : <td className="post-entry" id="date_applied" align="left" onDoubleClick={this.toggleEdit}>{this.props.job.date_applied}</td>
          }
          {
            this.state.edit === 'response_date'
              ? <PostEditForm
                data={{ id: this.props.job.id, field: 'response_date', type: 'date' }}
                callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
              : <td className="post-entry" id="response_date" align="left" onDoubleClick={this.toggleEdit}>{this.props.job.response_date}</td>
          }
          <td align="left">
            <div className="functions container">
              <div className="delete button" onClick={this.handleDelete}>Delete</div>
              <div className="expand button" onClick={this.handleExpand}>Expand</div>
            </div>
          </td>
        </tr>
        {
          this.state.isExpanded
            ? <div className="post-expanded container">
              {
                this.state.edit === 'phone_interview'
                  ? <PostEditForm
                    data={{ id: this.props.job.id, field: 'phone_interview', type: 'text' }}
                    callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
                  : <div className="post-expanded-entry">Phone:<div id="phone_interview" onDoubleClick={this.toggleEdit}>{this.props.job.phone_interview ? 'True' : 'False'}</div></div>
              }
              {
                this.state.edit === 'onsite_interview'
                  ? <PostEditForm
                    data={{ id: this.props.job.id, field: 'onsite_interview', type: 'text' }}
                    callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
                  : <div className="post-expanded-entry">Onsite:<div id="onsite_interview" onDoubleClick={this.toggleEdit}>{this.props.job.onsite_interview ? 'True' : 'False'}</div></div>
              }
              {
                this.state.edit === 'interview_questions'
                  ? <PostEditForm
                    data={{ id: this.props.job.id, field: 'interview_questions', type: 'text' }}
                    callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
                  : <div className="post-expanded-entry">Questions:<div id="interview_questions" onDoubleClick={this.toggleEdit}>{this.props.job.interview_questions || 'None'}</div></div>
              }
              {
                this.state.edit === 'salary'
                  ? <PostEditForm
                    data={{ id: this.props.job.id, field: 'salary', type: 'number' }}
                    callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
                  : <div className="post-expanded-entry">Offer:<div id="salary" onDoubleClick={this.toggleEdit}>{this.props.job.salary || 'None'}</div></div>
              }
            </div>
            : null
        }
      </>
    );
  }
}
