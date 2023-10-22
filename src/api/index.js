// 当前这个模块: API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口
// 发请求: axios发送请求返回结果Promise对象
export const reqCategoryList = () => requests({
    // 为什么加上/api : 对外暴露的不是axios本身,而是export default requests,
    // 进行第二次封装的axios实例
    url:'/api/product/getBaseCategoryList',
    method:'GET'
})

// 获取banner 轮播图接口
export const reqBannerList = () => {
    return mockRequests({
    url:'/banner',
    method:'get'
})
}

// 获取floor数据
export const reqFloorList = () => {
    return mockRequests({
        url:'/floor',
        method:'get'
    })
}
    // mockRequests.get('/floor')

// 获取搜索模块数据 ,post请求方法,并且带有参数
// 当前这个接口,给服务器传递参数,至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url:'/api/list',
    method:"post",
    data:params
})

// 获取商品详情信息
export const reqGoodsInfo = (skuId) =>requests({
    url:`/api/item/${ skuId }`,
    method:"get"
})
// 将产品添加到购物车中(获取更新某一个产品的个数)
export const reqAddOrdateShopCart = (skuId, skuNum) => requests({
    url:`/api/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})
// 获取购物车列表数据的接口
export const reqCartList = ()=> requests({
    url:'/api/cart/cartList',
    method:'get'
})
// 删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({
    url:`/api/cart/deleteCart/${skuId}`,
    method:'delete'
})
// 修改商品选中的状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url:`/api/cart/checkCart/${skuID}/${isChecked}`,
    method:'get'
})
// 获取验证码
export const reqGetCode = (phone) => requests({
    url:`/api/user/passport/sendCode/${phone}`,
    method:'get'
})
// 注册
export const reqUserRegister = (data) => requests({
    url:`/api/user/passport/register`,
    data,
    method:'post'
})
// 登录
export const reqUserLogin = (data)=>requests({url:`/api/user/passport/login`,method:'post',data});
// 获取用户信息[需要带有用户的token向服务器要用户信息]
export const reqUserInfo = () => requests({url:`/api/user/passport/auth/getUserInfo`,method:'get'});
// 退出登录
export const reqLogout = () => requests({
    url:`/api/user/passport/logout`,
    method:'get'
})
// 获取用户地址信息
export const reqAddressInfo = () => requests({
    url:`/api/user/userAddress/auth/findUserAddressList`,
    method:'get'
})
// 获取商品清单
export const reqOrderInfo = () => requests({
    url:`/api/order/auth/trade`,
    method:'get'
})
// 提交订单, 传入多个参数
export const reqSubmitOrder = (tradeNo, data) => requests({
    url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url:`/api/payment/weixin/createNative/${orderId}`,
    method:'get'
})
// 获取支付状态
export const reqPayStatus = (orderId) => requests({
    url:`/api/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
// 获取个人中心的数据
export const reqOrderList = (page, limit) => requests({
    url:`/api/order/auth/${page}/${limit}`,
    method:'get'
})