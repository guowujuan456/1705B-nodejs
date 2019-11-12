let mysql=require('mysql')
let connection=mysql.createConnection({
  homt:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'root',
  database:'1704e'
})
connection.connect()
console.log('mysql连接成功')
module.exports=connection