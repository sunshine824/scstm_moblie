<template>
  <slot-con>
    <div class="patch-con">
      <tab-bar :data="tabBar"
               @handleClick="handleTypeClick">
      </tab-bar>
      <public-list
        href="patch_info"
        :data="patchList.data ? patchList.data : []">
      </public-list>
      <pagination
        v-if="patchList.total"
        :total="patchList.total"
        :page="page"
        @handleChange="handlePage">
      </pagination>

      <no-data v-if="!patchList.data"></no-data>
    </div>
    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import {getPatchList} from '@/public/js/fetch'
  import publicList from '@/base/public_list'
  import tabBar from '@/base/tabBar'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      mFooter,
      publicList,
      tabBar,
      Pagination,
      NoData
    },
    data() {
      return {
        tabBar: [
          {id: 1, title: '正在展览'},
          {id: 2, title: '即将展览'},
          {id: 3, title: '展览回顾'},
        ],
        page: 1,
        type: 1,
        patchList: ''
      }
    },
    created() {
      this._getPatchList()
    },
    methods: {
      _getPatchList() {
        const result = getPatchList(
          this.page,
          this.type
        )
        result.then(res => {
          this.patchList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this.page = 1
        this._getPatchList()
      },
      handlePage(page) {
        this.page = page
        this._getPatchList()
      },
    }
  }
</script>
<style lang="less">
  .patch-con {
    padding: .3rem;

  }
</style>
