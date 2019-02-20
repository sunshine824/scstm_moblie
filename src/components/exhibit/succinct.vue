<template>
  <slot-con>
    <div class="succinct-con">
      <ul class="succinct-list">
        <router-link
          :to="'/succinct/'+item.id"
          tag="li"
          v-for="(item,index) in typeList"
          :key="index">
          <div class="works-img">
            <img :src="item.img"/>
          </div>
          <p class="link-btn">
            {{item.classname}}
          </p>
        </router-link>
      </ul>
    </div>
    <m-footer :footer="footer ? footer : {}"></m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import {getCollectType} from '@/public/js/fetch'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      mFooter
    },
    data() {
      return {
        typeList: ''
      }
    },
    created() {
      this._getCollectType()
    },
    methods: {
      _getCollectType() {
        const result = getCollectType()
        result.then(res => {
          this.typeList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .succinct-con {
    padding: .3rem;
    .succinct-list {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      flex-flow: row wrap;
      li {
        width: 48%;
        position: relative;
        margin-bottom: .4rem;
        .works-img {
          width: 100%;
          img {
            width: 100%;
          }
        }
        .link-btn {
          position: absolute;
          top: .3rem;
          left: 0;
          background-image: linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          padding: .1rem .4rem;
          color: #fff;
          font-size: .4rem;
        }
      }
    }
  }
</style>
