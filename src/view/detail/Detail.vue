<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :base-info="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>

import DetailNavBar from "@/view/detail/childrenComponent/DetailNavBar";
import DetailSwiper from "@/view/detail/childrenComponent/DetailSwiper";
import DetailBaseInfo from "@/view/detail/childrenComponent/DetailBaseInfo";
import DetailShopInfo from "@/view/detail/childrenComponent/DetailShopInfo";
import DetailGoodsInfo from "@/view/detail/childrenComponent/DetailGoodsInfo";
import DetailParamInfo from "@/view/detail/childrenComponent/DetailParamInfo";

import Scroll from "@/components/common/scroll/Scroll";

import {getDatail,Goods,Shop,ParamInfo} from "@/network/detail";

export default {
  name: "Detail",
  components: {DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
  data(){
    return{
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  created() {
    //1.get request query
    this.iid = this.$route.params.iid
    //2.get Product data
    getDatail(this.iid).then(res => {
      const data = res.result
      console.log(res);
      //1.get top images
      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
    })
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