
import echarts from 'echarts'
// 连线的起点、终点
// lineData: [    
//     [0, 5],
//     [1, 6]],  
//color: 连线的颜色
var img = require('@/assets/img/chartNoData.png');
var noDataOption = {
    title: {
        text: '暂无数据,等热闹了再来吧',
        left: 'center',
        bottom: '20%',
        textStyle: {
            color: '#666',
            fontSize: 12,
            fontWeight: '1',
            width: '200'
        },
    },
    graphic: [{
            type: 'image',
            left: 'center',
            top: '10%',
            bounding: 'raw',
            origin: [75, 75],
            style: {
                image: img,
                width: 200,
                height: 150,
                opacity: 0.4
            }
        },

    ],
    series: []
}
const graph = (that, el, lineData, color="red") => {
    that.chart = echarts.init(document.getElementById(el));
    //节点坐标
    //y间隔115
    var dataArr = [{
            name: '0',
            value: [-100, 170]
        },
        {
            name: '1',
            value: [-100, 85]
        },
        {
            name: '2',
            value: [-100, 0]
        },
        {
            name: '3',
            value: [-100, -75]
        }, {
            name: '4',
            value: [-100, -160]
        }, {
            name: '5',
            value: [100, 170]
        }, {
            name: '6',
            value: [100, 85]
        }, {
            name: '7',
            value: [100, 0]
        }, {
            name: '8',
            value: [100, -75]
        }, {
            name: '9',
            value: [100, -160]
        }
    ]

    //设置点的大小
    var symbolSize = 0.01;

    //根据连线信息进行连线
    var links = lineData.map(function (item) {
        return {
            source: item[0],
            target: item[1],
            lineStyle: {
                //判断是否需要弧度
                curveness: item[1] - item[0] == 5 ? 0 : item[1] - item[0] < 5 ? 0.2 : -0.2

            },
        };
    });


    var option = {
        grid: {
            top: 0,
            left: 10,
            bottom: 0,
            right: 0
        },
        //定义X轴 
        xAxis: {
            min: -105,
            max: 105,
            type: 'value',
            axisLine: {
                onZero: false
            },
            show: false
        },
        //定义y轴 
        yAxis: {
            min: -200,
            max: 200,
            type: 'value',
            axisLine: {
                onZero: false
            },
            show: false
        },
        series: [{
            //设置为甘特图
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            //设置球的大小
            symbolSize: symbolSize,
            //设置连线形式为箭头
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            //指定数据数组
            data: echarts.util.map(dataArr, function (item, di) {
                return item.value;
            }),
            //指定连线方式
            edges: links,
            //指定连线颜色
            lineStyle: {
                normal: {
                    width: 2,
                    color:"red",
                    opacity: 1
                }
            },
            itemStyle: {

                opacity: 0

            }
        }],
    };
    that.chart.setOption((lineData.length == 0 ? noDataOption : option), true)
}

export {
    graph
};

