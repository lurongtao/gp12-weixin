const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  '11111111',
  database :  'weixin'
})

const dbcontrol = {
  insert() {

  },

  updata() {

  },

  select(sql, param) {
    return new Promise((resolve, reject) => {
      pool.query(sql, param, function (error, results, fields) {
        resolve(results)
      })
    })
  }
}

module.exports = dbcontrol