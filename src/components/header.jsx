import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header-container row container-fluid mt-3">
        <h1 className="col col-7">Student Grade Table
        </h1>
        <h2 className="col col-3 average-grade-text">Average Grade
          <span className="badge badge-secondary ml-3">{this.props.average}</span>
        </h2>
      </div>
    );
  }
}
