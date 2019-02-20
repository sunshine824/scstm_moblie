<template>
  <transition name="model-scale">
    <div class="popup" v-if="isShow">
      <div class="mask" @click="(options.maskClosable === undefined ? true : options.maskClosable) ? hide() : ''"></div>
      <div class="popup-center">
        <div class="popup-content">
          <div class="popup-main">
            <p class="popup-icon" :style="{color:options.iconColor ? options.iconColor : '#4a4c5b'}">
              <Icon :type="options.icon || 'ios-minus'"></Icon>
            </p>
            <h2 class="popup-title">
              <p class="popup-title-def">{{options.title || ''}}</p>
            </h2>
            <div class="popup-txt">
              <div class="popup-txt-def">
                <p>{{options.content || ''}}</p>
              </div>
            </div>
            <div class="popup-btns">
              <p class="sure" @click="confirm">{{options.okText || '确认'}}</p>
              <p class="cancel" v-if="options.showClose" @click="cancel">{{options.cancelText || '取消'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {scrollThrough} from '@/public/js/utils'

  export default {
    name: "dialog_con",
    props: {
      options: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        isShow: false,
        popups: this.options
      }
    },
    mounted(){
      scrollThrough(this.isShow)
    },
    methods: {
      confirm() {
        this.$emit('confirm')
      },
      cancel() {
        this.$emit('cancel')
        this.hide()
      },
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    },
    watch:{
      'isShow'(val,oldVal){
        scrollThrough(val)
      }
    }
  }
</script>

<style lang="less">
  .model-scale-enter-active, .model-scale-leave-active {
    transition: all .4s;
  }

  .model-scale-enter, .model-scale-leave-to {
    transform: scale(2);
    opacity: 0;
  }

  .popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: auto;
    .mask {
      display: block;
      overflow: hidden;
      background-color: #25262d;
      opacity: .4;
      pointer-events: auto;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .popup-center {
      transform: translate(100%, 100%);
      position: absolute;
      width: 100%;
      height: 100%;

      .popup-content {
        transform: translate(-50%, -50%);
        top: -50%;
        left: -50%;
        width: auto;
        max-width: 100%;
        position: absolute;
        box-sizing: border-box;
        pointer-events: auto;
        .popup-main {
          width: 270px;
          padding: 0;
          text-align: center;
          overflow: hidden;
          border-radius: 10px;
          background-color: #fff;
        }
        .popup-icon {
          margin-top: 20px;
          margin-bottom: 16px;
          line-height: 1;
          color: #4a4c5b;
          font-size: 30px;
        }
        .popup-title {
          color: #333;
          font-size: 16px;
          line-height: 1;
          .popup-title-def {
            margin: 24px 16px 0;
            white-space: nowrap;
          }
        }
        .popup-txt {
          margin: 16px 0;
          text-align: left;
          color: #666;
          font-size: 14px;
          line-height: 22px;
          .popup-txt-def {
            padding: 0 16px;
            p {
              display: table;
              margin: auto;
            }
          }
        }
        .popup-btns {
          overflow: hidden;
          width: 100%;
          font-size: 0;
          border-top: 1px solid #ebebeb;
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          p {
            width: 100%;
            display: inline-block;
            padding: 17px 10px;
            margin: 0;
            font-size: 16px;
            line-height: 1;
            text-align: center;
            text-decoration: none;
            color: #999;
            background-color: #fff;
            background-clip: padding-box;
            box-sizing: border-box;
            &:active {
              background-color: rgba(0, 0, 0, .04);
            }
          }
          p.sure {
            color: #fc9153;
            border-right: 1px solid #ebebeb;
            &:active {
              background-color: rgba(252, 145, 83, .04);
            }
          }
        }
      }
    }
  }
</style>
