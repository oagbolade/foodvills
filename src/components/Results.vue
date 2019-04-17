<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="updateMarker()">Change marker</button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    msg: String
  },
    data() {
        return {
            marker: [],
            map: null,
            myLatLng: {}
        }
    },
    methods: {
      updateMarker(){
          this.myLatLng = {lat: 39.9042, lng: 116.4074};
          this.showMarker();
          this.setMapPosition();
      },
        showMarker(){
            this.marker = new google.maps.Marker({
                position: this.myLatLng,
                map: this.map,
                title: 'Hello World!'
            });
        },

        setMap(){
            this.marker.setMap(this.map);
        }
    },
    mounted() {
        this.myLatLng = {lat: -25.363, lng: 131.044};

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: this.myLatLng
        });

        this.showMarker();

        this.setMap();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map {
    height: 400px;
    width: 100%;
    background-color: grey;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
