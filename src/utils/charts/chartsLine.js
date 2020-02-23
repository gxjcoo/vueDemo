import echarts from 'echarts'
const line = (that, el, chartData, ) => {
    that.chart = echarts.init(document.getElementById(el))
    let name = [],
        data = [];
    for (let item of chartData) {
        name.unshift(item.name);
        data.unshift(item.value);
    }
    var option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: name,
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            nameTextStyle: {
                fontSize: "0.2",
                fontWeight: 700
            },
        },
        grid: {
            top: "5%",
            bottom: "15%",
            left: "18%",
            right: "5%"
        },
        series: [{
            data: data,
            type: 'line',
            areaStyle: {},
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '#0099FF' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
        }]
    };

    that.chart.setOption(option, true)
}




const linearGradient = (that, el ) => {
    that.chart = echarts.init(document.getElementById(el))
let option = {
    backgroundColor: '#000',
    grid: {
        top: '18%',
        left: '12%',
        right: '1%',
        bottom: '25%',
        // containLabel: true
    },
    xAxis: [{
        type: 'category',
        show:false,
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.4)'
            },
        },
        // axisLabel: { //坐标轴刻度标签的相关设置
        //     textStyle: {
        //         color: '#d1e6eb',
        //         margin: 5,
        //     },
        // },
        axisTick: {
            show: true,
        },
        //data: ['2014', '2015', '2016', '2017', '2018'],
    }],
    yAxis: [{
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 3,//Y轴显示几个
        splitLine: {   
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        axisLine: {
            show: true,
        },
             axisLabel: {
            formatter: '{value}K',
            textStyle: {
                color: '#fff',
                fontSize:14,
                fontWeight:2
            }
        },
        
        axisTick: {
            show: false,
        },
    }],
    series: [{
        type: 'line',
        // smooth: true, //是否平滑曲线显示
        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbolSize: 8,
        lineStyle: {
            normal: {
                color: "#53fdfe", // 线条颜色
            },
            borderColor: '#f0f'
        },
        itemStyle: {
            normal: {
                color: "rgba(255,255,255,1)",
            }
        },
        tooltip: {
            show: false
        },
        areaStyle: { //区域填充样式
            normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,150,239,0.6)'
                    },
                    {
                        offset: 0.4,
                        color: 'rgba(0,253,252,0.4)'
                    },
                   
                     {
                        offset: 0.6,
                        color: 'rgba(0,253,252,0.2)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0,253,252,0)'
                    }
                ], false),
                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
        },
        data: [23, 35, 29, 40, 50]
    }]
};
    that.chart.setOption(option, true)
}






export { line ,linearGradient}