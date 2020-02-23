import echarts from 'echarts'
const bar = (that, el, highPort, horizon) => {
    that.chart = echarts.init(document.getElementById(el))
    let name = [],
        data = [];
    for (let item of highPort) {
        name.unshift(item.name);
        data.unshift(item.value);
    }
    let highPortOption = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        grid: {
            top: "5%",
            bottom: "15%",
            left: "18%",
            right: "5%"
        },
        xAxis: {
            minlnterval: 1,
            boundaryGap: [0, 0.1],
            naineTextStyle: {
                fontSize: "0.2rem"
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: { color: "#666666", }
            },
            axisLabel: {
                fontSize: "0.2rem",
                fontWeight: 700,
            },
            splitLine: { show: false },
            data: horizon ? name : "",

        },
        yAxis: {
            name: "",
            nameTextStyle: {
                fontSize: "0.2rem",
                fontWeight: 700
            },
            axisTick: {
                show: false
            },
            data: horizon ? "" : name,
            axisLine: {
                lineStyle: {
                    color: "#666666"
                }
            },
            splitLine: { show: false },
            axisLabel: {
                fontSize: "0.2rem",
                fontWeight: 700
            },
        },
        series: [{
            name: "",
            type: "bar",
            barWidth: 20,
            barMinHeight: 5,
            itemStyle: {
                normal: {
                    // color: new echarts.graphic.LinearGradient (0.5, 0, 0, 0, [{ 
                    // offset: 0, 
                    // color: "#006602"
                    // }, {
                    // offset: 0, 
                    color: "#0099FF"
                        // }],false)
                },

            },
            data: data
        }]
    }
    that.chart.setOption(highPortOption, true)
}









