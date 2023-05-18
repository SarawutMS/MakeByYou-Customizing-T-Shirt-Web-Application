<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <div class="text-white text-center mt-2" style="">Tables</div>
        <hr style="border-color: azure; width: 85%" />
        <sidebar-link
          to="/table-users"
          :name="$t('sidebar.tableUsers')"
          icon="tim-icons icon-single-02"
        />
        <sidebar-link
          to="/table-orders"
          :name="$t('sidebar.tableOrders')"
          icon="tim-icons icon-notes"
        />
        <sidebar-link
          to="/table-shirts"
          :name="$t('sidebar.tableShirts')"
          icon="tim-icons icon-bag-16"
        />

        <sidebar-link
          to="/table-address"
          :name="$t('sidebar.tableAddress')"
          icon="tim-icons icon-paper"
        />
        <sidebar-link
          to="/table-carts"
          :name="$t('sidebar.tableCarts')"
          icon="tim-icons icon-paper"
        />
        <sidebar-link
          to="/table-payments"
          :name="$t('sidebar.tablePayments')"
          icon="tim-icons icon-paper"
        />
        <div class="text-white text-center mt-5" style=""><hr style="border-color: azure; width: 85%" />Manage Verify</div>
        <hr style="border-color: azure; width: 85%" />
        <sidebar-link to="/Img" :name="$t('sidebar.image')" icon="tim-icons icon-paper" />

        <sidebar-link
          to="/confirmPayments"
          :name="$t('sidebar.confirmPayments')"
          icon="tim-icons icon-paper"
        />
        <sidebar-link
          to="/store-dowload"
          :name="$t('sidebar.ShirtsStore')"
          icon="tim-icons icon-paper"
        />
        <sidebar-link
          to="/wallet"
          :name="$t('sidebar.Wallet')"
          icon="tim-icons icon-paper"
        />

        <!-- .
          <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-components" />
            <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02" />
        <sidebar-link to="/icons" :name="$t('sidebar.icons')" icon="tim-icons icon-atom" />

        <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10" />
        <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55" />
        <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center" />
        <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02" />
        <sidebar-link to="/maps" :name="$t('sidebar.maps')" icon="tim-icons icon-pin" />
        <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world" />
        <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55" />
   -->
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar @logout="LogOut"></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    LogOut(ev) {
      $cookies.remove("state");
      this.$emit("success");
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
