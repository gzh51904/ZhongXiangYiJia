<template>
  <div class="brand">
    <header>
      <div class="header">
        <div @click="backHome">&lt;</div>
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
        <div
          v-for="customImg in banner1"
          class="customItm-img"
          :key="customImg.target"
          @click="gotoitem(customImg.target)"
        ></div>
      </div>
      <!-- 甄选新品1 -->
      <div class="zhenxuan" :style="{backgroundImage:'url('+banner2[0].image+')'}">
        <div
          v-for="zhenxuanImg in banner2"
          class="zhenxuanImg-img"
          :key="zhenxuanImg.target"
          @click="gotoItem(zhenxuanImg)"
        ></div>
      </div>
      <!-- 甄选新品2 -->
      <div class="zhenxuan2" :style="{backgroundImage:'url(' + banner3[0].data[0].image + ')'}">
        <div
          v-for="zhenxuanImg2 in banner3[0].data"
          :key="zhenxuanImg2.target"
          class="zhenxuanImg2-img"
          @click="gotoItem(zhenxuanImg2)"
        ></div>
      </div>
      <!-- 维纳斯系列 -->
      <div class="weinasi-img">
        <img :src="banner4[1].data.image" @click="gotoItem(banner4[1])" />
      </div>
      <!--维纳斯goods1  -->
      <div class="weinasi-goods" :style="{backgroundImage:'url(' + this.goodslist1[0].image + ')'}">
        <div v-for="weinasi in goodslist1" :key="weinasi.target" class="weinasi-goods-list"></div>
      </div>
      <!--维纳斯goods2  -->
      <div
        class="weinasi-goods2 weinasi-repate"
        :style="{backgroundImage:'url(' + this.goodslist2[0].image + ')'}"
      >
        <div
          v-for="weinasi in goodslist2"
          :key="weinasi.target"
          class="weinasi-goods2-list weinasi-repate-list"
        ></div>
      </div>
      <!--维纳斯goods3  -->
      <div
        class="weinasi-goods3 weinasi-repate"
        :style="{backgroundImage:'url(' + this.goodslist3[0].image + ')'}"
      >
        <div
          v-for="weinasi in goodslist3"
          :key="weinasi.target"
          class="weinasi-goods3-list weinasi-repate-list"
        ></div>
      </div>
      <!--维纳斯goods4  -->
      <div
        class="weinasi-goods4 weinasi-repate"
        :style="{backgroundImage:'url(' + this.goodslist4[0].image + ')'}"
      >
        <div
          v-for="weinasi in goodslist4"
          :key="weinasi.target"
          class="weinasi-goods4-list weinasi-repate-list"
        ></div>
      </div>
      <!-- 私密系列 -->
      <div>
        <img :src="banner5.image" alt />
      </div>
      <!-- 洗护 -->
      <div>
        <img :src="banner6.image" alt />
      </div>
      <!-- 福的村系列 -->
      <div>
        <img :src="banner7.image" alt />
      </div>
      <!-- 福的村小两图 -->
      <div
        class="fudecun weinasi-repate"
        :style="{backgroundImage:'url(' + goodslist5[1].data[1].image + ')'}"
      >
        <div class="fudecunItem" v-for="item in goodslist5[1].data" :key="item.target"></div>
      </div>
      <!-- 用户真实反馈 -->
      <div class="peopo" :style="{backgroundImage:'url(' + peopo.image + ')'}"></div>
      <!-- 没有更多了哦 -->
      <div class="meiyou">没有更多了哦</div>
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
      goodslist1: [],
      goodslist2: [],
      goodslist3: [],
      goodslist4: [],
      banner5: [],
      banner6: [],
      banner7: [],
      goodslist5: [],
      peopo: []
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
      if (item.type == "customImg" && item.height == "775") {
        this.goodslist2.push(item);
        this.goodslist2 = this.goodslist2[0].data;
      }
      if (item.type == "customImg" && item.height == "786") {
        this.goodslist3.push(item);
        this.goodslist3 = this.goodslist3[0].data;
      }
      if (item.type == "customImg" && item.height == "832") {
        this.goodslist4.push(item);
        this.goodslist4 = this.goodslist4[0].data;
      }
      if (item.type == "banner" && item.height == "540") {
        this.banner5.push(item);
        this.banner5 = this.banner5[0].data;
      }
      if (item.type == "banner" && item.height == "472") {
        this.banner6.push(item);
        this.banner6 = this.banner6[0].data;
      }
      if (item.type == "banner" && item.height == "576") {
        this.banner7.push(item);
        this.banner7 = this.banner7[0].data;
      }
      if (item.type == "customImg" && item.height == "530") {
        this.goodslist5.push(item);
      }
      if (item.type == "banner" && item.height == "910") {
        this.peopo.push(item);
        this.peopo = this.peopo[0].data;
      }
    });
    // console.log(this.banner2);
  },
  methods: {
    gotoitem(target) {
      console.log(target);
    },
    backHome() {
      this.$router.back(-1);
    },
    gotoItem(target) {
      console.log(target);
    }
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
.weinasi-goods .weinasi-goods-list:not(:first-child) {
  width: 33.3%;
  float: left;
  height: 5.013333rem;
}
.weinasi-goods2 {
  height: 10.333333rem;
}
.weinasi-goods3 {
  height: 10.48rem;
}
.weinasi-goods4 {
  height: 10.48rem;
}
.weinasi-repate {
  width: 100%;
  background-size: 100%;
  display: inline-flex;
  flex-wrap: wrap;
}
.weinasi-repate .weinasi-repate-list {
  width: 33.3%;
  height: 50%;
}
.fudecun {
  height: 7.066667rem;
}
.fudecunItem {
  width: 50%;
  height: 100%;
}
.peopo {
  background-size: 100%;
  width: 100%;
  height: 12.133333rem;
}
.meiyou {
  text-align: center;
  line-height: 0.853333rem;
  color: #a9acb7;
  background: #efeff4;
  font-size: 0.266667rem;
}
</style>
