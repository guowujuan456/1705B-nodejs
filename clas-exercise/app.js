const Koa = require('koa')

const app = new Koa()

const bodyparser = require('koa-bodyparser')

const static = require('koa-static');

const path = require('path')

const router = require('koa-router')()

const query = require('./db/query')

app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

//添加数据
router.post('/add',async ctx=>{
    let {username,password,adress,phone} = ctx.request.body;
    // console.log(username)
    if (username) {//容错处理
        //查询username数据是否存在
        console.log("++++++")
        let data =await query('select * from koa_list where username=?',[username])
        if (data.msg.length) {
            ctx.body={
                code:3,
                msg:"此人已存在" 
            }
        }else{
              try {
                  //添加数据
                    let result =await query('insert into koa_list (username,password,adress,phone) values (?,?,?,?)',[username,password,adress,phone])
                    if (result.code===1) {
                        ctx.body={
                            code:1,
                            msg:'添加成功',
                            data:data
                        }
                    }
                } catch (error) {
                  ctx.body={
                      code:0,
                      msg:error
                  }
              }
        }
        
    }else{
        ctx.body={
            code:2,
            msg:'丢失数据'
        }
    }
    
})
//删除数据
router.get('/delete',async ctx=>{
    let {id}=ctx.query
    console.log(id)
    if(id || id ===0){
        try {
            //根据id 删除数据
            await query('delete from koa_list where id=?',[id])
            ctx.body={
                code:1,
                msg:'删除成功'
            }
        } catch (error) {
            ctx.body={
                code:0,
                msg:error
            }
        }
    }else{
        ctx.body={
            code:3,
            msg:'丢失参数'
        }
    }
})
//修改数据
router.post('/edit',async ctx=>{
    let {username,password,adress,phone,id} = ctx.request.body
    if (username && password && id) {//容错处理
        try {
            await query('update koa_list set username=?,password=?,adress=?,phone=? where id=?',[username,password,adress,phone,id])
            ctx.body={
                code:1,
                msg:'修改成功'
            }
        } catch (error) {
            ctx.body={
                code:0,
                msg:error
            }   
        }
    }else{
        ctx.body={
            code:3,
            msg:'丢失参数'
        }
    }
    
})
//查找数据
router.get('/list',async ctx=>{
    let {id} = ctx.query
    if(id || id ===0){
        try {
            let data = await query('select * from koa_list where id=?',[id])
            ctx.body={
                code:1,
                data
            }
        } catch (error) {
            ctx.body={
                code:0,
                msg:error
            }
        }
    }else{
        ctx.body={
            code:3,
            msg:'丢失参数'
        }
    }


})

app.use(static(path.join(process.cwd(),'public')))

app.listen(process.env.PORT || 3000,()=>{
    console.log("服务启动成功")
})