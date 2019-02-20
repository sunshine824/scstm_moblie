<template>
  <slot-con>
    <div class="flow-con">
      <tab-bar :data="tabBar" @handleClick="handleTypeClick"></tab-bar>
      <ul class="news-list">
        <news-item
          v-for="(item,index) in flowList.data"
          :key="index"
          :data="item">
        </news-item>
      </ul>
      <pagination
        v-if="flowList.total"
        :total="flowList.total"
        :page="page"
        @handleChange="handlePage">
      </pagination>
    </div>
    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>

  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import TabBar from '@/base/tabBar'
  import {getFlowType, getFlowList} from '@/public/js/fetch'
  import NewsItem from '@/base/patch_exhibit/news-item'
  import Pagination from '@/base/pagination'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      TabBar,
      NewsItem,
      Pagination,
      mFooter,
    },
    data() {
      return {
        tabBar: [],
        flowList: '',
        page: 1,
        clas: 1
      }
    },
    created() {
      this._getFlowType()
      this._getFlowList()
    },
    methods: {
      _getFlowType() {
        const result = getFlowType()
        result.then(res => {
          this.tabBar = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      _getFlowList() {
        const result = getFlowList(
          this.page,
          this.clas
        )
        result.then(res => {
          this.flowList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      handlePage(page) {
        this.page = page
        this._getFlowList()
      },
      handleTypeClick(typeId) {
        this.clas = typeId
        this.page = 1
        this._getFlowList()
      }
    }
  }
</script>
<style lang="less">
  .flow-con {
    padding: .3rem;
    .news-list {
      margin-bottom: .6rem;
    }
  }
</style>
