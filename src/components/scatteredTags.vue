<template>
  <div id="scatTag">
    <h3 v-if="title!=''">
      <p class="font-title">{{ title }}</p>
      <el-popover placement="bottom" title width="110" trigger="hover" :content="noteContent.note">
        <p class="note" slot="reference" v-if="noteContent.ifShow">备注</p>
      </el-popover>
    </h3>
    <div id="tagContent">
      <el-tag :key="item.id" v-for="item in tagContent" :type="item.type">
        {{ item.name }}
        <span v-if="item.ifNumber">({{item.number}})</span>
      </el-tag>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  props: ["title", "warnTag", "noteContent"],
  computed: {
    tagContent: function() {
      this.warnTag.map(item => {
        if (item.type == 1) {
          item.type = " ";
        } else if (item.type == 2) {
          item.type = "warning";
        } else {
          item.type = "danger";
        }
      });
      return this.warnTag;
    }
  },
  mounted() {
    this.tagRandom();
  },
  methods: {
    tagRandom: function() {
      let node = document.getElementById("tagContent");
      let maxWidth = node.offsetWidth/2;
      let maxHeight = node.offsetHeight - 82;
      console.log(maxHeight)
      let children = node.children;
      for (var i = 0; i < children.length; i++) {
        let width = children[i].offsetWidth;
        let ranLeft = parseInt(Math.random() * (maxWidth - width));
        let ranTop = parseInt(Math.random() * maxHeight);
        children[i].style.left = ranLeft + "px";
        children[i].style.top = ranTop+ "px";
        if (i > 0) {
            console.log(ranLeft);
            console.log(children[i - 1].style.left.split("px")[0])        }
      }
    }
  }
};
</script>
<style>
#scatTag {
  width: 100%;
  height: 100%;
  background: #fff;
}
#scatTag h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
}
#scatTag h3 .font-title:before {
  display: inline-block;
  content: " ";
  position: absolute;
  top: -3px;
  left: 0px;
  width: 10px;
  height: 20px;
  background: #1b89f0;
}
#scatTag h3 .font-title {
  position: relative;
  display: inline-block;
  padding-left: 22px;
  font-weight: bold;
  font-size: 16px;
  font-color: #ff333333;
}
#scatTag .note {
  position: relative;
  margin-right: 28px;
  color: rgba(102, 102, 102, 1);
  cursor: pointer;
  font-size: 14px;
}
#scatTag .note:before {
  display: inline-block;
  content: " ";
  position: absolute;
  top: 0px;
  left: -20px;
  width: 16px;
  height: 16px;
  background: url("../assets/logo.png");
  background-size: cover;
}
#tagContent {
  width: 100%;
  height: calc(100% - 82px);
  position: relative;
}
#scatTag .el-tag {
  position: absolute;
  height: auto;
  padding: 8px 11px;
  line-height: normal;
  border-radius: 22px;
  font-size: 14px;
}
.el-popover {
  min-width: 100px;
}
</style>