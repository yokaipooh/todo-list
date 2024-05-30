<template>
  <div id="app">
    <Header />
    <Home />
  </div>
</template>

<script>
import Header from "./components/AppHeader.vue";
import Home from "./views/HomeView.vue";

export default {
  name: "App",
  components: { Header, Home },
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
