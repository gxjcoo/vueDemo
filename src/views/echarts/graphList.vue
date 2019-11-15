<template>
  <div class="box">
    <div class="title">
      <ul>
        <li v-for="item in tag" :key="item.title">{{item.title}}</li>
      </ul>
    </div>
    <div class="tag">
      <ul>
        <li v-for="(item,index) in tag" :key="index">
          <img :src="item.icon" alt />
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="graph">
      <!-- 一级,默认显示 -->
      <div v-if="show">
        <div class="content_1">
          <div v-for="(item,index) in source" :key="index">
            <img :src="tag[0].icon" />
            <p class="p1">{{item.ip|| item.name}}</p>
            <p class="p2">
              <span>{{tag[0].title=='源IP'?'访问次数':'发起攻击'}}</span>
              <span>{{item.num || item.value}}次</span>
            </p>
          </div>
        </div>
        <div class="content_2">
          <div v-for="(item,index) in attackType" :key="index">
            <img :src="tag[1].icon"/>
            <p class="p1">{{(item.attack|| item.name)}}{{'（'+attackNums[index]+'）'}}</p>
            <p class="p2">
              <span v-if="isNaN(item.num)">{{item.num|| item.value}}</span>
              <span v-else>{{item.num|| item.value}}次</span>
            </p>
            <p class="p3">
              <span class="downButton" @click="open1(index)"></span>
            </p>
          </div>
        </div>
        <div class="content_3">
          <div v-for="(item,index) in target" :key="index">
            <img :src="tag[2].icon" />
            <p class="p1">{{(item.ip || item.name)}}{{'（'+targetNums[index]+'）'}}</p>
            <p class="p2">
              <span>{{tag[0].title=='源IP'?'被访问次数':'遭受攻击'}}</span>
              <span>{{item.num || item.value}}次</span>
            </p>
            <p class="p3">
              <span class="downButton" @click="open2(index)"></span>
            </p>
          </div>
        </div>
      </div>
      <!-- 二级,点击后显示 -->
      <div v-else>
        <div class="content_1">
          <div v-for="(item,index) in s2" v-if="showSource.indexOf(index)!=-1" :key="index">
            <div>
              <img :src="tag[0].icon" />
              <p class="p1">{{item.ip|| item.name}}</p>
              <p class="p2">
                <span>{{tag[0].title=='源IP'?'访问次数':'发起攻击'}}</span>
                <span>{{item.num || item.value}}次</span>
              </p>
            </div>
          </div>
        </div>
        <div class="content_2">
          <div
            v-for="(item,index) in a2"
            :key="item.attack|| item.name"
            v-if="showAttact.indexOf(index)!=-1"
          >
            <img :src="tag[1].icon" />
            <p class="p1">{{(item.attack|| item.name)+(show1===false?'（'+a2.length+'）':'')}}</p>
            <p class="p2">
              <span v-if="isNaN(item.num)">{{item.num|| item.value}}</span>
              <span v-else>{{item.num|| item.value}}次</span>
            </p>

            <p class="p3" v-if="showAttacticon.indexOf(index)!=-1">
              <!-- 目的IP展开后的攻击手段事件 -->
              <span class="downButton" @click="open4(index)"></span>
            </p>
            <p class="p3" v-else>
              <!-- 返回第一层 -->
              <span class="upButton" @click="close(1)" v-if="showSourceicon.indexOf(index)!=-1"></span>
            </p>

            <p class="p3"></p>
          </div>
        </div>
        <div class="content_3">
          <div
            v-for="(item,index) in t2"
            :key="item.ip||item.name"
            v-if="showTarget.indexOf(index)!=-1"
          >
            <img :src="tag[2].icon" />
            <p class="p1">{{(item.ip || item.name) +(show2===false?'（'+t2.length+'）':'')}}</p>
            <p class="p2">
              <span>{{tag[0].title=='源IP'?'被访问次数':'遭受攻击'}}</span>
              <span>{{item.num || item.value}}次</span>
            </p>
            <p class="p3" v-if="showTargeticon.indexOf(index)!=-1">
              <!-- 攻击手段展开后的目的IP事件 -->
              <span class="downButton" @click="open3(index)"></span>
            </p>
            <p class="p3" v-else>
              <span class="upButton" @click="close(2)" v-if="showSourceicon.indexOf(index)!=-1"></span>
            </p>
          </div>
        </div>
      </div>
      <!-- 一级,默认显示 -->
      <div v-if="show">
        <div class="echarts_graph_1">
          <div id="echarts_graph1" style=" width:100%;height:100%; "></div>
        </div>
        <div class="echarts_graph_2">
          <div id="echarts_graph2" style=" width:100%;height:100%;"></div>
        </div>
      </div>
      <!-- 二级,点击后显示 -->
      <div v-else>
        <div class="echarts_graph_1">
          <div id="echarts_graph3" style=" width:100%;height:100%; "></div>
        </div>
        <div class="echarts_graph_2">
          <div id="echarts_graph4" style=" width:100%;height:100%;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { graph } from "@/utils/charts/graphList";
