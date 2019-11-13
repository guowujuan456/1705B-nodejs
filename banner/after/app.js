const Koa =require('koa')

const app = new Koa()

const bodyParser = require('koa-bodyparser')

const static = require('koa-static')

const path = require('path')

const router = require('koa-router')()

const query = require('./db/query')

app.use(bodyParser())

app.use(static(path.join(process.cwd(),'public')))

app.use(router.routes())
app.use(router.allowedMethods())

//查询列表
router.get('/api/list',async ctx=>{
    let { id, pageNum=1, limit=3 } = ctx.query
    pageNum = (pageNum-1)*limit//起始下标
        try {
            let data = await query(`select * from banner_list limit ${pageNum},${limit}`)
            let total = await query('select count(*) from banner_list')
            console.log(total.msg[0]['count(*)'])
            if (data.code === 1) {
                ctx.body={
                    code:1,
                    num:total.msg[0]['count(*)'],
                    data
                }
            }
        } catch (error) {
            ctx.body={
                code:0,
                msg:error
            }
        }
        
    
})

//添加数据
router.post('/api/add',async ctx=>{
    let { beizhu,types,sorts,time} =ctx.request.body
    if (beizhu) {//容错处理
        try {
            //添加数据
            let data = await query('insert into banner_list (beizhu,types,sorts,time) values (?,?,?,?)',[beizhu,types,sorts,time])
            if (data.code === 1) {
                ctx.body={
                    code:1,
                    msg:'添加成功',
                    data
                    // data:data
                }
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
            msg:'缺失参数'
        }
    }
})

//修改数据
router.post('/api/edit',async ctx=>{
    let { beizhu,types,sorts,time,id} = ctx.request.body
    if (beizhu && id) {//容错处理
        try {
            await query('update banner_list set beizhu=?,types=?,sorts=?,time=? where id=?',[beizhu,types,sorts,time,id])
            ctx.body={
                code:1,
                msg:'修改成功',
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


//删除数据
router.post('/api/delete',async ctx=>{
    let {id}=ctx.request.body
    console.log(id)
    if(id || id ===0){
        try {
            //根据id 删除数据
            await query('delete from banner_list where id=?',[id])
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





app.listen(process.env.PORT || 3000,()=>{
    console.log("服务启动成功")
})