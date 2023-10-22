import { reqCartList, reqUpdateCheckedById } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        console.log(result);
        if(result.data.code == 200){
            commit('GETCARTLIST', result.data.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListByskuId({commit}, skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}){
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if(result.data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    async deleteAllCheckedCart({dispatch, getters}){
        // context: 小仓库, 其中有commit[提交mutations修改state], getters[计算属性], dispath[派发action], state[当前仓库数据]
        // 获取购物车中全部产品[是一个数组]
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListByskuId', item.skuId) : "";
            PromiseAll.push(promise)
        })
        // 只要全部的P1|P2...都成功, 返回结果为成功, 如果有一个失败,返回即为失败的结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品状态
    updateAllCartIsChecked({dispatch, state}, isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked});
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
    
};
export default {
    state,
    mutations,
    actions,
    getters
}