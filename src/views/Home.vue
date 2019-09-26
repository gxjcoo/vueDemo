<template>
  <div class="comprehensive">
    <div :class="{'left':true,'show':show,'hidden':hidden}">
      <el-row v-for="item in device" :key="item.name">
        <el-col class="icon" :span="8"></el-col>
        <el-col :span="16" class="title">
          <el-row>{{item.name}}</el-row>
          <el-row>
            <i class="el-icon-caret-top" style="font-size: 30px"></i>
            <span>13020</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div :class="{'right':true,'show':show,'hidden':hidden}">
      <div class="top5">
        <div id="chartsBar" style=" width:100%;height:100%;"></div>
      </div>
    </div>
  </div>
</template>
<style  lang="less" scoped >
.show{

     animation: show 2s ease-in;
     opacity: 1;
}
.hidden{

     animation: hidden 2s ease-in;
     opacity: 0;
}
.comprehensive {
position: relative;
  background: #000;
  height: 90vh;
  width: 100%;
  padding: 2rem;
  overflow: hidden;
}


.left > .el-row {
  margin-bottom: 3rem;
}
.left {
   position: absolute;
    width:20%;
    height:100%;
   left:3rem;
   top:3rem;

  overflow: hidden;

  .el-row {
    width: 10rem;
    .icon {
      border-radius: 38%;
      height: 3rem;
      width: 3rem;
      box-shadow: 1px 1px 20px 5px #999 inset;
    }
    .title {
      .el-row:nth-child(1) {
        font-size: 20px;
        color: #aaa;
        margin-left: 2.6rem;
      }
      .el-row:nth-child(2) {
        margin-left: 1rem;
        i {
          color: #0095ff;
          margin-right: 0.4rem;
        }
        span {
          font-size: 20px;
          color: #fff;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
}

.right{
    position: absolute;
    width:20%;
    height:100%;
   right:3rem;
   top:3rem;
   .top5{
     height:10rem;
   }
    }
@keyframes hidden {
  0% {
    width: 10rem;
    opacity: 1;
  }
  100% {
    width: 0rem;
    opacity: 0;
  }
}
@keyframes show {
  0% {
    width: 0rem;
    opacity: 0;
  }
  100% {
    width: 10rem;
    opacity: 1;
  }
}
</style>
<script>
import {beatBar } from "../utils/charts/chartsBar"
export default {
    data() {
        return {
            show:false,
            hidden:false,
            device:[
                {name:'主机设备'},
                {name:'网络安全设备'},
                {name:'摄像机'},
                {name:'其他'},
            ]
        }
    },
    methods: {
    beatBar
  },
    mounted(){
      this.$nextTick(function() {
      this.beatBar(this, "chartsBar");
    })
    //  setInterval(()=>{
    //     this.show=!this.show,
    //   this.hidden = !this.hidden
    //  },3000)
    }
};
</script>