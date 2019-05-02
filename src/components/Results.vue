<template>
  <div>
      <Error v-bind:errorMessage="errorMessage" />
      <div>
          <a href="/"><button class="btn btn-outline-primary btn-lg">Home</button></a>
      </div>
      <Error v-bind:errorMessage="errorMessage" />
    <Map v-bind:coordinates="coordinates" v-bind:restaurantNames="restaurantNames" />
  </div>
</template>

<script>
  import Map from './views/Map';
  import Error from './views/Error';

  export default {
  name: 'Results',
    components: {
      Map,
        Error
    },
    props: {
      coordinates: Array,
        restaurantNames: Array
    },
    data() {
        return {
            errorMessage: ''
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button{
        margin: 12px;
    }
</style>
