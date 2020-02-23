export default {
    namespaced:true,
    state: {
        startTime:"",
        endTime:""
    },
    mutations: {
        initData(state){
            //1h=3600000   1min = 60000  1s = 1000
            //当天凌晨0点
            state.startTime = new Date(new Date().toLocaleDateString()).getTime()
            //实时
            state.endTime = new Date().getTime()
        },
        changeData(state,data){
            state.startTime = data.startTime
            state.endTime = data.endTime
        }
    },
    actions: {
  
    }
  }