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
    this.toggleBoolean = this.toggleBoolean.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.onQuestionEdit = this.onQuestionEdit.bind(this);
    this.onQuestionDelete = this.onQuestionDelete.bind(this);
  }

  onCancel(event) {
    this.setState({ edit: '' });
  }

  handleDelete() {
    this.props.callbacks.toggleDelete(this.props.job.id);
  }

  toggleEdit(event) {
    this.setState({ edit: event.target.id });
  }

  toggleBoolean(event) {
    let currentVal = this.props.job[event.target.id];
    this.props.callbacks.edit(this.props.job.id, event.target.id, !currentVal);
  }

  handleExpand() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  onQuestionDelete(event) {
    let questions = [...this.props.job.interview_questions];
    let key = parseInt(event.target.id.slice(event.target.id.length - 1));
    questions = questions.filter((e, i) => i !== key);
    this.props.callbacks.edit(this.props.job.id, 'interview_questions', questions.join(','));
  }

  onQuestionEdit(id, field, value) {
    if (field === 'interview_questions') {
      let questions = [...this.props.job.interview_questions];
      questions.push(value);
      this.props.callbacks.edit(id, 'interview_questions', questions.join(','));
    } else {
      let questions = [...this.props.job.interview_questions];
      let key = field.slice(field.length - 1);
      questions[parseInt(key)] = value;
      this.props.callbacks.edit(id, 'interview_questions', questions.join(','));
    }
  }

  render() {
    return (
      <>
        <tr>
          {
            this.state.edit === 'company'
              ? <PostEditForm
                data={{ id: this.props.job.id, field: 'company', type: 'text', value: this.props.job.company }}
                callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }}/>
              : <td className="post-entry" id="company" align="left" onClick={this.toggleEdit}>{this.props.job.company}</td>
          }
          {
            this.state.edit === 'date_applied'
              ? <PostEditForm
                data={{ id: this.props.job.id, field: 'date_applied', type: 'date', value: this.props.job.date_applied }}
                callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
              : <td className="post-entry" id="date_applied" align="left" onClick={this.toggleEdit}>{this.props.job.date_applied}</td>
          }
          {
            this.state.edit === 'response_date'
              ? <PostEditForm
                data={{ id: this.props.job.id, field: 'response_date', type: 'date', value: this.props.job.response_date }}
                callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
              : <td className="post-entry" id="response_date" align="left" onClick={this.toggleEdit}>{this.props.job.response_date}</td>
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
            ? <tr>
              <td colSpan="4">
                <div className="post-expanded container">
                  <div className="left container">
                    <div className="post-expanded-entry">Phone:<div id="phone_interview" onClick={this.toggleBoolean}>{this.props.job.phone_interview ? 'True' : 'False'}</div></div>
                    <div className="post-expanded-entry">Onsite:<div id="onsite_interview" onClick={this.toggleBoolean}>{this.props.job.onsite_interview ? 'True' : 'False'}</div></div>
                    {
                      this.state.edit === 'salary'
                        ? <PostEditForm
                          data={{ id: this.props.job.id, field: 'salary', type: 'number', value: this.props.job.salary }}
                          callbacks={{ edit: this.props.callbacks.edit, onCancel: this.onCancel }} />
                        : <div className="post-expanded-entry">Salary:<div id="salary" onClick={this.toggleEdit}>{this.props.job.salary || 'None'}</div></div>
                    }
                  </div>
                  <div className="right container">
                    {
                      <div className="post-expanded-entry">Questions:
                        <div>
                          {
                            this.props.job.interview_questions !== null
                              ? <div>
                                {
                                  this.props.job.interview_questions.map((e, i) => {
                                    if (this.state.edit === 'question_' + i) {
                                      return (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                                          <div>{(i + 1) + '.'}</div>
                                          <PostEditForm
                                            data={{ id: this.props.job.id, field: 'question_' + i, type: 'text', value: e }}
                                            callbacks={{ edit: this.onQuestionEdit, onCancel: this.onCancel, delete: this.onQuestionDelete }} />
                                        </div>
                                      );
                                    }
                                    return (
                                      <div key={i} id={'question_' + i} onClick={this.toggleEdit}>
                                        {i + 1}.{e}
                                      </div>
                                    );
                                  })
                                }
                                <div>Add new question</div>
                                <PostEditForm
                                  data={{ id: this.props.job.id, field: 'interview_questions', type: 'text' }}
                                  callbacks={{ edit: this.onQuestionEdit, onCancel: this.onCancel }} />
                              </div>
                              : <div onClick={this.toggleEdit}>None</div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </td>
            </tr>
            : null
        }
      </>
    );
  }
}
