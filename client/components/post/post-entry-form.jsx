import React from 'react';

export default class PostEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true },
      date: { value: '', isValid: true }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    if (this.validate()) {
      this.props.add(this.state.name.value, this.state.date.value);
      this.setState({
        name: { value: '', isValid: true },
        date: { value: '', isValid: true }
      });
    }
  }

  validate() {
    let passed = true;
    for (let field in this.state) {
      if (!this.state[field].value) {
        this.setState({ [field]: { value: this.state[field].value, isValid: false } });
        passed = false;
      } else {
        this.setState({ [field]: { value: this.state[field].value, isValid: true } });
      }
    }
    return passed;
  }

  onChange(event) {
    this.setState({ [event.target.id]: { value: event.target.value, isValid: this.state[event.target.id].isValid } });
  }

  render() {
    return (
      <>
        {
          this.props.modal
            ? <div className="post-form container modal">
              <form className="post-form modal">
                <label>Company Name</label>
                <input type="text" id="name" onChange={this.onChange} value={this.state.name.value}/>
                {
                  this.state.name.isValid
                    ? null
                    : <label>Please enter a name</label>
                }
                <label>Date Applied</label>
                <input type="date" id="date" onChange={this.onChange} value={this.state.date.value}/>
                {
                  this.state.date.isValid
                    ? null
                    : <label>Please pick a date</label>
                }
                <div className="post-form button" onClick={this.onSubmit}>Enter</div>
              </form>
            </div>
            : <div className="post-form container large">
              <form className="post-form large">
                <label>Company Name</label>
                <input type="text" id="name" onChange={this.onChange} value={this.state.name.value}/>
                {
                  this.state.name.isValid
                    ? null
                    : <label>Please enter a name</label>
                }
                <label>Date Applied</label>
                <input type="date" id="date" onChange={this.onChange} value={this.state.date.value}/>
                {
                  this.state.date.isValid
                    ? null
                    : <label>Please pick a date</label>
                }
                <div className="post-form button" onClick={this.onSubmit}>Enter</div>
              </form>
            </div>
        }
      </>
    );
  }
}
