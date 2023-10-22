import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { getToken, removeToken, setToken } from "@/utils/token";

// 登录和注册的模块
const state = {
    code:'',
    token: getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state, code){
        state.code = code
    },
    USERLOGIN(state, token){
        state.token = token
    },
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        // 帮仓库中相关用户信息清空
        state.token = '';
        state.user = {};
        // 本地存储数据清空
        removeToken()
    }
};
const actions = {
    // 获取验证码
    async getCode({commit}, phone){
        // 获取验证码的这个接口,把验证码返回,但是正常情况下,后台把验证码发到用户手机上
        let result = await reqGetCode(phone);
        if(result.data.code == 200){
            commit("GETCODE", result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit}, user){
        let result = await reqUserRegister(user);
        // console.log(result);
        if(result.data.code == 200){
            return 'ok';
        }else{
            // 请求失败
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async userLogin({commit}, data){
        let result = await reqUserLogin(data);
        // console.log(result);
        // 将来通过带token找服务器要用户信息进行展示
        if(result.data.code == 200){
            commit('USERLOGIN', result.data.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo(){
        let result = await reqUserInfo();
        console.log(result);
        if(result.data.code == 200){
            // 提交用户信息
            commit('GETUSERINFO', result.data.data);
            // 持久化存储
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout(){
        // 只是通知服务器清除一次请求, 通知服务器清除token
        let result = await reqLogout()
        // action里面不能操作state, 提交mutation修改state
        if(result.data.code == 200){
            commit('CLEAR')
            return 'ok'
        }
        // else{
        //     return Promise.reject(new Error('faile'))
        // }
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}