<template>
  <AppHeader></AppHeader>
  
  <router-view></router-view>

  <AppFooter></AppFooter>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppHeader,AppFooter
  },
};
</script>
<style></style>
