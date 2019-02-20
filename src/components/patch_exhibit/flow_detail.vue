<template>
  <sub-page>
    <div class="flow-detail-con">
      <back-top title="流动详情" backColor="#fff"></back-top>
      <div class="art-con">
        <div class="title">
          <p class="art-title">{{detail.title}}</p>
          <p class="author">
            <span>作者：{{detail.people}}</span>
            &nbsp;&nbsp;
            发布时间：{{detail.addtime}}
          </p>
        </div>
        <div class="art-txt" v-html="detail.content">

        </div>
      </div>
    </div>
  </sub-page>
</template>
<script type="text/ecmascript-6">
  import subPage from '@/base/sub-page'
  import {getFlowDetail} from '@/public/js/fetch'
  import backTop from '@/base/back'

  export default {
    components: {
      subPage,
      backTop
    },
    data() {
      return {
        detail: ''
      }
    },
    created() {
      this._getFlowDetail()
    },
    methods: {
      _getFlowDetail() {
        const result = getFlowDetail(
          this.$route.params.id
        )
        result.then(res => {
          console.log(res)
          this.detail = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
    }
  }
</script>
<style lang="less">
  .flow-detail-con {
    overflow: hidden;
    .art-con {
      padding: .3rem;
      .title {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .5rem;
        .art-title {
          font-size: .45rem;
          color: #333;
          text-align: center;
          padding: .2rem .3rem;
        }
      }
      .art-txt {
        text-align: justify;
        overflow: auto;
      }
    }
  }
</style>
