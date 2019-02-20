<template>
  <sub-page>
    <div class="volunteer">
      <tab-bar :data="tabBar"></tab-bar>
      <div class="bottom">
        <notice :data="scienceContent" v-if="Step===0" @next="StepOneNext()"></notice>
        <vo-form v-if="Step===1" :isLogin="isLogin" @next="StepTwoNext"></vo-form>
        <succ v-if="Step===2"></succ>
      </div>
    </div>
    <m-footer :footer="footer ? footer : {}"></m-footer>
    <div class="load-mask" v-if="isloading">
      <div class="mask-box">
        <img src="../../assets/loading.gif" width="40" height="40"/>
      </div>
    </div>
  </sub-page>
</template>
<script type="text/ecmascript-6">
  import subPage from '@/base/sub-page'
  import TabBar from '@/base/tabBar'
  import Notice from '@/base/volunteer/coupe/notice'
  import VoForm from '@/base/volunteer/coupe/voForm'
  import Succ from '@/base/volunteer/coupe/succ'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import {scienceNotice, getUserInfo, scienceForm} from '@/public/js/fetch'

  export default {
    mixins: [getFooterMixin],
    components: {
      subPage,
      TabBar,
      Notice,
      VoForm,
      mFooter,
      Succ,
    },
    data() {
      return {
        tabBar: [
          {title: '科普志愿者', to: '/coupe_volunteer'},
          {title: '专家志愿者', to: '/expert_volunteer'}
        ],
        Step: 0,
        scienceContent: '',
        isLogin: false,
        isloading: false
      }
    },
    created() {
      this._scienceNotice()
      this._getUserInfo()
      this.token()
    },
    methods: {
      _scienceNotice() {
        const result = scienceNotice()
        result.then(res => {
          this.scienceContent = res.data.content
        }).catch(err => {
          console.log(err.response)
        })
      },
      _getUserInfo() {
        const result = getUserInfo()
        result.then(res => {
        }).catch(err => {
          if (err.response.status === 401) {
            this.isLogin = false
          }
        })
      },
      token() {
        if (this.$cookie.get('token')) {
          this.isLogin = true
        }
      },
      StepOneNext() {
        this.Step = 1
      },
      StepTwoNext(formData) {
        this.isloading = true
        const result = scienceForm(formData)
        result.then(res => {
          if (res.status === 0) {
            this.Step = 2
            this.isloading = false
          }
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .volunteer {
    padding: .3rem .3rem .5rem 0;
    .m-type {
      padding-left: .3rem;
      li {
        width: 47%;
      }
    }
  }

  .load-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    .mask-box {
      width: 100%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
