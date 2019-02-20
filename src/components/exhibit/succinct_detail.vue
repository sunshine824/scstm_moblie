<template>
  <sub-page>
    <div class="succinct-detail">
      <back-top :title="detail.title" backColor="#fff"></back-top>
      <div class="succ-con" v-html="detail.content">

      </div>
    </div>
  </sub-page>
</template>
<script type="text/ecmascript-6">
  import subPage from '@/base/sub-page'
  import backTop from '@/base/back'
  import {getCollectDetail} from '@/public/js/fetch'

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
      this._getCollectDetail()
    },
    methods: {
      _getCollectDetail() {
        const result = getCollectDetail(this.$route.params.id)
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
  .succinct-detail {
    overflow: hidden;
    .succ-con {
      padding: .5rem .3rem .3rem .3rem;
      text-align: justify;
      overflow: auto;
    }
  }
</style>
