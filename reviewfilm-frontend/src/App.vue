<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: { 
    AppHeader,
    AppFooter,
  },
};
</script>
<template>
  <div id="app" class="bg-light"> 
    <AppHeader /> 
    <div class="container"> 
      <router-view /> 
    </div> 
    <AppFooter />
  </div>
  <div class="fixed-bottom text-right m-5"><a href="#"><button class="btn btn-primary"><i class="fa-regular fa-square-caret-up"></i></button></a></div>
</template>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}

</style>
