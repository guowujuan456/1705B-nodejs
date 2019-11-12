let connection=require("./index")

module.exports=function(id){
    var delSql = `DELETE FROM perse where id=${id}`;

    return new Promise((resolve,reject)=>{
        connection.query(delSql,(err,res)=>{
            if(err){
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}