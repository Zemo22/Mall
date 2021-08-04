<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList"
                 :item-info="item" :key="index"/>
    </scroll>

  </div>
</template>

<script>

import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/view/cart/childrenComponent/CartListItem";

export default {
  name: "CartList",
  components: {CartListItem, Scroll},
  computed: {
    cartList(){
      return this.$store.state.cartList
    }
  }
}
</script>

<style scoped>
.cart-list{
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}

</style>