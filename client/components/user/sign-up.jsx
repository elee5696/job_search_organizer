import React from 'react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpView: true,
      email: '',
      name: '',
      pass: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  toggleView() {
    this.setState({ signUpView: !this.state.signUpView });
  }

  onSubmit(event) {
    event.preventDefault();
    let data = {
      email: this.state.email,
      username: this.state.name,
      pass: this.state.pass };
    this.props.addUser(data);
    this.setState({
      email: '',
      name: '',
      pass: ''
    });
  }

  onLogin(event) {
    event.preventDefault();
    let data = {
      username: this.state.name,
      pass: this.state.pass
    };
    this.props.getUser(data);
    this.setState({
      email: '',
      name: '',
      pass: ''
    });
  }

  render() {
    return (
      <div className="body-container">
        {
          this.state.signUpView
            ? <div className="signup container">
              <div className="signup-header">
                <h2>Create an account to get started</h2>
              </div>
              <div className="signup form">
                <form>
                  <label>Username</label>
                  <input id="name" onChange={this.onChange} type="text" />
                  <label>Email</label>
                  <input id="email" onChange={this.onChange} type="email" />
                  <label>Password</label>
                  <input id="pass" onChange={this.onChange} type="password" />
                  <div className="submit button" onClick={this.onSubmit}><div>Submit</div></div>
                </form>
              </div>
              <div className="toggle-text"><h2>Or Log in</h2>
                <div className="toggle-view button" onClick={this.toggleView}><div>Log in</div></div>
              </div>
            </div>
            : <div className="login container">
              <div className="signup-header">
                <h2>Please Log In</h2>
              </div>
              <div className="login form">
                <form>
                  <label>Username</label>
                  <input id="name" value={this.state.name} onChange={this.onChange} type="text" />
                  <label>Password</label>
                  <input id="pass" value={this.state.pass} onChange={this.onChange} type="password" />
                  <div className="submit button" onClick={this.onLogin}><div>Log in</div></div>
                </form>
                <div className="toggle-text"><h2>Back to Sign-up</h2>
                  <div className="toggle-view button" onClick={this.toggleView}><div>Sign Up</div></div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}
