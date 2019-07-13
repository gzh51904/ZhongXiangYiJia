<template>
<div  class="desscase">
    <!-- <div >{{de}}</div> -->
        <div class="desshead">
            <div class="dessheader">
                <div class="deleft">
                <div class="btn-back" @click="goback()"></div>
                </div>
                 <div class="detitle">
                     <span>{{detitle}}</span>
                     <i></i>
                 </div>
            </div>
            <div class="desschange">
                <section>
                    <ul class="sect">
                        <li>
                            <dl>
                                <dd >
                                     <Dropdown trigger="click" style="margin-left: 20px">
                                     <a href="javascript:void(0)">
                                     综合
                                    <Icon type="ios-arrow-down"></Icon>
                                            </a>
                                    <DropdownMenu slot="list">
                                    <DropdownItem>驴打滚</DropdownItem>
                                    <DropdownItem>炸酱面</DropdownItem>
                                    <DropdownItem>豆汁儿</DropdownItem>
                                    <DropdownItem>冰糖葫芦</DropdownItem>
                                    <DropdownItem>北京烤鸭</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                </dd>
                                <dd @click="hot()">热度</dd>
                                <dd @click="changeh()">价格</dd>
                                <dd @click="tank()">筛选
                                    <Drawer title="Basic Drawer" :closable="false" v-model="aler">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
                                </dd>
                            </dl>
                        </li>
                        <li @click="changecss()">切换</li>
                    </ul>
                </section>
          <nav>
              <ul>
                  <li @click="zyd()">自营店</li>
              </ul>
          </nav>
            </div>
      </div>
       <!-- 第一套css样式 -->
    <div class="fir" v-show="show"  >
    <div v-for="dess in desslist" :key="dess.productId" class="demsg" @click="gotogooditem(dess.productId,dess.skuId)">
        <div class="dessleft">
             <img :src="dess.thumbUrl" >
             </div>
       
          <div class="dessright" >
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
   <!-- 第二套css样式 -->
   <div class="fir sec" v-show="!show">
    <div class="fyitem" v-for="dess in desslist" :key="dess.productId">
        <div class="itemmsg">
            <div class="itemmsg-des">
           
                    <img :src="dess.thumbUrl" class="desimg">
                <div class="itemmsg-title">{{dess.skuName}}</div>
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
</div>
</template>


<script>
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import { Popup } from 'mint-ui';
import Vue from 'vue'
Vue.component(Popup.name, Popup);
export default {
    data(){
        return{
            //跳转后页面标题默认为空，传参由一开始就请求
            detitle:"",
            parentId:"",
             desslist: [],
              desslist1: [],
            bj:"",
            num:1,
            show:true,
            aler:false,
            zy:true
        }
    },
   methods: {
       //筛选自营店方法
       zyd(){
           console.log("lll",this.desslist.length);
           
            this.zy=!this.zy;
            console.log(this.zy);
            
           console.log("66666");
    let  gozyd = this.desslist.filter(item=>{
        console.log("wasdsadsa");
                  if(item.tags[0].tagName=="自营"){
                      return item
                  }
              })
              this.desslist= this.zy ?this.desslist1:gozyd;
              //请看created里面的请求
              console.log("true",this.desslist1);
       
              
       },
       //2.热度方法
     async  hot(){
            function creatCompare(propertyName) {
        return function (obj1,obj2) {
            var value1=obj1[propertyName];
            var value2=obj2[propertyName];
            // console.log(obj1)
            if(value1<value2){
                return 1
            }else if(value1>value2){
                return -1
            }else {
                return 0
            }
        }
    }
    //sort进行排序
       this.desslist.sort(creatCompare("saleCount"))

       },
       //4.筛选
       tank(){
            this.aler=!this.aler
       },
       //3.价格进行排序
     async  changeh(){
            this.bj=false;
            this.num=(this.num)*-1;
            //获取传入id及标题名字
        // let {categoryId,categoryName,parentId}=this.$route.params;
        // console.log("id",categoryId);
        // // //赋值给返回箭头，这里要不要无所谓
        // //  this.parentId=parentId;
        //请求要不要无所谓
        //  let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/product/sort/product/list?pageOffset=1&pageSize=15&json=%7B%22comprehensive%22:true,%22parentCategoryId%22:%22"+categoryId+"%22,%22memberType%22:0%7D&version=1.0&terminal=3")
        //     console.log("da",data);
        //     this.desslist=data.data.datas;
             let  num1=this.num;
            function creatCompare(propertyName) {
        return function (obj1,obj2) {
            var value1=obj1[propertyName];
            var value2=obj2[propertyName];
            // console.log(obj1)
            if(value1<value2){
                return (num1*-1)
            }else if(value1>value2){
                return (num1*1)
            }else {
                return 0
            }
        }
    }
    //sort进行排序
       this.desslist.sort(creatCompare("retailPrice"))
      },
      //5.点击切换的时候，两套css来回切换
      changecss(){
            this.show=!this.show;
      },
      //点击返回箭头，返回到商品分类
      goback(parentId){
       this.$router.push({name:'Classify',path:"/classify/"+parentId})
        // this.$router.back(-1)
      },
      //跳转详情页方法，直接解开即可
      //在32行代码处加上@click="gotoproduct(dess.productId)"即可，然后到详情页组件进行接收
      gotogooditem(productId,skuId){
            this.$router.push({name:"Gooditem",params:{productId,skuId}})
            console.log("6",this.$route);
            
      }

   },
 async created() {
                console.log("rrrrrr",this.$route);
                
        //获取传入id及标题名字
        let {categoryId,categoryName}=this.$route.params;
        console.log("id",categoryId);
        //把请求来的标题名字赋值给当前标题
        this.detitle=categoryName;
            
        //发起请求，获取商品信息，渲染页面
        let {data}=await this.$axios.get("https://api.zxyjsc.com/flyapi/product/sort/product/list?pageOffset=1&pageSize=15&json=%7B%22comprehensive%22:true,%22parentCategoryId%22:%22"+categoryId+"%22,%22memberType%22:0%7D&version=1.0&terminal=3")
            this.desslist=data.data.datas;   
            //多配置一套是为了筛选自营店方法
            this.desslist1=data.data.datas; 
        console.log("dess",this.desslist);
    },
    
}

