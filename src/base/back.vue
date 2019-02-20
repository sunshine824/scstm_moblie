<template>
  <p class="back-top" :style="{backgroundColor:backColor}">
    <span class="icon" @click="back()">
      <img src="../assets/back.png"/>
    </span>
    <span class="top-title">{{title}}</span>
  </p>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      backColor: {
        type: String,
        default: '#f8f8f8'
      }
    },
    data() {
      return {}
    },
    methods:{
      back() {
        this.$router.back()
      },
    }
  }
</script>
<style lang="less">
  .back-top {
    height: 1.3rem;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    position: relative;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    .icon {
      position: absolute;
      left: .3rem;
      width: .5rem;
      img {
        width: 100%;
      }
    }
    .top-title {
      text-align: center;
      line-height: 1.3rem;
      color: #333;
      font-size: .45rem;
    }
  }
</style>
