<template>
  <div id="app">
    <header>
      <mt-search cancel-text="取消" placeholder="搜索"></mt-search>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <ul class="item">
        <a v-for="item in pages" :key="item.name" class="item-btn">
          <router-link :to="item.path" class="active">
            <li>
              <i class="iconfont" :class=" item.font"></i>
              <p class="footer-item-font-size">{{item.title}}</p>
            </li>
          </router-link>
        </a>
      </ul>
    </footer>
  </div>
</template>

<script>
  import Vue from "vue";
  import MintUI from "mint-ui";
  import "mint-ui/lib/style.css";
  import App from "./App.vue";
  import css from "./font/iconfont.css";
  import rem from "./rem/rem.js";

  Vue.use(MintUI);

  export default {
    name: "app",
    data() {
      return {
        pages: [{
            title: "首页",
            path: "/home",
            name: "Home",
            font: "icon-shouye"
          },
          {
            title: "分类",
            path: "/classify",
            name: "Classify",
            font: "icon-ziyuan"
          },
          {
            title: "购物车",
            path: "/cart",
            name: "Cart",
            font: "icon-gouwuche"
          },
          {
            title: "我的",
            path: "/mine",
            name: "Mine",
            font: "icon-wode"
          }
        ]
      };
    },
    components: {
      App
    }
  };
</script>

<style scope>
  a {
    text-decoration: none;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  #app {
    height: 100%;
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  /* 头部 */
  header {
    height: 1.066667rem;
  }

  /* 内容区 */
  main {
    flex: 1;
  }

  /* 底部四件套 */
  footer {
    height: 1.146667rem;
  }

  .item {
    width: 100%;
    display: flex;
  }

  .item .item-btn {
    height: 1.146667rem;
    display: flex;
    justify-content: center;
    width: 25%;
    padding-top: 0.133333rem;
    box-sizing: border-box;
  }

  .item .item-btn .iconfont {
    font-size: 0.506667rem;
    color: #101010;
  }

  .item .item-btn .active {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .item .item-btn .footer-item-font-size {
    color: #7c7e86;
    font-size: 0.24rem;
  }
</style>