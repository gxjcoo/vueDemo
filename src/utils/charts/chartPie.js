import echarts from 'echarts'
const pie = (that, el) => {
    that.chart = echarts.init(document.getElementById(el))
    let option = {
        grid: {
            y: '30',
            x: '10',
            x2: '10',
            y2: '0',
            containLabel: true
        },
        //hover效果
        tooltip: {
            trigger: 'item',
            formatter: "{b}: ({d}%)<br/> {c}万元"
        },
        series:
        {
            center: ['center', 'center'],
            type: 'pie',
            radius: ['55%', '56%'],
            //旋转度数
            startAngle: '',
            hoverAnimation: false,

            data: [
                {
                    value: 2000, name: '未完成', 
                    label:{
                        normal:{
                            show: true,
                            position: 'center',
                            formatter: function (argument) {
                                var html;
                                html = '优';
                                return html;
                            },
                            textStyle: {
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#0095ff',
                                padding: [0, 0, 20, 0]
                            },
        
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 10,
                            shadowBlur: 50,
                            borderColor: '#888f9b',
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        },
                        color: '#888f9b',
                    }
                },
                {
                    value: 6000,
                    name: '已完成',
                    label:{
                        normal:{
                            show: true,
                            position: 'center',
                            formatter: function (argument) {
                                var html;
                                html = '80分';
                                return html;
                            },
                            textStyle: {
                                fontSize: 10,
                                color: '#e8ecf0',
                                padding: [30, 0, 0, 0]
                            },
        
                        },
                       
                    },
                    itemStyle: {
                        normal: {
                            //添加圆角效果
                            borderWidth: 10,
                            shadowBlur: 50,
                            borderColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 1,
                                color: "#3893e5" // 0% 处的颜色
                            },
                            {
                                offset: 0,
                                color: "#00ffff" // 100% 处的颜色
                            },
                            ]
                            ),
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        },
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 1,
                            color: "#3893e5" // 0% 处的颜色
                        },
                        {
                            offset: 0,
                            color: "#00ffff" // 100% 处的颜色
                        },
                        ]
                        ),
                    },
                },
            ]
        },
    }
    that.chart.setOption(option, true)
}

const pieSpace = (that, el) => {
    that.chart = echarts.init(document.getElementById(el))
    var scaleData = [{
        'name': '摄像头',
        'value': 5
    },
    {
        'name': '终端',
        'value': 15
    },
    {
        'name': '未知资产',
        'value': 12
    },
    {
        'name': '非资产',
        'value': 22
    },
    {
        'name': '网络资产',
        'value': 12
    }
];
let numTotal = scaleData.reduce(function(num,item){
num+=item.value
return num
},0)
var rich = {
    white: {
        color: '#ddd',
        align: 'center',
        padding: [5, 0]
    }
};
var placeHolderStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
};
var data = [];
for (var i = 0; i < scaleData.length; i++) {
    data.push({
        value: scaleData[i].value,
        name: scaleData[i].name,
        itemStyle: {
            normal: {
                borderWidth: 5,
                shadowBlur: 30,
                borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: '#7777eb'
                }, {
                    offset: 1,
                    color: '#70ffac'
                }]),
                shadowColor: 'rgba(142, 152, 241, 0.6)'
            }
        }
    }, 
    //圆之前间距
    {
        value: 1,
        name: '',
        itemStyle: placeHolderStyle
    });
}
var series = [{
    name: '',
    type: 'pie',
    clockWise: false,
    radius: [195, 200],
    hoverAnimation: false,
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                formatter: function(params) {
                    var percent = 0;
                    var total = 0;
                    for (var i = 0; i < scaleData.length; i++) {
                        total += scaleData[i].value;
                    }
                    percent = ((params.value / total) * 100).toFixed(0);
                    if(params.name !== '') {
                              return '';
                        //return params.name + '\n{white|' + '占比' + percent + '%}';
                    }else {
                        return '';
                    }
                },
                rich: rich
            },
            labelLine: {
                show: false
            }
        }
    },
    data: data
}];
let title= {
    text: numTotal,
    subtext: '总数(分)',
    x: 'center',
    y: '43%',
    textStyle: {
        fontSize:50,
        fontWeight:'normal',
        color: ['#fff']
    },
    subtextStyle: {
        color: '#fff',
        fontSize: 26
    },
};

let option = {
    backgroundColor: '#000',
    tooltip: {
        show: false
    },
    toolbox: {
        show: false
    },
    title,
    series,
    legend: {
        show: true,
        icon:"circle",
        top: "center",
        left: '70%',
        data: scaleData,
        width:50,
        padding: [0, 5],
        itemGap: 25,
        formatter: function(name) {
            return "{title|" + name + "}{value|" + (':'+123) +"}"
        },
       
        textStyle: {
            rich: {
                title: {
                    fontSize: 16,
                    lineHeight: 15,
                    color: "rgb(0, 178, 246)"
                },
                value: {
                    fontSize: 18,
                    lineHeight: 20,
                    color: "#fff"
                }
            }
        },
    }
}
    that.chart.setOption(option, true)
}
export { pie,pieSpace }














