import React from 'react';

export default class PostEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.add(this.state.name, this.state.date);
    this.setState({
      name: '',
      date: ''
    });
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div className="post-form container">
        <form className="post-form">
          <label>Company Name</label>
          <input type="text" id="name" onChange={this.onChange} value={this.state.name}/>
          <label>Date Applied</label>
          <input type="date" id="date" onChange={this.onChange} value={this.state.date}/>
          <div className="post-form button" onClick={this.onSubmit}>Enter</div>
        </form>
      </div>
    );
  }
}
