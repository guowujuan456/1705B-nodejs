let Koa=require('koa')
let app=new Koa()
let homerouter=require('./router/index')
app.use(homerouter.routes(),homerouter.allowedMethods())
app.listen(8000,()=>{
  console.log('起服务成功')
})