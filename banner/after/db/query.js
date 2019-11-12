const db = require('./index')

module.exports = ((sql,params=[])=>{
    return new Promise((resolve,reject)=>{
        db.query(sql,params,(error,data)=>{
            if (error) {
                reject({code:0,msg:error})
            }else{
                resolve({code:1,msg:data})
            }
        })
    })
})
