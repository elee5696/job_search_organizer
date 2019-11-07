import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  render() {
    return (
      <tr>
        <td align="left">{this.props.company}</td>
        <td align="left">{this.props.dateApplied}</td>
        <td align="left">{this.props.responseDate}</td>
        <td align="left">
          <div className="delete button" onClick={this.delete}>Delete</div>
        </td>
      </tr>
    );
  }
}
