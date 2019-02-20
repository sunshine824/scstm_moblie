<template>
  <div>
    <div class="fill-top">
      <div class="top-slide">
        <div class="title">
          <span class="splt"></span>
          <span class="txt">全部标签</span>
        </div>
        <p class="filter" @click="toggleOpen()">
          <span>筛选</span>
          <img src="../assets/fill.png"/>
        </p>
      </div>
      <transition name="top-slide">
        <div class="filter-box" v-if="isOpen">
          <div class="types-con">
            <slot></slot>
          </div>
          <div class="btns">
            <p
              @click="toggleOpen(index)"
              :class="{active:currentBtn===index}"
              v-for="(item,index) in btns"
              :key="index">
              {{item}}
            </p>
          </div>
        </div>
      </transition>
    </div>
    <!--遮罩-->
    <div class="act-mask" v-if="isOpen" @click="toggleOpen()"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isOpen: false,
        btns: ['重置', '确定'],
        currentBtn: 1,
      }
    },
    methods: {
      toggleOpen(index) {
        this.isOpen = !this.isOpen
        index===1 ? this.$emit('handleOk') : this.$emit('handleCancel')
      },
    }
  }
</script>
<style lang="less">

  .top-slide-enter-active,
  .top-slide-leave-active {
    transition: all 0.25s
  }

  .top-slide-enter,
  .top-slide-leave-active {
    transform: translate3d(0, -100%, 0);
  }

  .act-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
  }

  .fill-top {
    position: fixed;
    top: 2.2rem;
    width: 100%;
    z-index: 50;
    .top-slide {
      display: flex;
      display: -webkit-flex;
      height: 1.5rem;
      justify-content: space-between;
      align-items: center;
      padding: 0 .3rem;
      position: absolute;
      background: #f8f8f8;
      z-index: 50;
      width: 100%;
      .title {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        .splt {
          width: 3px;
          height: .6rem;
          background-image: linear-gradient(90deg, #00b3f7 0%, #00b2f7 0%, #00b1f6 0%, #079fe1 100%), linear-gradient(#228aff, #228aff);
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          margin-right: .2rem;
        }
        .txt {
          font-size: .45rem;
          color: #333;
        }
      }
      .filter {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        font-size: .43rem;
        color: #333;
        span {
          margin-right: .1rem;
        }
        img {
          width: .45rem;
        }
      }
    }
    .filter-box {
      position: absolute;
      top: 1.5rem;
      left: 0;
      right: 0;
      background: #f8f8f8;
      z-index: 10;
      .types-con {
        padding: 0 .3rem .6rem .3rem;
        overflow-y: auto;
        max-height: 9rem;
      }
      .btns {
        width: 100%;
        box-shadow: 0 0 12px #9c9c9c;
        height: 1.3rem;
        p {
          width: 50%;
          height: 100%;
          background: #ececec;
          text-align: center;
          line-height: 1.3rem;
          font-size: .45rem;
          color: #999999;
          float: left;
          &.active {
            background: #00b5f7;
            color: #fff;
          }
        }
      }
    }
  }
</style>
