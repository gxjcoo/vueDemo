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
export { line }