<template>
  <div class="box">
 
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%;">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  </div>
</template>




<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods:{

change() {

//change、paly表格数据动态滚动
console.log(this.tableData[0])
this.tableData.push(this.tableData[0]);//把第一条数据插入数组最有一条

this.tableData.shift();//删除数组中第一条数据

},

play() {

setInterval(this.change, 2000);//每两秒执行一次插入删除操作

}

},

created(){

this.play()

}

  }
</script>
<style lang="less">
.el-table__row{
transition:add 1s ease 0s;

}
.box{
  width:100%;
  height:100vh;
   background: #000;
}
</style>
