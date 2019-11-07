import React from 'react';
import Header from './header';
import PostTable from './post/post-table';
import PostEntryForm from './post/post-entry-form';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(json => {
        this.setState({
          jobs: json.data
        });
      })
      .catch(err => console.error(err));
  }

  add(name, date) {
    let jobs = [...this.state.jobs];

    fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ name: name, date: date }),
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

  render() {
    return (
      <>
        <Header/>
        <div className="main container">
          <PostTable
            jobs={this.state.jobs}
            delete={this.delete}
            edit={this.edit} />
          <PostEntryForm
            add={this.add}/>
        </div>
      </>
    );
  }
}
