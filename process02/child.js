process.on('message',msg => {
    console.log(msg,'process.pid',process.pid)
    
    process.send("zijincheng")
})