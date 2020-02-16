const express = require('express')
const router = express.Router()

const {Client} = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432
});
// TODO: DBへの接続はここでいい？
client.connect();

router.get('/all-contact-info', (req, res, next) => {
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
})

router.get('/all-rov-result', (req, res, next) => {
  const query = {
    text: 'SELECT * FROM rov_results',
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
})

module.exports = router
