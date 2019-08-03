<template>
  <div class="classify-main">
    <div class="classify-left">
      <mt-cell
        v-for="list in lists"
        :key="list.name"
        :class="activeClass == list.name ? 'changes':''"
        @click.native.stop="goto(list)"
      >{{list.title}}</mt-cell>
    </div>
    <div class="classify-right clearfix">
      <!-- <router-view></router-view> -->
      <div
        class="itemmain"
        v-for="fy in fylist"
        :key="fy.categoryId"
        @click="godess(fy.categoryId,fy.categoryName,fy.parentId)"
      >
        <!-- <router-link :to="'/classify/'+fy.categoryId"> -->
        <div class="itemmain-img">
          <img v-lazy="fy.iconUrl" :key="fy.iconUrl" class="icon" alt />
        </div>
        <div class="label">{{fy.categoryName}}</div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";

Vue.use(MintUI);
export default {
  data() {
    return {
      fylist: [],
      lists: [
        {
          title: "潮流女装",
          name: "nvzhuang",
          id: "cd22b005da5f4f3785af45f8729e01fc"
        },
        {
          title: "品牌男装",
          name: "nanzhuang",
          id: "9a03f9be8ca54549b263176b9f1676e9"
        },
        {
          title: "美妆护理",
          name: "huli",
          id: "a4b0201ddc4e41429fc4c17dafbd88e2"
        },
        {
          title: "食品生鲜",
          name: "shengxian",
          id: "9b3445ef6ca942bb97d17abde0483f35"
        },
        {
          title: "身体护理",
          name: "huli2",
          id: "f27ed99e40b744f481c7a655815e0a8b"
        },
        {
          title: "母婴童装",
          name: "tongzhuang",
          id: "70f209a2d9404e8eae9da2dae060ee91"
        },
        {
          title: "鞋靴箱包",
          name: "xiangbao",
          id: "ce780bcd407b4ab4b9b39813cd60c175"
        },
        {
          title: "钟表珠宝",
          name: "zhubao",
          id: "fd0a3c6a5166425eb155bd056954632b"
        },
        {
          title: "居家用品",
          name: "yongpin",
          id: "b6c86acd9c50448aaa3f80e9d48d38d5"
        },
        {
          title: "内衣配饰",
          name: "peishi",
          id: "38ecd5e5d1654eb5bbc3cc13e04f3734"
        },
        {
          title: "数码家电",
          name: "jiadian",
          id: "503eb08732bf471096487f33e34e7862"
        },
        {
          title: "健康保健",
          name: "baojian",
          id: "56d5e4c0a41e4c10908fee30433c0a6c"
        },
        {
          title: "海外精选",
          name: "jingxuan",
          id: "86cce1f168a043aea1cf78923d1b726c"
        },
        {
          title: "计生情趣",
          name: "qingqu",
          id: "9eeaf7c862f64ece9ed47f4f2f953f6e"
        },
        {
          title: "生活超市",
          name: "chaoshi",
          id: "521e247d067348d7a3669825ae36bb63"
        }
      ],
      // 0为默认选择第一个，-1为不选择
      activeClass: "cd22b005da5f4f3785af45f8729e01fc"
    };
  },

  async created() {
    let { parentId } = this.$route.params;

    //刷新保持高亮、并且发起第一个数据请求
    this.activeClass = "cd22b005da5f4f3785af45f8729e01fc";
    let { data } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/category/child?parentCategoryId=" +
        this.activeClass +
        "&version=1.0&terminal=3"
    );

    this.fylist = data.data.datas;
  },
  methods: {
    //跳转到列表页，传入id和名字
    godess(categoryId, categoryName, parentId) {
      this.$router.push({
        name: "Fydess",
        params: { categoryId, categoryName, parentId },
        path: "/Classify/" + categoryId
      });
    },
    async goto(list) {
      // 把当前点击元素的index，赋值给activeClass,改变css样式
      this.activeClass = list.id;
      // console.log("name", list.name);
      // // console.log("$route",this.$route)
      //点击每类跳转地址后面加id
      this.$router.push("/classify/" + list.id);

      // console.log("$route", this.$route);
      //当点击事件发生，就发起请求，，请求路径根据list的id来获取
      let { data } = await this.$axios.get(
        "https://api.zxyjsc.com/flyapi/category/child?parentCategoryId=" +
          list.id +
          "&version=1.0&terminal=3"
      );
      // console.log("data", data);
      this.fylist = data.data.datas;
      //将请求来的数据放进空数组
    }
  }
};
</script>
<style>
.classify-main {
  height: 100%;
  background: #fff;
  padding-top: 1.066667rem;
}
.classify-left {
  width: 2.4rem;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  /* left: 0; */
  /*  top: 1.066667rem; */
  bottom: 1.146667rem;
  /* position: fixed; */
  float: left;
  background: #fff;
}
.mint-cell-title {
  text-align: center;
}
.mint-cell-wrapper {
  padding: 0px 0.426667rem;
}
.mint-cell-value {
  font-size: 0.373333rem;
}
.classify-right {
  height: 100%;
 /*  margin-top: 0.133333rem; */
  overflow: auto;
}
.active {
  background-color: red;
}
.itemmain {
  padding: 0.133333rem;
  float: left;
  width: 33.333333%;
  box-sizing: border-box;
}
.itemmain-img {
  position: relative;
  padding-bottom: 100%;
  width: 100%;
  /* background: #fff; */
}
.itemmain-img .icon {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.itemmain .label {
  line-height: 0.96rem;
  font-size: 0.32rem;
  text-align: center;
  height: 0.96rem;
  background: #fff;
  color: #333;
}
.changes {
  border-left: 0.026667rem solid #f4578b;
  background-color: #efeff4;
}
.changes .mint-cell-value {
  color: #f4578b;
}
.classify-main {
  background-color: #efeff4;
}
.clearfix::after {
  content: "";
  clear: both;
  display: block;
  overflow: hidden;
  visibility: hidden;
  height: 0;
}
</style>