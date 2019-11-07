import React from 'react';
import Post from './post';

export default class PostTable extends React.Component {
  render() {
    return (
      <div className="post container">
        <table className="post-table">
          <tr>
            <th align="left">Company</th>
            <th align="left">Applied</th>
            <th align="left">Response</th>
            <th align="left">Functions</th>
          </tr>
          {
            this.props.jobs.map(job => {
              return (
                <Post
                  key={job.id}
                  job={job}
                  callbacks={{ edit: this.props.edit, delete: this.props.delete }} />
              );
            })
          }
        </table>
      </div>
    );
  }
}
