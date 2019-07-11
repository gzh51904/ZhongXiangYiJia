<template>
  <div class="brand">
    <header>
      <div class="header">
        <div>&lt;</div>
        <h2 class="title">{{title[0].title}}</h2>
        <div>...</div>
      </div>
    </header>
    <div class="mian">
      <!-- banner -->
      <div class="banner">
        <div class="banner-top">
          <img :src="banner[0].data.image" />
        </div>
        <div class="banner-foot">
          <img :src="banner[1].data.image" />
        </div>
      </div>
      <!-- 品牌三连 -->
      <div class="customItm" :style="{backgroundImage:'url(' + banner1[0].image + ')'}">
        <div v-for="customImg in banner1" class="customItm-img"></div>
      </div>
      <!-- 甄选新品1 -->
      <div class="zhenxuan" :style="{backgroundImage:'url('+banner2[0].image+')'}">
        <div v-for="zhenxuanImg in banner2" class="zhenxuanImg-img" :key="zhenxuanImg.target"></div>
      </div>
      <!-- 甄选新品2 -->
      <div class="zhenxuan2" :style="{backgroundImage:'url(' + banner3[0].data[0].image + ')'}">
        <div
          v-for="zhenxuanImg2 in banner3[0].data"
          :key="zhenxuanImg2.target"
          class="zhenxuanImg2-img"
        ></div>
      </div>
      <!-- 维纳斯系列 -->
      <div class="weinasi-img">
        <img :src="banner4[1].data.image" />
      </div>
      <!--维纳斯goods  -->
      <div class="weinasi-goods" :style="{backgroundImage:'url(' + this.goodslist1[0].image + ')'}">
        <div v-for="weinasi in goodslist1" :key="weinasi.target" class="weinasi-goods-list"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: [],
      banner: [],
      banner1: [],
      banner2: [],
      banner3: [],
      banner4: [],
      goodslist1: []
    };
  },
  async created() {
    let { target } = this.$route.params;
    let hash = target.split("=")[1];
    let { data } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/pageConfig/getGeneralConfig?pageId=" +
        hash +
        "&version=1.0&terminal=3"
    );
    this.title.push(data.data);

    let Item = data.data.config;
    Item.map(item => {
      if (item.type == "banner") {
        this.banner.push(item);
        this.banner = this.banner.slice(0, 2);
      }
      if (item.type == "customImg" && item.height == "274") {
        this.banner1.push(item);
        this.banner1 = this.banner1.slice(0, 1)[0].data;
      }
      if (item.type == "customImg" && item.height == "1012") {
        this.banner2.push(item);
        this.banner2 = this.banner2[0].data;
      }
      if (item.type == "customImg" && item.height == "530") {
        this.banner3.push(item);
        this.banner3 = this.banner3.slice(0, 1);
      }
      if (item.type == "banner" && item.height == "552") {
        this.banner4.push(item);
      }
      if (item.type == "customImg" && item.height == "806") {
        this.goodslist1.push(item);
        this.goodslist1 = this.goodslist1[0].data;
      }
    });
    console.log(this.goodslist1[0].image);
  }
};
</script>
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
}
.brand {
  height: 100%;
  width: 100%;
}

.header {
  font-size: 0.4rem;
  width: 100%;
  line-height: 1.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.426667rem 0 0.426667rem;
  box-sizing: border-box;
}
.header .title {
  font-size: 0.4rem;
}
.banner {
  background: red;
}
.banner .banner-top {
  height: 5.68rem;
  background: pink;
}
.banner .banner-foot {
  height: 7.36rem;
  background: gray;
}
.customItm {
  display: inline-flex;
  background-size: 100%;
  width: 100%;
  height: 3.653333rem;
}
.customItm .customItm-img {
  height: 100%;
  width: 33%;
}
.zhenxuan {
  width: 100%;
  background-size: 100%;
  height: 13.493333rem;
}
.zhenxuan .zhenxuanImg-img:nth-child(1) {
  height: 6.826667rem;
}
.zhenxuan .zhenxuanImg-img:nth-child(2) {
  float: left;
  width: 5rem;
  height: 6.666667rem;
}
.zhenxuan .zhenxuanImg-img:nth-child(3) {
  float: left;
  width: 5rem;
  height: 6.666667rem;
}
.zhenxuan2 {
  background-size: 100%;
  width: 100%;
  height: 7.066667rem;
  display: inline-flex;
}
.zhenxuan2 .zhenxuanImg2-img {
  width: 50%;
  height: 100%;
}
.weinasi-goods {
  height: 10.746667rem;
  background-size: 100%;
  width: 100%;
}
.weinasi-goods .weinasi-goods-list:first-child {
  height: 5.333333rem;
}
.weinasi-goods .weinasi-goods-list:not(:first-child){
    width: 33.3%;
    float: left;
    height: 5.013333rem;
}
</style>
