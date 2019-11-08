const http = require('http')

const child_process = require('child_process')

const cpulen = require('os').cpus().length
console.log(cpulen)

const server = http.createServer()

server.listen(3001)
//封装函数以便调用
function createServers(){
    //发送http 创建的server服务
    let worker = child_process.fork('./work.js')
    worker.send('server',server)
    
     //重启
     worker.on('exit',()=>{
        createServers()
    })
    
    worker.on('message',(error)=>{
        console.log("-----error",error)
    })
}
   
for (let i = 0; i < cpulen; i++) {
    createServers()
}
//主进程退出，子进程结束
process.on('exit',()=>{
    worker[i].kill();
})