</script>

<style>
/* 弹框css */
.mint-popup {
    width: 80%;
    height: 100%;
    transition: 0.5s ease-out;
}
/* ------ */
.fir{
    /* margin-top: 90px; */
     margin-top:3.066667rem;
}
.desscase{
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    
}
.desshead{

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
}

.dessheader{
    position: relative;
    line-height: 1.2rem;
    height: 1.2rem;
    background-image: linear-gradient(0deg,#e5e5e5,#e5e5e5 50%,transparent 0);
    background-size: 100% .026667rem;
    background-repeat: no-repeat;
    background-position: bottom;
    background-origin: border-box;
    text-align: center;
    background-color: #fff;
    color: #000;
}
.deleft{
    display: inline-block;
    width: 1.173333rem;
    height: 1.173333rem;
    left: 0;
    position: absolute;
    top: 0;
    bottom: 0;
}
.btn-back{
    display: inline-block;
    width:1.173333rem;
    height: 1.173333rem;
    background-repeat: no-repeat;
    background-image: url(../img/icon-back-black.png);
    background-size: .213333rem .373333rem;
    background-position: 50%;
}
.detitle{
    font-size: 18px;
}
/* 四个选项 */
.desschange section{
    width: 100%;
    height:42px;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
}
.desschange section .sect{
    height: 100%;
    display: flex;
    position: relative;
}
.desschange section>.sect>li{
    justify-content: center;
    align-self: center;
    display: flex;
    position: relative;
    font-size: .373333rem;

}
.desschange section>.sect>li:first-child {
    width: 85%;
}
.desschange section>.sect>li:first-child>dl{
    width: 100%;
    height: 100%;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
}
.desschange section>.sect>li:first-child>dl>dd {
    height: .8rem;
    line-height: .8rem;
    -ms-flex-item-align: center;
    align-self: center;
    text-align: center;
}
.desschange section>.sect>li:last-child {
    width: 15%;
}
.desschange nav{
     width: 100%;
    display: flex;
     height: 40px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
}
.desschange nav ul{
        height: 100%;
            width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.desschange nav ul li{
        height: 20px;
    background: #f1f2f6;
    color: #48474c;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size:14px;
    margin-left: 10px;
    padding: 1px 3px;
    display: flex;
    -ms-flex-item-align: center;
    align-self: center;
}
.desschange nav ul li .bred{
        background: #fff;
    border: .1rem solid #eb3f3f;
    color: #eb3f3f;
}
.demsg{
    display: flex;
    flex-direction: row;
    position: relative;
    background-color: white;
        margin-bottom: .266667rem;
}
.dessleft{
    flex-direction: row;
    position: relative;
    margin-top: .266667rem;
    width: 3.466667rem;
    height:  3.466667rem;
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
    padding: .213333rem .4rem .213333rem .266667rem;
}
.desstitle{
    line-height: .533333rem;
    font-size: .4rem;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 1.066667rem;
}
.dessprice{
        width: 100%;
    font-size: .426667rem;
    line-height: .533333rem;
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
    width: .32rem;
}
.dessprice .old{
        text-decoration: line-through;
         margin-left: .266667rem;
        line-height: .373333rem;
        font-size: .266667rem;
            color: #999;
}
.dessprice .old::before{
    content: "￥"
    
}
 .li{
    padding-left: .133333rem;
    color: #39c8de;
    font-size:.32rem;
    padding: .026667rem .053333rem;
    border: .026667rem solid;
}
.desssix{
        color: #f51861;
    font-size: .32rem;
}
.desssix .tag{
    margin: .053333rem .08rem 0 0;
    border: .026667rem solid #f51861;
    color: #f51861;
    font-size: .32rem;
    padding: 0 .053333rem;
        height: .426667rem;
    line-height: .426667rem;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
.desssix .tags{
    margin: .133333rem .08rem 0 0;
    background: #f51861;
    padding: .026667rem .133333rem;
    color: #fff;
    font-size: .32rem;
    height: .426667rem;
    line-height: .426667rem;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
/* 第二套版式样式 */
.sec{
 display: flex;
  flex-direction: row;
  flex-wrap: wrap;
    -ms-flex-direction: row;
    -ms-flex-wrap: wrap;
    padding: 0 .033333rem;
    zoom: 1;
}
.fyitem{
   
   flex: 1;
    max-width: 50%;
    min-width: 50%;
    float: left;
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    padding: 0 .033333rem;
    box-sizing: border-box;
    background: none;
        margin-bottom: 8px;
    
}
.fyitem .itemmsg{
    
}
.itemmsg-des{
    background: #fff;
    position: relative;
    padding-bottom: 8px;
}
.itemmsg img{
    width: 100%;
    height: 5.32rem;
    display: block;
}
.itemmsg-title{
        line-height: .533333rem;
    word-break: break-all;
    font-size: .373333rem;
    padding: .08rem .4rem .08rem .133333rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 1.04rem;
}
/* 综合组件的css */
/* .ivu-select-dropdown{
    left: 0px;
        width: 200%;
    text-align: left;
} */

</style>
