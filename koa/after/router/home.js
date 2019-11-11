const Router=require('koa-router')
let Koa=require('koa')
const router=new Router()
let data={
  "name":"沐恩灵佩",
  "time":"截止到2019-11-13 5:20",
  "text":"用一词形容自己",
  "datas":[
    {
      "id":0,
      "txt":"帅呆了",
      "count":520
    },
    {
      "id":1,
      "txt":"爆炸",
      "count":1028
    },
    {
      "id":2,
      "txt":"世界已经无法阻挡我",
      "count":1612
    }
  ]
}

router.get('/data',function(ctx){
  ctx.body=data
})
router.get('/add',function(ctx){
  let {id}=ctx.query
  let obj= data.datas.find(item=>item.id==id)
 
})
module.exports=router