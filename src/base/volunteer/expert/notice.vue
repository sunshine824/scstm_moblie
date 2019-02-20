<template>
  <div class="vo-notice">
    <p class="title">
      <span class="splt"></span>
      阅读招募须知
    </p>
    <div class="notice-txt" v-html="data"></div>
    <div class="remember">
      <input type="checkbox" ref="checkbox" class="checkbox" @click="handleInput()"/>
      <span>我已阅读并同意遵守相关条约</span>
    </div>
    <p class="next" :class="{active:isNext}" @click="next()">下一步</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isNext: false
      }
    },
    methods: {
      handleInput() {
        this.isNext = this.$refs.checkbox.checked
      },
      next() {
        if (this.$refs.checkbox.checked) {
          this.$emit('next')
        }
      }
    }
  }
</script>
<style lang="less">
  .vo-notice {
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      padding-left: .3rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-direction: row;
      font-size: .48rem;
      color: #333;
      .splt {
        width: 3px;
        height: .7rem;
        background-image: linear-gradient(90deg,
        #00b3f7 0%,
        #00b2f7 0%,
        #00b1f6 0%,
        #079fe1 100%),
        linear-gradient(
          #228aff,
          #228aff);
        background-blend-mode: normal,
        normal;
        border-radius: 2px;
        margin-right: .2rem;
      }
    }
    .notice-txt{
      padding: .3rem;
    }
    .remember {
      text-align: center;
      margin-top: 1rem;
      input {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: .4rem;
        color: #333;
      }
    }
    .next {
      padding: .2rem .4rem;
      background: gray;
      font-size: .42rem;
      color: #fff;
      display: table;
      margin: .5rem auto;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      cursor: pointer;
      &.active {
        background-image: linear-gradient(90deg,
        #00b1f6 0%,
        #21bef8 0%,
        #41cbfa 0%,
        #21cefb 0%,
        #00d0fb 0%,
        #00acf6 100%),
        linear-gradient(
          #ffffff,
          #ffffff);
      }
    }
  }
</style>
