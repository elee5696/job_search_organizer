/* eslint-disable no-console */
const express = require('express');
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

server.use(express.static(path.resolve(__dirname, '/dist')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/api/grades', (req, res) => {
  db.connect(function () {
    let query = 'SELECT * FROM grades';
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

server.post('/api/grades', (req, res) => {
  let name = JSON.stringify(req.body.name);
  let course = JSON.stringify(req.body.course);
  let grade = JSON.parse(req.body.grade);

  if (grade > 150 || grade < 0) {
    res.send('Invalid Grade' + grade);
    return;
  }

  let query =
    `INSERT INTO grades ( name, course, grade)
    VALUES (` + name + `, ` + course + `, ` + grade + `)`;

  db.query(query, (err, data) => {
    if (!err) {
      let output = {
        'success': true,
        'data': {
          'id': data.insertId,
          'name': JSON.parse(name),
          'course': JSON.parse(course),
          'grade': grade
        }
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
