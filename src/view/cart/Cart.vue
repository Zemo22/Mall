<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">Shopping Cart({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar class="bottom"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/view/cart/childrenComponent/CartList";
import CartBottomBar from "@/view/cart/childrenComponent/CartButtomBar";

export default {
  name: "Cart",
  components: {CartBottomBar, CartList, NavBar},
  computed: {
    cartLength(){
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: white;
  z-index: 9;
}
.bottom{
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
