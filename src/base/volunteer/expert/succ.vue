<template>
  <div class="succ-con">
    <p class="title">
      <span class="splt"></span>
      申请提交成功
    </p>
    <div class="succ-info clearfix">
      <div class="icon">
        <Icon type="ios-checkmark-outline"></Icon>
      </div>
      <div class="txt">
        <p class="titles">您的专家志愿者申请提交成功！</p>
        <p>我们将认真审核您的专家志愿者申请</p>
        <p>如果通过，我们将通过手机短信、微信的方式联系您</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    created() {
      window.scroll(0, 0)
    },
  }
</script>
<style lang="less">
  .succ-con {
    display: table;
    margin: auto;
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
    .succ-info {
      padding-top: .4rem;
      padding-bottom: .5rem;
      padding-left: .3rem;
      padding-right: .3rem;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      .icon {
        float: left;

        i {
          font-size: .8rem;
          color: #02adf1;
        }
      }
      .txt {
        float: left;
        margin-left: .2rem;
        p {
          margin-bottom: .25rem;
          font-size: .4rem;
          color: #333;
        }
        .titles {
          color: #01aef3;
          font-size: .6rem;
          margin-bottom: .3rem;
        }
      }
    }
  }
</style>
