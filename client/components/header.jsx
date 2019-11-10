import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header container">
        <div className="logo container">Job Search</div>
        <div className="navigation container">
          <div className="nav-icon container">
            <i className="fas fa-bars"></i>
          </div>
          <ul className="navigation-list">
            <li className="navigation-list-item" onClick={this.props.logOut}>Sign-Out</li>
          </ul>
        </div>
      </div>
    );
  }
}
