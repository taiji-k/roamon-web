const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');

// POSTのbodyをパーするのに必要
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

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

router.post('/add-contact-info', (req, res, next) => {
  console.log(req.body);
  console.log(req.body.contact_type);
  const query_insert_contact_info = {
    text: 'INSERT INTO contact_informations VALUES (DEFAULT, $1, $2) ON CONFLICT DO NOTHING;',
    values: [req.body.contact_type, req.body.contact_dest],
  };
  client.query(query_insert_contact_info, (err, dat) => {
    if (err) {
      console.log(err.stack)
    } else {
      const query_select_contact_info_id = {
        text: 'SELECT id FROM contact_informations WHERE contact_type = $1 AND contact_information = $2;',
        values: [req.body.contact_type, req.body.contact_dest],
      };
      client.query(query_select_contact_info_id, (err, dat) => {
        if (err) {
          console.log(err.stack)
        } else {
          const contact_info_id = dat.rows[0].id;
          console.log(contact_info_id)
          console.log(req.body.prefix_list)
          console.log(req.body.prefix_list[0])


          for (var i = 0; i < req.body.prefix_list.length; i++) {
            console.log(req.body.prefix_list[i])
            const query_insert_watched_prefix = {
              text: 'INSERT INTO watched_prefixes  VALUES ($1, $2) ON CONFLICT DO NOTHING;',
              values: [contact_info_id, req.body.prefix_list[i]],
            };
            client.query(query_insert_watched_prefix, (err, dat) => {
              if (err) {
                console.log(err.stack)
              } else {

              }
            })
          }

          for (var i = 0; i < req.body.asn_list.length; i++) {
            const query_insert_watched_asn = {
              text: 'INSERT INTO watched_asns  VALUES ($1, $2) ON CONFLICT DO NOTHING;',
              values: [contact_info_id, req.body.asn_list[i]],
            };
            client.query(query_insert_watched_asn, (err, dat) => {
              if (err) {
                console.log(err.stack)
              } else {

              }
            })
          }
        }
      })
    }
  })
})
module.exports = router

