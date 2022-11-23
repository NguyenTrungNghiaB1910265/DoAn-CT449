<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: { 
    AppHeader, 
  },
};
</script>
<template>
  <div id="app" class="bg-light"> 
    <AppHeader /> 
    <div class="container"> 
      <router-view /> 
    </div> 
  </div>
</template>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}

</style>
