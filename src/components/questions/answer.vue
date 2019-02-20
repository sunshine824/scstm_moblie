<template>
  <slot-con>
    <div class="answer">
      <tab-bar :data="tabBar"></tab-bar>
      <div class="answer-list">
        <div class="search">
          <input v-model="search" placeholder="搜索关键词" type="text"/>
          <span class="ico" @click="searchKeyword()">
            <Icon type="ios-search-strong"></Icon>
          </span>
        </div>
        <ul class="lists clearfix">
          <li v-for="(item,index) in answerList.data" :key="index">
            <div class="q">
              <p class="tit">Q：{{item.content}}？</p>
              <p class="info">
                <span class="date">{{item.addtime}}</span>
                <span class="type">{{item.type}}</span>
              </p>
            </div>
            <div class="a">
              <p class="tit">A：{{item.reply}}</p>
            </div>
          </li>
        </ul>
        <pagination
          v-if="answerList.total"
          :total="answerList.total"
          :page="page"
          @handleChange="handlePage">
        </pagination>
        <no-data v-if="!answerList.data"></no-data>
      </div>
    </div>
    <m-footer :footer="footer ? footer : {}"></m-footer>
  </slot-con>
</template>
<script type="text/ecmascript-6">
  import slotCon from '@/base/slot-con'
  import mFooter from '@/base/footer'
  import {getFooterMixin} from '@/public/js/mixin'
  import TabBar from '@/base/tabBar'
  import {messageList} from '@/public/js/fetch'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getFooterMixin],
    components: {
      slotCon,
      mFooter,
      TabBar,
      Pagination,
      NoData
    },
    data() {
      return {
        tabBar: [
          {title: '问答列表', to: '/answer'},
          {title: '我要提问', to: '/question'}
        ],
        page: 1,
        search: '',
        type_id: '',
        answerList: '',
      }
    },
    created() {
      this._messageList()
    },
    methods: {
      searchKeyword(){
        this._messageList()
      },
      handlePage(page) {
        this.page = page
        this._messageList()
      },
      _messageList() {
        const result = messageList(
          this.page,
          this.search,
          this.type_id
        )
        result.then(res => {
          this.answerList = res.data
        }).catch(err => {
          console.log(err.response)
        })
      }
    }
  }
</script>
<style lang="less">
  .answer {
    padding: .3rem;
    .m-type {
      li {
        width: 47%;
      }
    }
    .answer-list {
      width: 100%;
      margin-top: .3rem;
      .search {
        position: relative;
        margin-bottom: .4rem;
        input {
          border: 1px solid #dddee1;
          font-size: .4rem;
          border-radius: 2px;
          background: #fff;
          color: #666;
          width: 100%;
          padding: .2rem 1rem .2rem .4rem;
          &:focus {
            border-color: #57a3f3;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
            -webkit-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
          }
        }
        .ico {
          position: absolute;
          right: .2rem;
          font-size: .7rem;
          top: 0.05rem;
        }
      }
      .lists {
        li {
          padding: .35rem .2rem;
          border-radius: 2px;
          background: #fff;
          margin-bottom: .4rem;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          .q {
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            padding-bottom: .3rem;
            border-bottom: 1px solid #999999;
            .tit {
              font-size: .42rem;
              color: #333;
              margin-bottom: .2rem;
            }
            .info {
              display: flex;
              display: -webkit-flex;
              flex-direction: row;
              align-items: center;
              .date {
                font-size: .36rem;
                color: #999999;
                margin-right: .2rem;
              }
              .type {
                padding: 0 .1rem;
                background-image: linear-gradient(90deg,
                #00d1fb 0%,
                #1dd4e6 0%,
                #39d7d0 0%,
                #079fe1 100%),
                linear-gradient(
                  #ffffff,
                  #ffffff);
                color: #fff;
                border-radius: 4px;
                font-size: .38rem;
              }
            }
          }
          .a {
            padding-top: .3rem;
            font-size: .42rem;
            color: #333;
          }
        }
      }
    }
  }
</style>
