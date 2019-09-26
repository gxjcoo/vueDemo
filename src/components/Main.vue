<template>
    <div class="wrapper">
        <v-head></v-head>
        <div style="clear：both；height：0；display：block；overflow：hidden；"></div>
        <v-sidebar></v-sidebar>
        <div style="clear：both；height：0；display：block；overflow：hidden；"></div>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<style>
*{
    padding:0;
    margin:0;
        box-sizing:border-box;

    }
 .content-box {
    position: absolute;
    left: 9rem;
    right: 0;
    top: 2rem;
    bottom: 0;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}
.content-collapse {
    left: 2rem;
}
.content {
    width: auto;
    height: 100%;
    padding: 8px;
    overflow-y: scroll;
    box-sizing: border-box;
}
.isopend>ul>li{
    background:"#0f0"
}
</style>
<script>
    import vHead from './common/menu/Header.vue';
    import vSidebar from './common/menu/Sidebar.vue';
    import bus from './common/menu/bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }

</script>
