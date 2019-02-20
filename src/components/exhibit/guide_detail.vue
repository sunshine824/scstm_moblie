<template>
  <sub-page>
    <div class="detail-con">
      <p class="title" @click="back()">
          <span class="icon">
            <img src="../../assets/back.png"/>
          </span>
        <span class="txt">{{detail.name}}</span>
      </p>
      <div class="text-con" v-html="detail.content">

      </div>
    </div>
  </sub-page>
</template>
<script type="text/ecmascript-6">
  import subPage from '@/base/sub-page'
  import slotCon from '@/base/slot-con'
  import {getFloorDetail} from '@/public/js/fetch'

  export default {
    components: {
      subPage,
      slotCon,
    },
    data() {
      return {
        detail: ''
      }
    },
    created() {
      this._getFloorDetail()
    },
    methods: {
      back() {
        this.$router.back()
      },
      _getFloorDetail() {
        const result = getFloorDetail(this.$route.params.id)
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
  .detail-con {
    padding: 0 .3rem 1rem .3rem;
    .title {
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      font-size: .45rem;
      color: #333;
      align-items: center;
      margin-top: .6rem;
      margin-bottom: .6rem;
      .icon {
        width: .48rem;
        margin-right: .15rem;
        img {
          width: 100%;
        }
      }
    }
    .text-con {
      padding: .3rem;
      background: #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      text-align: justify;
    }
  }
</style>
