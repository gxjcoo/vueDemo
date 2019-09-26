<template>
  <div class="searchInfo">
  
    <el-row class="box">
      <el-col :span="14" class="left">
        <div id="charts" style=" width:100%;height:100%;"></div>
      </el-col>
    </el-row>
  </div>
</template>



<style lang="less" scoped>
.searchInfo {
  width: 100%;
  height: 92vh;
  background: #fff;
  border-radius: 10px;
  padding-top: 0.8334rem;
  .search {
    margin-left: 0.8334rem;
  }
  .example {
    margin: 0.8334rem 0 0.7rem 0.8334rem;
  }
  .box {
    border-top: 1px solid rgba(245, 245, 245, 1);
    height: 79vh;
    .left {
      height: 79vh;
      border-right: 1px solid rgba(245, 245, 245, 1);
    }
    .right {
      height: 79vh;
      overflow: auto;
      .info {
        height: 11.542rem;
        padding: 0.792rem;
        border-bottom: 1px solid rgba(245, 245, 245, 1);
      }
      .detail {
        height: 25.25rem;
        padding: 0.792rem;
        .button_group {
          margin-top: 0.125rem;
          height: 1.5rem;
          button {
            margin-right: 0.417rem;
            height: 1.5rem;
            line-height: 1.5rem;
            padding: 0 0.5rem;
            background: linear-gradient(
              90deg,
              rgba(55, 111, 222, 1) 0%,
              rgba(3, 157, 255, 1) 100%
            );
            border-radius: 10px;
            border: none;
          }
        }
        .content_detail {
          margin-top: 1.25rem;
          height: 21.417rem;
          .intelligence {
            height: 6.667rem;
            .title {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
            }
            .substance {
              margin: 1.292rem 1rem;
              overflow: hidden;
              ul:nth-child(1) {
                float: left;
              }
              ul:nth-child(2) {
                float: right;
                li:nth-child(1) {
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                }
                li:nth-child(2) {
                  margin-left: 1rem;

                  height: 1.333rem;
                  background: rgba(179, 179, 179, 0.1);
                  border: 1px solid rgba(179, 179, 179, 1);
                  opacity: 0.8;
                  border-radius: 0.667rem;
                  margin-top: 0.875rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import { cahrtGraphForSearch } from "@/utils/charts/cahrtGraphForSearch";
export default {
  data() {
    return {};
  },
  methods: {
    cahrtGraphForSearch
  },
  mounted() {
    this.$nextTick(function() {
      this.cahrtGraphForSearch(this, "charts");
    });
  }
};
</script>