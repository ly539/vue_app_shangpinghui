<template>
    <div>
        <Header></Header>
        <!-- 路由出口的地方 -->
         <router-view></router-view>
         <!-- 设置了路由元信息,若为true就显示,为false就不显示 -->
        <Footer v-show="$route.meta.show"></Footer>
       
    </div>
</template>

<script>
// 引入
import Header from './components/Header'
import Footer from './components/Footer'
  export default {
    name:'',
    components:{
        Header,
        Footer
    },
    mounted(){
      // 派发一个action||获取商品分类的三级列表数据
      this.$store.dispatch('categoryList');
    }
  }
</script>

<style>

</style>