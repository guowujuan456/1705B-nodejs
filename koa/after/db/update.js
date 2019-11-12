let connection=require("./index")
module.exports=function (id){
     var updata= `UPDATE perse SET name='更改', content='更改内容 ', time=2019-10-5 where id=?`;
   return new Promise((resolve,reject)=>{
        connection.query(updata,[id],function(err,res){
            if(err){
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}