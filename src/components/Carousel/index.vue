<template>
    <!--banner轮播-->
  <div class="swiper-container" id="mySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                                <img :src = "carousel.imgUrl" />
                            </div>
                           
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>

                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:'Carousel',
    props:['list'],
     watch:{
        // 监听bannerList数据的变化: 
        bannerList:{
            immediate: true,
            // 函数执行,是bannerList只要发生改变,就执行,但是v-for遍历需要时间
            // v-for执行完毕,才有结构, 通过配合nextTick
            handler(newValue, oldValue){
                // nextTick: 在下次DOM更新循环结束之后执行延迟回调, 在修改数据之后立即执行这个方法,获取更新后的DOM
                this.$nextTick(() => {
                    // 保证页面结构都存在了
                    var mySwiper = new Swiper('.swiper-container',{
                    loop: true,
                    //分页器
                    pagination: {
                    el: '.swiper-pagination',
                    //  点击小球的时候也能切换
                    clickable: true
                    },
                    // 需要前进后退按钮
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                    })
                })
            }
        }
    }
}
</script>

<style>

</style>