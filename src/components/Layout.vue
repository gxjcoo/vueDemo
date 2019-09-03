
<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper" />echarts
            </template>
            <MenuItem name="1-1">参差不齐的圆</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats" />统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{padding: '0 16px 16px'  }">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <div>
            <router-view></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>
<style>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.ivu-breadcrumb {
  display: flex;
}
.ivu-layout-content {
  background: #f2f3f5;
}
.ivu-card-body {
  padding: 0;
}
.ivu-card-body {
  background: #f2f3f5;
}

</style>