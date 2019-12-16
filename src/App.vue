<template>
  <div id="app">
    123
    <!-- <VueMxSample /> -->
    <vmx-alert></vmx-alert>
    <p>
      Lorem, ipsum.
    </p>
  </div>
</template>

<script>
// import { VueMxSample } from "@/entry";

import { vmxAlert } from "@/entry";

export default {
  name: "app",
  components: {
    vmxAlert
    // VueMxSample
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
