<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">Shopping Mall</div> </nav-bar>
   <tab-control ref="tabControl1"
                :titles="['Popular','New','Choice']"
                @tabClick="tabClick"
                class="tab-control"
                v-show="isTapFixed"
   />
   <scroll class="content" ref="scroll"
           :probe-type="3" @scroll="contentScroll"
           :pull-up-load="true" @pullingUp="loadMore"
   >
     <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"/>
     <feature-view></feature-view>
     <tab-control ref="tabControl"
                  :titles="['Popular','New','Choice']"
                  @tabClick="tabClick"

     />
     <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <back-top @click.native="backClick" v-show="isBackToTop"></back-top>
 </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/view/home/childrenComponent/HomeSwiper";
import RecommendView from "@/view/home/childrenComponent/RecommendView";
import FeatureView from "@/view/home/childrenComponent/FeatureView";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from '@/network/home'


export default {
  name: "Home",
  components: {
    BackTop,
    Scroll,
    GoodsList,
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar,

  },
  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
      },
      currentType: 'pop',
      isBackToTop: false,
      tabOffsetTop: 0,
      isTapFixed: false,
      saveY: 0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },

  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,10)
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {

    // 1.request multidata
    this.getHomeMultidata()

    //2. request goods data

  },
  mounted() {
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {

    /**
     *Click Event
     */

    //Click event on Tab Control
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },

    //Click event for back to top
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },

    contentScroll(position){
      //Judge  for back top button is showed
      this.isBackToTop = -(position.y) > 1000

      // Judge for Tap fixed(positon: fiixed)
      this.isTapFixed = -(position.y) > this.tabOffsetTop
    },

    //Pull up event for loading more
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh();
    },

    //Event for OffestTop
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    /**
     * Network Request
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1;
      getHomeGoods(type,page).then( res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
      })
      this.$refs.scroll.finishPullUp()
    }


  }


}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}


/*.content{*/
/*  height: calc(100% - 93px);*/
/*  !*margin-top: 43px;*!*/
/*}*/

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9;
}

</style>
