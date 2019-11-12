let Router=require('koa-router')
let router=new Router()
let connection=require('../db/home')
let addFn=require('../db/add')
router.get('/datajson',async function(ctx){
let data=await connection()
ctx.body={
  code:1,
  message:'123',
  data
}
})
router.get('/add',async(ctx,next)=>{
  let data=await addFn(name,text)
  let {name,text}=ctx.query;
})
module.exports=router