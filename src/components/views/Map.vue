<template>
    <div>
        <Error v-bind:errorMessage="errorMessage" />
            <div class="col-6 offset-5" v-bind:class="{ 'loader': this.loading }"></div>
            <div id="map" v-bind:class=""></div>
    </div>
</template>

<script>
    import Error from './Error';

    export default {
        name: 'Map',
        components: {Error},
        props: {
            coordinates: Array,
            restaurantNames: Array
        },
        watch: {
            coordinates: function(){
                this.loadSpinner();
                this.showMultipleMarkers();
            }
        },
        data() {
            return {
                marker: [],
                map: null,
                myLatLng: {},
                bounds: null,
                infoWindow: null,
                loading: true,
                errorMessage: ''
            }
        },
        methods: {
            loadSpinner(){
                if (this.coordinates && this.coordinates.length !== 0){
                    this.loading = false;
                }
            },
            showMultipleMarkers(){
                let restaurantNames = this.restaurantNames;
                this.infoWindow = new google.maps.InfoWindow();

                this.coordinates.forEach((coordinate, i)=>{
                    let latLng = new google.maps.LatLng(coordinate.lat, coordinate.lng);
                    this.marker = new google.maps.Marker({
                        position: latLng,
                        map: this.map,
                        title: 'Click for info'
                    });

                    this.showInfoWindow(restaurantNames, i, this.infoWindow);
                });

                this.setMapBounds();
                this.map.setZoom(14);
            },
            setMapBounds(){
                this.bounds = new google.maps.LatLngBounds();
                this.bounds.extend(this.marker.position);
                this.map.fitBounds(this.bounds);
            },
            showInfoWindow(restaurantNames, i, infoWindow){
                google.maps.event.addListener(this.marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(restaurantNames[i]);
                        infoWindow.open(this.map, marker);
                    }
                })(this.marker, i));
            },
            initializeMap(){
                // Lagos
                this.myLatLng = {lat: 6.45407, lng: 3.39467};

                this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 5,
                    center: this.myLatLng
                });
            }
        },
        mounted() {
            this.initializeMap();
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

    .loader {
        margin-top: 200px;
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
