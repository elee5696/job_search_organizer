import React from 'react';
import Header from './header';
import GradeTable from './gradetable';
import GradeForm from './gradeform';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      updatedStudent: ''
    };
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.getDataFromGrade = this.getDataFromGrade.bind(this);
  }

  render() {
    return (
      <>
      <div className="header-section container-fluid ">
        <Header average={this.getAverageGrade()}/>
      </div>
      <div className="grade-section container-fluid">
        <div className="row">
          <GradeTable
            grades={this.state.grades}
            deleteCallback={this.deleteStudent}
            getDataCallback={this.getDataFromGrade}
          />
          <GradeForm
            addCallback={this.addStudent}
            updatedStudent={this.state.updatedStudent}
            updateCallback={this.updateStudent}/>
        </div>
      </div>
      </>
    );
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(gradesJSON => {
        this.setState({ grades: gradesJSON.data });
      })
      .catch(e => { throw new Error('Fetch Failed!: Get Students', e); });
  }

  addStudent(newStudent) {
    let newGrades = [...this.state.grades];
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    })
      .then(res => res.json())
      .then(newStudentJSON => {
        newGrades.push(newStudentJSON.data);
        this.setState({ grades: newGrades });
      })
      .catch(e => { throw new Error('Fetch Failed!: Add Student', e); });
  }

  getAverageGrade() {
    let gradeList = [...this.state.grades];
    let gradeTotal = 0;

    gradeList.forEach(e => {
      gradeTotal += e.grade;
    });

    return (gradeTotal / gradeList.length).toFixed(2);
  }

  deleteStudent(studentID) {
    let currentState = [...this.state.grades];

    fetch(`/api/grades/${studentID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        let deletedState = currentState.filter(e => e.id !== studentID);
        this.setState({ grades: deletedState });
      })
      .catch(e => { throw new Error('Fetch Failed!: Delete Student', e); });
  }

  updateStudent(student) {
    let newState = [...this.state.grades];

    fetch(`/api/grades/${student.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'grade': student.grade })
    })
      .then(res => res.json())
      .then(updateJSON => {
        newState = newState.map(e => {
          if (e.id === student.id) {
            return updateJSON;
          }
          return e;
        });
        this.setState({ grades: newState });
      })
      .catch(e => { throw new Error('Fetch Failed!: Update Student', e); });
  }

  getDataFromGrade(studentData) {
    this.setState({ updatedStudent: studentData });
  }
}

export default App;
