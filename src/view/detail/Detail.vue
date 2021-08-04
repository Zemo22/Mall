<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :base-info="goods"></detail-base-info>
      <detail-shop-info :shop="shop" ref="shopInfo"></detail-shop-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"></detail-param-info>
      <detail-goods-info :detail-info="detailInfo" ></detail-goods-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    <detail-buttom-bar @addCart="addCart"></detail-buttom-bar>
  </div>
</template>

<script>

import DetailNavBar from "@/view/detail/childrenComponent/DetailNavBar";
import DetailSwiper from "@/view/detail/childrenComponent/DetailSwiper";
import DetailBaseInfo from "@/view/detail/childrenComponent/DetailBaseInfo";
import DetailShopInfo from "@/view/detail/childrenComponent/DetailShopInfo";
import DetailGoodsInfo from "@/view/detail/childrenComponent/DetailGoodsInfo";
import DetailParamInfo from "@/view/detail/childrenComponent/DetailParamInfo";
import DetailCommentInfo from "@/view/detail/childrenComponent/DetailCommentInfo";
import DetailButtomBar from "@/view/detail/childrenComponent/DetailButtomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {getDatail,Goods,Shop,ParamInfo,recommend} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    BackTop,
    DetailButtomBar,
    GoodsList,
    DetailCommentInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    Scroll,
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar},
  data(){
    return{
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      message: '',
      isShow: false
    }
  },
  methods: {
    titleClick(index){
      this.$refs.scroll.scrollTo(0,this.themeTopYs[index],100)
      // this.$refs.scroll.scrollToElement(this.$refs.shopInfo,100,false,false,{})
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
      const positionY = -position.y
      let length = this.themeTopYs.length
      // for (let i in this.titleTopY){
      //   if (positionY > this.titleTopY[i] && positionY < this.titleTopY[i+1]){
      //     console.log(i)
      //   }
      // }
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (this.currentIndex !== i &&
            ((positionY >= -this.themeTopYs[i] && positionY < -this.themeTopYs[i + 1]))) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

    },
    //Click event for back to top
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },
    addCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.iid = this.iid

      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {

      })
    }
  },
  created() {
    //1.get request query
    this.iid = this.$route.params.iid
    //2.get Product data
    getDatail(this.iid).then(res => {
      const data = res.result
      //1.get top images
      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      setTimeout(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(-this.$refs.commentInfo.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.paramInfo.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      },1000)
    })
    //3.get recommend data
    recommend().then(res => {
      this.recommend = res.data.list
    })
  },
  mounted() {

  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content{
  height: calc(100% - 44px);
}

.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>