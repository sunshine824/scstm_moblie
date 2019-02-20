<template>
  <slot-con>
    <!--<no-data title="敬请期待"></no-data>-->
    <div class="guide-map">
      <iframe src="http://720yun.com/t/8e8jtOyyOn0" frameborder="no" class="map" />
    </div>
    <m-footer :footer="footer ? footer : {}"></m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import mFooter from '@/base/footer'
  import NoData from '@/base/no-data'
  import {getFooterMixin} from '@/public/js/mixin'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      mFooter,
      NoData,
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
.guide-map{
  width: 100%;
  height: 8rem;
  padding: .4rem .3rem .4rem .3rem;
  .map{
    width: 100%;
    height: 100%;
  }
}
</style>
