<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">Shopping Mall</div> </nav-bar>
   <home-swiper :banners="banners"></home-swiper>
   <recommend-view :recommends="recommends"/>
   <feature-view></feature-view>
   <tab-control class="tab-control"
                :titles="['Popular','New','Choice']"
                @tabClick="tabClick"

   />
   <goods-list :goods="showGoods"></goods-list>
 </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/view/home/childrenComponent/HomeSwiper";
import RecommendView from "@/view/home/childrenComponent/RecommendView";
import FeatureView from "@/view/home/childrenComponent/FeatureView";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import {getHomeMultidata,getHomeGoods} from '@/network/home'


export default {
  name: "Home",
  components: {
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
      currentType : 'pop'
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
    }


  }


}
</script>

<style scoped>
#home{
  padding-top: 44px;
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

</style>
