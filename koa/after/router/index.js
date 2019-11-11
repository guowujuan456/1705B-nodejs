const Router=require('koa-router')
const home=require('./home')
const router=new Router()
router.use('/home',home.routes(),home.allowedMdthods())
module.exports=router