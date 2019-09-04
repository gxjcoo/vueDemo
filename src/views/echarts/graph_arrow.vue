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
      let data = [
        {
          name: "招标倾向性",
          symbolSize: 100,
          draggable: false,
          
        },
        {
 
          name: "房建项目",
          symbolSize: 40,
          draggable: "true"
        },
        {
                    name: "市政项目",
          symbolSize: 32,
          draggable: "true"
        },
        {
          name: "装饰装修项目",
          symbolSize: 40,
          draggable: "true"
        },
        {
          name: "园林绿化项目",
          symbolSize: 40,
          draggable: "true"
        }
      ];
      let links = [
        {
          source: "房建项目",
          target: "园林绿化项目"
        }
       
      ];
      var option = {
    
        //工具箱
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },

        animationDuration: 1000, //初始动画市场（没感觉的出来）
        animationEasingUpdate: "quinticInOut", //动画方式（也没感觉）
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 600, //斥力
              //gravity: 0.02,//引力s
              edgeLength: 130 //线长
            },
            //箭头
            edgeSymbol: ["none", "arrow"],
            edgeSymbolSize: 12,
            data: data,
            links: links,
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: true,
                position: "bottom"
              }
            },
            lineStyle: {
              normal: {
                color: "source",
                curveness: 0,
                type: "solid"
              }
            },
          }
        ]
      };
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