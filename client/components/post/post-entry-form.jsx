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
      <>
        {
          this.props.modal
            ? <div className="post-form container modal">
              <form className="post-form modal">
                <label>Company Name</label>
                <input type="text" id="name" onChange={this.onChange} value={this.state.name} required/>
                <label>Date Applied</label>
                <input type="date" id="date" onChange={this.onChange} value={this.state.date} required/>
                <div className="post-form button" onClick={this.onSubmit}>Enter</div>
              </form>
            </div>
            : <div className="post-form container large">
              <form className="post-form large">
                <label>Company Name</label>
                <input type="text" id="name" onChange={this.onChange} value={this.state.name} />
                <label>Date Applied</label>
                <input type="date" id="date" onChange={this.onChange} value={this.state.date} />
                <div className="post-form button" onClick={this.onSubmit}>Enter</div>
              </form>
            </div>
        }
      </>
    );
  }
}
