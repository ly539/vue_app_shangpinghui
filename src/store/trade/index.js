import {reqAddressInfo, reqOrderInfo} from '@/api'
const state = {
    address:[],
    order:[]
};
const mutations = {
    GETUSERADDRESS(state, address){
        state.address = address
    },
    GETORDERINFO(state, order){
        state.order = order
    }
};
const actions = {
    // 获取用户地址, 用户登录才可以获取用户信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        // console.log(result);
        if(result.data.code == 200){
            commit('GETUSERADDRESS', result.data.data)
          }
    },
    // 获取商品清单数据
    async getOrderInfo({commit}){
       let result = await reqOrderInfo();
       if(result.data.code == 200){
        commit('GETORDERINFO', result.data)
       }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}