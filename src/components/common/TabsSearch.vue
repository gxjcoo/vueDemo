<template>
  <div class="TabsSearch">
      <el-row class="contentBox">
    <el-col :span="19" class="tabBox">
      <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" @close="tabClose(tag)">
           <el-popover
    placement="top-start"
    trigger="hover">
    <div class="hoverContentBox">
        <h3 class="successTxt">匹配</h3>
        <el-tag v-for="tag in tags" :key="tag.name" closable type="" @close="tabClose(tag)">
             {{tag.tagsType}}:
          <font style="color:#333333">{{tag.value}}</font>
        </el-tag>
        <h3 class="errorTxt">排除</h3>
         <el-tag v-for="tag in tags" :key="tag.name" closable type="danger" @close="tabClose(tag)">
             {{tag.tagsType}}:
          <font style="color:#333333">{{tag.value}}</font>
        </el-tag>
    </div>
<span slot="reference" style="margin-right:0">
     {{tag.tagsType}}:
          <font style="color:#333333">{{tag.value}}</font>
</span>
  </el-popover>
         
          </el-tag>
    <span class="elipse">...</span>
    </el-col>
    <el-col :span="5" align="right" class="searchBox">
        <i class="el-icon-delete"></i>
        <el-button>精确查找</el-button>
        <el-button>模糊查找</el-button>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {tagsType:'源Ip1', value: "192.1685.265", type: "" },
        {tagsType:'源Ip12', value: "192.1685.265", type: "" },
        {tagsType:'源Ip4', value: "192.1685.265", type: "" },
        {tagsType:'源Ip7', value: "192.1685.265", type: "" },
        {tagsType:'源信息源端口', value: "192.1685.265", type: "danger" },
    
      ]
    };
  },
  methods:{
      tabClose(e){
          this.tags.splice(this.tags.indexOf(e),1);
      }
  }
};
</script>

<style scoped>
.TabsSearch {
  background: #1b89f0;
  border-radius: 5px;
  padding-left: 8px;
}
.contentBox {
  background: #fff;
    padding: 0 8px;
    line-height: 46px;
    height: 50px;
}
.contentBox .tabBox{
    position: relative;
    height: 50px;
    overflow: hidden;
    padding-right: 16px;
}
.tabBox .elipse{
    position: absolute;
    right: 6%;
    bottom: 0;
    color: #1b89f0;
    line-height: 37px;
    font-weight: bold;
    margin-right: 0;
}
.tabBox span,.hoverContentBox span{
    margin-right: 15px;
    border-radius: 20px;
    cursor: pointer
}
.hoverContentBox{
    margin-top: -8px;
}
.hoverContentBox h3{
    font-size: 14px;
    font-weight: bold;
    line-height: 2rem
}
.hoverContentBox .successTxt{
      color: #1b89f0;
}
.hoverContentBox .errorTxt{
     color: #f56c6c;
}
.TabsSearch .searchBox .el-icon-delete{
width: 30px;
    text-align: center;
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
    height: 30px;
    line-height: 30px;
    margin-right: 12px;
    border-radius: 20px;
    cursor: pointer
}
.TabsSearch .searchBox .el-button{
   background:linear-gradient(90deg,rgba(55,111,222,1) 0%,rgba(3,157,255,1) 100%);
   color:#fff;
   border-radius: 10px;
    padding: 10px 18px;
}
</style>