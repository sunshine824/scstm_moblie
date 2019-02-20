<template>
  <slot-con>
    <!--顶部筛选-->
    <filter-box @handleOk="handleOk" @handleCancel="handleCancel">
      <div class="types-list">
        <type-list :type_list="crowds ? crowds : []" title="面向人群" :isCheckBox="true" @toggle="handleCrowds"></type-list>

        <type-list :type_list="activities ? activities : []" title="活动类型" :isCheckBox="true"
                   @toggle="handleAct"></type-list>

        <type-list :type_list="floors ? floors : []" title="楼层筛选" :isCheckBox="true" @toggle="handleFloor"></type-list>

        <type-list :type_list="act_status ? act_status : []" title="活动状态" :isCheckBox="false"
                   @toggle="handleStatus"></type-list>
      </div>
    </filter-box>
    <!--活动列表-->
    <div class="activity-con">

      <public-list
        :data="courseList.data ? courseList.data : []"
        href="edu">
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
  import {educationlists, getEduCrowdList, getEduType,} from '@/public/js/fetch'
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
        floor: [],
        state: '',
        courseList: '',
        isOpen: false,
        crowds: [],
        activities: [],
        act_status: [
          {
            classname: '无需预约',
            id: 2
          },
          {
            classname: '需预约',
            id: 1
          }
        ],
        floors: [
          {classname: '1F', id: 1},
          {classname: '2F', id: 2},
          {classname: '3F', id: 3},
          {classname: '4F', id: 4},
        ],
      }
    },
    created() {
      this._educationlists()
      this._getEduCrowdList()
      this._getEduType()
    },
    methods: {
      /**
       * 获取列表数据
       * @private
       */
      _educationlists() {
        const result = educationlists(
          this.page,
          this.clas_h,
          this.clas_p,
          this.floor,
          this.state
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
        const result = getEduCrowdList()
        result.then(res => {
          this.crowds = res.data
        }).catch(err => {
          console.log(err.response)
        })
      },
      /**
       * 活动类型
       * @private
       */
      _getEduType() {
        const result = getEduType()
        result.then(res => {
          this.activities = res.data
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
       * 获取活动类型数组
       * @param arr
       */
      handleAct(arr) {
        this.clas_h = arr
      },
      /**
       * 获取楼层数组
       * @param arr
       */
      handleFloor(arr) {
        this.floor = arr
      },
      /**
       * 获取子组件状态id
       * @param id
       */
      handleStatus(arr) {
        this.state = arr
      },
      /**
       * 页码
       * @param page
       */
      handlePage(page) {
        this.page = page
        this._educationlists()
      },
      /**
       * 确定
       */
      handleOk() {
        this._educationlists()
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
