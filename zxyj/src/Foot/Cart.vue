<template>
  <div id="cart">
    <header id="Cart_header">
      <img src="https://www.zxyj.com/static/images/icon-back-black.png" alt class="Cart-to-back" @click="goBack"/>
      <h2 class="title">购物车</h2>
      <div v-show="!haveInfo" class="header-right">
        <div @click="FinshAndEdit">
          <span v-if="click">编辑</span>
          <span v-else>完成</span>
        </div>
      </div>
    </header>
    <main class="Cart_main">
      <div v-if="haveInfo">
        <div class="no-data">
          <img src="https://www.zxyj.com/static/images/no-data-cart.png" class="no-data-icon" />
          <div class="no-data-text">购物车还是空的，去挑选几件宝贝吧</div>
          <div class="no-data-btn active" @click="gotoHome">去逛逛</div>
        </div>
      </div>
      <div v-else class="goodsLists">
        <!--   <div v-for="(item,idx) in list" :key="idx">{{item.skuName}}</div> -->
        <div class="cart-section" v-for="(item,idx) in list" :key="idx">
          <div class="section-header">
            <!-- 选框 -->
            <span
              class="selector"
              :class=" A_select || S_select ? 'selected' : ''"
              :S_select="false"
              @click="selectSinge(item,item.skuId) "
            ></span>
            <div class="title">
              <i></i>
              <a>{{item.storeName}}</a>
              <span></span>
            </div>
            <span class="btn-get">领券</span>
          </div>
          <div class="section-body">
            <div class="cart-item-box">
              <div class="cart-item">
                <!-- 选框 -->
                <span class="selector" :class=" A_select ? 'selected' : ''"></span>
                <div class="shelf">
                  <img :src="item.images[0]" class="thumb" />
                  <!---->
                </div>
                <div class="item-detail">
                  <div class="title">{{item.skuName}}</div>
                  <div class="desc">
                    <label>{{item.properties}}</label>
                    <div>
                      <i class="arrt-down"></i>
                    </div>
                  </div>
                  <!---->
                  <div class="price">￥{{(item.marketPrice*1/100).toFixed(2)}}</div>
                </div>
                <div class="item-amount">
                  <div>
                    <div class="number-field">
                      <div class="btn minus" @click="item.qty > 1 ? item.qty--:''"></div>
                      <div class="value">{{item.qty}}</div>
                      <div class="btn plus" @click="item.qty++"></div>
                      <!---->
                    </div>
                  </div>
                  <!---->
                </div>
                <!---->
              </div>
              <!---->
            </div>
            <!---->
            <!---->
          </div>
        </div>
      </div>
      </main>
      <!-- 购物车底部 -->
      <div class="cart-bottom" v-show="!haveInfo">
        <div class="select-all" @click="selectAll">
          <span class="selector" :class=" A_select ? 'selected' : ''"></span>
          <span class="label">全选</span>
        </div>
        <div class="content" v-show="click">
          <div class="total fs16">
            合计：
            <span class="color-main">¥{{A_select ? totalPrice.toFixed(2) : "0.00"}}</span>
          </div>
          <div class="fs12 color-gray mt5">不含运费</div>
        </div>
        <div
          @click="gotoPay"
          class="btn next-btn"
          :class="click ? 'disabled' : 'btn-right' "
          :style="S_select || A_select ? 'background: #f51861 !important;color:#ffffff !important;' : '  opacity: 0.6;' "
        >{{btnName}}</div>
      </div>
    
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import rem from "../rem/rem.js";
import { log } from "util";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      list: [],
      haveInfo: true /* 判断购物车是否有数据 */,
      click: true /* 点击编辑 */,
      btnName: "去结算",
      A_select: false /* 购物车全选中状态，默认为没有全选中 */,
      S_select: false /* 购物车单个选择，默认为没有选中 */
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
   goBack(){/* 返回上一级 */
      this.$router.back(-1)
    },
    gotoHome() {
      console.log("path", this.$router.history.current.path);
      let targetPath = this.$route.query.redirectTo;
      this.$router.replace(targetPath ? targetPath : "/home");
    },
    /* 去支付 */
    gotoPay() {
      let Paylist = this.list;
      if (this.A_select == false) {
        MessageBox("提示", "亲，您还没有选择商品呢!");
        return;
      }
      this.$router.push({ name: "Pay", params: { Paylist } });
    },
    FinshAndEdit() {
      this.click = !this.click;
      this.btnName = this.click ? "去结算" : "删除";
    },
    /* 选择全选 */
    selectAll() {
      this.A_select = !this.A_select;
    },
    /* 单个选择 */
    selectSinge(item, skuId) {
      /* this.S_select = !this.S_select; */
      console.log("idx:", skuId);
      this.list.filter(el => {
        if (el.skuId == skuId) {
          console.log(this.S_select);
          this.S_select = !this.S_select;
        }
      });
    }/* ,
    ...mapMutations({
      // 函数形式：
      changeQty: (commit, row, qty) => {
        commit("changeQty", { id: row.id, qty });
      }
    }) */
  },
  created() {
    console.log("path", this.$router.history.current.path);
    console.log("购物车上的商品：", this.cartlist);

    this.list = this.cartlist;
    this.haveInfo = this.cartlist ? false : true;
    console.log("list:", this.list);
    console.log("length:", this.list.length);
    console.log("商品", this.$store.state.cart.Cart_goodslist);

  }
};
</script>
<style scope>
#cart {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
}
#Cart_header {
  width: 100%;
 line-height: 0.6rem;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  top: 0;
}

