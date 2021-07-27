import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from "vue-router";

Vue.use(VueRouter)

const Home = () => import('../view/home/Home')
const Category = () => import('../view/category/Category')
const Cart = () => import('../view/cart/Cart')
const Profile = () => import('../view/profile/Profile')
const Detail = () => import('../view/detail/Detail')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new Router({
  routes,
  mode:"history"
})

export default router