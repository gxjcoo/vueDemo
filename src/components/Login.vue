<template>
    <div class="login-wrap">
 
        <div class="ms-login">
               <div>登录</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item   prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item   prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="login"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
    
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123123'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
         async login(){
            const result = await this.$axios.get("/login").then(data=>data.data);
            if(result){
                this.$router.push({name:'Main'})
            }else{
                alert("请输入正确信息")
            }
            this.$store.commit('me/changeLogin',{result})
          }
        },
    }
</script>

<style scoped>

    .login-wrap{
        position: relative;
        width:80rem;
        height:45rem;
        background: url("../../public/images/login_background.png") center center repeat-y  ;
    }
    .ms-login>div{
        font-size:1.25rem;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(0,148,251,1);
           position: absolute;
    top: 3rem;
    text-align: center;
    width:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        text-align: center;
        color: #fff;

    }
    .ms-login{
        position: fixed;
        left:50%;
        top:50%;
        background: url("../../public/images/login.png") ;
        background-size:39rem 26rem;
        width:39rem;
        height:26rem;
        transform: translate(-50%, -50%);
        border-radius: 5px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:20rem;
        height:36px;
    }
    .demo-ruleForm{
        width:20rem;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        background-size:39rem 26rem;
    }
</style>