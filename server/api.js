const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');

// POSTのbodyをパースするのに必要
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

const {Client} = require('pg');
//DB接続情報
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432
});
// TODO: DBへの接続はここでいい？
client.connect();

// 全ての連絡先情報を取得
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

// 全てのROV結果を取得
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

// contact_type, contact_dest, watched_prefixes, watched_asnをPOSTで受け取り、DBに書き込む
router.post('/add-contact-info', (req, res, next) => {
  console.log(req.body);
  console.log(req.body.contact_type);

  // 連絡先(contact_type, contact_dest)をDBの連絡先テーブルに書き込む (既にある場合はなにもしない)
  const query_insert_contact_info = {
    text: 'INSERT INTO contact_informations VALUES (DEFAULT, $1, $2) ON CONFLICT DO NOTHING;',
    values: [req.body.contact_type, req.body.contact_dest],
  };
  client.query(query_insert_contact_info, (err, dat) => {
    if (err) {
      console.log(err.stack)
    } else {
      // さっき書き込んだ連絡先(contact_type, contact_dest)に割り振られたIDを調べる
      const query_select_contact_info_id = {
        text: 'SELECT id FROM contact_informations WHERE contact_type = $1 AND contact_information = $2;',
        values: [req.body.contact_type, req.body.contact_dest],
      };
      client.query(query_select_contact_info_id, (err, dat) => {
        if (err) {
          console.log(err.stack)
        } else {
          // これが、さっき書き込んだ連絡先(contact_type, contact_dest)に割り振られたID
          const contact_info_id = dat.rows[0].id;
          console.log(contact_info_id)
          console.log(req.body.prefix_list)

          // 「さっき書き込んだ連絡先(contact_type, contact_dest)に割り振られたID」と、監視対象prefix(watched_prefix)を一個ずつ、
          // 監視対象prefixのテーブルに書き込む
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

          // 「さっき書き込んだ連絡先(contact_type, contact_dest)に割り振られたID」と、監視対象ASN(watched_asn)を一個ずつ、
          // 監視対象asnのテーブルに書き込む
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