const beatBar = (that, el) => {
    let dataLine = [50, 66, 33,70,25]
    let IP= ['120.21.45.2', '120.21.45.3', '100.21.45.2', '120.212.45.2','120.212.45.201']
    that.chart = echarts.init(document.getElementById(el))
let colorArray = [
    {
        top: '#ffa800', //黄
        bottom: 'rgba(11,42,84,.3)'
    }, {
        top: '#1ace4a', //绿
        bottom: 'rgba(11,42,84, 0.3)'
    },
    {
        top: '#4bf3ff', //蓝
        bottom: 'rgba(11,42,84,.3)'
    }, {
        top: '#4f9aff', //深蓝
        bottom: 'rgba(11,42,84,.3)'
    },
    {
        top: '#b250ff', //粉
        bottom: '#000'
    },
    {
        top: '#fff', //紫
        bottom: '#000'
    }
];
 
 //柱状图与左侧的距离
 let positionLeft = 0.4,
    max = 100 + 2*positionLeft


 let option = {
    grid: [
        {
        left: '10%',
        top: '12%',
        right: '5%',
        bottom: '8%',
        containLabel: true,
    },
    {
        left: '0%',
        top: '12%',
        right: '5%',
        bottom: '8%',
        containLabel: true,

    }
        ],
    xAxis: [{
        max:max,
        show: false
    }],
    yAxis: [{
        axisTick: 'none',
        axisLine: 'none',
        offset: '0',
        axisLabel: {
            textStyle: {
                color: '#fff',
                fontSize: '12'
            }
        },
        data: IP
    }, {
        axisTick: 'none',
        axisLine: 'none',
        show: false,
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '12'
            }
        },
        data: [1, 1, 1, 1,1]
    }, {
        axisLine: {
            lineStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        data: []
    }],
    series: [
        
       { //间距
           type: 'bar',
           barWidth: 15,
           stack: 'b',
           legendHoverLink: false,
           itemStyle: {
               normal: {
                   color: 'rgba(0,0,0,0)'
               }
           },
           data: [positionLeft,positionLeft,positionLeft,positionLeft]
       },
       {
        name: '条',
        type: 'bar',
        stack: 'b',
        yAxisIndex: 0,
        data: dataLine,
        label: {
            normal: {
                show: false,
                position: 'right',
                distance: 10,
                formatter: function(param) {
                    return param.value + '%'
                },
                textStyle: {
                    color: '#ffffff',
                    fontSize: '12'
                }
            }
        },
        barWidth: 10,
        itemStyle: {
            normal: {
             color: function(params) {
                       let num = colorArray.length;
                       return {
                           type: 'linear',
                           colorStops: [{
                               offset: 0,
                               color: colorArray[params.dataIndex % num].bottom
                           }, {
                               offset: 1,
                               color: colorArray[params.dataIndex % num].top
                           }, {
                               offset: 0,
                               color: colorArray[params.dataIndex % num].bottom
                           }, {
                               offset: 1,
                               color: colorArray[params.dataIndex % num].top
                           }, {
                               offset: 0,
                               color: colorArray[params.dataIndex % num].bottom
                           }, {
                               offset: 1,
                               color: colorArray[params.dataIndex % num].top
                           }, {
                               offset: 0,
                               color: colorArray[params.dataIndex % num].bottom
                           }, {
                               offset: 1,
                               color: colorArray[params.dataIndex % num].top
                           }, {
                               offset: 0,
                               color: colorArray[params.dataIndex % num].bottom
                           }, {
                               offset: 1,
                               color: colorArray[params.dataIndex % num].top
                           }, {
                               offset: 0,
                               color: colorArray[params.dataIndex % num].bottom
                           }, {
                               offset: 1,
                               color: colorArray[params.dataIndex % num].top
                           }],
                           //globalCoord: false
                       }
                   },
            }
        },
        z: 2
    }, 
    {
        name: '白框',
        type: 'bar',
        yAxisIndex: 1,
        barGap: '-100%',
        data: [99.8, 99.9, 99.9, 99.9,99.9],
        barWidth: 21,
        itemStyle: {
            normal: {
                color: '#222',
                barBorderRadius: 2
            }
        },
               label: {
            normal: {
                show: true,
                position: 'left',
                distance: 100,
                formatter : function(params) {
                               //请注意写法:{xxx|}  'xxx'代表你自定义的name，'|'代表是自定义的一定要加上
                    return '{img|}' ;
                },
                rich : {
                             //这里设置您的图片引用名称
                    img : {
                               //引入图片
                        backgroundColor : {
                            image : require('../../assets/2.png')
                        },
                        height:20
                    },
                },
            }
        },
        z: 1
    },
    {
        name: '外框',
        type: 'bar',
        yAxisIndex: 2,
        barGap: '-100%',
        data: [100, 100, 100, 100,100],
        barWidth: 23,
        label: {
            normal: {
                show: true,
                position: 'right',
                distance: 10,
               formatter: function(data) {
                   return dataLine[data.dataIndex];
               },
                textStyle: {
                    color: '#ffffff',
                    fontSize: '12'
                }
            }
        },
        itemStyle: {
            normal: {
             color:{
                type: 'linear',
             } ,
                barBorderRadius: 0
            }
        },
        z: 0
    },
/*     {
        name: '白框',
        type: 'bar',
        yAxisIndex: 1,
        barGap: '-100%',
        data: [0, 0, 0, 0],
        barWidth: 20,
        itemStyle: {
            normal: {
                color: '#0e2147',
                barBorderRadius: 0
            }
        },
        z: 1
    },
    {
        name: '外框',
        type: 'bar',
        yAxisIndex: 2,
        barGap: '-100%',
        data: [2, 3, 4, 5],
        barWidth: 22,
        itemStyle: {
            normal: {
                color: function(params) {
                    let num = myColor.length
                    return myColor[params.dataIndex % num]
                },
                barBorderRadius: 0
            }
        },
        z: 0
    }*/
    
    ]
}
that.chart.setOption(option, true)
}








export { bar ,beatBar}