<template>
  <div class="item-list">
    <p>{{title}}：</p>
    <ul>
      <li :class="{active:!current.length}"
          @click="toggle('')">全部
      </li>
      <li v-for="(item,index) in type_list"
          :key="index"
          :class="{active:current.includes(item.id)}" @click="toggle(item.id)">
        {{item.classname}}
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      type_list: {
        type: Array,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      isCheckBox: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        current: []
      }
    },
    methods:{
      toggle(id) {
        if (this.isCheckBox) {  //多选
          const index = this.current.indexOf(id)
          if (id === '') {  //点击全部清空
            this.current = []
          } else if (index !== -1) {  //去重
            this.current.splice(index, 1)
          } else {
            this.current.push(id)
          }
          if (this.current.length === this.type_list.length) {
            this.current = []
          }
        } else {  //单选
          this.current = []
          this.current.push(id)
          if (id === '') this.current = []
        }
        this.$emit('toggle', this.current)
      }
    }
  }
</script>
<style lang="less">
  .item-list {
    border-bottom: 1px dashed rgba(153, 153, 153, 0.5);
    margin-top: .3rem;
    p {
      font-size: .42rem;
      color: #999;
    }
    ul {
      padding-top: .45rem;
      display: flex;
      display: -webkit-flex;
      flex-flow: row wrap;
      li {
        padding: .15rem .3rem;
        color: #999;
        font-size: .4rem;
        background: #ececec;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        overflow: hidden;
        margin-right: .3rem;
        margin-bottom: .45rem;
        &.active {
          background-image: linear-gradient(90deg,
          #39d7d0 0%,
          #1dd0e5 0%,
          #00c9fa 0%,
          #00b4f7 100%),
          linear-gradient(
            #ffffff,
            #ffffff);
          color: #fff;
        }
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
</style>
