let connection=require("./index")

        

module.exports=function (name,text){
   
     var addSql= `INSERT INTO perse(name,text,time) VALUES (?,?,2019-10-11 )`;
    var adddata=[name,text]
    return new Promise((resolve,reject)=>{
        connection.query(addSql,adddata,function(err,res){
            if(err){
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}