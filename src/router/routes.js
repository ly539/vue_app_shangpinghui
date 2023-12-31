// 配置路由
// 引入路由组件
// import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path:"/home",
        // 路由懒加载, 当路由被访问的时候才会加载,更加高效了.
        component:() => import('@/pages/Home'),
        // 增加路由元信息
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:'search',
        // 1. 布尔值写法:只能是params参数
        // props:true,
        // 2. 对象写法:额外的给路由组件传递一些props
        // props:{a:1, b:2}
        // 3. 函数写法
        props:($route) => {
            return {keyword: $route.params.keyword,
                    k: $route.query.k}
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    // 重定向,在项目跑起来的时候,访问/,立马就让他定向到首页
    {
        path:'*',
        redirect:"/home"
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    // 加入购物车所跳转到购物车页面的路由路由
    {
        name:"addcartsuccess",
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{show: true}
    },
    // 购物车页面, 结算购物车路由
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show: true}
    },
    // 交易页面(订单页面)
    {
        path:'/trade',
        component:Trade,
        meta:{show: true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页页面,必须是从购物车而来
            if(from.path == '/shopcart'){
                next();
            }else{
                // 其他路由组件而来,停留在当前
                next(false)
            }
        }
    },
    // 支付页面
    {
        path:'/pay',
        component:Pay,
        meta:{show: true},
        beforeEnter:(to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    // 支付成功后跳转的页面
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    // 查看订单
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                path:'myOrder',
                component:MyOrder
            },
            {
                path:'groupOrder',
                component:GroupOrder
            },
            {
                // 重定向
                path:'/center',
                redirect:'/center/myOrder'
            }
        ]
    }
]