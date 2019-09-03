<template>
  <div class="searchInfo">
    <!-- input框 -->
    <el-row class="search">
      <el-col :span="10">
        <el-input v-model="input" placeholder="请输入IP、域名、文件名（MD5/SHA1）"></el-input>
      </el-col>
      <el-col :span="4">
        <button>搜索</button>
      </el-col>
    </el-row>
    <!-- 示例 -->
    <el-row class="example">
      <el-col :span="24">搜索样例</el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="14" class="left">
        <div id="charts" style=" width:100%;height:100%;"></div>
      </el-col>
      <el-col :span="10" class="right">
        <el-row class="info">
        
        </el-row>
        <el-row class="detail">
          <div class="button_group">
            <button>XXXX</button>
            <button>XXXX</button>
            <button>XXXX</button>
          </div>
          <div class="content_detail">
            <div class="intelligence" v-for="(item,index) in info" :key="index">
              <div class="title">
                {{item}}
                <svg
                  style="margin-left:10px"
                  t="1567154070875"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  p-id="3713"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m3.008-92.992a416 416 0 1 0 0-832 416 416 0 0 0 0 832zM457.792 684.8h130.56v128.128h-130.56V684.8zM320 397.44c0.576-29.952 5.696-57.408 15.36-82.368 9.728-24.96 23.296-46.592 40.832-64.896a183.68 183.68 0 0 1 63.168-42.88A213.76 213.76 0 0 1 522.24 192c39.36 0 72.256 5.376 98.56 16.192 26.368 10.88 47.616 24.32 63.68 40.384s27.584 33.408 34.56 52.032c6.912 18.56 10.368 35.84 10.368 51.968 0 26.624-3.456 48.512-10.432 65.728a162.048 162.048 0 0 1-59.904 75.328c-12.48 8.576-24.256 17.152-35.328 25.792a165.44 165.44 0 0 0-29.504 29.504c-8.64 11.072-14.08 24.96-16.256 41.6v31.616H465.6v-37.44c1.664-23.872 6.208-43.84 13.696-59.904 7.552-16.064 16.256-29.824 26.24-41.152 9.984-11.392 20.48-21.248 31.616-29.568 11.072-8.32 21.376-16.64 30.784-24.96 9.408-8.32 17.024-17.472 22.848-27.456 5.888-9.984 8.512-22.464 7.936-37.44 0-25.536-6.208-44.352-18.752-56.576-12.48-12.16-29.76-18.304-51.968-18.304-14.976 0-27.84 2.88-38.656 8.704a77.184 77.184 0 0 0-26.688 23.296 101.12 101.12 0 0 0-15.36 34.176 169.408 169.408 0 0 0-4.992 41.984H320z"
                    fill="#F01B1B"
                    p-id="3714"
                  />
                </svg>
              </div>
              <div class="substance">
                <ul>
                  <li>ThreatBook.Labs</li>
                  <li>垃圾邮件</li>
                </ul>
                <ul>
                  <li>2019.10.24 10:10:10</li>
                  <li>已过期</li>
                </ul>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col></el-col>
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
import { cahrtGraphForSearch } from "../utils/charts/cahrtGraphForSearch";
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