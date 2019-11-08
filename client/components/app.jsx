import React from 'react';
import Header from './header';
import PostTable from './post/post-table';
import PostEntryForm from './post/post-entry-form';
import AddButton from './add-button';
import AddModal from './add-modal';
import moment from 'moment';
import Signup from './user/sign-up';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      addModal: false,
      user: ''
    };
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const activeSession = window.sessionStorage.getItem('user');
    if (activeSession) {
      this.setState(
        { user: JSON.parse(activeSession).id },
        () => this.getData(JSON.parse(activeSession).id)
      );
    }
  }

  getData(id) {
    fetch('/api/jobs/' + id)
      .then(res => res.json())
      .then(json => {
        this.setState({
          jobs: json.data
        });
      })
      .catch(err => console.error(err));
  }

  toggleAddModal() {
    this.setState({ addModal: !this.state.addModal });
  }

  add(name, date) {
    let jobs = [...this.state.jobs];

    fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ name: name, date: date, id: this.state.user }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        jobs.push(json.data);
        this.setState({
          jobs: jobs
        });
      })
      .catch(err => console.error(err));
  }

  delete(id) {
    let jobs = [...this.state.jobs];

    fetch('/api/jobs/' + id, { method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        jobs = jobs.filter(e => e.id !== id);
        this.setState({ jobs: jobs });
      })
      .catch(err => console.error(err));
  }

  edit(id, field, value) {
    let jobs = [...this.state.jobs];

    fetch('/api/jobs/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: field, value: value })
    })
      .then(res => res.json())
      .then(json => {
        if (field === 'response_date' || field === 'date_applied') {
          value = moment(value, 'YYYY-MM-DD').format('MM-DD-YY');
        }
        jobs = jobs.map(e => {
          if (e.id === id) {
            e[field] = value;
          }
          return e;
        });
        this.setState({ jobs: jobs });
      })
      .catch(err => console.error(err));
  }

  getUser(data) {
    fetch('/api/jobs/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          window.sessionStorage.setItem('user', JSON.stringify(json.data));
          this.setState(
            { user: json.data.id },
            () => this.getData(json.data.id)
          );
        }
      })
      .catch(err => console.error(err));
  }

  addUser(data) {
    fetch('/api/jobs/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          window.sessionStorage.setItem('user', JSON.stringify(json.data));
          this.setState(
            { user: json.data.id },
            () => this.getData(json.data.id)
          );
        }
      })
      .catch(err => console.error(err));
  }

  logOut() {
    window.sessionStorage.removeItem('user');
    this.setState({
      loggedIn: false,
      jobs: []
    });
  }

  render() {
    return (
      <>
        <Header logOut={this.logOut}/>
        {
          this.state.addModal
            ? <AddModal add={this.add} toggleAddModal={this.toggleAddModal}/>
            : null
        }
        <div className="main container">
          {
            !window.sessionStorage.getItem('user')
              ? <Signup addUser={this.addUser} getUser={this.getUser}/>
              : <>
                <PostTable
                  jobs={this.state.jobs}
                  delete={this.delete}
                  edit={this.edit} />
                <PostEntryForm
                  add={this.add} />
              </>
          }
          {
            this.state.addModal || !window.sessionStorage.getItem('user')
              ? null
              : <AddButton
                add={this.add}
                toggle={this.toggleAddModal} />
          }
        </div>
      </>
    );
  }
}
