import echarts from "ecahrts"
const graph = (that,el,lineData,color)=>{
    that.chart = echarts.init(document.getElementById(el));
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
var link = lineData.map(function(item){
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
        edges:linkSync,
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
that.cahrt.setOption(option,true)

}
export {graph}