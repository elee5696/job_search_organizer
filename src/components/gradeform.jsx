import React from 'react';

export default class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: '',
      formCourse: '',
      formGrade: '',
      formButton: 'Add'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render() {
    let name = this.state.formName;
    let course = this.state.formCourse;
    let grade = parseInt(this.state.formGrade);
    let callback;

    if (this.state.formButton === 'Add') {
      callback = this.handleAdd;
    } else {
      callback = this.handleUpdate;
    }

    return (
      <form className="col col-2">
        <div className="form-group">
          <input
            type="text"
            value={name}
            className="form-control"
            id="nameInput"
            placeholder="Name"
            onChange={this.handleChange}/>
          <input
            type="text"
            value={course}
            className="form-control"
            id="courseInput"
            placeholder="Course"
            onChange={this.handleChange}/>
          <input
            type="number"
            value={grade}
            className="form-control"
            id="gradeInput"
            placeholder="Grade"
            onChange={this.handleChange}/>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={callback}>{this.state.formButton}</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.handleCancel}>Cancel</button>
      </form>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.updatedStudent !== prevProps.updatedStudent) {
      this.setState({
        formName: this.props.updatedStudent.name,
        formCourse: this.props.updatedStudent.course,
        formGrade: parseInt(this.props.updatedStudent.grade),
        formButton: 'Update'
      });
    }
  }

  handleChange(event) {
    switch (event.target.id) {
      case 'nameInput':
        this.setState({ formName: event.target.value });
        break;
      case 'courseInput':
        this.setState({ formCourse: event.target.value });
        break;
      case 'gradeInput':
        this.setState({ formGrade: parseInt(event.target.value) });
        break;
      default:
        throw new Error('Form entry broken');
    }
  }

  handleAdd() {
    event.preventDefault();
    const newStudent = {
      'name': this.state.formName,
      'grade': this.state.formGrade,
      'course': this.state.formCourse
    };
    this.props.addCallback(newStudent);
    this.handleCancel();
  }

  handleCancel() {
    event.preventDefault();
    this.setState({
      formName: '',
      formCourse: '',
      formGrade: '',
      formButton: 'Add'
    });
  }

  handleUpdate() {
    this.props.updateCallback({
      id: this.props.updatedStudent.id,
      name: this.state.formName,
      course: this.state.formCourse,
      grade: this.state.formGrade
    });
    this.handleCancel();
  }
}
