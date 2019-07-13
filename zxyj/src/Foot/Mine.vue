<template>
  <div>
    <div>我的</div>
    <div v-for="item in list" :key="item.skuId" @click="goto(item.skuId)">
      <div>{{item.skuName}}</div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    goto(skuId) {
      this.$router.push({ name: "Product", params: {skuId}});
      console.log("点了goto");
     
      
    }
  },
  async created() {
    
    let { data } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/product/sort/product/list?pageOffset=1&pageSize=15&json=%7B%22comprehensive%22:true,%22memberType%22:%221%22,%22parentCategoryId%22:%2297df670256ee4f0b8c9c580660c4f5c8%22%7D&version=1.0&terminal=3"
    );
    this.list = data.data.datas;
    console.log(this.list);
  }
};
</script>