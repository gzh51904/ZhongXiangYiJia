<template>
 <div class="content">
    <!-- 轮播图 -->
    <div class="bannerItem">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(itemImg,idx) in goodlist.images" :key="idx">
          <img :src="itemImg" class="header-img" />
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
          <img
            style="width:.533333rem"
            src="https://www.zxyj.com/static/images/detail-no-like.png"
            alt
          />
          <p>喜欢</p>
        </div>
        <div class="pirce">
          <span class="pirceNew" v-for="inf in info" :key="inf.intro">￥{{(inf.retailPrice/100).toFixed(2)}}</span>
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
    <div class="tuikuan">
      <!-- 正品 -->
      <div v-for="zhengpin in goodlist.auths" class="zhengpin" :key="zhengpin.title">
        <div>
          <img :src="zhengpin.iconUrl" alt />
        </div>
        <span>{{zhengpin.title}}</span>
      </div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 店铺优惠活动 -->
    <div class="dpyouhui">
      <div>优惠</div>
      <div>该店铺已参与满额包邮活动</div>
    </div>
    <!-- 斑马条，失误没看好布局，只能这样写了 -->
    <div style="background:#efeff4;width:100%;height:.266667rem"></div>
    <!-- 商品规格 -->
    <div class="properties">
      <div  v-for="inf in info" :key="inf.intro">{{inf.properties}}</div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      goodlist: [],
      info: [],
      msg: []
    };
  },
  async created() {
    let { productId,skuId } = this.$route.params;
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
console.log("item",itemlist);

    // // 请求店铺相关
    let dianpu = await this.$axios(
      "https://api.zxyjsc.com/flyapi/product/storeDetail?spuId=" +
        productId +
        "&version=1.0&terminal=3"
    );
    this.msg = dianpu.data.data;
    console.log("msg", this.msg);

    this.info.push(itemlist.data.data);
    console.log("info",this.info);

    this.content = data.data.content;
    this.goodlist = data.data;
  console.log("xiangqing",data);
    console.log("list",this.goodlist);
  }
};
</script>
<style scoped>
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
  margin-bottom: .426667rem;
}
.bannerItem img{
 width: 100% 
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
.content .zhengpin:last-child {
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
.content .banmatiao {
}
.content .zaixian img {
  margin-top: 0.266667rem;
  margin-right: 0.24rem;
  width: 0.533333rem;
  height: 0.533333rem;
}
.maijiaxiu >>> img {
  width: 100%;
  margin: 0;
}
</style>
