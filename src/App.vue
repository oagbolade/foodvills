<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/views/Home';
import Results from './components/Results';

export default {
  name: 'app',
  components: {
    Home,
      Results
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
