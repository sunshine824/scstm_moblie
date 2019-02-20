<template>
  <slot-con>
    <div class="strate-con">
      <tab-bar
        :data="tabBar"
        @handleClick="handleTypeClick">
      </tab-bar>
      <visit-road v-if="typeId===1" :data="roadWay"></visit-road>
      <traffic v-if="typeId===2"></traffic>
    </div>
    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import TabBar from '@/base/tabBar'
  import {getRoadWay, getTicketUrl} from '@/public/js/fetch'
  import VisitRoad from '@/base/visit_serve/visit_road'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import Traffic from '@/base/visit_serve/traffic'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      TabBar,
      VisitRoad,
      mFooter,
      Traffic
    },
    data() {
      return {
        tabBar: [
          {title: '参观路线', id: 1},
          {title: '交通信息', id: 2},
          {title: '购票', id: 3, href: 'http://ticketwx.scstm.com/Default.aspx'},
        ],
        roadWay: [],
        typeId: 1,
      }
    },
    created() {
      this._getRoadWay()
      this._getTicketUrl()
    },
    methods: {
      _getRoadWay() {
        const result = getRoadWay()
        result.then(res => {
          this.roadWay = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      handleTypeClick(typeId) {
        this.typeId = typeId
      },
      _getTicketUrl() {
        const result = getTicketUrl()
        result.then(res => {
          this.tabBar[2].href = res.data.ticket_phone_url
        }).catch(err=>{
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .strate-con {
    padding: .3rem;
  }
</style>
