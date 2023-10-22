<template>
  <div class="pagination">
    <!-- 上一部分 -->
    <!-- 当当前页为1的时候,disabled为true, 就会触发, 当点击的时候触发自定义事件,事件名为getpageNo,传入的值为当前页-1 -->
    <button :disabled = "pageNo == 1" @click="$emit('getpageNo',pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getpageNo', 1)" :class="{active:pageNo == page}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
  <!-- 中间结构 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
      @click="$emit('getpageNo',page)" :class="{active:pageNo == page}">{{page}}</button>
    <!-- 下面部分 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" :class="{active:pageNo == page}">{{totalPage}}</button>
    <button :disabled = "pageNo == totalPage" @click="$emit('getpageNo',pageNo + 1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
    name:'Pagination',
    props:['pageNo','pageSize','total','continues'],
    computed:{
      totalPage(){
        // 向上取整
        // console.log(this);
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算出连续的页码的起使数字与结束数字
      startNumAndEndNum(){
        // 解构处理
        const {continues, pageNo, totalPage} = this;
        let start = 0, end = 0;
        // 若为不正常现象, 总页数没有连续页码多
        if(continues > this.totalPage){
          start = 1;
          end = this.totalPage
        }else{
          // 正常现象, 设置的总页数大于连续页码
          start = pageNo - parseInt(continues / 2);
          end = pageNo + parseInt(continues / 2)
          // 若出现负数或者0 则需要另外判断
          if(start < 1){
            start = 1;
            end = continues
          }
          // 当最后一个页码大于总页码就会出现问题
          if(end > totalPage){
            end = totalPage;
            start = totalPage - continues + 1;
          }
        } 
        return {start,end};
      }
    }
}
</script>


<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
  