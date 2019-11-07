<template>
    <div>
        <hr>
        <h3>{{title}}</h3>
          <button @click="go">点击获取子级内容</button>
    </div>
</template>
<script>
export default {
    props:['title'],
    data() {
        return {
            con:'子级内容'
        }
    },
    mounted() {
        console.log(this.$parent.title)
    },
    methods: {
        go(){
            this.$emit('getchild',this.con)
        }
    },
}
</script>