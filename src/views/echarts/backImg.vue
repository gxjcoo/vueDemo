<template>
  <div class="searchInfo">
    <!-- input框 -->
    <el-row class="search">
      <el-col :span="10">
        <el-input v-model="input" placeholder="请输入IP、域名、文件名（MD5/SHA1）"></el-input>
      </el-col>
      <el-col :span="4">
        <button>搜索</button>
      </el-col>
    </el-row>
    <!-- 示例 -->
    <el-row class="example">
      <el-col :span="24">搜索样例</el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="14" class="left">
        <div id="charts" style=" width:100%;height:100%;"></div>
      </el-col>
      <el-col :span="10" class="right">
        <el-row class="info">2</el-row>
        <el-row class="detail">1</el-row>
      </el-col>
      <el-col></el-col>
    </el-row>
  </div>
</template>



<style lang="less" scoped>
.searchInfo {
  width: 100%;
  height: 92vh;
  background: #fff;
  border-radius: 10px;
  padding-top: 0.8334rem;
  .search {
    margin-left: 0.8334rem;
  }
  .example {
    margin: 0.8334rem 0 0.7rem 0.8334rem;
  }
  .box {
    border-top: 1px solid rgba(245, 245, 245, 1);
    height: 79vh;
    .left {
      height: 79vh;
      border-right: 1px solid rgba(245, 245, 245, 1);
    }
    .right {
      height: 79vh;
      overflow: auto;
      background: #000;
      .info {
        height: 11.541666666666666rem;
        border-bottom: 1px solid rgba(245, 245, 245, 1);
      }
      .detail {
        height: 25.25rem;
      }
    }
  }
}
</style>

<script>
import echarts from "echarts";
import { parse } from "path";
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {
    aa(el) {
      this.chart = echarts.init(document.getElementById(el));
        let a = require("@/assets/1.png");
        let b = require("@/assets/2.png");
        let c = require("@/assets/3.png");
    
      var option = {  
        graphic: [
            {
                type: 'image',
                id: 'logo',
                right: '50%',
                top: '50%',
                z: 1000,
                bounding: 'raw',
                style: {
                    image: a,
                    width: 100
                }
            }
        ],

      }
      this.chart.setOption(option, true);
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.aa("charts");
    });
  }
};
</script>