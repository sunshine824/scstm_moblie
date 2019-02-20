<template>
  <slot-con>
    <div class="calendar-con">
      <div class="act-date">
        <h2 class="title">
          <p>
            <span class="splt"></span>
            {{currentDate}}活动<br/>
          </p>
          <span class="txt">可以查询近7天场馆活动内容，以便大家合理安排参观时间</span>
        </h2>
        <div class="calendars">
          <div class="btns">
            <p v-for="(item,index) in actMonth"
               :class="{active:current===index}"
               @click="toggleMonth(index)">
              {{item}}
            </p>
          </div>
          <calendar ref="calendar" @toggle="toggleClick"></calendar>
        </div>
      </div>
      <div class="act-list">
        <tab-bar :data="tabBar" @handleClick="handleTypeClick"></tab-bar>
        <h2 class="title">
          <p>
            <span class="splt"></span>
            所有活动&nbsp;&nbsp;（共{{listData.count ? listData.count : 0}}个活动）
          </p>
        </h2>

        <public-list
          v-if="type===1"
          href="edu"
          :data="listData.data ? listData.data : []">
        </public-list>

        <public-list
          v-if="type===2"
          href="mkx"
          :data="listData.data ? listData.data : []">
        </public-list>

        <theater-list
          v-if="type===3"
          href="theater"
          :data="listData.data ? listData.data : []">
        </theater-list>

        <public-list
          v-if="type===4"
          href="patch_info"
          :data="listData.data ? listData.data : []">
        </public-list>

        <pagination
          v-if="listData.total"
          :total="listData.total"
          :page="page"
          @handleChange="handlePage">
        </pagination>

        <no-data v-if="!listData.data"></no-data>

      </div>
    </div>

    <m-footer
      :footer="footer ? footer : {}">
    </m-footer>

  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import Calendar from '@/base/visit_serve/calendar'
  import moment from 'moment'
  import tabBar from '@/base/tabBar'
  import publicList from '@/base/public_list'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import {getCalendarList} from '@/public/js/fetch'
  import Pagination from '@/base/pagination'
  import TheaterList from '@/base/exhibit/theater-list'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      Calendar,
      tabBar,
      NoData,
      publicList,
      mFooter,
      Pagination,
      TheaterList
    },
    data() {
      return {
        tabBar: [
          {id: 1, title: '教育活动'},
          {id: 2, title: '美科新未来学院'},
          {id: 3, title: '影院剧场'},
          {id: 4, title: '临展信息'}
        ],
        actMonth: ['本月活动', '下月活动'],
        current: 0,
        currentDate: moment().format('YYYY年M月'),
        time: '',
        page: 1,
        type: 1,
        listData: ''
      }
    },
    created() {
      this._getCalendarList()
    },
    methods: {
      nextMonth() {
        this.currentDate = moment().add(1, 'months').format('YYYY年M月')
        this.$refs.calendar.nextMonth()
      },
      nowMonth() {
        this.currentDate = moment().format('YYYY年M月')
        this.$refs.calendar.nowMonth()
      },
      toggleMonth(index) {
        this.current = index
        index === 0 ? this.nowMonth() : this.nextMonth()
      },
      toggleClick(date) {
        this.time = parseInt(moment(date).format('X')) + 12 * 60 * 60
        this._getCalendarList()
      },
      handlePage(page) {
        this.page = page
        this._getCalendarList()
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this.page = 1
        this._getCalendarList()
      },
      _getCalendarList() {
        const result = getCalendarList(
          this.page,
          this.type,
          this.time
        )
        result.then(res => {
          this.listData = res.data
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .calendar-con {
    padding: .3rem;
    .title {
      padding-top: .4rem;
      padding-bottom: .4rem;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      font-size: .48rem;
      color: #333;
      p {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        .splt {
          width: 3px;
          height: .7rem;
          background-image: linear-gradient(90deg,
          #00b3f7 0%,
          #00b2f7 0%,
          #00b1f6 0%,
          #079fe1 100%),
          linear-gradient(
            #228aff,
            #228aff);
          background-blend-mode: normal,
          normal;
          border-radius: 2px;
          margin-right: .2rem;
        }
      }
      .txt {
        font-size: .4rem;
        margin-top: .2rem;
        color: #666;
      }
    }
    .act-date {
      margin-bottom: .3rem;
      .calendars {
        margin-top: .2rem;
        width: 9.3rem;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
        .btns {
          width: 100%;
          height: 1.2rem;
          display: flex;
          display: -webkit-flex;
          flex-direction: row;
          align-items: center;
          p {
            text-align: center;
            width: 50%;
            background: #ececec;
            color: #999999;
            height: 100%;
            line-height: 1.2rem;
            font-size: .43rem;
            &.active {
              background: #fff;
              color: #333;
            }
          }
        }
      }
    }
    .act-list {
      margin-top: .7rem;
    }
  }
</style>
