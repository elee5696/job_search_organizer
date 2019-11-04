import React from 'react';
import Grade from './grade';

export default class GradeTable extends React.Component {
  render() {
    const gradeList = [...this.props.grades];
    return (
      <table className="table col col-9 ml-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Course</th>
            <th scope="col">Grade</th>
            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            gradeList.map(e => {
              return (
                <Grade
                  key={e.id}
                  studentId={e.id}
                  name={e.name}
                  course={e.course}
                  grade={e.grade}
                  delete={this.props.deleteCallback}
                  getData={this.props.getDataCallback}/>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
