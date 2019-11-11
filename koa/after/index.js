const router=require('./router/index')
const Koa=require('koa')
const koa=new Koa()
koa.use(router.routes()).use(router.allowedMethods());
koa.listen(7002, () => {
  console.log("server running...");
});