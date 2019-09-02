import echarts from 'echarts'
const bar = (that, el, highPort, horizon) => {
    that.chart = echarts.init(document.getElementById(el))
    let name = [],
        data = [];
    for (let item of highPort) {
        name.unshift(item.name);
        data.unshift(item.value);
    }
    var highPortOption = {
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
export { bar }