//发不订阅者模式原理
class EventBus{
    constructor(){
        this.events={}
    }

    $on(eventName,callback){
        if (!this.events[eventName]) {
            this.events[eventName]=callback
        }else{
            this.events[eventName].push(callback)
        }
    }
    $emit(eventName,...arg){
        this.events[eventName].forEach(item => {
            item(...arg)
        });

    }
}
export default EventBus