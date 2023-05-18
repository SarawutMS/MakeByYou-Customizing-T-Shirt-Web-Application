import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/store-dowload",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "table-users",
        name: "Users",
        component: () => import("@/pages/Tables.vue")
      },
      {
        path: "table-orders",
        name: "Orders",
        component: () => import("@/pages/Tables.vue")
      },
      {
        path: "table-bills",
        name: "Bills",
        component: () => import("@/pages/Tables.vue")
      },
      {
        path: "table-shirts",
        name: "Shirts",
        component: () => import("@/pages/Tables.vue")
      },
      {
        path: "table-address",
        name: "Address",
        component: () => import("@/pages/Tables.vue")
      },
      {
        path: "table-payments",
        name: "Payments",
        component: () => import("@/pages/Tables.vue")
      },
      {
        path: "table-carts",
        name: "Carts",
        component: () => import("@/pages/Tables.vue")
      },

      {
        path: "store-dowload",
        name: "Shirts",
        component: () => import("@/pages/ShirtsStore.vue")
      },
      {
        path: "confirmPayments",
        name: "confirmpayments",
        component: () => import("@/pages/confirmPayments.vue")
      },

      {
        path: "wallet",
        name: "Wallet",
        component: () => import("@/pages/WalletManage.vue")
      },

      {
        path: "Img",
        name: "ImgManagement",
        component: () => import("@/pages/ImgManage.vue")
      },
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
