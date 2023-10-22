import Vue from "vue";
import Vuex from 'vuex';

// 需要使用插件一次
Vue.use(Vuex);
// 引入写的小仓库
import home from './home'
import search from './search'
import detail from './detail'
import ShopCart from "./ShopCart";
import user from './user';
import trade from './trade'
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        ShopCart,
        user,
        trade
    }
});