.Cart_main{
  flex: 1;
  margin-top: 1.2rem;
   height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

}
#Cart_header .title {
  text-align: center;
}
.Cart-to-back {
  position: relative;
  float: left;
  width: 0.293333rem;
  height: 0.333333rem;
  left: 0.133333rem;
  top: 30%;
}
.header-right {
  position: absolute;
  top: 0.266667rem;
  right: 0.266667rem;
  float: right;
}
h2 {
  font-size: 0.48rem;
  line-height: 45px;
}
.no-data {
  text-align: center;
  margin-top: 2.666667rem;
}
.no-data img {
  width: 2.666667rem;
  height: 2.666667rem;
  margin: auto;
  display: block;
}
.no-data .no-data-text {
  font-size: 0.373333rem;
  color: #999;
}
.no-data .no-data-btn {
  margin-top: 0.533333rem;
  width: 3.2rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.426667rem;
  background: #f51861;
  color: #fff;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 0.666667rem;
}
/* 购物车列表 */
.cart-section {
  margin-top: 0.133333rem;
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
.section-header .title a,
.btn-get {
  font-size: 0.333333rem;
}
.cart-item .selector {
  position: relative;
  float: left;
  overflow: hidden;
}
.cart-item .selector:after {
  content: "";
  height: 2.933333rem;
  line-height: 2.933333rem;
  width: 1.013333rem;
  position: absolute;
  left: 50%;
  top: 0.4rem;
  transform: translate(-50%, -50%);
}
.cart-section .section-header {
  height: 0.533333rem;
  line-height: 0.533333rem;
  font-size: 0.213333rem;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.013333rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-right: 0.2rem;
}
#cart .selector {
  margin: 0 0.133333rem;
}
/* 选择圆圈 */
.selector {
  display: block;
  width: 0.426667rem;
  height: 0.426667rem;
  border: 0.013333rem solid #999;
  border-radius: 50%;
  box-sizing: border-box;
}
/* 圆圈 被选中 */
.selected {
  border: none;
  border-radius: 0;
  background-image: url(https://www.zxyj.com/static/images/icon-selected.png);
  background-size: contain;
}
.cart-section .section-header .title {
  -ms-flex: 1;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
}
.btn-get {
  width: 0.6rem;
  height: 0.333333rem;
  line-height: 0.333333rem;
  font-size: 0.186667rem;
  text-align: center;
  display: block;
  border-radius: 0.053333rem;
  margin-top: 0.133333rem;
  color: #666;
  background: #f2f2f2;
}
.cart-item-box {
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.013333rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
  background-color: #fafafa;
}
.shelf {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.266667rem;
  float: left;
}
.cart-item .thumb {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.266667rem;
}
.cart-item {
  overflow: hidden;
}
.cart-item .item-detail {
  -ms-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
}
.number-field {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 2.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 0.666667rem;
  background-color: #fff;
  float: right;
}
.number-field {
  position: relative;
  bottom: 0;
  right: 5%;
}
.number-field .btn.minus.disabled {
  background-color: transparent !important;
  background-image: url(https://www.zxyj.com/static/images/icon-minus-gray.png) !important;
}
.number-field .btn.minus {
  background-size: 0.266667rem 0.026667rem;
  background-image: url(https://www.zxyj.com/static/images/icon-minus.png);
}
.number-field .btn {
  width: 0.666667rem;
  height: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
}
.btn.disabled {
  background-color: #ccc !important;
  color: #999 !important;
}
.number-field .value {
  -ms-flex: 1;
  flex: 1;
  border: solid #ccc;
  border-width: 0 0.013333rem;
  font-size: 0.373333rem;
  line-height: 0.613333rem;
  text-align: center;
}
.number-field .btn.plus {
  background-size: 0.133333rem 0.266667rem;
  background-image: url(https://www.zxyj.com/static/images/icon-plus.png);
}
.number-field .btn:before {
  content: "";
  display: block;
  width: 1.066667rem;
  height: 1.066667rem;
  position: absolute;
  top: -1.68rem;
}
/* 购物车底部 */
.cart-bottom,
.cart-bottom .select-all {
  height: 1.333333rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
}
.cart-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1.28rem;
  background-color: #fff;
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
.cart-bottom .content {
  -ms-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: end;
  align-items: flex-end;
  padding: 0 0.133333rem;
}
.fs16 {
  font-size: 0.426667rem !important;
}
.color-main {
  color: #f51861 !important;
}
.fs12 {
  font-size: 0.32rem !important;
}
.color-gray {
  color: #999 !important;
}
.mt5 {
  margin-top: 0.133333rem;
}
.cart-bottom .next-btn {
  width: 2.933333rem;
  font-size: 0.373333rem;
  color: #fff;
  background: #f51861;
  height: 1.333333rem;
  line-height: 1.333333rem;
  text-align: center;
}
.disabled {
  background-color: #ccc !important;
  color: #999 !important;
}
.btn-right {
  position: absolute;
  right: 0;
}
</style>
