<template>
  <div>
    <router-view />
    <div class="mine-header">
      <div class="header-setting">
        <i class="setting"></i>
        <i class="msg" @click="exit"></i>
      </div>
      <dl class="mine-info">
        <dt class="head-portrait" @click="goto"></dt>
        <dd>
          <span class="mine-username">{{username}}</span>
          <span class="real-name">去实名</span>
          <span class="mine-grade">SV1 ></span>
        </dd>
      </dl>
      <div class="mine-history">
        <div class="ming-history-num">
          <dl>
            <dt>0</dt>
            <dd>店铺收藏</dd>
          </dl>
          <dl>
            <dt>0</dt>
            <dd>商品收藏</dd>
          </dl>
          <dl>
            <dt>18</dt>
            <dd>足迹</dd>
          </dl>
        </div>
        <span>签到</span>
      </div>
    </div>
    <div class="money-box">
      <div class="box-tit">
        豆子圈
        <span>明细 ></span>
      </div>
      <ul>
        <li>
          <span>0.00</span>
          <span>累计花费</span>
        </li>
        <li>
          <span>0.00</span>
          <span>累计已省</span>
        </li>
      </ul>
    </div>
    <div class="mine-order">
      <div class="box-tit">
        我的订单
        <span>查看全部 ></span>
      </div>
      <ul>
        <li>
          <i class="pay-icon"></i>
          <span>待支付</span>
        </li>
        <li>
          <i class="wfa-icon"></i>
          <span>待发货</span>
        </li>
        <li>
          <i class="yfa-icon"></i>
          <span>已发货</span>
        </li>
        <li>
          <i class="pj-icon"></i>
          <span>待评价</span>
        </li>
        <li>
          <i class="sh-icon"></i>
          <span>售后无忧</span>
        </li>
      </ul>
    </div>
    <div class="mine-services">
      <div class="box-tit">我的服务</div>
      <ul>
        <li>
          <i class="coupon-icon"></i>
          <span>优惠券</span>
        </li>
        <li>
          <i class="consumption-icon"></i>
          <span>积分</span>
        </li>
        <li>
          <i class="HotSaleList-icon"></i>
          <span>热销榜</span>
        </li>
        <li>
          <i class="seckill-icon"></i>
          <span>超级秒杀</span>
        </li>
        <li>
          <i class="fightGroups-icon"></i>
          <span>众享团</span>
        </li>
        <li>
          <i class="team-icon"></i>
          <span>我的客户</span>
        </li>
        <li>
          <i class="follow-icon"></i>
          <span>关注公众号</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let baseUrl = this.$route.path;
    return {
      title: "个人信息",
      name: "personal",
      path: `/personal`,
      username: ""
    };
  },
  methods: {
    goto() {
      this.$router.push({ path: this.path });
      // console.log(this.baseUrl);
    },
    // 退出登录
    exit() {
      if (window.confirm("确定退出？")) {
        this.$router.replace({ name: "Home" });
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Username");
      }
    }
  },
  created() {
    let username1 = localStorage.getItem("Username");
    this.username = username1;
  }
};
</script>
<style scoped>
.box-tit {
  padding: 0 0.4rem;
  font-size: 0.373333rem;
  color: #333;
  height: 0.96rem;
  line-height: 0.96rem;
  box-sizing: border-box;
  border-bottom: 0.013333rem solid #e6e6e6;
}
.box-tit span {
  float: right;
  font-size: 0.32rem;
  color: #999;
}
.setting {
  background: url(../assets/img/setting.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.msg {
  background: url(../assets/img/msg.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.pay-icon {
  background: url(../assets/img/icon-order-unpay.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.wfa-icon {
  background: url(../assets/img/icon-order-paid.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.yfa-icon {
  background: url(../assets/img/icon-order-dispatched.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.pj-icon {
  background: url(../assets/img/icon-order-comment.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.sh-icon {
  background: url(../assets/img/icon-order-service.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.coupon-icon {
  background: url(../assets/img/coupon.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.consumption-icon {
  background: url(../assets/img/consumption.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.HotSaleList-icon {
  background: url(../assets/img/HotSaleList.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.seckill-icon {
  background: url(../assets/img/seckill.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.fightGroups-icon {
  background: url(../assets/img/fightGroups.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.team-icon {
  background: url(../assets/img/team.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
.follow-icon {
  background: url(../assets/img/follow.png) no-repeat;
  background-size: contain;
  background-position: center center;
}
/* mine-header */
.mine-header {
  width: 10rem;
  height: 5.946667rem;
  background: url(../assets/img/myPageBackground.png) no-repeat;
  background-size: 100%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mine-header .header-setting {
  width: 8.88rem;
  height: 1.04rem;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.mine-header .header-setting i {
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  margin: 0.32rem 0 0 0.666667rem;
}
.mine-header .mine-info {
  width: 8.986667rem;
  height: 1.866667rem;
}
.mine-header .mine-info .head-portrait {
  float: left;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  border: 0.026667rem solid #ffffff;
  background: url(../assets/img/user-login-portrait.png) no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #ffffff;
}
.mine-header .mine-info {
  display: flex;
  align-items: center;
}
.mine-header .mine-info dd {
  float: left;
  width: 4.826667rem;
  height: 100%;
  margin-left: 0.533333rem;
  margin-top: 0.4rem;
}
.mine-header .mine-info .mine-username {
  font-size: 0.426667rem;
}
.mine-header .mine-info .mine-grade {
  display: block;
  width: 1.6rem;
  height: 0.533333rem;
  line-height: 0.533333rem;
  background: url(../assets/img/sGradeIcon1.png) no-repeat;
  background-size: contain;
  background-position: 0.066667rem center;
  background-color: gray;
  text-align: right;
  border-radius: 0.533333rem;
}
.mine-header .mine-info .real-name {
  font-size: 0.32rem;
  margin-left: 0.266667rem;
  border-radius: 0.186667rem;
  padding: 0.048rem 0.08rem 0.048rem 0.08rem;
  background: hsla(0, 0%, 98%, 0.4);
}
.mine-header .mine-history {
  width: 100%;
  height: 0.96rem;
  margin-top: 0.266667rem;
  display: flex;
}
.mine-header .mine-history .ming-history-num {
  display: flex;
  align-items: center;
}
.mine-header .mine-history .ming-history-num dl {
  width: 2.506667rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.mine-header .mine-history .ming-history-num dt {
  font-size: 0.426667rem;
}
.mine-header .mine-history .ming-history-num dd {
  margin-top: 0.266667rem;
}
.mine-header .mine-history span {
  width: 1.866667rem;
  height: 0.853333rem;
  box-sizing: border-box;
  border-radius: 0.426667rem;
  background: url(../assets/img/signtow.png) no-repeat;
  background-size: 0.4rem 0.4rem;
  background-position: 0.266667rem center;
  background-color: gray;
  padding: 0.186667rem;
  text-align: right;
  padding-right: 0.333333rem;
}

/* money-box */
.money-box {
  width: 9.2rem;
  height: 3.04rem;
  background: #ffffff;
  margin: -1.12rem 0 0.48rem 0.4rem;
  border-radius: 0.266667rem;
}

.money-box ul {
  height: 2.08rem;
  display: flex;
  justify-content: center;
}
.money-box li {
  width: 3.733333rem;
  height: 1.866667rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}
.money-box li span:first-child {
  font-size: 0.426667rem;
  color: #f22b69;
  margin-bottom: 0.133333rem;
}

/* mine-order */
.mine-order {
  width: 9.2rem;
  height: 2.826667rem;
  background: #ffffff;
  margin: 0 0 0.48rem 0.4rem;
  border-radius: 0.266667rem;
}
.mine-order ul {
  display: flex;
  align-items: center;
}
.mine-order ul li {
  width: 1.84rem;
  height: 1.866667rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: #333;
  padding: 0.186667rem;
}
.mine-order ul li i {
  width: 0.773333rem;
  height: 1.013333rem;
}

/* mine-services */
.mine-services {
  width: 9.2rem;
  background: #ffffff;
  margin: 0 0 0.48rem 0.4rem;
  border-radius: 0.266667rem;
}
.mine-services ul {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  color: #333;
}
.mine-services ul li {
  width: 2.293333rem;
  height: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mine-services ul li i {
  width: 0.693333rem;
  height: 0.693333rem;
  margin-bottom: 0.266667rem;
}
</style>
