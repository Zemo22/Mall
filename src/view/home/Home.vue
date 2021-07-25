<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">Shopping Mall</div> </nav-bar>
   <scroll class="content" ref="scroll"
           :probe-type="3" @scroll="contentScroll"
           :pull-up-load="true" @pullingUp="loadMore"
   >
     <home-swiper :banners="banners"></home-swiper>
     <recommend-view :recommends="recommends"/>
     <feature-view></feature-view>
     <tab-control class="tab-control"
                  :titles="['Popular','New','Choice']"
                  @tabClick="tabClick"

     />
     <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <back-top @click.native="backClick" v-show="isBackToTOp"></back-top>
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
      isBackToTOp: false,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }

  },
  created() {

    // 1.request multidata
    this.getHomeMultidata()

    //2. request goods data
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
    },

    //Click event for back to top
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },

    //Show event for back top button
    contentScroll(position){
      this.isBackToTOp = -(position.y) > 1000
    },

    //Pull up event for loading more
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh();
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
  padding-top: 44px;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
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

</style>
