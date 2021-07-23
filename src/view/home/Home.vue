<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">Shopping Mall</div> </nav-bar>
   <home-swiper :banners="banners"></home-swiper>
   <recommend-view :recommends="recommends"/>
 </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/view/home/childrenComponent/HomeSwiper";
import RecommendView from "@/view/home/childrenComponent/RecommendView";
import {getHomeMultidata} from '@/network/home'


export default {
  name: "Home",
  components: {
    RecommendView,
    HomeSwiper,
    NavBar,

  },
  data(){
    return{
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }

}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}

</style>
