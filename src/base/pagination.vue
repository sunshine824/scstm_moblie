<template>
  <div class="page">
    <p class="prev item-l" :class="{active:isFirst}" @click="handleChange('prev')">上一页</p>
    <p class="sum">
      <span>{{currentPage}}</span>
      &nbsp;&nbsp;/&nbsp;&nbsp;
      <span>{{total}}</span>
    </p>
    <p class="next item-l" :class="{active:isEnd}" @click="handleChange('next')">下一页</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      total: {
        type: Number,
        default: 1
      },
      page: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        currentPage: this.page,
        isFirst: false,
        isEnd: false
      }
    },
    created() {
      this.isFirst = this.page === 1
      this.isEnd = this.page >= this.total
    },
    methods: {
      handleChange(type) {
        if (type === 'prev') {
          if (this.total !== 1) {
            this.isEnd = false
          }
          this.currentPage = this.currentPage-- <= 1 ? 1 : this.currentPage--
          this.isFirst = this.currentPage === 1
        } else {
          if (this.total !== 1) {
            this.isFirst = false
          }
          this.currentPage = this.currentPage++ >= this.total ? this.total : this.currentPage++
          this.isEnd = this.currentPage === this.total
        }
        this.$emit('handleChange', this.currentPage)
      }
    },
    watch: {
      page: () => {
        document.querySelector('.container').scrollTop = 0
      }
    }
  }
</script>
<style lang="less">
  .page {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .3rem;
    margin-bottom: .3rem;
    .item-l {
      width: 2.5rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: .4rem;
      color: #fff;
      background: #00acf6;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      &.active {
        background: gray;
      }
    }
    .sum {
      font-size: .4rem;
    }
  }
</style>
