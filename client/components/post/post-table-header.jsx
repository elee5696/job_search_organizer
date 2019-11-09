import React from 'react';

export default class PostTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'asc'
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.sort(this.props.field, this.state.sort);
    if (this.state.sort === 'asc') {
      this.setState({ sort: 'desc' });
    } else {
      this.setState({ sort: 'asc' });
    }
  }

  render() {
    return (
      <th onClick={this.onClick} align="left">{this.props.value}</th>
    );
  }
}
