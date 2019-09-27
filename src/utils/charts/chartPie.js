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
export { pie }