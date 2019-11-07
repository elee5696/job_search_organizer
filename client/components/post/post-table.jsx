import React from 'react';
import Post from './post';

export default class PostTable extends React.Component {
  render() {
    return (
      <div className="post container">
        <table className="post-table">
          <tr>
            <th align="left">Company</th>
            <th align="left">Date Applied</th>
            <th align="left">Response</th>
          </tr>
          {
            this.props.jobs.map(job => {
              return (
                <Post
                  key={job.id}
                  id={job.id}
                  company={job.company}
                  dateApplied={job.date_applied}
                  responseDate={job.response_date}
                  delete={this.props.delete} />
              );
            })
          }
        </table>
      </div>
    );
  }
}
