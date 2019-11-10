import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header container">
        <div className="logo container">Job Search</div>
        <div className="navigation container">
          {
            this.props.user
              ? <ul className="navigation-list">
                <li className="navigation-list-item" onClick={this.props.logOut}>Sign-Out</li>
              </ul>
              : null
          }
        </div>
      </div>
    );
  }
}
