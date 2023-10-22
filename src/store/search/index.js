// search小仓库
import {reqGetSearchInfo} from '@/api';

const state = {
    searchList : {},
};
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
};
const actions = {
    async getSearchList({commit}, params = {}){
        // 当前这个reqGetSearchInfo函数调用获取服务器数据的时候,至少有一个参数(空对象)
        // params形参: 是当用户派发action的时候,第二个参数传过来的.
        let result = await reqGetSearchInfo(params);
        // console.log(result);
        if(result.data.code == 200){
            commit('GETSEARCHLIST', result.data)
        }
        
    }
};
// 用于计算属性
// 项目中getters主要作用: 简化仓库中的数据 , 可以把组件当中用到的数据简化一下
let getters = {
    // 当前state是当前仓库的state, 并不是大仓库的state
    goodList(state){
        // 若没有网络就会存在返回为undefined,所以加上[]
        return state.searchList.data||[]
    },
    attrsLists(state){
        return state.searchList.data||[];
    },
    trademarkLists(state){
        return state.searchList.data||[];
    }
};
export default({
    state,
    mutations,
    actions,
    getters
});