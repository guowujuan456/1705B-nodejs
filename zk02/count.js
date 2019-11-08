let startTime = new Date().getTime();
let sum = 0;

for(let i = 0;i<1008345;i++){
    sum+=i;
}

let endTime = new Date().getTime();

let time = endTime - startTime +'';

process.send({time,sum})

process.on('message',(info) => {
    console.log(info)
})