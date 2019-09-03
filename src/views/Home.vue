<template>
  <div class="reportSubscriptionManage">
    <el-row class="header_title">
      <el-col :span="12">
        <Title title="报表订阅" titleEn="Task Report"></Title>
      </el-col>
      <el-col :span="12" align="right">
        <el-button icon="el-icon-plus">添加报表</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <el-table :data="tableData" stripe>
        <el-table-column label="报表名称" prop="name"></el-table-column>
        <el-table-column label="报表模板名称" prop="name"></el-table-column>
        <el-table-column label="生成周期" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-document"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination></Pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Title from "@/components/common/Title";
import Pagination from "@/components/common/Pagination";
export default {
  components: {
    Title,
    Pagination
  },
  data() {
    return {
      tableData: [
        { name: "张三" },
        { name: "张三1" },
        { name: "张三2" },
        { name: "张三3" },
        { name: "张三4" }
      ]
    };
  }
};
</script>

<style>
.reportSubscriptionManage .header_title {
  justify-content: space-between;
}
.reportSubscriptionManage .header_title .el-button,
.reportSubscriptionManage .submitBtn {
  background: linear-gradient(
    90deg,
    rgba(55, 111, 222, 1) 0%,
    rgba(3, 157, 255, 1) 100%
  );
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
.reportSubscriptionManage .box-card {
  height: 32rem;
  position: relative;
}
.reportSubscriptionManage .pagination {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 0.3rem;
}
</style>