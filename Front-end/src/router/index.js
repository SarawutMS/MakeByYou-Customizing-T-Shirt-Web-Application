/*import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ //'../views/AboutView.vue')
//}
//]

//const router = createRouter({
// history: createWebHistory(process.env.BASE_URL),
// routes
//})

//export default router-->
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

import Create from "@/views/Create.vue";
import DesigtGallery from "@/views/DesigtGallery.vue"
import Profile from "@/views/Profile.vue";

import Orders_Selled from "@/views/Orders_Selled.vue";
import Login_ModalVue from "@/components/Login_Modal.vue";
import Register from "@/views/Register.vue"
import Payment_ModalVue from "@/components/Payment/Payment_Modal.vue";
import Edit from "@/components/Menu_bar/Edit_Modal.vue";
import ShirtsStore from "@/components/Shirts/ShirtsStore.vue";
import Customer_OrdersVue from "@/components/Payment/Customer_Orders.vue";
import ShirtsSelled from "@/views/ShirtsSelled.vue"
import ProfileStore from "@/views/ProfileStore.vue"
import ClipartSlort from "@/components/Create/ClipartSlort.vue"



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
     
    },
  },
  {
    path: "/orders_selled",
    name: "Orders_Selled",
    component: Orders_Selled,
    meta: {
      title: "Orders",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "สมัครสมาชิก",
    },
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,  
    meta: {
      title: "แก้ไข",
    },
  },
  {
    path: "/test",
    name: "test",
    component: ClipartSlort,
    meta: {
      title: "Test",
    
    },
  },

  {
    path: "/payment",
    name: "Payment",
    component: Payment_ModalVue,
    meta: {
      title: "Payment",
    },
  },
  {
    path: "/office/:_id?",
    name: "Office",
    component: ProfileStore,
    meta: {
      title: "Office",
    },
  },

  {
    path: "/login",
    name: "Login",
    component: Login_ModalVue,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/listpayment",
    name: "ListPayment",
    component: Customer_OrdersVue,
    meta: {
      title: "รอชำระเงิน",
    },
  },
  {
    path: "/store_shirts/:_id?",
    name: "ShirtsS",
    component: ShirtsStore,
    meta: {
      title: "สินค้า",
    },
  },
  {
    path: "/shirtsselled",
    name: "selled",
    component: ShirtsSelled,
    meta: {
      title: "สินค้าที่ถูกขาย",
    },
  },
  {
    path: '/profile/:_id?',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "Profile",
    }
  },






  {
    path: '/gallery',
    name: 'Gallery',
    component: DesigtGallery,
    meta: {
      title: "Gallery",
    },

  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      title: "Create",
    },

  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;

