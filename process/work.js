const http =require('http')

const childServer = http.createServer((req,res)=>{
    if (req.url === '/text') {
        res.end('text')
    }else if (req.url === '/error') {
        throw 'error 错误'
    }else{
        res.end("ok")
    }
})

//捕获错误
process.on('uncaughtException',(error,origin)=>{
    console.log(error,origin)
    process.send({msg:error})
})

//子进程接收
process.on('message',(flag,server)=>{
    if (flag==='server') {
        //TCP 流 前端的请求信息
        server.on('connection',socket=>{
            childServer.emit('connection',socket)
        })
    }
})


