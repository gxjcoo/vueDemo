import echarts from 'echarts'
const cahrtGraphForSearch = (that, el) => {
    that.chart = echarts.init(document.getElementById(el));
  
        //加载图片
        let a = require("@/assets/1.png");
        let b = require("@/assets/2.png");
        let c = require("@/assets/3.png");
        var size = 30; //节点大小
        var listdata = []; //节点数组
        var links = []; //链接数组
        var texts = []; //链接数组
  
        //节点信息
        var file_json = [
          { name: "文件", type: 1 },
          { name: "文件2", type: 1 },
          { name: "文件3", type: 1 },
          { name: "文件4", type: 1 },
          { name: "文件6", type: 1 },
          { name: "文件7", type: 1 },
          { name: "文件8", type: 1 },
          { name: "文件9", type: 1 }
        ];
  
        var url_json = [
          { name: "链接1", type: 2 },
          { name: "链接2", type: 2 },
          { name: "链接3", type: 2 },
          { name: "链接4", type: 2 },
          { name: "链接5", type: 2 },
          { name: "链接6", type: 2 },
          { name: "链接7", type: 2 },
          { name: "链接8", type: 2 }
        ];
        var network_json = [
          { name: "网络1", type: 3 },
          { name: "网络2", type: 3 },
          { name: "网络3", type: 3 },
          { name: "网络4", type: 3 },
          { name: "网络5", type: 3 },
          { name: "网络6", type: 3 },
          { name: "网络7", type: 3 },
          { name: "网络8", type: 3 }
        ];
        //检索目标
        var target_json = [
          {
            name: "IP",
            type: 0
          }
        ];
  
        //设置节点大小，位子
        function setData(arr) {
          let img = {
            3: a,
            1: b,
            2: c,
            0: a
          };
          var i = 0;
          arr.forEach(function(p) {
            if (p["type"] == 0) {
              let name = img[p["type"]];
              listdata.push({
                x: i * 200,
                y: i * 100,
                name: p["name"],
                symbolSize: 80,
                symbol: "image://" + name,
                draggable: "true",
                formatter: function(params) {
                  return params.data.showName;
                }
              });
              i++;
            } else {
              let name = img[p["type"]];
              listdata.push({
                x: i * 35,
                y: size + i * 8,
                name: p["name"],
                symbolSize: size,
                symbol: "image://" + name,
                draggable: "true",
                formatter: function(params) {
                  return params.data.showName;
                }
              });
              i++;
              if (i == 10) {
                i = 0;
              }
            }
          });
        }
  
        function setLinkData(arr, isTraget) {
          if (isTraget !== "") {
            var i = 0;
            arr.forEach(function(p) {
              links.push({
                source: target_json[0]["name"],
                target: p.name,
                value: "",
                lineStyle: {
                  normal: {
                    // text: relarr[i],
                    color: "#C3CED9"
                  }
                }
              });
              i++;
            });
          } else {
            arr.forEach(function(p) {
              links.push({
                source: p.name,
                target: target_json[0]["name"],
                value: "",
                lineStyle: {
                  normal: {
                    color: "#C3CED9"
                  }
                }
              });
            });
          }
        }
        let result = [];
        result.push(...target_json, ...file_json, ...url_json, ...network_json);
        setData(result);
  
        //文件
        setLinkData(file_json, "");
        //链接
        setLinkData(url_json, "");
        //网络
        setLinkData(network_json, "");
  
        var option = {
          tooltip: {
            formatter: "{b}"
          },
  
          toolbox: {
            show: true,
            feature: {
              magicType: {
                show: true,
                type: ["force", "chord"]
              },
              saveAsImage: {
                show: true
              }
            }
          },
          backgroundColor: "#fff",
          series: [
            {
              type: "graph",
              layout: "force",
              force: {
                repulsion:100,//斥力
                gravity: 0.02,//引力
                //edgeLength:20,
                edgeLength: parseInt(
                  Math.random() * 20 +
                    Math.random() * 30 +
                    Math.random() * 40 +
                    Math.random() * 10+Math.random() * 10+Math.random()
                ),
                layoutAnimation: true//是否动画
              },
              //箭头
              // edgeSymbol: ['none', 'arrow'],
              // edgeSymbolSize: 12,
              data: listdata,
              links: links,
              nodeScaleRatio: 1, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
              focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              lineStyle: {
                normal: {
                  opacity: 0.5,
                  width: 1.5,
                  curveness: 0
                }
              },
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
                }
              }
            }
          ]
        };
        that.chart.setOption(option, true);
      }
export { cahrtGraphForSearch }