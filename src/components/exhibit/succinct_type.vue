<template>
  <slot-con>
    <div class="type-con">
      <back-top :title="typeList.classname"></back-top>
      <div class="type-list">
        <succinct-list :data="typeList.data ? typeList.data : []"></succinct-list>
        <pagination
          v-if="typeList.total"
          :total="typeList.total"
          :page="page"
          @handleChange="handlePage">
        </pagination>
        <no-data v-if="!typeList.data"></no-data>
      </div>
    </div>

    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>

  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import backTop from '@/base/back'
  import succinctList from '@/base/exhibit/succinct-list'
  import {getCollectList} from '@/public/js/fetch'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      backTop,
      succinctList,
      Pagination,
      NoData,
      mFooter
    },
    data() {
      return {
        page: 1,
        typeList: ''
      }
    },
    created() {
      this._getCollectList()
    },
    methods: {
      _getCollectList() {
        const result = getCollectList(
          this.page,
          this.$route.params.id
        )
        result.then(res => {
          this.typeList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      handlePage(page) {
        this.page = page
        this._getCollectList()
      }
    }
  }
</script>
<style lang="less">
  .type-con {
    .type-list {
      padding: .3rem;
    }
  }
</style>
