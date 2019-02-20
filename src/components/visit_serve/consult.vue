<template>
  <slot-con>
    <div class="consult-con">
      <tab-bar :data="tabBar" @handleClick="handleTypeClick"></tab-bar>
      <consult v-if="typeId===1"></consult>
      <no-data title="正在跳转..." v-if="typeId===2 || typeId===3 || typeId===4 || typeId===5"></no-data>
    </div>

    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>

  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import tabBar from '@/base/tabBar'
  import Consult from '@/base/visit_serve/consult'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      tabBar,
      Consult,
      mFooter,
      NoData
    },
    data() {
      return {
        tabBar: [
          {title: '参观咨询', id: 1},
          {title: '个人预约', id: 2, href: 'http://ticket.scstm.com/Book/OrderInfo.aspx'},
          {
            title: '团队预约',
            id: 3,
            href: 'http://ticket.scstm.com/Member/Login.aspx?RedirectUrl=/Book/OrderInfoForGroups.aspx'
          },
          {title: '个人预约查询', id: 4, href: 'http://ticket.scstm.com/Book/OrderQueryPersonal.aspx'},
          {
            title: '团队预约查询',
            id: 5,
            href: 'http://ticket.scstm.com/Member/Login.aspx?RedirectUrl=/Book/OrderInfoForGroups.aspx'
          },
        ],
        typeId: 1
      }
    },
    methods: {
      handleTypeClick(typeId) {
        this.typeId = typeId
      }
    }
  }
</script>
<style lang="less">
  .consult-con {
    padding: .3rem;
  }
</style>
