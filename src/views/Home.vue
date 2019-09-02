<template>
  <div class="searchInfo">
    <el-row class="box">
      <el-col :span="14" class="left">
        <div id="charts" style=" width:100%;height:100%;"></div>
      </el-col>
      <el-col :span="10" class="right">
        <el-row class="info">
        4123123
        </el-row>
        <el-row class="detail">
       123
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>



<style lang="less">
.searchInfo {
  width: 100%;
  height: 88vh;
  background: #fff;
  border-radius: 10px;
  
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
      .info {
        height: 12.5rem;
        padding: 0.792rem;
        border-bottom: 1px solid rgba(245, 245, 245, 1);
      }
      .detail {
        height: 29.125rem;
        background: #000;
        padding: 0.792rem;
      }
    }
  }
}
</style>

<script>
import {cahrtGraphForSearch} from "../utils/charts/cahrtGraphForSearch";
import { parse } from "path";
export default {
  data() {
    return {
      input: "",
      info:["微步情报","开源情报","相关事件"]
    };
  },
  methods: {
    cahrtGraphForSearch
   
  },
  mounted() {
    this.$nextTick(function() {
      this.cahrtGraphForSearch(this,"charts");
    });
  }
};
</script>