<template>
  <div class="consult-txt">
    <div class="item clearfix">
      <h2 class="title">
        <p>
          <span class="splt"></span>
          四川科技馆2018年春节期间开闭馆公告
        </p>
      </h2>
      <div class="txt">
        <p>2018年春节即将来临，根据国家有关春节放假安排的通知，结合我馆实际情况，现将我馆2018年春节期间开、闭馆时间通知如下：</p>
        <p>2月13日（腊月二十八）至2月16日（正月初一）闭馆；</p>
        <p>2月17日（初 二）至2月21日（初 六）开馆；</p>
        <p>2月22日（初七）、23日（初八）闭馆；</p>
        <p>2月24日起正常开闭馆。</p>
        <p>★为满足公众节日期间参观需求，结合我馆内实际运行情况，2月17日至2月21日期间，在每日5000个预约名额的基础上，增加1000个预约名额。</p>
        <p>★请公众根据预约情况合理安排出行。科技馆实行网上预约参观，现场没有免费券领取。</p>
        <p>1F - 3F展区：周一至周日09:00——17:00 【16:00停止领券入馆】(一人一券凭身份证领券入馆)</p>
        <p>4F未来学院：周一至周日09:00——20:30 【出入口在大楼北面】</p>
        <p>周一闭馆，法定节假日开闭馆时间另行公告，见官网http://www.scstm.com。</p>
      </div>
    </div>
    <div class="item clearfix">
      <h2 class="title">
        <p>
          <span class="splt"></span>
          参观方式
        </p>
      </h2>
      <div class="txt">
        <p>1、凭本人身份证通过四川科技馆网站或微信公众号,提前一周进行参观预约。一人一券，凭券入馆，参观券当日一次有效。</p>
        <p>2、按照预约时间携带【本人身份证】，到四川科技馆服务大厅自助取票机凭【本人身份证】免费换券入馆。</p>
        <p>3、严禁携带易燃易爆物品，有毒有害物品，管制刀具及宠物入馆，馆内严禁明火、吸烟。</p>
        <p>4、身高1.4米以下儿童、高龄老人及行动不便者须在亲友的陪同下入馆参观。</p>
        <p>5、1位成人可带1位儿童入馆参观，随行儿童也需录入身份证信息，凭预约取票人身份证领取参观券入馆参观。</p>
        <p>6、预约成功后，如无法参观，请取消订单。超过2次（含2次）未取消订单者，将无法参观预约。</p>
        <p>7、请公众根据预约情况，合理安排出行。科技馆实行网上预约参观，现场没有免费券领取。</p>
      </div>
    </div>
    <div class="item clearfix">
      <h2 class="title">
        <p>
          <span class="splt"></span>
          联系我们
        </p>
      </h2>
      <div class="txt">
        <p>四川科技馆网址：http://www.scstm.com</p>
        <p>咨询电话：028-86609999</p>
        <p>微信公众号：四川科技馆</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .consult-txt{
    .item{
      width: 100%;
      margin-bottom: .3rem;
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
      }
      .txt{
        color: #333;
        text-align: justify;
        p{
          padding-top: .3rem;
          font-size: .4rem;
        }
      }
    }
  }
</style>
