<template>
  <div class="type-nav">
            <div class="container">
                <!-- 事件委托 -->
                <div @mouseleave = "leaveShow" @mouseenter = "enterShow">
                    <h2 class="all">全部商品分类</h2>
                     <!-- 过渡动画 -->
                    <transition name = "sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show = "show">
                        <!-- 利用事件委派+编程式导航实现路由跳转与传递参数 -->
                    <div class="all-sort-list2" @click.prevent = "goSearch">
                        <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex === index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <!-- href自动Home主页了 -->
                                <a href="" :data-categoryName = "c1.categoryName" :data-category1id = "c1.categoryId">{{c1.categoryName}}</a>
                                <!-- 声明式导航 -->
                                <!-- <router-link to="">{{c1.categoryName}}</router-link> -->
                            </h3>
                            <!-- 二级三级分类 通过css样式display显示和隐藏 改为JS显示和隐藏-->
                            <div class="item-list clearfix" :style="{display:currentIndex === index ? 'block' : 'none'}">
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a href="" :data-categoryName = "c2.categoryName" :data-category2id = "c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a href="" :data-categoryName = "c3.categoryName" :data-category3id = "c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
//引入方式: 所有lodash全部功能函数引入
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data(){
        return {
            // 添加一个响应式数据, 存储用户鼠标移上哪一个一级分类
            currentIndex:-1,
            show : true
        }
    },
    // 组件挂载完毕,可以向服务器发请求
    mounted(){
        // 通知vuex发请求, 获取数据, 存储在仓库中
        // 在app.vue最开始的组件中派发一个action
        // home跳转到searchmounted还会执行一次, 当组件挂载完毕,,让show变为false
        if(this.$route.path != "/home"){
            this.show = false
        }
    },
    computed:{
        ...mapState({
            // 右侧是一个函数, 当使用这个计算属性的时候,右侧函数会立即执行一次
            // 注入一个参数state,其实为大仓库中的数据
            categoryList:state => state.home.categoryList
        })
    },
    methods:{
        // 鼠标进入修改响应式数据currentIndex属性
        // 节流操作, 50毫秒之后再运行刚触发的事件,   三级联动的节流
        // 节流只执行一次---节流技能, 防抖回城
        changeIndex:throttle(function(index){
            // index: 鼠标移上某一个一级分类的元素的索引值
            this.currentIndex = index
        }, 50),

        // 鼠标移出的事件回调
        leaveShow(){
            // 鼠标移出变为-1
             this.currentIndex = -1;
            if(this.$route.path != "/home"){
                this.show = false
            }
        },

        // 进行路由跳转的方法
        goSearch(event){
            // 最好方法: 编程式导航 + 事件委派
            // 点击a标签时候,才会进行路由跳转, 但是我们将点击事件附加在div上,无法知道点击的是否是a标签,再者无法区分一级,二级,三级
            // event.target
            let ele = event.target
            // 获取到当前触发这个事件的节点[h3, a, dt, dl], 需要带有data-categoryname这样的节点
            // 节点有一个属性dataset属性, 可以获取节点的自定义属性与属性值
            let {categoryname, category1id, category2id, category3id} = ele.dataset;
            // 如果标签上拥有categoryname一定是a标签
            // 进行路由跳转
            if(categoryname){
                // 整理路由参数
                let location = {name : 'search'}
                let query = {categoryName : categoryname}
                // 区分一级二级三级标签, 通过自定义属性, 这样dataset就会有属性,再者来判断
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }
                // 判断: 如果路由跳转的时候,带有params参数,捎带传递过去, 相当于给对象添加数据
                if(this.$route.params){
                    location.params = this.$route.params
                }
                // 整理
                location.query = query
                // 路由跳转
                this.$router.push(location)
            }
        },

        // 当鼠标移入,商品列表显示
        enterShow(){
            if(this.$route.path != "/home"){
                this.show = true
            }
        }
    }

}
</script>

<style scoped lang = "less">
 .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }

            /* 过渡动画样式 */
            /* 过渡动画开始状态(进入) */
            .sort-enter{
                height: 0px;
                /* opacity: 0; */
            }
            /* 过渡动画结束状态 */
            .sort-enter-to{
                height: 461px;
                /* opacity: -1; */
            }
            /* 定义动画时间, 速率 */
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>