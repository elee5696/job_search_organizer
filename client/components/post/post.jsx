import React from 'react';

export default class Post extends React.Component {
  render() {
    return (
      <tr>
        <td align="left">{this.props.company}</td>
        <td align="left">{this.props.dateApplied}</td>
        <td align="left">{this.props.responseDate}</td>
      </tr>
    );
  }
}
