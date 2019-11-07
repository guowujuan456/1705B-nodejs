//子进程
//1.引入内置模块
const childProcess = require ('child_process')
// console.log(childProcess);

//2.创建子进程：exec() spawn(),execfile(),fork()

//1>exec('执行命令',(erroe,stdout,stderror)=>{})
let process1=childProcess.exec('node child.js',(error,stdout,stderror)=>{
    if (error) {
        throw error
    }
    console.log('--stdout--',stdout)
    console.log('--stderror--',stderror)
})
console.log(process1)
//  2>spawn('执行命令',['执行文件'])
let process2=childProcess.spawn('node',['./child.js'])

process2.stdout.on('data',(data)=>{
    console.log('--stdout--'+ data)
})


