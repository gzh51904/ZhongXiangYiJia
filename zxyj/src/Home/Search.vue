<template>
  <div>
    <Searchs />
    <div id="Search">
      <div class="search-title">热门搜索</div>
      <div
        class="search-keyWord"
        v-for="(item, index) in text"
        :key="index"
        @click="gotolist(item.keyWord)"
      >{{item.keyWord}}</div>
    </div>
  </div>
</template>
<script>
import Searchs from "../Home/Component.vue";
export default {
  data() {
    return {
      text: []
    };
  },
  components: {
    Searchs
  },
  async created() {
    let { data } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/product/getKeyWordList?version=1.0&terminal=3"
    );
    this.text = data.data;
  },
  methods: {
    //   已夭折
    gotolist(text) {
      let data = this.$axios.get(
        "https://api.zxyjsc.com/flyapi/product/sort/product/list",
        {
          params: {
            pageOffset: 1,
            pageSize: 15,
            json: {
              comprehensive: true,
              keyword: text,
              memberType: 0
            },
            version: 1.0,
            terminal: 3
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    }
  }
};
</script>
<style scoped>
#Search {
  padding: 0 0.32rem 0 0.32rem;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.search-title {
  margin-top: 1.066667rem;
  font-size: 0.346667rem;
  margin-bottom: 0.266667rem;
}
.search-keyWord {
  padding: 0 0.266667rem;
  line-height: 0.666667rem;
  color: #333;
  border-radius: 4px;
  text-align: center;
  height: 0.666667rem;
  background: #efeff4;
  float: left;
  margin: 0 0.266667rem 0.266667rem 0;
}
</style>
