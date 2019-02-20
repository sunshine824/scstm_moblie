<template>
  <div class="calendar-box">
    <ul class="weeks clearfix">
      <li v-for="(item,index) in weeks"
          :key="index">
        {{item}}
      </li>
    </ul>
    <ul class="date clearfix">
      <li v-for="(item,index) in calendarDate"
          :key="index"
          :style="index===0 ? {marginLeft : count*1.3 + 'rem'} : 0"
          :class="{active:index===current}"
          @click="toggleClick(index,item)">
        {{item.slice(-2) | filterDate}}
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import moment from 'moment'

  export default {
    data() {
      return {
        calendarDate: [],
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        currentDate: moment().format('YYYY-MM-DD'),
        current: parseInt(moment().format('DD')) - 1,
        count: 0
      }
    },
    created() {
      this.getCalendarDate(0)
    },
    filters: {
      //去0
      filterDate(str) {
        return str.replace(/\b(0+)/gi, "")
      }
    },
    methods: {
      /**
       * 获取月份日期
       * @param count
       */
      getCalendarDate(count) {
        this.calendarDate = []
        const start = moment()
          .add(count, 'months')
          .startOf('month')
          .format('YYYY-MM-DD')
        const end = moment()
          .add(count, 'months')
          .endOf('month')
          .format('YYYY-MM-DD')

        if (moment(start).format("E") >= 7) {
          this.count = 7 - moment(start).format("E")
        }else {
          this.count = moment(start).format("E")
        }

        for (let i = 1; i < parseInt(end.slice(-2)); i++) {
          const date = moment(start).add(i, 'day').format('YYYY-MM-DD')
          this.calendarDate.push(date)
        }
        this.calendarDate.unshift(start)
      },

      toggleClick(index, date) {
        this.current = index
        this.$emit('toggle', date)
      },

      nextMonth() {
        this.current = 0
        this.getCalendarDate(1)
      },

      nowMonth() {
        this.current = parseInt(moment().format('DD')) - 1
        this.getCalendarDate(0)
      }
    }
  }
</script>
<style lang="less">
  .calendar-box {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    background: #fff;
    padding: .1rem;
    .weeks {
      width: 100%;
      li {
        float: left;
        width: 1.3rem;
        height: 1.3rem;
        text-align: center;
        line-height: 1.3rem;
        color: #a2abb4;
        font-size: .45rem;
      }
    }
    .date {
      width: 100%;
      li {
        width: 1.3rem;
        height: 1.3rem;
        float: left;
        text-align: center;
        line-height: 1.3rem;
        font-size: .45rem;
        color: #6c7797;
        border-radius: 50%;
        transition: all .3s;
        background: #fff;
        cursor: pointer;
        margin-bottom: .1rem;
        &.active {
          background: #08ba5f;
          color: #fff;
        }
      }
    }
  }
</style>
