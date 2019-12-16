<script>
import { VueMxSample } from "@/entry";
export default {
  name: "VueMxLibDev", // vue library dev component
  components: {
    VueMxSample
  }
};
</script>

<template>
  <div class="vue-mx-lib-dev">
    <vue-mx-sample></vue-mx-sample>
  </div>
</template>

<style scoped>
.vue-mx-lib-dev {
  display: block;
  width: 400px;
  margin: 25px auto;
}
</style>
