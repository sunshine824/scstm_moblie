<template>
  <slot-con>
    <!--顶部筛选-->
    <filter-box @handleOk="handleOk" @handleCancel="handleCancel">
      <div class="types-list">
        <type-list :type_list="crowds ? crowds : []" title="面向人群" :isCheckBox="true" @toggle="handleCrowds"></type-list>

        <type-list :type_list="contentTypes ? contentTypes : []" title="内容形式" :isCheckBox="true"
                   @toggle="handleContent"></type-list>

        <type-list :type_list="bestSchool ? bestSchool : []" title="精选学院" :isCheckBox="true"
                   @toggle="handleSchool"></type-list>
      </div>
    </filter-box>
    <!--活动列表-->
    <div class="activity-con">

      <public-list
        :data="courseList.data ? courseList.data : []"
        href="mkx">
      </public-list>

      <pagination
        v-if="courseList.total"
        :total="courseList.total"
        :page="page"
        @handleChange="handlePage">
      </pagination>

      <no-data v-if="!courseList.data"></no-data>

    </div>

    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>

  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import publicList from '@/base/public_list'
  import {getFutureList, getMkxCrowdList, getMkxContentList, getMkxBestSchoolList} from '@/public/js/fetch'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import TypeList from '@/base/type-list'
  import FilterBox from '@/base/filter'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      publicList,
      Pagination,
      NoData,
      mFooter,
      TypeList,
      FilterBox
    },
    data() {
      return {
        page: 1,
        clas_h: [],
        clas_p: [],
        clas_c: [],
        courseList: '',
        isOpen: false,
        crowds: [],
        contentTypes: [],
        bestSchool: [],
      }
    },
    created() {
      this._Mkxlists()
      this._getEduCrowdList()
      this._getMkxBestSchoolList()
      this._getContentType()
    },
    methods: {
      /**
       * 获取列表数据
       * @private
       */
      _Mkxlists() {
        const result = getFutureList(
          this.page,
          this.clas_h,
          this.clas_p,
          this.clas_c
        )
        result.then(res => {
          this.courseList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 面向人群列表
       * @private
       */
      _getEduCrowdList() {
        const result = getMkxCrowdList()
        result.then(res => {
          this.crowds = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 内容形式
       * @private
       */
      _getContentType() {
        const result = getMkxContentList()
        result.then(res => {
          this.contentTypes = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 精选学院
       * @private
       */
      _getMkxBestSchoolList() {
        const result = getMkxBestSchoolList()
        result.then(res => {
          this.bestSchool = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 获取面向人群数组
       * @param arr
       */
      handleCrowds(arr) {
        this.clas_p = arr
      },
      /**
       * 获取内容形式数组
       * @param arr
       */
      handleContent(arr) {
        this.clas_c = arr
      },
      /**
       * 获取精选学院数组
       * @param arr
       */
      handleSchool(arr) {
        this.clas_h = arr
      },
      /**
       * 页码
       * @param page
       */
      handlePage(page) {
        this.page = page
        this._Mkxlists()
      },
      /**
       * 确定
       */
      handleOk() {
        this._Mkxlists()
        this.page = 1
        this.clas_h = []
        this.clas_p = []
        this.floor = []
      },
      /**
       * 取消
       */
      handleCancel() {
        this.page = 1
        this.clas_h = []
        this.clas_p = []
        this.floor = []
      }
    }
  }
</script>
<style lang="less">

  .activity-con {
    padding: 0 .3rem .3rem .3rem;
    margin-top: 1.5rem;

  }
</style>
