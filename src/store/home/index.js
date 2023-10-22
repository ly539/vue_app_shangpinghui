//home小仓库
import { reqBannerList, reqCategoryList, reqFloorList } from "@/api";
// state:仓库存储数据的地方
const state = {
    // state中数据默认初始值别瞎写, 服务器返回对象,服务器返回数组,[根据接口返回值初始化的]
    categoryList:[],
    bannerList : [],
    floorList: [],
};
// mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
};
// action: 处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    // 通过api里面的接口函数调用,向服务器发送请求,获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        // console.log(result);
        if(result.data.code === 200){
            commit("CATEGORYLIST",result.data.data)
        }
    },

    // 获取首页轮播图的数据
    async getBannerList({commit}){
        const result = await reqBannerList();
        if(result.code == 200){
            commit('GETBANNERLIST', result.data)
        }
        // console.log(result);
    },

    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        console.log(result);
        if(result.code == 200){
            commit('GETFLOORLIST', result.data)
        }
    }
};
// getters: 理解为计算属性, 用户简化仓库数据,让组件获取仓库的数据更加方便
const getters = {};
// 对外暴露store类的一个实例
export default({
    state,
    mutations,
    actions,
    getters
});