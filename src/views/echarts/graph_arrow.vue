<template>
  <div class="graphArrow">
        <div id="charts" style=" width:100%;height:100%;"></div>
  </div>
</template>



<style lang="less" scoped>
.graphArrow{
  width:100%;
  height:100vh;
  background: #ccc;
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
      let nodesData=[];
      let linksData=[];
         //设置节点大小，位子
        function setNodes(arr){
          let img = {
            3: a,
            1: b,
            2: c,
            0: a
          };
          arr.forEach(function(p) {
              let name = img[p["type"]];
              if(p["source"]){
                nodesData.push({
                name: p["name"],
                  x: 0,
                y: 0,
                symbolSize:64,
                symbol: "image://" + name,
                draggable: "true",
                formatter: function(params) {
                  return params.data.showName;
                }
              });
              }else{
                  nodesData.push({
                name: p["name"],
                symbolSize:48,
                symbol: "image://" + name,
                draggable: "true",
                formatter: function(params) {
                  return params.data.showName;
                }
              });
              }
            
          });
        }
         function setLinks(arr){
          arr.forEach(function(p) {
            if(p["target"] instanceof Array){            
 p["target"].forEach(function(i){
    console.log( p["name"])
                linksData.push({
               source: p["name"],
               target: i
              });
            })
            }
          });
        }
                function setInitLinks(arr){
          arr.forEach(function(p) {
            if(p["target"] instanceof Array){            
 p["target"].forEach(function(i){
    console.log( p["name"])
                linksData.push({
               source: p["name"],
               target: i,
                            lineStyle: {
              normal: {
                color: '#25CCB4',
                curveness: 0,
                type: "solid"
              }}
              });
            })
            }
          });
        }
          function setVictimLinks(arr){
          arr.forEach(function(p) {
            if(p["target"] instanceof Array){            
 p["target"].forEach(function(i){
    console.log( p["name"])
                linksData.push({
               source: p["name"],
               target: i,
                           lineStyle: {
              normal: {
                color: "#F24040",
                curveness: 0,
                type: "solid"
              }}
              });
            })
            }
          });
        }
      let data1 = [
        {
          source:true,
          name: "1",
          type:1,
          target:["2","3","4","11","12","13"],
        },
           {
          name: "4",
        type:2,
          target:["6"],
        },
      
        {
          name: "6",
          type:1,
        }

      ];
        let data2 = [
            {
          name: "5",
          type:3,
          target:["13"],
        },
        {
          name: "2",
          type:1,
          target:["1"],
        },
        {
          name: "3",
         type:2,
        }
        ,{
          name: "7",
          type:1,
          target:["3"],
        },{
          name: "8",
          type:1,
          target:["1"],
        },{
          name: "9",
          type:1,
          target:["4"],
        },
     {
          name: "11",
        type:2,

        },{
          name: "12",
        type:2,

        },{
          name: "13",
        type:2,

        },
      ];
setNodes(data1);
setNodes(data2);
setInitLinks(data1)
setVictimLinks(data2)
      var option = {
      tooltip: {
            formatter: "{b}"
          },
        //工具箱
        toolbox: {
          show: true,
          feature: {
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
             // gravity: 0.02,//引力s
              edgeLength: 140 //线长
            },
            //箭头
            edgeSymbol: ["none", "arrow"],
            edgeSymbolSize: 12,
            data: nodesData,
            links: linksData,
            nodeScaleRatio: 1, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
              focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
            roam: true,
             label: {
                normal: {
                  show: true,
                  position: "inside",
                  textStyle: {
                    //标签的字体样式
                    color: "#000000", //字体颜色
                    fontWeight: "normal", //'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                    fontSize: "12" //字体大小
                  },
                  formatter: function(params) {
                    return params.data.showName; //此处为label转换 并转换颜色
                  },
                  fontSize: 18,
                  fontStyle: "600"
                
              },
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