<template>
  <el-row class="Pagination">
    <el-col :span="12" class="leftTxtBox">
      显示第 1 到第 10 条记录，总共 10 条记录每页显示
      <div class="selectedBox">
      <el-select v-model="value" placeholder=" ">
        <el-option value="7">7</el-option>
        <el-option value="70">70</el-option>
        <el-option value="17">17</el-option>
      </el-select>
        <span class="txtFlag"></span>
      </div>
      条记录
    </el-col>
    <el-col :span="12" align="right">
      <el-pagination
          layout="prev, pager, next"
          :total="12">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        value:'',

      }
    }
  }
</script>
<style>
  .Pagination{background: #fff}
  .Pagination .leftTxtBox{
    font-size: 14px;
    color:#666666;
    line-height: 32px;
  }
  .Pagination .selectedBox{
    position: relative;
    display: inline-block;
  }
  .Pagination .selectedBox .txtFlag{
    display: inline-block;
    position: absolute;
    width: 2px;
    border: 4px solid transparent;
    border-left-color: #409EFF;
    transform: rotate(45deg);
    bottom: 0;
    right: -3px;
  }
.Pagination .el-pagination .el-pager li.active{
  color:#fff;
  background: #409EFF;
}
  .Pagination .el-input__inner{
    width: 40px;
    height: 24px;
    border: 1px solid rgba(240,240,240,1);
    opacity: 0.7;
    padding: 0;
    background: transparent;
    text-align: center;
  }
  .Pagination .el-input__suffix i{display: none}
</style>