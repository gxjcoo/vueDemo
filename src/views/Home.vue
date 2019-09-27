<template>
  <div class="comprehensive">
    <div class="top">
      <div class="title">态势感知平台</div>
      <div class="title_right">
        <p>当前风险值：<span style="color:#319FFF">70</span></p>
        <p>未来一小时风险：<span style="color:#FF3333">上升<i class="  el-icon-top"></i></span></p>      
      </div>
    </div>
    <div :class="{'left':true,'show':show,'hidden':hidden}">
      <el-row>
        <p>资产概览</p>
        <p>Asset Overview</p>
        <div></div>
      </el-row>
      <el-row v-for="item in device" :key="item.name">
        <el-col class="icon" :span="8"></el-col>
        <el-col :span="16" class="title">
          <el-row>{{item.name}}</el-row>
          <el-row>
            <i class="el-icon-caret-top" style="font-size: "></i>
            <span>13020</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div :class="{'right':true,'show':show,'hidden':hidden}">
 <div class="risk">
        <div class="title_risk">
              <p>风险评分</p>
        <p>Risk Score</p>
        <div></div>
        </div>
        <div id="chartsRisk" style=" width:100%;height:100%;"></div>
        <div class="detail">
           <p>相对于上周上升<span style="color:#319FFF">20%  <i class="  el-icon-top"></i> </span></p>
           <p>环比下降<span style="color:#FF3333">20% <i class="  el-icon-bottom"></i> </span></p>
        </div>
      </div>
      <div class="top5">
        <div class="title_top5">
              <p>攻击Top5</p>
        <p>Attack Top5</p>
        <div></div>
        </div>
        <div id="chartsBar" style=" width:100%;height:100%;"></div>
      </div>
       <div class="hot">
        <div class="title_hot">
              <p>热门事件</p>
        <p>Hot Event</p>
        <!-- 左侧白色标签 -->
        <div></div>
        </div>
        <!-- //内容 -->
        <div class="content_hot">
                  <div class="hot_item" v-for="(item,index) in hot" :key="index">
          <div class="rank">NO.{{index+1}}</div>
          <div class="content">杭州市主机设备发现最大漏洞</div>
        </div>
        </div>

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
  padding-left: .8rem;
  padding-right: .2rem;
  overflow: hidden;
}

.top{
  width:100%;
  height:3rem;
  .title{
    font-size: 1rem;
    color:#fff;
    line-height:3rem;
    font-weight: bold
  }
  .title_right{
    color:#fff;
    position: absolute;
    font-size: 0.7rem;
    right:1rem;
    top:1rem;
    p{
      float: left;
      padding-left:1rem;
      padding-right:1rem;
      &:nth-child(2){
      padding-right:0.2rem;
          border-left: 1px solid #333;
      }
    }
  }
}
.left > .el-row {
  margin-bottom: 2rem;
  
}
.left {
   position: absolute;
    width:20%;
    height:100%;
  overflow: hidden;
  .el-row {
    width: 10rem;
    &:nth-child(1){
       div{
        background: #fff;
        width:0.2rem;
        height:0.8rem;
        position: absolute;
        top:0.4rem;
        border-radius: 20%
      }
      color:#fff;
      margin-bottom:1rem;
      p{
        margin-left:.5rem;
        &:nth-child(1){
          font-size: 0.7rem;
          font-weight: bold;
        }
         &:nth-child(2){
        color: #aaa;
        }
      };
    }
    .icon {
      border-radius: 38%;
      height: 2.2rem;
      width: 2.2rem;
      box-shadow: 1px 1px 10px 2px #999 inset;
    }
    .title {
      .el-row:nth-child(1) {
        font-size: 0.58rem;
        color: #aaa;
        margin-left: 1.6rem;
          margin-bottom: 0rem !important;
      }
      .el-row:nth-child(2) {
        margin-left: 0.7rem;
        i {
          color: #0095ff;
          margin-right: 0.4rem;
        }
        span {
          font-size: 0.5rem;
          color: #fff;
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
    right:0rem;
    top:3rem;
 .risk{
     position: relative;
     top:1rem;
     height:10rem;
     .title_risk{
       position: absolute;
       top:-1rem;
       left:1.2rem;
       z-index:9;
 div{
        background: #fff;
        width:0.2rem;
        height:0.8rem;
        position: absolute;
        top:0.4rem;
        border-radius: 20%
      }
      color:#fff;
      margin-bottom:1rem;
      p{
        margin-left:.5rem;
        &:nth-child(1){
          font-size: 0.7rem;
          font-weight: bold;
        }
      };
     }
      .detail{
        position: absolute;
        color:#fff;
        top:9rem;
       margin-left:0.5rem;
        p{
      float: left;
      padding-left:1rem;
      padding-right:0.3rem;
      &:nth-child(2){
      padding-left:0.5rem;
      }
    }
       
     }
   }
   .top5{
     position: relative;
     top:3rem;
     height:10rem;
     .title_top5{
       position: absolute;
       top:-1rem;
       left:1.2rem;
       z-index:9;
 div{
        background: #fff;
        width:0.2rem;
        height:0.8rem;
        position: absolute;
        top:0.4rem;
        border-radius: 20%
      }
      color:#fff;
      margin-bottom:1rem;
      p{
        margin-left:.5rem;
        &:nth-child(1){
          font-size: 0.7rem;
          font-weight: bold;
        }
      };
     
     }
   }
    .hot{
     position: relative;
     top:4rem;
     height:10rem;
     .title_hot{
       position: absolute;
       top:-1rem;
       left:1.2rem;
       z-index:9;
 div{
        background: #fff;
        width:0.2rem;
        height:0.8rem;
        position: absolute;
        top:0.4rem;
        border-radius: 20%
      }
      color:#fff;
      margin-bottom:1rem;
      p{
        margin-left:.5rem;
        &:nth-child(1){
          font-size: 0.7rem;
          font-weight: bold;
        }
      };
     }
     .content_hot{
             position: absolute;
       top:1.5rem;
  .hot_item{
    width:13rem;
    height:1rem;
   
    margin-bottom:1rem;
   .rank{
       margin-left:1.2rem;
       float: left;
      height: 1rem;
      width: 2.2rem;
      box-shadow: 1px 1px 10px 2px #999 inset;  
             color:#fff;
             text-align: center;
     }
     .content{
       float: left;       
       color:#fff;
       margin-left:0.5rem;
     }
     }
     }
   
  
   }
    }
@keyframes hidden {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<script>
import {beatBar } from "../utils/charts/chartsBar"
import {pie } from "../utils/charts/chartPie"
export default {
    data() {
        return {
            show:false,
            hidden:false,
            device:[
                {name:'主机设备'},
                {name:'网络安全设备'},
                {name:'前端监控设备'},
                {name:'网络打印设备'},
                {name:'摄像机'},
                {name:'其他'},
            ],
              hot:[
                {name:'杭州市主机设备发现最大漏洞',num:"NO."},
                {name:'杭州市主机设备发现最大漏洞',num:"NO."},
                {name:'杭州市主机设备发现最大漏洞',num:"NO."},
                {name:'杭州市主机设备发现最大漏洞',num:"NO."},
                {name:'杭州市主机设备发现最大漏洞',num:"NO."}
            ]
        }
    },
    methods: {
    beatBar,
    pie
  },
    mounted(){
      this.$nextTick(function() {
      this.beatBar(this, "chartsBar");
      this.pie(this, "chartsRisk");
    })
    //  setInterval(()=>{
    //     this.show=!this.show,
    //   this.hidden = !this.hidden
    //  },3000)
    }
};
</script>