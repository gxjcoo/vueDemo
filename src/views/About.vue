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
        <div id="charts1" style=" width:40%;height:100%;"></div>
        <div id="charts2" style=" width:20%;height:100%;"></div>
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
#charts2{
  margin-left:20rem;
  position: absolute;
  top:0rem;
  z-index:999

}
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
      &::-webkit-scrollbar {
    display: none;
}
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
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {
    aa(el,lineData,color){
    this.chart = echarts.init(document.getElementById(el));
    var dataArr=[{
        name:'0',
        value:[-100,170]
    },{
        name:'1',
        value:[-100,85]
    },{
        name:'2',
        value:[-100,0]
    },{
        name:'3',
        value:[-100,-75]
    },{
        name:'4',
        value:[-100,-160]
    },{
        name:'5',
        value:[100,170]
    },{
        name:'6',
        value:[100,85]
    },{
        name:'7',
        value:[100,0]
    },{
        name:'8',
        value:[100,-75]
    },{
        name:'9',
        value:[100,-160]
    },
]
//点的大小
var symbolSize = 0.01;
var links = lineData.map(function(item){
    return {
        source:item[0],
        target:item[1],
        lineStyle:{
            //判断是否有弧度
            curveness:item[1]-item[0]==5?0 :item[1]-item[1]<5?0.2:-0.2
        }
    }
})

var option= {
    grid:{
        top:0,
        left:10,
        bottom:0,
        right:0
    },
    xAxis:{
        min:-105,
        max:105,
        type:'value',
        axisLine:{
            onZero:false
        },
        show:false
    },
    yAxis:{
        min:-200,
        max:200,
        type:'value',
        axisLine:{
            onZero:false
        },
        show:false
    },
    series:[{
        type:'graph',
        layout:'none',
        coordinateSystem:'cartesian2d',
        symbolSize:symbolSize,
        edgeSymbol:['circle','arrow'],
        edgeSymbolSize:[4,10],
        data:echarts.util.map(dataArr,function(item,di){
            return item.value
        }),
        edges:links,
        lineStyle:{
            normal:{
                width:2,
                color,
                opacity:1
            }
        },
        itemStyle:{
            opacity:0
        }
    }]
}
this.chart.setOption(option,true)

}
  },
  mounted() {
    this.$nextTick(function() {
     this.aa("charts1",[[0,5],[1,6],[2,7],[3,8],[4,9]],'red');
      this.aa("charts2",[[0,5],[1,6],[2,7],[3,8],[4,9]],'red');
    });
  }
};
</script>