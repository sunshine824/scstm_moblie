<template>
  <slot-con>

    <div class="guide-con">
      <tab-bar
        :data="tabBar"
        @handleClick="handleTypeClick">
      </tab-bar>
      <div class="guide-img">
        <img :src="floorList.floor_img"/>
      </div>
      <guide-list v-if="floorList" :data="floorList.data ? floorList.data : []"></guide-list>

      <pagination
        v-if="floorList.total"
        :total="floorList.total"
        :page="page"
        @handleChange="handlePage">
      </pagination>

      <no-data v-if="!floorList.data"></no-data>

    </div>

    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>

  </slot-con>
</template>
<script type="text/ecmascript-6">
  import mFooter from '@/base/footer'
  import TabBar from '@/base/tabBar'
  import {getFloorType, getFloorList} from '@/public/js/fetch'
  import GuideList from '@/base/exhibit/guide-list'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'
  import slotCon from '@/base/slot-con'
  import {getFooterMixin} from '@/public/js/mixin'

  export default {
    mixins: [getFooterMixin],
    components: {
      mFooter,
      TabBar,
      GuideList,
      Pagination,
      NoData,
      slotCon
    },
    data() {
      return {
        tabBar: [],
        floorList: [],
        page: 1,
        floor_id: 1
      }
    },
    created() {
      this._getFloorType()
      this._getFloorList()
    },
    methods: {
      //页码
      handlePage(page) {
        this.page = page
        this.getFloorList()
      },
      /**
       * 获取楼层名称
       */
      _getFloorType() {
        const result = getFloorType()
        result.then(res => {
          this.tabBar = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 获取楼层列表
       */
      _getFloorList() {
        const result = getFloorList(
          this.page,
          this.floor_id
        )
        result.then(res => {
          this.floorList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 楼层id
       * @param typeId
       */
      handleTypeClick(typeId) {
        this.floor_id = typeId
        this.page = 1
        this._getFloorList()
      },
    }
  }
</script>
<style lang="less" scoped>

  .guide-con {
    padding: .3rem;
    .guide-img {
      width: 100%;
      margin-top: .3rem;
      margin-bottom: .3rem;
      img {
        width: 100%;
      }
    }
  }
</style>
