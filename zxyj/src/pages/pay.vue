<template>
  <div id="pay">
    <header id="pay_header">
      <img
        src="https://www.zxyj.com/static/images/icon-back-black.png"
        alt
        class="pay-to-back"
        @click="gotoCart"
      />
      <h2 class="title">结算付款</h2>
      <div class="address-selector" @click="gotonewAddress">
        <div class="address-placeholder has-follow">添加收货地址</div>
      </div>
    </header>
    <div class="roll">
    <main class="paylist">
      
      <div class="order-store mt10" v-for="(item,idx) in list" :key="idx">
        <div class="order-store-header">{{item.storeName}}</div>
        <div class="order-store-body">
          <div class="cart-item-box">
            <div class="cart-item">
              <img :src="item.images[0]" class="thumb" />
              <div class="item-detail">
                <div class="title">{{item.skuName}}</div>
                <div class="desc">{{item.properties}}</div>
                <div class="price">
                  ￥{{(item.marketPrice*1/100).toFixed(2)}}
                  <span class="amount">× {{item.qty}}</span>
                </div>
                <!---->
              </div>
            </div>
            <!---->
          </div>
          <div>
            <!---->
            <!---->
          </div>
        </div>
        <div class="order-store-footer">
          <div class="cell-line">
            <div class="label">
              <span>共{{item.qty}}件商品</span>
            </div>
            <div class="value">
              小计：
              <span class="color-main">¥{{((item.marketPrice*1/100)*(item.qty)).toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
     <div class="pay-section">
        <div class="cell-line">
          <div class="label">买家留言：</div>
          <div class="value flex999">
            <textarea placeholder="选填，给商家的留言（50字以内）" maxlength="50" class="mint-field-core"></textarea>
          </div>
        </div>
      </div>
      <div class="pay-section padBottom">
        <div class="cell-line has-follow">
          <div class="label">优惠券</div>
          <div class="value">未使用</div>
        </div>
        <div class="cell-line">
          <div class="label">运费</div>
          <div class="value color-main">请选择收货地址</div>
        </div>
        <!---->
        <div class="payway">
          <div class="title">选择支付方式</div>
          <div class="payway-list">
            <div class="item">
              <img src="https://www.zxyj.com/static/images/icon-pay-alipay.png" class="icon" />
              <div class="name">
                支付宝支付
                <i class="aliay-help"></i>
              </div>
              <div class="selector " :class="select ? 'selected': '' " @click="select_to_alipay"></div>
            </div>
            <div class="item">
              <img src="https://www.zxyj.com/static/images/icon-pay-balance.png" class="icon" />
              <div class="name">
                零钱支付(当前可用 0)
                <!---->
              </div>
              <div class="selector" :class="!select ? 'selected': '' " @click="select_to_loosepay"></div>
            </div>
          </div>
        </div>
      </div>
      </footer>
      <!-- 底部 -->
       <div class="bottom">
          <!---->
          <div class="pay-bottom">
            <div class="content">
              合计：
              <span class="color-main">¥{{totalPrice.toFixed(2)}}</span>
              <!---->
            </div>
            <div class="btn">确认付款</div>
          </div>
        </div>
        </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import rem from "../rem/rem.js";
import { log } from "util";
export default {
  data() {
    return {
     list:{},
     select:true
    };
  },
  computed: {
    ...mapState({
      cartlist(state) {
        return state.cart.Cart_goodslist;
      }
    }),
    totalPrice() {
      return this.$store.state.cart.Cart_goodslist.reduce((pre, item) => {
        return pre + ((item.marketPrice * 1) / 100) * item.qty;
      }, 0);
    }
  },
  methods: {
    gotoCart() {/* 返回上一级 */
      this.$router.back(-1);
    },
    select_to_alipay(){
      this.select=true;
    },
    select_to_loosepay(){
       this.select=false;
    },
    gotonewAddress(){
         this.$router.push({ name: "NewAddressList" });
         console.log("go to addAddress");
         
    }

  },
  created() {
    let { Paylist } = this.$route.params;
    console.log("支付列表：", Paylist);
    this.list= Paylist ? Paylist : this.cartlist;;
    console.log("list",this.list);
    
  }
};
</script>
<style scope>
#pay {
  width: 100%;
  height: 100%;

}
.pay-to-back{
   position: relative;
  float: left;
  width: 0.293333rem;
  height: 0.333333rem;
  left: 0.133333rem;
  top: 15%;
}
#pay_header{
  width: 100%;
 line-height: 0.6rem;
  height: 2.666667rem;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  top: 0;
}
#pay_header .title {
  text-align: center;
}
.paylist {
  margin-top: 1.6rem;
  overflow: hidden;
  
}
.roll{
   overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
.address-placeholder {
  background: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  border-top: .013333rem solid #e5e5e5;
 
}

.has-follow {
  position: relative;
  padding-right: 30px !important;
}
.has-follow:after {
  position: absolute;
  display: block;
  border: 2px solid #bfc0c1;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  width: 10px;
  height: 10px;
  transform: translateY(-50%) rotate(45deg);
  top: 50%;
  right: 15px;
}
.address-selector{
  margin-top: -.16rem;
}
.address-selector:after {
  content: "";
  display: block;
  height: 5px;
  background-size: 60px 100%;
  background-image: url(https://www.zxyj.com/static/images/address-border.png);
  background-repeat: repeat-x;
  background-color: #fff;
}
/* 商品列表 */
.order-store {
  background: #fff;
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 0.013333rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
}

.mt10,
.mt_mb_10 {
  margin-top: 0.266667rem;
}
.order-store .order-store-header {
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.426667rem;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.013333rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 0.4rem;
}
.cart-item-box {
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
  background-color: #fafafa;
}
.order-store .order-store-body .cart-item {
  padding-left: 0.4rem;
}
.cart-item,
.cart-item .selector {
  position: relative;
}
.cart-item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.266667rem 0.4rem 0.533333rem 0;
}
.order-store .order-store-body .cart-item .thumb {
  width: 1.866667rem;
  height: 1.866667rem;
}
.cart-item .thumb {
  border: 0.026667rem solid #e5e5e5;
  box-sizing: border-box;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.266667rem;
}
.cart-item .item-detail {
  -ms-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
}
.cart-item .item-detail .desc {
  font-size: 0.32rem;
  line-height: 0.32rem;
  color: #999;
  -ms-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.order-store .order-store-body .cart-item .price {
  font-size: 0.426667rem;
  line-height: 0.426667rem;
  margin-top: 0.106667rem;
  margin-bottom: -0.026667rem;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.cart-item .item-detail .price {
  font-size: 0.48rem;
  line-height: 0.48rem;
  margin-bottom: 0.08rem;
  margin-top: 0.266667rem;
  color: #f51861;
  display: -ms-flexbox;
  display: flex;
}
.order-store .order-store-footer {
  line-height: 1.066667rem;
  font-size: 16px;
  padding: 0 0 0 0.4rem;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
}
.cell-line:first-child {
  background: transparent;
}

.cell-line {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  line-height: 1.2rem;
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
  padding-right: 0.4rem;
  font-size: 0.426667rem;
}
.cell-line .label {
  -ms-flex: 1 2.4rem;
  flex: 1 2.4rem;
}
.cell-line .label > span {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: end;
  justify-content: flex-end;
  margin-right: 1.6rem;
}
.color-main {
  color: #f51861 !important;
}
/* 卖家留言 */
.pay-section {
  margin-top: 0.266667rem;
  background: #fff;
  position: relative;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
}
.pay-section:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 0.026667rem;
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
}
.pay-section .cell-line {
  padding-left: 0.4rem;
}
.cell-line:first-child {
  background: transparent;
}

.cell-line {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  line-height: 1.2rem;
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
  padding-right: 0.4rem;
  font-size: 0.426667rem;
}
.cell-line .label {
  -ms-flex: 1 2.4rem;
  flex: 1 2.4rem;
}
.cell-line .flex999 {
  -ms-flex: 999;
  flex: 999;
}
.cell-line .value textarea {
  margin: 10px 0;
  padding: 0;
  line-height: 0.666667rem;
  height: 0.666667rem;
  display: block;
}

.mint-field-core {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border: 0;
  -ms-flex: 1;
  flex: 1;
  outline: 0;
  line-height: 1.6;
  font-size: inherit;
  width: 100%;
  background: #fff;
}
textarea {
  resize: none;
}
/* 支付方式 */

.pay-section {
  margin-top: 0.266667rem;
  background: #fff;
  position: relative;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
}
.pay-section:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
}
.payway {
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
}
.payway .title {
  line-height: 1.066667rem;
  font-size: 0.426667rem;
  padding: 0 30px;
}
.payway .payway-list .item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  font-size: 0.266667rem;
  line-height: 1.2rem;
  padding: 0 0.4rem;
}
.payway .payway-list .item .icon {
  width: 0.666667rem;
  height: 0.666667rem;
  margin-right: 0.4rem;
}
.payway .payway-list .item .name {
  width: 75%;
}
.payway .payway-list .item .name .aliay-help {
  background-image: url(https://www.zxyj.com/static/images/icon-alipy-tips-help.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 0.533333rem;
  height: 0.533333rem;
  display: inline-block;
  margin-left: 0.133333rem;
}
/* 选中 */
.selected {
  border: none;
  border-radius: 0;
  background-image: url(https://www.zxyj.com/static/images/icon-selected.png);
  background-size: contain;
}
.selector {
  display: block;
  width: 0.48rem;
  height: 0.48rem;
  border: 0.026667rem solid #999;
  border-radius: 0.24rem;
  box-sizing: border-box;
}
/* 底部 */
.bottom {
  bottom: 0;
}
.bottom,
.top {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;
}
.pay-bottom {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  padding-left: 15px;
  background: #fff;
  background-image: linear-gradient(
    180deg,
    #e5e5e5,
    #e5e5e5 50%,
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: border-box;
}
.pay-bottom .btn,
.pay-bottom .content {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

.pay-bottom .content {
  -ms-flex: 1;
  flex: 1;
}
.pay-bottom .btn {
  width: 110px;
  text-align: center;
  color: #fff;
  background: #f51861;
}

.pay-bottom .btn,
.pay-bottom .content {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
.color-main {
  color: #f51861 !important;
}
</style>
