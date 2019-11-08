#! /usr/bin/env node

const download  = require('download-git-repo')
const child_process = require('child_process')

download('github:guowujuan456/download','test',(error)=>{
    if (error) {
        throw error
    }
    process.chdir('./test/vue-demo')//改变目录
    //创建子进程
    child_process.exec('npm install')
})