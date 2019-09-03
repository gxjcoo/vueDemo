

<template>
  <div>
    <el-row>
        <el-col style="height:2.4rem" :span="24"><div class="tittle"><p style="width:100%" class="tittleZH">{{title}}</p><p style="width:100%" class="tittleEN">{{titleEn}}</p></div>
          <el-button v-if="Btn" size="mini"  style="margin-top: 0.4rem;" @click="change(show)" type="primary" icon="el-icon-sort" circle></el-button>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    title:String,
    titleEn:String,
    Btn:Boolean,
    width:{
      dafault:"6rem"
    }
  },
  data() {
    return {
        show: false,
    };
  },
  methods: {
    change(show) {
      this.show=!show
      this.$parent.changeBtn(show)
    }
  }
};
</script>
<style>
*{
    padding:0;margin:0;
}
    .tittle{
        height:2rem;
        margin:0.5rem 0rem 0.5rem 0rem;
        width: 10rem;
        float: left;
    }
    .tittleZH{
        height:0.75rem;
        font-size:0.75rem;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.75rem;
    }
    .tittleEN{
        margin-top:0.2rem;
        height:0.5rem;
        font-size:0.5rem;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.5rem;
    }
    .tittleBtn{
      position:absolute;
      top:0;
      left:0
    }
</style>