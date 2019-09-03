<template>
    <div class="card" :style="{borderRadius}">
        <div style="width:100%;height:2rem;line-height:1.3rem;margin-bottom:1rem">
          <div class="blueSquare"></div>
          <div class="cardTitle">{{cardTitle}}</div>
        </div>
        <div class="slot"> 
          <slot ></slot>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    cardTitle:String,
    borderRadius:{
     type:String,
     default: "10px 10px 10px 10px"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style >
    .blueSquare{
        z-index:100;
        width:0.38rem;
        height:0.83rem;
        background:rgba(27,137,240,1);
        position:absolute;
        top:1rem;
    }
    .card{
        width:99%;
        height:100%;
        background:rgba(255,255,255,1);
        box-shadow:0rem 0rem 0rem 0rem rgba(0, 0, 0, 0.08);
        /* margin: 0.2rem; */
        position:relative;
    }
    .cardTitle{
        position:absolute;
        top:0.7rem;
        left:1rem;
        font-size:0.67rem;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
    .slot{
      width:100%;
      height:10rem;
    }
</style>
