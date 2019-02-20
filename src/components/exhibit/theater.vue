<template>
  <slot-con>
    <div class="theater-con">
      <tab-bar :data="tabBar" @handleClick="handleTypeClick"></tab-bar>
      <theater-list :data="theaterList.data ? theaterList.data : []"></theater-list>
      <pagination
        v-if="theaterList.total"
        :total="theaterList.total"
        :page="page"
        @handleChange="handlePage">
      </pagination>
      <no-data v-if="!theaterList.data"></no-data>
    </div>
    <m-footer :footer="footer ? footer : {}"></m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import TabBar from '@/base/tabBar'
  import mFooter from '@/base/footer'
  import TheaterList from '@/base/exhibit/theater-list'
  import {getFooterMixin} from '@/public/js/mixin'
  import {getMovieList} from '@/public/js/fetch'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      TabBar,
      mFooter,
      TheaterList,
      Pagination,
      NoData
    },
    data() {
      return {
        tabBar: [
          {title: '正在上映', id: 1},
          {title: '即将上映', id: 2},
          {title: '往期回顾', id: 3},
        ],
        page: 1,
        type: 1,
        theaterList: ''
      }
    },
    created() {
      this._getMovieList()
    },
    methods: {
      _getMovieList() {
        const result = getMovieList(
          this.page,
          this.type
        )
        result.then(res => {
          this.theaterList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this.page = 1
        this._getMovieList()
      },
      handlePage(page) {
        this.page = page
        this._getMovieList()
      }
    }
  }
</script>
<style lang="less">
  .theater-con {
    padding: .3rem;
  }
</style>
