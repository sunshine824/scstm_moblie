<template>
  <div id="app"
       :style="{backgroundColor:(pathname==='登录' || pathname==='注册' || pathname==='忘记密码') ? '#fff' : '#f8f8f8'}"
       v-cloak>
    <m-header
      @openSide="open"
      :logo="logo"
      v-if="pathname!=='登录' && pathname!=='注册' && pathname!=='忘记密码'"/>

    <sign-logo :logo="logo" v-if="pathname==='登录' || pathname==='注册' || pathname==='忘记密码'"></sign-logo>

    <router-view></router-view>

    <transition name="nav-slide">
      <side-bar v-if="isSide"
                :userImg="logo"
                :subName="subName"
                :pathname="pathname"/>
    </transition>

    <div class="m-mask"
         @touchstart="close"
         :class="{mask:isSide}">
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import './public/js/prefixfree'
  import MHeader from '@/base/header'
  import SideBar from '@/base/sidebar'
  import {getLogo} from '@/public/js/fetch'
  import SignLogo from '@/base/sign-logo'
  import {scrollThrough} from '@/public/js/utils'
  import {
    mapActions,
    mapGetters
  }
    from 'vuex'

  export default {
    name: 'App',
    components: {
      MHeader,
      SideBar,
      SignLogo,
    },
    data() {
      return {
        userImg: '../static/images/userImg.png',
        pathname: '',
        logo: '',
        subName: '',
      }
    },
    created() {
      this._getLogo()
    },
    computed: {
      ...mapGetters([
        'isSide'
      ])
    },
    methods: {
      ...mapActions([
        'set_side_state'
      ]),
      open() {
        this.set_side_state(true)
      },
      close() {
        this.set_side_state(false)
      },
      /**
       * 获取logo
       * @private
       */
      _getLogo() {
        const result = getLogo()
        result.then(res => {
          this.logo = res.data.logo
        }).catch(err => {
          console.log(err)
        })
      },
    },
    watch: {
      'isSide'(val, oldVal) {
        scrollThrough(val)
      },
      '$route'(to, from) {
        this.pathname = to.meta[0]
        this.subName = to.meta[1]
        document.title = to.name + ' - 四川科技馆'
      }
    }
  }
</script>

<style lang="less">
  @import "./public/css/base.css";

  a {
    text-decoration: none !important;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.35s
  }

  .slide-enter,
  .slide-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .nav-slide-enter-active,
  .nav-slide-leave-active {
    transition: all 0.4s
  }

  .nav-slide-enter,
  .nav-slide-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background: #f0f0f0;
  }

  ::-webkit-scrollbar-thumb {
    background: #bbb;
  }

  #app {
    background: #f8f8f8;
    display: flex;
    display: -webkit-flex;
    flex-flow: column;
    width: 100%;
  }

  .m-mask {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 150;
    background: rgba(0, 0, 0, .4);
    &.mask {
      display: block;
    }
  }
  .scroll-fixed{
    position: fixed;
    width: 100%;
  }

</style>
