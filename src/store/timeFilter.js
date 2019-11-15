export default {
    namespaces:true,
    state: {
        startTime:"",
        endTiem:""
    },
    mutations: {
        initData(state){
            console.log(1)
            //1h=3600000   1min = 60000  1s = 1000
            //当天凌晨0点
            state.startTime = new Date(new Date().toLocaleDateString()).getTime()
            //实时
            state.endTiem = new Date().getTime()
        }
    },
    actions: {
  
    }
  }