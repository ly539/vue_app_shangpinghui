import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入路由
import router from '@/router'

// 三级组件
import TypeNav from '@/components/TypeNav'
// 第一个参数/了全局组件的名字 第二个参数: 哪一个组件
Vue.component(TypeNav.name, TypeNav)
// 轮播图
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
// 引入仓库
import store from '@/store'

// // 引入MockServe.js ---mock数据
import "@/mock/mockServe.js";

// 引入swiper样式
import "swiper/css/swiper.css";
// 引入图标样式
import "../public/download/font_4183033_d08j5dpli9/iconfont.css"

// 统一接口api文件夹里面全部请求函数, 全部为一个对象
import * as API from '@/api'

// 引入组件再次使用组件
import { Button, MessageBox } from 'element-ui'
// 挂在原型上
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载插件, 改一下安装@1.3.3版本
import VueLazyload from 'vue-lazyload';
import ad from '../public/images/ad1.png'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:ad
})

// 引入表单
import validate from '@/plugins/validate.js'

// 测试
// import {reqCategoryList} from '@/api';
// reqCategoryList()

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  // 注册路由
  // 注册路由信息:当这里书写router的时候,组件身上都拥有$route,$router属性
  router,
  // 注册仓库, 组件实例上多一个属性$store
  store
}).$mount('#app')
