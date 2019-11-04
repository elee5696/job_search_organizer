import React from 'react';

export default class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.name}</th>
        <th scope="row">{this.props.course}</th>
        <th scope="row">{this.props.grade}</th>
        <th scope="row">
          <button
            className="btn btn-danger"
            onClick={this.deleteHandler}>Delete</button>
          <button
            className="btn btn-secondary"
            onClick={this.updateHandler}>Update</button>
        </th>
      </tr>
    );
  }

  deleteHandler(event) {
    this.props.delete(this.props.studentId);
  }

  updateHandler() {
    let currentStudent = {
      id: this.props.studentId,
      name: this.props.name,
      course: this.props.course,
      grade: this.props.grade
    };

    this.props.getData(currentStudent);
  }
}
