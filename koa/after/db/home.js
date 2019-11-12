let connection=require('./index')
module.exports=function(){
return new Promise((resolve,reject)=>{
 connection.query("select * from perse",(err,res)=>{
   if(err){
     reject(err)
   }
   else{
     resolve(res)
   }
 })
})
}