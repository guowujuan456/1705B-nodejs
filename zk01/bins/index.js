#! /usr/bin/env node

let fs = require('fs')

let path = require('path')

let param = process.argv[2]
console.log(param)

let url = path.join(process.cwd(), param)

//判断路径是否存在
if (fs.existsSync(url)) {
    //判断时文件还是文件夹
    if (fs.statSync(url).isDirectory()) {
        let dirList = fs.readdirSync(url)//['css','js','index.html']
        let targetList=dirList.map(item=>{
            let extname=path.extname(item)//后缀名为文件
            // console.log(extname)
            let size = fs.statSync(path.join(param,item).size)
            return `${item} - ${extname && extname.slice(1)} - ${size ? size: ''}`
            // console.log(exyname)
        })
        // console.log(targetList)
    } else {
        console.log(param)
    }
} else {
    console.log("此目录不存在")
}
//获取./dist下所有的文件夹名称
// let components = []
// const files = fs.readdirSync('/dist')
// files.forEach(function (item, index) {
//     let stat = fs.lstatSync("/dist/" + item)
//     if (stat.isDirectory() === true) {
//       components.push(item)
//     }
// })

// console.log(components)
// var argv = require("process.argv")(process.argv.slice(2));

// let path = require('path')

// console.log(process.argv)

// //2.dist目录下的所有文件
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

// //showFiles支持识别文件格式，至少区分html，js，css等，文件格式要展示在文件名之后
// //4.能够区分文件和文件夹
// // 检查当前目录中是否存在该文件，以及该文件是否可写。
// fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
//   if (err) {
//     console.error(
//       `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
//   } else {
//     console.log(`${file} 存在，且它是可写的`);
//   }
// });

// //14.changeName对于重名文件，以文件数量索引为后缀，如把所有的JS文件改为index，
// //则结果为index(1).js，index(2).js，index(3).js，index(4).js等
// fs.rename('/dist', '/tmp/world', (err) => {
//     if (err) throw err;
//     console.log('重命名完成');
//   });
// fs.stat('/dist', (err, stats) => {
//     if (err) throw err;
//     console.log(`文件属性: ${JSON.stringify(stats)}`);
//   });
// //排序
// fs.rename('/dist', '/tmp/world', (err) => {
//     if (err) throw err;
//     fs.stat('/dist', (err, stats) => {
//       if (err) throw err;
//       console.log(`文件属性: ${JSON.stringify(stats)}`);
//     });
//   });

//   // default options --foo=AAA --bar-buz=BBB
// var config = {
//     foo: "AAA",
//     bar: {
//       buz: "BBB"
//     }
//   };

//   // apply options given on CLI arguments
//   config = argv(config);

//   // show help message if --help given
//   if (config.help) {
//     require("fs").createReadStream(__dirname + "/help.md").pipe(process.stderr);
//     process.exit(1);
//   }

//   // rest of CLI arguments
//   var files = config["--"] || [];
//   files.forEach(function(file) {
//     console.log(file);
//   });