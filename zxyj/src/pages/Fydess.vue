<template>
<div  class="desscase">
    <!-- <div >{{de}}</div> -->
    <div>
    <div v-for="dess in desslist" :key="dess.productId" class="demsg">
        <div class="dessleft">
             <img :src="dess.thumbUrl" >
             </div>
       
          <div class="dessright">
              <div class="desstitle">{{dess.skuName}}</div>
              <div class="dessprice">{{((dess.retailPrice)/100).toFixed(2)}}<span class="old">{{((dess.marketPrice)/100).toFixed(2)}}</span></div>
              <div>
                  <span class="li">立省$41.00</span>
              </div>
              <div class="desssix" >
                    <span class="tags" v-for="tag in (dess.tags)" :key="tag.tagName">{{tag.tagName}}</span>
              </div>
              </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
    data(){
        return{
            de:"dasdsadsa",
             desslist: [],
        }
    },
 async created() {
      
        //获取传入id
        let {categoryId}=this.$route.params;
        console.log("id",categoryId);
        
              console.log("rr",this.$route);   
        //发起请求，获取商品信息，渲染页面
        let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/product/sort/product/list?pageOffset=1&pageSize=15&json=%7B%22comprehensive%22:true,%22parentCategoryId%22:%22"+categoryId+"%22,%22memberType%22:0%7D&version=1.0&terminal=3")
                // console.log("data",data.data.datas);
             this.desslist=data.data.datas;
             console.log("dess",this.desslist);
            //   console.log("tags",(this.desslist).tags);
        
    },
}
</script>

<style>
.desscase{
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}
.demsg{
    display: flex;
    flex-direction: row;
    position: relative;
}
.dessleft{
    flex-direction: row;
    position: relative;
    margin-top: 10px;
    width: 130px;
    height: 130px;
    display: block;
}
.dessleft img{
    width: 100%;
    height: 100%;
}
.dessright{
        flex: 1;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 8px 15px 8px 10px;
}
.desstitle{
    line-height: 20px;
    font-size: 15px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 40px;
}
.dessprice{
        width: 100%;
    font-size: 16px;
    line-height: 20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: center;
    align-self: center;
    -ms-flex-pack: start;
    justify-content: flex-start;
    color: #f51861;
}
.dessprice::before{
    content: "￥";
    width: 12px;
}
.dessprice .old{
        text-decoration: line-through;
         margin-left: 10px;
        line-height: 14px;
        font-size: 10px;
            color: #999;
}
.dessprice .old::before{
    content: "￥"
    
}
.dessright .li{
    padding-left: 5px;
    color: #39c8de;
    font-size:12px;
    padding: 1px 2px;
    border: 1px solid;
}
.desssix{
        color: #f51861;
    font-size: 12px;
}
.desssix .tags{
        margin: 5px 3px 0 0;
        background: #f51861;
    padding: 1px 5px;
    color: #fff;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
</style>
