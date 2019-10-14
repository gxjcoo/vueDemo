<template>
  <div class="box">
    <h2>基于el-table的动态表格</h2>
    <div style="width:30rem;margin:0 auto">
         
<el-table :data="tableData" height="250" border style="width: 100%;">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    </div>
    <div>
      <h2>给予Vue的transition-group生成动态table</h2>
        <!--对于v-for遍历有一组数据的过渡，不能使用transition包裹后，然后定义动画效果，而是使用transition-group进行包裹-->
        <!--同时，对于transition-group包裹的元素，必须要有唯一的key属性，同数据库关键字效果-->
      <p class="theard">
        <span>name</span>
        <span>qq</span>
        <span>happy</span>
      </p>
      <ul class="tbody">
        <transition-group appear tag="ul">
          <li
            v-for="(item) in list"
            :key="item.id"
          >
          <span> {{ item.name }}</span>
          <span>{{ item.qq }}</span>
          <span>{{ item.happyNum }}</span>
          </li>
        </transition-group>
      
      </ul>
    </div>
  </div>
</template>




<script>
let id = 3
let tableData = [
  {
    date: "2016-05-05",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-06",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-07",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-08",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-09",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-10",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-11",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-12",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  }
];
export default {
  data() {
    return {
      interval: "",
      tableData: [
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],

   
      //还是注意这里如果这里是查询，不能写null表示空，而是直接使用‘’表示
      list: [
      ]
    };
  },
  methods: {
   change() {
    if(tableData.length>0){
      //change、paly表格数据动态滚动
      this.tableData.unshift(tableData[0]);//把第一条数据插入数组最有一条
      tableData.shift();//删除数组中第一条数据
      }else{
        console.log("没数据了")
        window.clearInterval(this.interval)
        this.interval=null
    }
  },
    play() {
      this.interval = setInterval(this.change, 2000); //每两秒执行一次插入删除操作
      this.interval = setInterval(this.add, 2000); //每两秒执行一次插入删除操作
    },

    add() {
      this.list.unshift({ id:id,name: "陈小帅", qq: 3199578835, happyNum: 10  });
      id++;
    },
  },
  created() {
    this.play();
  },
  destroyed() {
    window.clearInterval(this.interval);
    this.interval = null;
  }
};
</script>
<style lang="less">
.box {
  width: 100%;
  height: 100vh;
  background: #000;
  color: #fff;
}

//transition-group
.theard{
  font-size: 1rem;
  font-weight: bold;
  span{
    display: inline-block;
    width:10rem;
  }
}
.tbody{
  width:40rem;
  height: 10rem;
  overflow: auto;
  li {
  line-height: 150%;
  span{
      display: inline-block;
    width:10rem;
  }
}
}


.v-enter,
.v-lerve-to {
  opacity: 0;
  transform: translateY(-10px);
}
.v-enter-active,
.v-lerve-active {
  transition: all 1s ease;
}
/*添加进场效果*/

.v-move {
  transition: all 2s ease;
}
.v-leave-active {
  position: absolute;
}







//el-table
.el-table__row:nth-child(1){
  animation: donghua 2s infinite ;
}
.el-table__body{
  position: absolute;
  animation: tableDonghua 1s infinite;
}
@keyframes donghua {
  0%{
    opacity: 0.51;
  }
  100%{
    opacity: 1;
  }
}
@keyframes tableDonghua {
  0%{
  top:-1.8rem
  }
  100%{
  top:0rem
  }}
</style>
