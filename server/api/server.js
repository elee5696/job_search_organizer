/* eslint-disable no-console */
const express = require('express');
const moment = require('moment');
const credentials = require('./mysql_credentials');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const db = mysql.createConnection(credentials);
const port = 3008;

db.connect(function (err) {
  if (err) {
    console.log(err);
    console.log(err.fatal);
  }
  console.log('Connection Established', db.config.port);
});

const server = express();

server.use(express.static(path.resolve(__dirname, '../public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/api/jobs', (req, res) => {
  db.connect(function () {
    let query =
    'SELECT j.id, company, phone_interview, onsite_interview, interview_questions, DATE_FORMAT(response_date, "%m-%d-%y") response_date, DATE_FORMAT(date_applied, "%m-%d-%y") date_applied, offer, salary, u.name username FROM `job_reports` j JOIN user_list u ON u.id = j.user_id';
    db.query(query, function (err, data) {
      if (!err) {
        let output = {
          success: true,
          data: data
        };
        res.send(output);
      }
    });
  });
});

server.post('/api/jobs', (req, res) => {
  let name = req.body.name;
  let date = req.body.date;

  let query =
    `INSERT INTO job_reports ( company, date_applied )
    VALUES ( ? , ? )`;

  db.query(query, [name, date], (err, data) => {
    if (!err) {
      let output = {
        'success': true,
        'data': {
          'id': data.insertId,
          'company': name,
          'phone_interview': null,
          'onsite_interview': null,
          'interview_questions': null,
          'response_date': null,
          'date_applied': moment(date, 'YYYY-MM-DD').format('M-D-YY'),
          'offer': null,
          'username': 'Edward Lee'
        }
      };
      res.send(output);
    } else {
      res.send(err);
    }
  });
});

server.delete('/api/grades/:id', (req, res) => {
  let gradeID = req.params.id;

  if (!gradeID) {
    res.send('Invalid Student ID' + gradeID);
    return;
  }

  let query = `DELETE FROM grades WHERE id = ${gradeID}`;

  db.query(query, (err, data) => {
    if (!err) {
      let output = {
        success: true,
        data: data
      };
      res.send(output);
    }
  });
});

server.patch('/api/grades/:id', (req, res) => {
  let gradeID = req.params.id;
  let grade = req.body.grade;

  if (grade > 150 || grade < 0) {
    res.send('Invalid Grade' + grade);
    return;
  }

  let query = `UPDATE grades SET grade=${grade} WHERE id=${gradeID}}`;

  db.query(query, (err, data) => {
    if (!err) {
      let output = {
        success: true,
        data: data
      };
      res.send(output);
    }
  });
});

server.listen(port, function () { console.log(`Server Listening at ${port}`); });
/* eslint-disable no-console */
