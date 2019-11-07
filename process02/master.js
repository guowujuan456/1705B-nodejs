const http = require('http');

const {fork} = require('child_process');

const server = http.createServer((req,res) => {
    if(req.url === '/compute'){
        //创建一个子进程,fork方法返回的是子进程
        const compute = fork('./fork-compute.js');

        compute.send('开启了一个子进程');
        //当一个子进程使用 process.send() 发送消息时，会触发message事件
        compute.on('message',msg => {
            res.end('子进程向父进程发送数据'+msg)
        })
        //子进程监听到一些错误消息，退出
        compute.on('close',(code,signal) => {
            console.log("close")
        })
    }else{
        res.end('ok')
    }
})

server.listen(9090)