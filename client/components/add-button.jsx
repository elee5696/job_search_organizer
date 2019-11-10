import React from 'react';

export default class AddButton extends React.Component {
  render() {
    return (
      <div
        className="add-button-container"
        onClick={this.props.toggle}>+</div>
    );
  }
}
