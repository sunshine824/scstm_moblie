<template>
  <div class="traffic-con">
    <p class="title">
      <span class="splt"></span>
      中国四川省成都市人民中路一段16号
    </p>
    <div class="item">
      <h1>
        <span class="dott"></span>
        <span class="txt">科技馆周边</span>
      </h1>
      <p class="clearfix">
        <span class="con-button">乘地铁</span>
        <span class="txt">
          换乘 / 乘坐
        <span class="orange">1号线</span>
        到天府广场站下
        </span>
      </p>
      <p class="clearfix">
        <span class="con-button">乘公交</span>
        <span class="txt">
          天府广场公交站：16、45、53、61、64、机场专线2号线&nbsp;&nbsp;&nbsp;&nbsp;西御街公交站：13、30、47、51、64、78&nbsp;&nbsp;&nbsp;&nbsp;东御街公交站：47、51、62、104、334
        </span>
      </p>
    </div>
    <div class="item">
      <h1>
        <span class="dott"></span>
        <span class="txt">火车站方向</span>
      </h1>
      <p class="clearfix">
        <span class="con-button">乘地铁</span>
        <span class="txt">
          ［43分钟］地铁
            <span class="orange">10号线</span>
            → 地铁
            <span class="orange">3号线</span>
            → 地铁
            <span class="orange">1号线</span>
            天府广场站（F出口）下车
        </span>
      </p>
      <p class="clearfix">
        <span class="con-button">乘公交</span>
        <span class="txt">
          ［1小时7分钟］机场专线 <span class="orange">2号线</span> ,  天府广场站下车
        </span>
      </p>
    </div>
    <div class="item">
      <h1>
        <span class="dott"></span>
        <span class="txt">机场方向</span>
      </h1>
      <div class="con-tit-sm">［火车东站］</div>
      <p class="clearfix">
        <span class="con-button">乘地铁</span>
        <span class="txt">
          ［32分钟］地铁 <span class="orange">2号线</span> , 天府广场站（F出口）下车
        </span>
      </p>
      <div class="con-tit-sm">［火车南站］</div>
      <p class="clearfix">
        <span class="con-button">乘地铁</span>
        <span class="txt">
          ［19分钟］ 地铁 <span class="orange">2号线</span> , 天府广场站（F出口）下车
        </span>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .traffic-con {
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
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
    .item {
      background: #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      padding: .3rem;
      margin-bottom: .4rem;
      h1 {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-direction: row;
        font-size: .45rem;
        color: #333;
        .dott {
          width: .15rem;
          height: .15rem;
          background: #333;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          margin-right: .2rem;
        }
      }
      .con-tit-sm{
        font-size: .4rem;
        color: #333;
        margin-top: .3rem;
        margin-bottom: .3rem;
      }
      p {
        margin-top: .4rem;
        font-size: .4rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        text-align: justify;
        color: #333;
        margin-bottom: .6rem;
        .txt{
          flex: 1;
        }
        .con-button {
          height: .7rem;
          line-height: .7rem;
          background: #3b97ee;
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          color: #fff;
          font-size: .4rem;
          margin-right: .3rem;
          padding: 0 .2rem;
          border-radius: 2px;
        }
        .orange {
          color: #fd7958 !important;
        }
      }
    }
  }
</style>
