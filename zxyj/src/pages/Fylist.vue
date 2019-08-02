<template>
    <div ></div>
</template>
<script>
export default {
    data(){
        return{
            cartlist:[]
        }
    },
   async created() {
        let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/category/child?parentCategoryId=cd22b005da5f4f3785af45f8729e01fc&version=1.0&terminal=3")
         
            
   },

}
</script>