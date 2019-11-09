import React from 'react';
import Post from './post';
import PostTableHeader from './post-table-header';

export default class PostTable extends React.Component {
  render() {
    return (
      <div className="post container">
        <table className="post-table">
          <tr>
            <PostTableHeader sort={this.props.sort} value="Company" field="company" />
            <PostTableHeader sort={this.props.sort} value="Applied" field="date_applied" />
            <PostTableHeader sort={this.props.sort} value="Response" field="response_date" />
            <th align="left">Functions</th>
          </tr>
          {
            this.props.jobs.map(job => {
              return (
                <Post
                  key={job.id}
                  job={job}
                  deleteModalView={this.props.deleteModalView}
                  callbacks={{ edit: this.props.edit, delete: this.props.delete, toggleDelete: this.props.toggleDeleteModal }} />
              );
            })
          }
        </table>
      </div>
    );
  }
}
