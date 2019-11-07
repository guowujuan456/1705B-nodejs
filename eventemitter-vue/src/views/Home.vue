<template>
  <div class="home">
    <input type="text" v-model="message">
    <h4>{{message}}</h4>
    <p>{{Child}}</p>
    <Child v-bind:title="title" @getchild="shows" ref="child"></Child>
  </div>
</template>

<script>
// @ is an alias to /src
//引入组件
import Child from '../components/child' 
export default {
  name: 'home',
  //注册
  components: {
    Child
  },
  data(){
    return {
      title:"父---->子",
      Child:'',
      message:''
    }
  },
  mounted() {
    // console.log(this.$refs.child.con)
      console.log(this.$children[0].con)

  },
  methods:{
    shows(con){
      console.log(this.$root)
      this.Child=con
    }
  }
}
</script>
