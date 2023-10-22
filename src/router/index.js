// 配置路由的地方

import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由信息
import routes from './routes'
// 引入仓库
import store from '../store'

// 使用插件
Vue.use(VueRouter)


let router = new VueRouter({
    routes,
    // 引入vue路由中的滚动行为
    scrollBehavior(to, from, savedPosition){
        // 返回的y=0,表示滚动条在最上方
        return {y : 0}
    }
})

// 全局守卫
// router.beforeEach(async (to, from, next)=>{
//     // to获取到要跳转到那个路由
//     // from获取到从哪个路由而来
//     // next放行函数, next(path)放行到指定路径 
//     // next();
//     // 用户登录才会有token
//     let token = store.state.user.token;
//     // 用户信息
//     let name = store.state.user.userInfo.name;

//     if(token){
//         // 用户已经登录了就不能去login页面了, 就停留在首页
//         if(to.path == '/login'){
//             next('/')
//         }else{
//             // 登录了, 但是不是去的login
//             // 如果有用户名
//             if(name){
//                 next()
//             }else{
//                 // 没有用户信息, 派发action让仓库存储用户信息进行跳转
//                 try{
//                     await store.dispatch('getUserInfo');
//                     next()
//                 }catch(error){
//                     // token失效了,获取不到用户信息
//                     // 1. 清除token
//                     await store.dispatch('userLogout');
//                     next('/login')
//                 }
//             }
//         }
//     }else{
//         // 未登录,不能去交易相关,不能去支付相关,不能去个人中心  
//         let toPath = to.path 
//         if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center' != -1)){
//             // 把未登录的时候想去而没有去成的信息,存储于地址栏中
//             next('/login?redirect=' +toPath)
//         }else{
//             next()
//         }
//     }
// })
export default router;