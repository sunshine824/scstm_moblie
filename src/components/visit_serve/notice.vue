<template>
  <slot-con>
    <div class="notice-con">
      <tab-bar :data="tabBar" @handleClick="handleTypeClick"></tab-bar>

      <ul class="news-list">
        <news-item
          v-for="(item,index) in newsList.data"
          :key="index"
          :typeName="type===1 ? 'news' : 'notice'"
          :data="item">
        </news-item>
      </ul>

      <pagination
        v-if="newsList.total"
        :total="newsList.total"
        :page="page"
        @handleChange="handlePage">
      </pagination>

      <no-data v-if="!newsList.data"></no-data>
    </div>
    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import tabBar from '@/base/tabBar'
  import {getNewsInfo} from '@/public/js/fetch'
  import NewsItem from '@/base/visit_serve/news_item'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import NoData from '@/base/no-data'
  import Pagination from '@/base/pagination'

  export default {
    mixins: [getFooterMixin],
    components: {
      NoData,
      slotCon,
      tabBar,
      NewsItem,
      mFooter,
      Pagination
    },
    data() {
      return {
        tabBar: [
          {id: 1, title: '新闻'},
          {id: 2, title: '公告'}
        ],
        page: 1,
        type: 1,
        newsList: ''
      }
    },
    created() {
      this._getNewsInfo()
    },
    methods: {
      _getNewsInfo() {
        const result = getNewsInfo(
          this.page,
          this.type
        )
        result.then(res => {
          this.newsList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this._getNewsInfo()
      },
      handlePage(page) {
        this.page = page
        this._getNewsInfo()
      }
    }
  }
</script>
<style lang="less">
  .notice-con {
    padding: .3rem;
    .m-type li {
      width: 48%;
    }
    .news-list {
      margin-bottom: .6rem;
    }
  }
</style>
