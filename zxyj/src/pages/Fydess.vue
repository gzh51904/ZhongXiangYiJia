<template>
<div  class="desscase">
    <!-- <div >{{de}}</div> -->
        <div class="desshead">
            <div class="dessheader">
                <div class="deleft">
                <div class="btn-back"></div>
                </div>
                 <div class="detitle">
                     <span>{{detitle}}</span>
                     <i></i>
                 </div>
            </div>
            <div class="desschange">
                <section>
                    <ul>
                        <li>
                            <dl>
                                <dd>综合</dd>
                                <dd>热度</dd>
                                <dd @click="changeh()">价格</dd>
                                <dd>筛选</dd>
                            </dl>
                        </li>
                        <li>111</li>
                    </ul>
                </section>

            </div>
      </div>
    <div>
    <div v-for="dess in desslist" :key="dess.productId" class="demsg">
        <div class="dessleft">
             <img :src="dess.thumbUrl" >
             </div>
       
          <div class="dessright">
              <div class="desstitle">{{dess.skuName}}</div>
              <div class="dessprice">{{((dess.retailPrice)/100).toFixed(2)}}<span class="old">{{((dess.marketPrice)/100).toFixed(2)}}</span></div>
              <div>
                  <span class="li">立省￥{{((dess.marketPrice-dess.retailPrice)/100).toFixed(2)}}</span>
              </div>
              <div class="desssix" >
                    <span  v-for="tag in (dess.tags)" :key="tag.tagName" :class="tag.tagName=='自营'?'tag':'tags'">{{tag.tagName}}</span>
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
            //跳转后页面标题默认为空，传参由一开始就请求
            detitle:"",
             desslist: [],
            bj:""
        }
    },
   methods: {
       //价格从低到高排序
     async  changeh(){
            this.bj=false;
            //获取传入id及标题名字
        let {categoryId,categoryName}=this.$route.params;
        console.log("id",categoryId);
        //把请求来的标题名字赋值给当前标题
        this.detitle=categoryName;
         let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/product/sort/product/list?pageOffset=1&pageSize=15&json=%7B%22comprehensive%22:true,%22parentCategoryId%22:%22"+categoryId+"%22,%22memberType%22:0%7D&version=1.0&terminal=3")
            console.log("da",data);
            this.desslist=data.data.datas;
            function creatCompare(propertyName) {
        return function (obj1,obj2) {
            var value1=obj1[propertyName];
            var value2=obj2[propertyName];
            // console.log(obj1)
            if(value1<value2){
                return -1
            }else if(value1>value2){
                return 1
            }else {
                return 0
            }
        }
    }
       this.desslist.sort(creatCompare("retailPrice"))
            // sort(this.desslist,'retailPrice')
      },

   },
 async created() {
      
        //获取传入id及标题名字
        let {categoryId,categoryName}=this.$route.params;
        console.log("id",categoryId);
        //把请求来的标题名字赋值给当前标题
        this.detitle=categoryName;
              console.log("rr",this.$route);   
        //发起请求，获取商品信息，渲染页面
        let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/product/sort/product/list?pageOffset=1&pageSize=15&json=%7B%22comprehensive%22:true,%22parentCategoryId%22:%22"+categoryId+"%22,%22memberType%22:0%7D&version=1.0&terminal=3")
                // console.log("data",data.data.datas);
             this.desslist=data.data.datas;  
             console.log("dess",this.desslist);
    },
}
</script>

<style>
.desscase{
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    
}
.desshead{

    /* position: fixed; */
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
}
.dessheader{
    position: relative;
    line-height: 45px;
    height: 45px;
    background-image: linear-gradient(0deg,#e5e5e5,#e5e5e5 50%,transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
    background-origin: border-box;
    text-align: center;
    background-color: #fff;
    color: #000;
}
.deleft{
    display: inline-block;
    width: 44px;
    height: 44px;
    left: 0;
    position: absolute;
    top: 0;
    bottom: 0;
}
.btn-back{
    display: inline-block;
    width: 44px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url(../img/icon-back-black.png);
    background-size: 8px 14px;
    background-position: 50%;
}
.detitle{
    font-size: 18px;
}
/* 四个选项 */
.desschange section{
    width: 100%;
    height: 35px;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
}
.desschange section ul{
    height: 100%;
    display: flex;
    position: relative;
}
.desschange section>ul>li{
    justify-content: center;
    align-self: center;
    display: flex;
    position: relative;

}
.desschange section>ul>li:first-child {
    width: 85%;
}
.desschange section>ul>li:first-child>dl{
    width: 100%;
    height: 100%;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
}
.desschange section>ul>li:first-child>dl>dd {
    width: 50px;
    height: 30px;
    line-height: 30px;
    -ms-flex-item-align: center;
    align-self: center;
    text-align: center;
}
.esschange section>ul>li:last-child {
    width: 15%;
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
.desssix .tag{
    margin: 2px 3px 0 0;
    border: 1px solid #f51861;
    color: #f51861;
    font-size: 12px;
    padding: 0 2px;
        height: 16px;
    line-height: 16px;
    display: -ms-inline-flexbox;
    display: inline-flex;
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
