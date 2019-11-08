const http = require('http');
const child_process = require('child_process');

const server = http.createServer((req,res) => {
    if(req.url === '/count'){
        let child = child_process.fork('./count.js');
        child.on('message',({time,sum}) => {
            console.log(sum)
            res.end(time)
        })

        child.send('主进程的数据')
    }
})

server.listen(3000,() => {
    console.log("====")
})


console.log(process.pid)