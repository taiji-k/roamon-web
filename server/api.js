const express = require('express')
const router = express.Router()

router.get('/allcontactinfo', (req, res, next) => {
  const {Client} = require('pg');
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432
  });
  client.connect();
  const query = {
    text: 'SELECT * FROM contact_informations',
    values: [],
  };
  client.query(query, (err, dat) => {
    if (err) {
      console.log(err.stack)
    } else {
      ret = JSON.stringify(dat.rows);
      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(ret)
    }
  })

  //
  // const mysql = require('mysql');
  // const connection = mysql.createConnection({
  //   host : 'localhost',
  //   user : 'testuser',
  //   database: 'testdb',
  //   password: 'testuser'
  // });
  // var ret=[];
  // connection.connect();
  // connection.query('SELECT * from allcontactinfo;', function(error, row, fields){
  //   if (error) {
  //     console.log(error);
  //   }
  //   var dat = [];
  //   for (var i = 0;i < row.length; i++) {
  //     dat.push({id: row[i].id, name: row[i].name});
  //   }
  //   ret = JSON.stringify(dat);
  //   res.header('Content-Type', 'application/json; charset=utf-8')
  //   res.send(ret)
  // });
  // connection.end();
})
module.exports = router
