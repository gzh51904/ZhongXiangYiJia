<template>
  <div class="content">
    <!-- 轮播图 -->
    <div class="bannerItem">
      <div class="btn-backlist" @click="gotolist"></div>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(itemImg,idx) in goodlist.images" :key="idx">
          <img v-lazy="itemImg" class="header-img" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="auto">
      <!-- 标题 -->
      <div class="title">
        <div class="baoyou" v-for="na in goodlist.tags" :key="na.tagName">{{na.tagName}}</div>
        <div class="biaoti">{{goodlist.productName}}</div>
      </div>
      <!-- 价格 -->
      <div class="readme" v-for="inf in info" :key="inf.intro">{{inf.intro}}</div>
      <div class="describe">
        <div class="china">
          <img :src="goodlist.country.flag" />
          <span>{{goodlist.country.countryName}}</span>
        </div>
        <div class="love">
          <div>
            <img
              style="width:.533333rem"
              src="https://www.zxyj.com/static/images/detail-no-like.png"
              alt
            />
            <p>喜欢</p>
          </div>
          <div class="add_like" v-show="false">
            <img src="https://www.zxyj.com//static/images/detail-like.png" style="width:.533333rem" />
            <p>已收藏</p>
          </div>
        </div>
        <div class="pirce">
          <span
            class="pirceNew"
            v-for="inf in info"
            :key="inf.intro"
          >￥{{(inf.retailPrice/100).toFixed(2)}}</span>
          <span class="pirceOld">
            <del v-for="inf in info" :key="inf.intro">￥{{(inf.marketPrice/100).toFixed(2)}}</del>
          </span>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="youhui">
        <p v-for="inf in info" :key="inf.intro">立省￥{{(inf.weight/10).toFixed(2)}}</p>
      </div>
      <!-- 开通VIP -->
      <div class="vip">
        <div class="SV3">SV3</div>
        <div class="manzu">您已满足升级SV3条件，点击购买礼包可升级SV3特权</div>
      </div>
      <!-- 发货地 -->
      <div class="fahuodi">
        <div v-for="inf in info" :key="inf.intro">热度：{{inf.saleCount}}</div>
        <div>快递：{{msg.expressName}}</div>
        <div>{{msg.shipAddress}}</div>
      </div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 退款服务 -->
    <div class="tuikuan" @click="pledge">
      <!-- 正品 -->
      <div v-for="(zhengpin,idx) in goodlist.auths" class="zhengpin" :key="idx">
        <div>
          <img :src="zhengpin.iconUrl" />
        </div>
        <span>{{zhengpin.title}}</span>
      </div>
    </div>
    <!-- 点击退款弹出 -->
    <div class="tuikuan-click" v-show="displayPledge">
      <ul>
        <li v-for="(zhengpin,idx) in goodlist.auths" class="zhengpin" :key="idx">
          <div>
            <img :src="zhengpin.iconUrl" />
          </div>
          <div>
            <p>{{zhengpin.title}}</p>
            <p>{{zhengpin.content}}</p>
          </div>
        </li>
      </ul>
      <div class="success" @click="hide">完成</div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 店铺优惠活动 -->
    <div class="dpyouhui">
      <div>优惠</div>
      <div>该店铺已参与满额包邮活动</div>
    </div>
    <!-- 点击店铺优惠活动弹出 -->
    <div class="dpyouhui-click" v-show="displayDiscounts"></div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 商品规格 -->
    <div class="properties">
      <div v-for="inf in info" :key="inf.intro">{{inf.properties}}</div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 评论区 -->
    <div class="msg">
      <div class="msg-top">
        <div class="msg-pinglun">评论({{goodlist.productCommentCount}})</div>
        <div class="msg-gengduo">查看全部</div>
      </div>
      <div class="msg-bottom">
        <div class="msg-item">
          <div class="msg-flex" v-for="msg in goodlist.productComment" :key="msg.countryId">
            <div class="msg-info">
              <div class="msg-touxiang">
                <img :src="msg.headImage" />
                <div class="msg-name">{{msg.nickName}}</div>
              </div>
            </div>
            <div class="msg-text">{{msg.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 卖家店铺 -->
    <div class="seller">
      <div class="seller-top">
        <div>
          <img :src="msg.thumbUrl" style="width:.96rem" />
        </div>
        <div>
          <p>{{msg.storeName}}</p>
          <p>
            店铺评分：
            <span>{{msg.comprehensiveScore}}</span> 分
          </p>
        </div>
        <div>进店逛</div>
      </div>
      <div class="seller-bottom">
        <ul>
          <li>
            <p>{{msg.saleProductCount}}</p>
            <p>全部宝贝</p>
          </li>
          <li>
            <p>{{msg.saleCount}}</p>
            <p>累计销量</p>
          </li>
          <li>
            <p>{{msg.saleProductNewCount}}</p>
            <p>上新宝贝</p>
          </li>
          <li>
            <div>
              <div>
                <span>宝贝描述</span>
                <span>{{msg.descScore}}</span>
                <span>↑</span>
              </div>
              <div>
                <span>卖家服务</span>
                <span>{{msg.serveScore}}</span>
                <span>↑</span>
              </div>
              <div>
                <span>物流服务</span>
                <span>{{msg.expressScore}}</span>
                <span>↑</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 斑马条，失误没看好布局，只能这样写了 -->
      <div class="banmatiao" style="background:#efeff4;;width:100%;height:.026667rem"></div>
      <!-- 在线客服 -->
      <div class="zaixian">
        <div>
          <img src="https://www.zxyj.com/static/images/Customer-service1.png" alt />
          <p>在线客服</p>
        </div>
        <div>
          <img src="https://www.zxyj.com/static/images/Collection1.png" alt />
          <p>收藏店铺</p>
        </div>
      </div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <div style="font-size:.32rem;color:#999;text-align:center;line-height: .933333rem">图文详情</div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;;width:100%;height:.026667rem"></div>
    <!-- 买家秀 -->
    <div class="maijiaxiu">
      <div v-html="content"></div>
    </div>
    <!-- 加入购物车 -->
    <div class="all-btn product-bottom">
      <div class="btn-item btn-shop cs-btn">店铺</div>
      <div class="btn-item btn-service cs-btn">客服</div>
      <div class="btn-item btn-mat cs-btn">
        <span>99+</span>反馈
      </div>
      <div class="btn btn-add-to-cart" @click="clone">加入购物车</div>
      <div class="btn btn-buy" @click="ToBuy">立即购买</div>
    </div>
    <!-- 选择类型 -->
    <div
      id="product-sku"
      class="mask product-sku-mask"
      v-show="add"
      v-for="(item,idx) in propertyValues2[0]"
      :key="idx"
    >
      <div class="product-sku-container">
        <div class="product-sku-preview">
          <div class="product-sku-thumb-container">
            <img :src="turl" class />
          </div>
          <div class="product-sku-desc" v-for="inf in info" :key="inf.intro">
            <div class="product-sku-price">¥{{(inf.retailPrice/100).toFixed(2)}}</div>
            <div class="product-sku-line">库存{{inf.stock}}件</div>
            <div class="product-sku-line">
              已选：
              <span>{{'“'+title+'”'}}</span>
              <span v-if=" propertyValues2[0].propertyValue== '' ? false: true">{{'“'+style+'”'}}</span>
            </div>
          </div>
          <div class="close-btn" @click="clone"></div>
        </div>
        <div class="product-skus">
          <div class="product-sku">
            <div class="product-sku-title">选择尺码</div>
            <div class="product-sku-selector">
              <div
                class="item"
                v-for="(item,idx) in propertyValues1[0]"
                :key="idx"
                @click="checktitle(idx)"
                :class="titleidx==idx ? 'selected': '' "
              >{{item.propertyValue}}</div>
            </div>
          </div>
          <div class="product-sku" v-if=" propertyValues2[0].propertyValue== '' ? false: true">
            <div class="product-sku-title">选择颜色</div>
            <div class="product-sku-selector">
              <div
                class="item"
                v-for="(item,idx) in propertyValues2[0]"
                :key="idx"
                @click="checkstyle(idx)"
                :class="styleidx==idx ? 'selected': '' "
              >{{ item.propertyValue}}</div>
            </div>
          </div>
        </div>
        <div class="product-sku-amount">
          <div class="product-sku-label">购买数量</div>
          <div style="font-size: 14px; color: rgb(239, 48, 119);">
            <!---->
          </div>
          <div class="product-sku-value">
            <div>
              <div class="number-field">
                <div class="btn minus" @click="minus"></div>
                <div class="value">{{count}}</div>
                <div class="btn plus" @click="adds"></div>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-sku-bottom">
        <Button class="btn red" @click="addToCart(Cartinfo.skuId)">确定</Button>
      </div>
    </div>

    <!-- ------------ -->
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      content: "",
      goodlist: [],
      info: [],
      msg: [],
      displayPledge: false,
      displayDiscounts: true,
      Cartinfo: {} /* 购物车数据 */,
      add: false,
      productId: 0,
      skus: [],
      propertyValues1: [],
      propertyValues2: [],
      turl: "",
      /*     cartlist: {}, */
      titleidx: 0,
      styleidx: 0,
      count: 1,
      title: "",
      style: ""
    };
  },
  computed: {
    ...mapState({
      cartlist(state) {
        return state.cart.Cart_goodslist;
      }
    })
  },
  methods: {
    pledge() {
      this.displayPledge = true;
    },
    hide() {
      this.displayPledge = false;
    },

    gotolist() {
      this.$router.back(-1);
    },
    /* 加入购物车 */
    async addToCart(id) {
      this.add = !this.add;
      let { commit, state } = this.$store;
      let { Cart_goodslist } = state.cart;
      let { skuId } = this.Cartinfo;
      // 判断当前商品是否已经存在购物车中
      // 存在：数量+1
      // 不存在：添加（数量为1）
      let current = Cart_goodslist.filter(item => item.skuId == skuId)[0];

      if (current) {
        commit("changeQty", {
          skuId: current.skuId,
          qty: current.qty + this.count
        });
      } else {
        commit("add", {
          qty: this.count,
          ...this.Cartinfo,
          checked: false
        });
      }
      if (this.info.Cartinfo != "") {
        this.$Message.success("添加购物车成功");
      } else {
        this.$Message.success("添加购物车失败");
      }
      /* 选择商品类型 */
      /* new Promise((resolve, reject) => {
        let Cartdata = this.$axios(
          "https://api.zxyjsc.com/flyapi/product/skuDetailByProperty?productId=" +
            this.productId +
            "&propertyValueIds=" +
            this.skus[0].propertyValueIds +
            "&version=2.0&terminal=3"
        );
        resolve(Cartdata);
      }).then(res => {
        this.cartlist = res.data.data;
      }); */
    },
    /* 立即购买*/
    ToBuy() {},
    clone() {
      this.add = !this.add;
      console.log("add");
    } /* 商品数量++ */,
    adds(item) {
      this.count++;
    } /* 商品数量-- */,
    minus(item) {
      this.count > 1 ? this.count-- : "";
    },
    /* 选择尺码 */
    checktitle(idx) {
      this.titleidx = idx;

      this.title = this.propertyValues1[0][idx].propertyValue; /* 选择尺码 */
      this.titleid = this.propertyValues1[0][idx].propertyValueId;
    },
    /* 选择类型 */
    checkstyle(idx) {
      this.styleidx = idx;

      this.style = this.propertyValues2[0][idx].propertyValue; /* 选择类型 */
      this.styleid = this.propertyValues2[0][idx].propertyValueId;
    }
  },
  async created() {
    let { productId, skuId } = this.$route.params;
    // 请求1主要是标题和买家秀
    let { data } = await this.$axios(
      "https://api.zxyjsc.com/flyapi/product/spuDetail?spuId=" +
        productId +
        "&version=3.0&terminal=3"
    );

    // // 请求2商品介绍
    // let product = data.data.skus[1].skuId;

    let itemlist = await this.$axios(
      "https://api.zxyjsc.com/flyapi/product/skuDetail?skuId=" +
        skuId +
        "&version=2.0&terminal=3"
    );

    /*-------- 购物车数据 ------------*/
    this.Cartinfo = itemlist.data.data;

    /* ----------------------------------- */
    // // 请求店铺相关
    let dianpu = await this.$axios(
      "https://api.zxyjsc.com/flyapi/product/storeDetail?spuId=" +
        productId +
        "&version=1.0&terminal=3"
    );

    this.msg = dianpu.data.data;

    this.info.push(itemlist.data.data);

    this.content = data.data.content;
    this.goodlist = data.data;

    new Promise((resolve, reject) => {
      let data = this.$axios(
        "https://api.zxyjsc.com/flyapi/product/spuDetail?spuId=" +
          productId +
          "&version=3.0&terminal=3"
      );
      resolve(data);
    }).then(res => {
      this.productId = res.data.data.productId;
      this.skus = res.data.data.skus;
      this.turl = res.data.data.thumbUrl;

      if (res.data.data.properties.length > 1) {
        this.propertyValues1.push(res.data.data.properties[0].propertyValues);

        this.propertyValues2.push(
          res.data.data.properties[1].propertyValues
        ); /* 类型*/

        this.style =
          res.data.data.properties.length > 1
            ? this.propertyValues2[0][0].propertyValue
            : ""; /* 默认选择类型 */
      } else if (res.data.data.properties.length == 1) {
        this.propertyValues1.push(res.data.data.properties[0].propertyValues);
        this.propertyValues2.push({ propertyValue: "" });
      }
      /* 尺码 */
      this.title = this.propertyValues1[0][0].propertyValue; /* 默认选择尺码 */
    });
  }
};
</script>
<style>
/* 选择类型 */
.mask {
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
}
.product-sku-container {
  background: #fff;
  min-height: 80%;
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.266667rem 0.4rem 1.6rem;
  box-sizing: border-box;
}
.product-sku-preview {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 0.4rem 0;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
  position: relative;
}
.product-sku-preview .close-btn {
  position: absolute;
  right: -0.4rem;
  top: -0.4rem;
  width: 1.333333rem;
  height: 1.333333rem;
  z-index: 1003;
  background-image: url(https://www.zxyj.com/static/images/icon-close-cicle.png);
  background-size: 0.666667rem 0.666667rem;
  background-repeat: no-repeat;
  background-position: 50%;
}
.product-sku-preview .product-sku-thumb-container {
  width: 3.093333rem;
  height: 3.093333rem;
  box-sizing: border-box;
  margin-right: 0.266667rem;
  margin-top: -1.333333rem;
  background: #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  border: 0.026667rem solid #e5e5e5;
  border-radius: 0.106667rem;
}
.product-sku-preview .product-sku-thumb-container img {
  width: 2.933333rem;
  height: 2.933333rem;
  display: block;
}
.product-skus {
  margin: 0 -0.4rem;
  padding: 0 0.4rem;
  max-height: 8rem;
  overflow-y: auto;
}
.product-skus .product-sku {
  padding: 0.4rem 0 0;
  background-image: linear-gradient(0deg, #e5e5e5, #e5e5e5 50%, transparent 0);
  background-size: 100% 0.026667rem;
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: border-box;
}
.product-skus .product-sku .product-sku-title {
  font-size: 0.373333rem;
  margin-bottom: 0.4rem;
}
.product-skus .product-sku .product-sku-selector {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.product-skus .product-sku .product-sku-selector .selected {
  background: #f51861 !important;
  color: #fff !important;
}
.product-skus .product-sku .product-sku-selector .item {
  background: #e6e6e6;
  font-size: 0.32rem;
  line-height: 0.613333rem;
  height: 0.613333rem;
  width: auto;
  padding: 0 0.266667rem;
  margin-bottom: 0.4rem;
  border-radius: 0.106667rem;
  margin-right: 0.4rem;
}
.product-sku-amount {
  margin-top: 0.48rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  margin-bottom: 0.8rem;
}
.product-sku-amount .product-sku-label {
  line-height: 0.666667rem;
  font-size: 0.373333rem;
}
.product-sku-amount .product-sku-value {
  position: absolute;
  right: 5%;
}
.number-field {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 2.4rem;
  border: 1px solid #ccc;
  border-radius: 0.106667rem;
  box-sizing: border-box;
  height: 0.666667rem;
  background-color: #fff;
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
  background-size: 10px 1px;
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
.number-field .btn:before {
  content: "";
  display: block;
  width: 1.066667rem;
  height: 1.333333rem;
  position: absolute;
  top: -0.346667rem;
}
.number-field .value {
  -ms-flex: 1;
  flex: 1;
  border: solid #ccc;
  border-width: 0 1px;
  font-size: 0.373333rem;
  line-height: 0.613333rem;
  text-align: center;
}
.number-field .btn.plus {
  background-size: 0.266667rem 0.266667rem;
  background-image: url(https://www.zxyj.com/static/images/icon-plus.png);
}
.number-field .btn {
  width: 0.666667rem;
  height: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
}
.number-field .btn:before {
  content: "";
  display: block;
  width: 1.066667rem;
  height: 1.333333rem;
  position: absolute;
  top: -0.346667rem;
}
.product-sku-weight {
  font-size: 0.5rem;
  bottom: 12%;
  position: absolute;
  right: 6%;
  color: #f45787;
}
.product-sku-bottom {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 1.333333rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: #999;
}
.product-sku-bottom .btn.red {
  background: #f51861;
}

.product-sku-bottom .btn {
  -ms-flex: 1;
  flex: 1;
  line-height: 1.333333rem;
  color: #fff;
  text-align: center;
  font-size: 0.48rem;
}
/* ---------- */
html,
body {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
}
.bannerItem {
  margin-bottom: 0.426667rem;
}
.bannerItem img {
  width: 100%;
}
.content .auto {
  padding: 0 0.373333rem 0 0.373333rem;
  box-sizing: border-box;
}
.content .bannerItem {
  height: 10rem;
}
.content .title {
  height: 1.2rem;
}
.content .title .baoyou {
  text-align: center;
  width: 1.44rem;
  height: 0.4rem;
  font-size: 0.266667rem;
  line-height: 0.4rem;
  background: #f5155f;
  color: #fff;
  float: left;
  margin-right: 0.213333rem;
  margin-top: 0.053333rem;
}
.content .title .biaoti {
  line-height: 0.493333rem;
  font-size: 0.373333rem;
}
.content .readme {
  width: 100%;
  box-sizing: border-box;
  color: #fb5084;
  font-size: 0.293333rem;
  line-height: 0.453333rem;
  font-weight: 700;
  letter-spacing: 0.013333rem;
  margin-bottom: 0.266667rem;
}

.content .china {
  float: left;
  width: 7.68rem;
}
.content .china img {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.133333rem;
  background-size: cover;
  float: left;
}
.content .describe .china span {
  line-height: 0.6rem;
  color: #999;
  font-size: 0.28rem;
}
.content .love {
  text-align: center;
  float: right;
  color: #999;
}

.content .pirce .pirceNew {
  line-height: 1.173333rem;
  font-size: 0.453333rem;
  font-weight: 700;
  color: #f51861;
  margin-right: 0.293333rem;
}
.content .pirce .pirceOld {
  font-size: 0.32rem;
  color: #999;
}

.content .youhui p {
  font-size: 0.266667rem;
  color: #39c8de;
  border: 1px solid #39c8de;
  width: 1.813333rem;
  height: 0.586667rem;
  line-height: 0.586667rem;
  text-align: center;
}
.content .vip {
  margin-top: 0.133333rem;
  width: 9.266667rem;
  background: #fdf4d7;
  border-radius: 0.266667rem;
  height: 1.333333rem;
  position: relative;
}
.content .vip .SV3 {
  width: 1.226667rem;
  height: 0.693333rem;
  background: -webkit-linear-gradient(left, #e1b53b, #e9c865);
  border-radius: 0.533333rem;
  text-align: center;
  line-height: 0.693333rem;
  font-size: 0.346667rem;
  font-weight: 600;
  color: #fff;
  float: left;
  margin-top: 0.333333rem;
  margin-left: 0.2rem;
}
.content .vip .manzu {
  margin-top: 0.333333rem;
  width: 6.4rem;
  height: 1.333333rem;
  color: #956116;
  height: 0.853333rem;
  float: left;
  margin-left: 0.2rem;
}
.content .vip::after {
  top: 0.333333rem;
  font-size: 0.4rem;
  right: 0.2rem;
  display: block;
  content: " >";
  position: absolute;
}
.content .fahuodi {
  width: 100%;
  line-height: 1.173333rem;
  color: #999;
  display: inline-flex;
  justify-content: space-between;
  margin-bottom: 0.266667rem;
}
.content .tuikuan {
  display: inline-flex;
  width: 100%;
  line-height: 1.066667rem;
  align-items: center;
  font-size: 0.293333rem;
  color: #999;
  padding-left: 0.373333rem;
  box-sizing: border-box;
}
.content .zhengpin {
  margin-right: 0.346667rem;
}
.content .zhengpin img {
  width: 0.453333rem;
  margin-top: 0.32rem;
  margin-right: 0.08rem;
}
.content .tuikuan .zhengpin:last-child {
  display: none;
}
.content .zhengpin div {
  float: left;
}
.content .dpyouhui {
  line-height: 1.066667rem;
  font-size: 0.32rem;
  padding-left: 0.373333rem;
  height: 1.066667rem;
  box-sizing: border-box;
}
.content .dpyouhui div:first-child {
  margin-right: 0.213333rem;
  color: #999;
}
.content .dpyouhui div {
  float: left;
}
.content .properties {
  line-height: 1.066667rem;
  padding-left: 0.373333rem;
  box-sizing: border-box;
  font-size: 0.306667rem;
}
.content .msg {
  box-sizing: border-box;

  padding: 0 0.373333rem 0 0.373333rem;
  width: 100%;
}
.content .msg .msg-touxiang img {
  width: 0.44rem;
  border-radius: 50%;
  height: 0.44rem;
}
.content .msg .msg-bottom {
  width: 100%;
}
.content .msg .msg-item {
  width: 100%;
  overflow: auto;
  display: -webkit-box;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.content .msg .msg-top {
  width: 100%;
  font-size: 0.373333rem;
  line-height: 0.8rem;
  display: inline-flex;
  justify-content: space-between;
}
.content .msg .msg-flex {
  padding: 0.266667rem 0.24rem;
  box-sizing: border-box;
  margin: 0.066667rem;
  margin-right: 0.266667rem;
  margin-bottom: 0.373333rem;
  width: 5.906667rem;
  height: 2.493333rem;
  border-radius: 0.08rem;
  box-shadow: 0 0 0.133333rem #999;
}
.content .msg .msg-touxiang {
  margin-bottom: 0.16rem;
  display: inline-flex;
}
.content .seller {
  width: 100%;
  height: 4.613333rem;
}
.content .seller .seller-top {
  padding-left: 0.373333rem;
  padding-right: 0.28rem;
  box-sizing: border-box;
  padding-top: 0.24rem;
  height: 1.333333rem;
}
.content .seller .seller-top div {
  float: left;
}
.content .seller .seller-top div:first-child {
  margin-right: 0.226667rem;
}
.content .seller .seller-top div:last-child {
  float: right;
  width: 1.706667rem;
  height: 0.613333rem;
  border: 1px solid rgb(245, 24, 97);
  color: rgb(245, 24, 97);
  line-height: 0.613333rem;
  text-align: center;
  font-size: 0.32rem;
  margin-top: 0.173333rem;
  border-radius: 0.533333rem;
}
.content .seller .seller-top div:nth-child(2) p:nth-child(1) {
  font-size: 0.346667rem;
  margin-bottom: 0.24rem;
  line-height: 0.346667rem;
}
.content .seller .seller-top div:nth-child(2) p:nth-child(2) {
  font-size: 0.293333rem;
  color: #999;
  line-height: 0.293333rem;
}
.content .seller .seller-top div:nth-child(2) p:nth-child(2) span {
  color: rgb(245, 24, 97);
}
.content .seller .seller-bottom ul {
  display: flex;
  justify-content: space-around;
  height: 2.066667rem;
  /* background: red; */
  text-align: center;
  position: relative;
}
.content .seller .seller-bottom ul li:nth-child(-n + 3)::before {
  content: "";
  height: 1.466667rem;
  display: block;
  width: 0.026667rem;
  background: #efeff4;
  position: absolute;
  margin-left: 1.6rem;
}
.content .seller .seller-bottom ul li:nth-child(-n + 3) p:nth-child(1) {
  margin-top: 0.24rem;
  font-size: 0.226667rem;
  line-height: 0.226667rem;
}
.content .seller .seller-bottom ul li:nth-child(-n + 3) p:nth-child(2) {
  margin-top: 0.466667rem;
  font-size: 0.28rem;
  color: #999;
  line-height: 0.226667rem;
}
.content .seller .seller-bottom ul li:last-child {
  line-height: 0.506667rem;
  color: #999;
}
.content .seller .seller-bottom ul li:last-child span:nth-child(2) {
  color: rgb(245, 24, 97);
  margin: 0 0.32rem 0 0.32rem;
}
.content .zaixian {
  line-height: 1.2rem;
  color: #999;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.content .zaixian div {
  display: flex;
}
.content .zaixian img {
  margin-top: 0.266667rem;
  margin-right: 0.24rem;
  width: 0.533333rem;
  height: 0.533333rem;
}
.content .tuikuan-click {
  left: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 9.333333rem;
  background: #fff;
  z-index: 1;
  padding-left: 0.346667rem;
  box-sizing: border-box;
  padding-top: 0.8rem;
}

.content .tuikuan-click ul li {
  margin-bottom: 0.586667rem;
  display: flex;
}
.content .tuikuan-click img {
  margin-top: 0;
}
.content .tuikuan-click ul li div:nth-child(1) {
  margin-right: 0.346667rem;
}
.content .tuikuan-click ul li div:nth-child(2) p:nth-child(2) {
  font-size: 0.293333rem;
  color: #999;
}
.content .tuikuan-click ul li div:nth-child(2) p:nth-child(1) {
  font-size: 0.346667rem;
  margin-bottom: 0.24rem;
}
.content .tuikuan-click .success {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  color: #fff;
  background: #f51861;
  width: 100%;
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.4rem;
}
.btn-backlist {
  position: absolute;
  left: 0.346667rem;
  top: 0.213333rem;
  z-index: 999;
  height: 0.693333rem;
  width: 0.693333rem;
  background-repeat: no-repeat;
  background-image: url(https://www.zxyj.com/static/images/icon-back-circle.png);
  background-size: 100%;
}

.maijiaxiu >>> img {
  width: 100%;
  margin: 0;
}
/* 加入购物车 */
.btn {
  float: left;
  width: 2.666667rem;
  text-align: center;
  color: #fff;
  font-size: 0.426667rem;
  line-height: 1.333333rem;
}
.all-btn {
  float: right;
  width: 100%;
}

.btn-add-to-cart {
  background: linear-gradient(#ff9300, #ff7800);
}
.btn-buy {
  background: #f51861;
}
.product-bottom,
.product-bottom .btn-item {
  display: -ms-flexbox;
  display: flex;
}
.product-bottom {
  position: fixed;
  height: 1.333333rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  -ms-flex-direction: row;
  flex-direction: row;
  z-index: 1;
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
.product-bottom .btn-item {
  -ms-flex: 1;
  flex: 1;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  color: #999;
  text-decoration: none;
  font-size: 0.133333rem;
  position: relative;
}
.product-bottom .btn-item {
  display: -ms-flexbox;
  display: flex;
}
.product-bottom .btn-shop:before {
  background: url(https://www.zxyj.com/static/images/btn-detail-shop.png)
    no-repeat;
  background-size: 100%;
}
.product-bottom .btn-service:before {
  background: url(https://www.zxyj.com/static/images/Customer-service2.png)
    no-repeat;
  background-size: 100%;
}
.product-bottom .btn-mat:before {
  background: url(https://www.zxyj.com/static/images/detail-mat.png) no-repeat;
  background-size: 100%;
}
.product-bottom .btn-item:before {
  content: "";
  width: 0.48rem;
  height: 0.48rem;
  display: block;
  background-size: contain;
  margin-bottom: 0.133333rem;
}
.product-bottom .btn-mat span {
  position: absolute;
  left: auto;
  right: 50%;
  border-radius: 0.4rem;
  min-height: 0.4rem;
  min-width: 0.4rem;
  font-size: 0.266667rem;
  color: #fff;
  line-height: 0.4rem;
  text-align: center;
  margin-left: 0;
  margin-right: -0.533333rem;
  padding: 0 0.026667rem;
  background: #f51861;
  top: 0.053333rem;
  box-sizing: border-box;
}
</style>
