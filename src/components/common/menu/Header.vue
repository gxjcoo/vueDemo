<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div style="background:rgba(27,63,119,1);box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.08);" class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div v-show="!collapse" class="logo" style="background:rgba(27,63,119,1);box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.08);">态势感知平台</div>

        <div class="header-right">
            <div class="header-user-con">

                <span style="color:rgba(153,153,153,1);font-size:10px">©2008 - 2019  杭州迪普科技股份有限公司  浙ICP备09001402号</span>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a >
                            <el-dropdown-item>leper</el-dropdown-item>
                        </a>
                        <a >
                            <el-dropdown-item>guanxiangjie</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2
            }
        },
        computed:{
            username(){
                // let username = localStorage.getItem('ms_username');
                // return username ? username : this.name;
                return "李鹏飞"
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style >
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
    }
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 2rem;
    font-size: 0.9166666666666666rem;
    color: #fff;
    background-color: #fff;
}
 
.collapse-btn{
    box-sizing:border-box;
    float: left;
    width:2rem;
    cursor: pointer;
    line-height: 2rem;
    color:#fff;
    text-align:center;
    height: 2rem;
}
.header .logo{
    float: left;
    line-height: 2rem;
    height: 2rem;
}
.logo{
    font-size:0.625rem;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:2rem;
    width:7rem;
}
 
.header-right{
    float: right;
    padding-right: 2.0833333333333335rem;
}
.header-user-con{
    display: flex;
    height: 2rem;
    align-items: center;
}
.btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 0.20833333333333334rem;
    font-size: 1rem;
}
.btn-bell, .btn-fullscreen{
    position: relative;
    height: 2rem;
    text-align: center;
    border-radius: 0.625rem;
    cursor: pointer;
}
.btn-bell-badge{
    position: absolute;
    right: 0;
    top: -0.08333333333333333rem;
    width: 0.3333333333333333rem;
    height: 0.3333333333333333rem;
    border-radius: 0.16666666666666666rem;
    background: #f56c6c;
    color: #000;
}
.btn-bell .el-icon-bell{
    color: #00f;
}
.user-name{
    margin-left: 0.4166666666666667rem;
}
.user-avator{
    margin-left: 0.8333333333333334rem;
}
.user-avator img{
    display: block;
    width:1.6666666666666667rem;
    height:1.6666666666666667rem;
    border-radius: 50%;
}
.el-dropdown-link{
    color: #000;
    cursor: pointer;
}
.el-dropdown-menu__item{
    text-align: center;
}
.header-bar{
    width: 20.833333333333332rem;
    float: left;
    height: 2.9166666666666665rem;
    line-height: 2.9166666666666665rem;
}
.header .el-breadcrumb__item>.el-breadcrumb__inner{
    color: rgba(27,137,240,1) 
}
.header .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color: rgba(27,137,240,1) 
}
.header .el-breadcrumb__separator[class*=icon]{
    color:rgba(27,137,240,1) 
}
 

</style>
