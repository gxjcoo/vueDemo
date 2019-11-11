//echarts主页
const echarts = () => import('../views/echarts/echarts.vue');

//关系图
const graph_arrow = () => import('../views/echarts/graph_arrow.vue');
const graph_pie = () => import('../views/echarts/graph_pie.vue');
//圆
const pie = () => import('../views/echarts/pie.vue');
//地图
const world = () => import('../views/echarts/world.vue');
//列表echarts
const graph = () => import('../views/echarts/graphList.vue');




export default [
    {
        path: '/echarts',
        name: 'echarts',
        component: echarts
    },
    {
        path: '/echarts/grapharrow',
        name: 'graph_arrow',
        component: graph_arrow
    },
    {
        path: '/echarts/graphpie',
        name: 'graph_pie',
        component: graph_pie
    }, {
        path: '/echarts/pie',
        name: 'pie',
        component: pie
    },
    {
        path: '/echarts/world',
        name: 'world',
        component: world
    },
    {
        path: '/echarts/graph',
        name: 'graph',
        component: graph
    }]