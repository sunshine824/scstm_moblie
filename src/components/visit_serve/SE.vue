<template>
  <slot-con>
    <no-data title="敬请期待"></no-data>

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

</style>
