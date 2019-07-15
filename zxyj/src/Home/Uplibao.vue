<template>
  <div v-html="html"></div>
</template>
<script>
export default {
  data() {
    return {
      html: [],
    };
  },
  async created() {
    let { target } = this.$route.params;
    let hash = target.split("=")[1];
    let { data } = await this.$axios.get(
      "https://api.zxyjsc.com/flyapi/pageConfig/html/get?version=1.0&terminal=3&pageId=" +
        hash
    );
    
    // console.log(target);
    // console.log(data);

    this.html = data.data.config;
  }
};
</script>
<style scoped>
</style>
