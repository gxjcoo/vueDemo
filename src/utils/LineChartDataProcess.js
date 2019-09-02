import moment from 'moment';
let processor=function(dataSeries){
    if(!dataSeries){
        return dataSeries;
    }else if(dataSeries.length===0){
        return dataSeries
    }else{
        if(dataSeries.length>2){
            for(let i=0;i<dataSeries.length-2;i++){
                if(moment(dataSeries[i+1][0]).diff(dataSeries[i][0],'minutes')>1){
                   dataSeries.splice(i+1,0,[moment(dataSeries[i][0]).add(1,'seconds').format("YYYY-MM-DD HH:mm:ss"),NaN],[moment(dataSeries[i+1][0]).subtract(1,'seconds').format("YYYY-MM-DD HH:mm:ss"),NaN])
                }
            }
        }
        return dataSeries
    }
};

export default processor;