<template>
    <div class="detailBox">1111</div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
  async  created() {
        let {productId}=this.$route.params;
        console.log("idddd",productId);
        
        let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/product/spuDetail?spuId="+productId+"&version=3.0&terminal=3")

        console.log("msg",data);
        
    },
}
</script>
<style>

</style>
