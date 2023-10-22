import { reqGoodsInfo, reqAddOrdateShopCart } from "@/api"
// 封装游客身份模块 --->生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'
// 什么时候派发信息, 当detail组件挂载完毕之后就可以发送请求获取数据
const state = {
    goodInfo: {},
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取商品信息
    async getGoodInfo({commit}, skuId){
        let result = await reqGoodsInfo(skuId);
        // console.log(result);
        if(result.data.code == 200){
            commit("GETGOODINFO", result.data.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateCart({commit}, {skuId, skuNum}){
        // 加入购物车之后,前台将参数带个服务器
        // 服务器写入数据成功后,并没有返回其他数据,只返回code = 200,代表这次操作成功
        // 因为服务器没有返回其他数据,因此不需要三连环存储数据
        let result = await reqAddOrdateShopCart(skuId, skuNum);
        // console.log(result.data.code);
        // 当前这个函数如果执行返回一个promise
        if(result.data.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('失败'));
        }
    },
}
const getters = {
    // 路径导航简化数据
    categoryView(state){
        // state.goodInfo初始为空对象,空对象的categoryView属性值为undefined,
        // 挂载到detail的mounted中,这时候发送请求拿数据,请求是异步的当模板解析到这个变量的时候,发现是undefined就报错了
        return state.goodInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}