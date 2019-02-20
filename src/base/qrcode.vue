<template>
  <transition name="qrcode-scale">
    <div class="popup1" v-if="isShow">
      <div class="mask" @click="hide()"></div>
      <div class="popup-center">
        <div class="popup-content">
          <div class="qrcode-box">
            <qriously :value="qr_value" :size="200"/>
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
      qr_value: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        isShow: false,
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
  .qrcode-scale-enter-active, .qrcode-scale-leave-active {
    transition: all .4s;
  }

  .qrcode-scale-enter, .qrcode-scale-leave-to {
    transform: scale(2);
    opacity: 0;
  }

  .popup1 {
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
      background: rgba(255,255,255,.6);
      //opacity: .4;
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
        .qrcode-box{
          padding: .2rem;
          background: #fff;
        }
      }
    }
  }
</style>
