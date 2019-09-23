<template>
  <div>
      <el-row class="bigImgBox">
        <el-col :span="10" :offset="7">
          <el-card shadow="hover" class="bigImg">
            <img src="../assets/bigScreen/1.jpg" />
            <p>综合监控
              <span> 
               <i class="el-icon-s-tools" @click="dialogVisible = true"></i>            
              </span>
            </p>
          </el-card>
          </el-col>
      </el-row>
      <el-row class="smallImgBox"  type="flex" :gutter="40">
            <el-col  style=" height:100%;">
              <el-card shadow="hover" class="smallImg">
                <img src="../assets/bigScreen/2.jpg" />
                <p>漏洞监控
                   <span> 
               <i class="el-icon-s-tools" @click="dialogVisible = true"></i>
              </span>
                </p>
              </el-card>
            </el-col>
            <el-col  style="height:100%;">
               <el-card shadow="hover" class="smallImg">
                <img src="../assets/bigScreen/3.png" />
                <p>威胁监控
                   <span> 
               <i class="el-icon-s-tools" @click="dialogVisible = true"></i>
              </span>
                </p>
              </el-card>
            </el-col>
               <el-col style="height:100%;"> 
                 <el-card shadow="hover" class="smallImg">
                <img src="../assets/bigScreen/4.png" />
                <p>资产监控
                   <span> 
               <i class="el-icon-s-tools" @click="dialogVisible = true"></i>
              </span>
                </p>
              </el-card></el-col>
      </el-row>


<el-dialog
  title="更改设置"
  :visible.sync="dialogVisible"
   v-if="dialogVisible"
  width="30%"
  :before-close="handleClose">
  

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
 
  <el-form-item label="周期：" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="定时"></el-radio>
      <el-radio label="近7天"></el-radio>
      <el-radio label="近30天"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        ruleForm: {
          name: '',
          resource: '',

        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      //点击空白处关闭modal框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
           done()
          })
          .catch(_ => {});
      },
      //提交按钮事件
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送ajax数据



            //重置数据
            this.$refs[formName].resetFields();
            this.dialogVisible = false

          } else {
            console.log('error submit!!');
            return false;
          }
        });
       
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogVisible = false
      }
    }
  };
</script>

<style lang="less" scoped>
  //大的Img
.bigImgBox {
  margin-bottom:1rem;
  .bigImg {
    position: relative;
    //top: 1rem;
    transition: all 0.5s ease 0s;
    &:hover {
      //top: 0.5rem;
      box-shadow: 0 14px 18px 0 rgba(0, 0, 0, 0.3) !important;
    }
    img {
      width: 100%;
    }
    p {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      top: 0.4rem;
       span{
        display: inline-block;
        position: absolute;
        right:1rem;
        &:hover{
          color:Skyblue;
           cursor: pointer;
        }
      }
    }
  }
}
 //小的Img
  .smallImgBox{
   
  .smallImg {
     position: relative;
    top: 0.5rem;
    width:100%;
    height:70%;
    transition: all 0.5s ease 0s;
    &:hover {
      //top: 1rem;
      box-shadow: 0 7px 9px 0 rgba(0, 0, 0, 0.3) !important;
    }
    img {
      width: 100%;
    }
    p {
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      top: 0.4rem;
       span{
        display: inline-block;
        position: absolute;
        right:1rem;
        &:hover{
          color:Skyblue;
          cursor: pointer;
        }
      }
    }
  }
  }
</style>
