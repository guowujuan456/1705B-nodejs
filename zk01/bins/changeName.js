#! /usr/bin/env node
const path=require('path')
const fs=require('fs')
let oldName=process.argv[2] && process.argv[2].slice(1)
let newName=process.argv[3] && process.argv[3].slice(1)
// console.log(process.argv[2])
if(fs.existsSync(path.join(process.cwd(),oldName))){
    fs.renameSync(oldName,newName);
}

//读取当前目录下的说有文件夹以及文件
//  let flies=fs.readdirSync(process.cwd())
//遍历后缀名为js的(index.js)
// flies.forEach(item=>{
//     if (`/.js$/.test`(item)) {
//         i++;
//         fs.renameSync(item,`index(${i}).js`)
        
//     }
// })

// 11.changeName能够修改指定文件的文件名。例如：changeName -index.js -app.js
// 13.changeName支持批量修改和正则匹配
//change事件
//2.dist目录下的所有文件  例如：changeName -index.js
// fs.access('/dist', (err) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         console.error('myfile 不存在');
//         return;
//       }
//       throw err;
//     }

//     fs.open('/dist', 'r', (err, fd) => {
//       if (err) throw err;
//       readMyData(fd);
//       console.log(readMyData(fd))
      
//     })
//   });
// // 12.changeName的使用格式为：changeName -待修改文件 -修改后的名字
// fs.watch('/dist', { encoding: 'buffer' }, (eventType, filename) => {
//     if (filename) {
//         filename.appendFile(['index.js','app.js'], '', (err) => {
            
//           });
//       console.log(filename);
//     }
//   });