export default {
  data() {
    return {
      show: true,
      //判断1，2列是否完整显示
      show1:false,
      show2:false,
      source: [],
      attackType: [],
      target: [],
      //数量
      attackNums:[],
      targetNums:[],
      lineData: [[0, 5], [1, 6], [2, 7], [3, 8], [4, 9]],
      //控制数据的显示
      showSource: [0, 1, 2, 3, 4],
      showAttact: [0, 1, 2, 3, 4],
      showTarget: [0, 1, 2, 3, 4],
      //控制icon的显示
      showSourceicon: [0, 1, 2, 3, 4],
      showAttacticon: [0, 1, 2, 3, 4],
      showTargeticon: [0, 1, 2, 3, 4],
      //初始连线
      l: [],
      //攻击手段
      a2: [],
      //目标
      t2: [],
      //当前选中组
      p: [],

      //模拟假数据
      graphData: [
        {
          srcIp: { ip: "200.121.131.1", num: 21 },
          attactType: [
            {
              attack: "攻击手段m",
              num: 21
            },
            {
              attack: "攻击手段1",
              num: 21
            },
            {
              attack: "攻击手段2",
              num: 21
            },
            {
              attack: "攻击手段3",
              num: "遭受攻击"
            },
            {
              attack: "攻击手段4",
              num: 21
            }
          ],
          attactTarget: [
            { ip: "200.121.131.412", num: 21 },
            { ip: "200.121.131.42", num: 21 },
            { ip: "200.121.131.12", num: 21 },
            { ip: "200.121.131.4012", num: 21 },

          ],
          attactInfo: [
            {
              attactType: "攻击手段1",
              attactTarget: [ "200.121.131.12"]
            },
            {
              attactType: "攻击手段m",
              attactTarget: ["200.121.131.412"]
            },
            {
              attactType: "攻击手段4",
              attactTarget: ["200.121.131.42", "200.121.131.4012"]
            }
          ]
        },
        {
          srcIp: { ip: "200.121.131.2", num: 22 },
          attactType: [
            {
              attack: "攻击手段n",
              num: 21
            },
            {
              attack: "攻击手段2",
              num: 21
            },
            {
              attack: "攻击手段3",
              num: 21
            },
            {
              attack: "攻击手段4",
              num: "遭受攻击"
            },
            {
              attack: "攻击手段5",
              num: 21
            }
          ],
          attactTarget: [
            { ip: "200.120.131.412", num: 22 },
            { ip: "200.120.131.42", num: 22 },
            { ip: "200.120.131.12", num: 22 },
            { ip: "200.120.131.4012", num: 22 },
            { ip: "200.120.131.4122", num: 22 }
          ],
          attactInfo: [
            {
              attactType: "攻击手段3",
              attactTarget: ["200.120.131.4122", "200.120.131.412"]
            },
            {
              attactType: "攻击手段5",
              attactTarget: ["200.120.131.42"]
            }
          ]
        },
        {
          srcIp: { ip: "200.121.131.3", num: 23 },
          attactType: [
            { attack: "攻击手段g", num: 21 },
            { attack: "攻击手段1", num: 21 },
            { attack: "攻击手段2", num: 21 },
            { attack: "攻击手段3", num: "遭受攻击" },
            { attack: "攻击手段4", num: 21 }
          ],
          attactTarget: [
            { ip: "200.121.131.412", num: 23 },
            { ip: "200.121.131.42", num: 23 },
            { ip: "200.121.131.12", num: 23 },
            { ip: "200.121.131.4012", num: 23 },
            { ip: "200.121.131.4122", num: 23 }
          ],
          attactInfo: [
           {
              attactType: "攻击手段g",
              attactTarget: [ "200.121.131.12"]
            },
            {
              attactType: "攻击手段2",
              attactTarget: ["200.121.131.412"]
            },
            {
              attactType: "攻击手段4",
              attactTarget: ["200.121.131.42", "200.121.131.4012"]
            }
          ]
        },
        {
          srcIp: { ip: "200.121.131.4", num: 24 },
          attactType: [
            { attack: "攻击手段h", num: 21 },
            { attack: "攻击手段1", num: 21 },
            { attack: "攻击手段2", num: 21 },
            { attack: "攻击手段3", num: "遭受攻击" },
            { attack: "攻击手段4", num: 21 }
          ],
          attactTarget: [
            { ip: "200.121.131.412", num: 24 },
            { ip: "200.121.131.42", num: 24 },
            { ip: "200.121.131.12", num: 24 },
            { ip: "200.121.131.4012", num: 24 },
            { ip: "200.121.131.4122", num: 24 }
          ],
          attactInfo: [
          {
              attactType: "攻击手段1",
              attactTarget: [ "200.121.131.12"]
            },
            {
              attactType: "攻击手段h",
              attactTarget: ["200.121.131.412"]
            },
            {
              attactType: "攻击手段2",
              attactTarget: ["200.121.131.42", "200.121.131.4012"]
            }
          ]
        },
        {
          srcIp: { ip: "200.121.131.5", num: 25 },
          attactType: [
            { attack: "攻击手段q", num: 21 },
            { attack: "攻击手段1", num: 21 },
            { attack: "攻击手段2", num: 21 },
            { attack: "攻击手段3", num: "遭受攻击" }
          ],
          attactTarget: [
            { ip: "200.121.131.412", num: 25 },
            { ip: "200.121.131.42", num: 25 },
            { ip: "200.121.131.12", num: 25 },
            { ip: "200.121.131.4012", num: 25 },
            { ip: "200.121.131.4122", num: 25 }
          ],
          attactInfo: [
           {
              attactType: "攻击手段3",
              attactTarget: [ "200.121.131.12"]
            },
            {
              attactType: "攻击手段4",
              attactTarget: ["200.121.131.412"]
            },
            {
              attactType: "攻击手段q",
              attactTarget: ["200.121.131.42", "200.121.131.4012"]
            }
          ]
        }
      ],
      color:"#000",
      tag:[{title:"第一列",icon:require("@/assets/1.png")},{title:"第二列",icon:require("@/assets/2.png")},{title:"第三列",icon:require("@/assets/3.png")}]
    };
  },
  created() {

  },
  methods: {
    graph,
    //点击攻击手段事件
    open1(i) {
      this.show = false;
      this.show1 = true;
      //控制数据的显示隐藏
      this.showSource = [0];
      this.showTarget = [0];
      //控制隐藏按钮的显示
      this.showSourceicon = [0];
      this.showTargeticon = [0];
      this.showAttacticon = [];
      //模拟假数据
      this.p = this.graphData[i];
      this.a2 = this.p.attactType;
      this.t2 = this.p.attactTarget;
      this.s2 = [this.p.srcIp];
      let j = 5;
      let n = 0;
      let l1 = this.p.attactType.map(item => [0, j++]);
      let l2 = this.p.attactType.map(item => [n++,5]);
      this.line = [l1, l2];
    },
    //点击目的IP事件
    open2(i) {
      console.log(i)
      this.show = false;
      this.show2 = true;
      this.showAttact = [0];
      this.showSource = [0];
      this.showTarget = [];
      this.showSourceicon = [0];
      this.showTargeticon = [];
      this.showAttacticon = [0];
      //模拟假数据

      //当前选中项的所有数据局
      this.p = this.graphData[i]
      console.log(this.p)

      this.a2 = this.p.attactType;
      this.t2 = this.p.attactTarget;
      let n = 0;
      this.t2.map(item => {
        this.showTarget.push(n);
        n++;
      });
      this.s2 = [this.p.srcIp];
      let l1 = [[0, 5]];
      let j = 5;
      let l2 = this.p.attactTarget.map(item => [0, j++]);

      this.line = [l1, l2];
    },
    //攻击手段展开后的目的IP事件
    open3(i) {
      this.show1 = true;
      this.show2 = true
      this.showTarget = [0, 1, 2, 3, 4];
      this.showAttacticon = [];
      this.showSourceicon = [0];
      this.showTargeticon = [];
      //模拟假数据
      //当前选中项的攻击手段信息
      let Type = this.p.attactType.map(item => item.attack);
      //当前选中项的目的IP
      let Target = this.p.attactTarget.map(item => item.ip);
      let l2 = [];
      this.a2 = this.p.attactType;
      this.t2 = this.p.attactTarget;
      let j = 5;
      let l1 = this.p.attactType.map(item => [0, j++]);
      this.p.attactInfo.forEach(item =>
        item.attactTarget.forEach(it =>
          l2.push([Type.indexOf(item.attactType), 5 + Target.indexOf(it)])
        )
      );
      this.line = [l1, l2];
      setTimeout(() => {
        this.graph(this, "echarts_graph3", this.line[0], this.color);
        this.graph(this, "echarts_graph4", this.line[1], this.color);
      }, 0);
    },
    //目的IP展开后的攻击手段事件
    open4(i) {
      this.show = false;
      this.show1 = true;
      this.show2 = true;
      this.showSource = [i];
      this.showAttact = [0, 1, 2, 3, 4];
      this.showSourceicon = [0];
      this.showAttacticon = [];

      //模拟假数据
      //当前选中项的所有数据局
      //当前选中项的攻击手段信息
      let Type = this.p.attactType.map(item => item.attack);
      //当前选中项的目的IP
      let Target = this.p.attactTarget.map(item => item.ip);

      let l2 = [];
      this.a2 = this.p.attactType;
      this.t2 = this.p.attactTarget;
      let j = 5;
      let l1 = this.p.attactType.map(item => [0, j++]);
      this.p.attactInfo.forEach(item =>
        item.attactTarget.forEach(it =>
          l2.push([Type.indexOf(item.attactType), 5 + Target.indexOf(it)])
        )
      );
      this.line = [l1, l2];
      setTimeout(() => {
        this.graph(this, "echarts_graph3", this.line[0], this.color);
        this.graph(this, "echarts_graph4", this.line[1], this.color);
      }, 0);
    },
    close(n) {
             if(this.show1&&this.show2){
     if(n==1){
      this.show = false;
      this.show2 = true;
      this.showAttact = [0];
      this.showSource = [0];
      this.showTarget = [];
      this.showSourceicon = [0];
      this.showTargeticon = [];
      this.showAttacticon = [0];
      //模拟假数据

      //当前选中项的所有数据局
      this.a2 = this.p.attactType;
      this.t2 = this.p.attactTarget;
      let n = 0;
      this.t2.map(item => {
        this.showTarget.push(n);
        n++;
      });
      this.s2 = [this.p.srcIp];
      let l1 = [[0, 5]];
      let j = 5;
      let l2 = this.p.attactTarget.map(item => [0, j++]);
      this.line = [l1, l2];
         setTimeout(() => {
        this.graph(this, "echarts_graph3", this.line[0], this.color);
        this.graph(this, "echarts_graph4", this.line[1], this.color);
      }, 0);
         this.show1 = false
     }else{
         this.show = false;
      this.show1 = true;
      //控制数据的显示隐藏
      this.showSource = [0];
      this.showTarget = [0];
      //控制隐藏按钮的显示
      this.showSourceicon = [0];
      this.showTargeticon = [0];
      this.showAttacticon = [];
      //模拟假数据
      this.a2 = this.p.attactType;
      this.t2 = this.p.attactTarget;
      this.s2 = [this.p.srcIp];
      let j = 5;
      let n = 0;
      let l1 = this.p.attactType.map(item => [0, j++]);
      let l2 = this.p.attactType.map(item => [n++,5]);
      this.line = [l1, l2];
         setTimeout(() => {
        this.graph(this, "echarts_graph3", this.line[0], this.color);
        this.graph(this, "echarts_graph4", this.line[1], this.color);
      }, 0);
        this.show2 = false
     }


     return
   }
   if(this.show2){
      this.show = true;
      this.showAttact = [0, 1, 2, 3, 4];
      this.showSource = [0, 1, 2, 3, 4];
     this.show2 = false
     return 
   }
    if(this.show1){
       this.show = true;
      this.showAttact = [0, 1, 2, 3, 4];
      this.showSource = [0, 1, 2, 3, 4];
     this.show1 = false
   }

    }
  },
  mounted() {
    setTimeout(() => {
      this.source = this.graphData.map(item => item.srcIp);
      this.attackType = this.graphData.map(item => item.attactType[0]);
      this.target = this.graphData.map(item => item.attactTarget[0]);
       this.graphData.forEach(item => {
         this.attackNums.push(item.attactType.length),
       this.targetNums.push(item.attactTarget.length)
       });
      this.graph(this, "echarts_graph1", this.lineData, this.color);
      this.graph(this, "echarts_graph2", this.lineData, this.color);
    }, 1000);
  },
  watch: {
    show(val) {
      if (val) {
        setTimeout(() => {
          this.graph(this, "echarts_graph1", this.lineData, this.color);
          this.graph(this, "echarts_graph2", this.lineData, this.color);
        }, 0);
      } else {
        setTimeout(() => {
          this.graph(this, "echarts_graph3", this.line[0], this.color);
          this.graph(this, "echarts_graph4", this.line[1], this.color);
        }, 0);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  .title {
    position: absolute;
    top: 0.5rem;
    left: 11rem;
    ul {
      overflow: hidden;
      width: 50rem;
      li {
        float: left;
        font-size: 0.5833333333333334rem;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 50, 50, 1);
     
        &:nth-child(2) {
          margin-left: 18rem;
        }
        &:nth-child(3) {
          float: right;
          margin-right: 7.5rem;
        }
      }
    }
  }
  .tag {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    width: 5rem;
    ul {
      li {
        height: 1.4rem;
        margin-bottom: 0.2rem;
        span {
          font-size: 0.5833333333333334rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          vertical-align: 60%;
          margin-left: 0.3rem;
        }
        img {
          height: 100%;
        }
      }
    }
  }
  @keyframes xianshi {
    from {
      opacity: 0;
      height: 0;
    }
    to {
      opacity: 1;
      height: 3.5416666666666665rem;
    }
  }
  .graph {
    position: relative;
    top: 2rem;
    left: 10rem;
    .content_1,
    .content_2,
    .content_3 {
      position: absolute;

      div {
        animation: xianshi 0.5s;
        position: relative;
        width: 12.75rem;
        height: 3.5416666666666665rem;
        border-radius: 1.7916666666666667rem;
        border: 1px solid rgba(230, 230, 230, 1);
        margin-bottom: 0.5rem;
        img {
          width: 2.6666666666666665rem;
          height: 2.6666666666666665rem;
          margin-top: 0.4rem;
          margin-left: 0.5rem;
        }
        .p1 {
          position: absolute;
          top: 0.7rem;
          left: 4rem;
          font-size: 0.5833333333333334rem;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(51, 50, 50, 1);
        }
        .p2 {
          position: absolute;
          width: 10rem;
          top: 2rem;
          left: 4rem;
          font-size: 0.5833333333333334rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 101, 101, 1);
          span:nth-child(2) {
            position: absolute;
            right:40px;
          }
        }
        .p3 {
          position: absolute;
          width: 10rem;
          top: 0.5rem;
          left: 10rem;
          font-size: 0.5833333333333334rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 101, 101, 1);
          span:nth-child(2) {
            margin-left: 3.5rem;
          }
          .upButton {
            position: absolute;
            top: -0.5rem;
            height: 2rem;
            z-index: 9999;
            width: 2rem;
            background: url("../../assets/updown.png") no-repeat
              center center;
            cursor: pointer;
          }
          .downButton {
            position: absolute;
            top: -0.5rem;
            z-index: 10;
            height: 2rem;
            width: 2rem;
            transform: rotate(180deg);
            background: url("../../assets/updown.png") no-repeat
              center center;
            cursor: pointer;
          }
        }
      }
    }
    .content_2 {
      left: 20.3rem;
    }
    .content_3 {
      left: 40.5rem;
    }
    .echarts_graph_1 {
      position: absolute;
      left: 12.2rem;
      width: 8.375rem;
      height: 20.2rem;
    }
    .echarts_graph_2 {
      position: absolute;
      left: 32.3rem;
      width: 8.375rem;
      height: 20.2rem;
    }
  }
}
</style>
