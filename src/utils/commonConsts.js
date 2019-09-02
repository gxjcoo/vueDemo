//ssh 控制域名
import {Icon} from "antd";

const sshDomain = "https://47.92.83.193:10443";

//主域名
let domain=window.location.protocol+"//"+ window.location.hostname+":"+window.location.port;

//全局图表调色盘折线图
let chartColor = ['#2772A3', '#756A84', '#8891FF', '#3B9FF7', '#C3C3C3', '#7CD7D7', '#79A5C2', '#FF83AF', '#A16AC2', '#3CB1B1','#888CFF'];

//全局图表调色盘饼图
let pieChartColor=["#3B9FF7","#888CFF","#7CD7D7","#2772A3","#72BDFF","#83AED5","#FF83AF","#A16AC2","#3CB1B1","#F8BF8A","#BDBDBD","#AAE392","#2E9AC8","#95C9F7","#D38E8E","#948F8A","#AFD1C3","#66899F","#CFBBFF","#F8B5B5"]


const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_973844_5bebuat3jbk.js',
});


export {sshDomain,domain,chartColor,pieChartColor,IconFont};