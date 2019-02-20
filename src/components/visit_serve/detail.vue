<template>
  <sub-page>
    <div class="notice-detail">
      <back-top :title="$route.params.type==='news' ? '新闻详情' : '公告详情'" backColor="#fff"></back-top>
      <div class="details-con">
        <div class="title">
          <p class="notice-title">{{detail.title}}</p>
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
  import {getNewsDetail} from '@/public/js/fetch'
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
      this._getNewsDetail()
    },
    methods: {
      _getNewsDetail() {
        const result = getNewsDetail(this.$route.params.id)
        result.then(res => {
          this.detail = res.data
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .notice-detail {
    overflow: hidden;
    .details-con {
      padding: .3rem;
      .title {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .5rem;
        .notice-title {
          font-size: .45rem;
          color: #333;
          text-align: center;
          padding: .2rem .3rem;
        }
      }
      .art-txt {
        overflow: auto;
        text-align: justify;
      }
    }
  }
</style>
