<template>
    <div>
        <Error v-bind:errorMessage="errorMessage" />
        <div class="col-6 offset-5" v-bind:class="{ 'loader': this.loading, 'display': this.display }"></div>
        <div v-bind:class="{'hideContent': !this.display }">
            <!--<Results v-bind:coordinates="allCoordinates" v-bind:restaurantNames="restaurantNames" />-->
            <div class="navbar">
                <NavBar />
            </div>
            <div class="container" v-bind:key="" v-for="restaurant in restaurantData">
                <div class="col-md-6 offset-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{restaurant.name}}</h4>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p><b>Address:</b> {{restaurant.vicinity}}</p>
                                <p v-if="restaurant.opening_hours"><b>Opening Hours:</b> Open</p>
                                <p v-else-if="!restaurant.opening_hours"><b>Opening Hours:</b> Closed</p>
                                <p><b>Customer Ratings(5):</b> {{restaurant.rating}}</p>
                                <p><button class="btn btn-success" @click="toggleModal({lat: restaurant.geometry.location.lat, lng: restaurant.geometry.location.lng, name: restaurant.name})">View Map</button></p>
                            </blockquote>
                        </div>
                        <div class="card-footer">
                            <p class="mb-0"><b>Customer Ratings(5):</b> {{restaurant.rating}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MapModel v-if="showModal" v-on:toggleModal="toggleModal({lat: null, lng: null, name: null})" v-bind:lat="individualLat" v-bind:lng="individualLng" v-bind:restaurantName="individualName" />
    </div>
</template>

<script>
    import axios from 'axios';
    import Error from './views/Error';
    import NavBar from './views/NavBar';
    import MapModel from './views/MapModal';

    export default {
        name: "FetchNearByPlaces",
        components: {Error, MapModel, NavBar},
        props: ["latlng"],
        watch: {
          latlng: function () {
              if (this.latlng && this.latlng.length !== 0){
                  this.latlng.forEach((latlng)=>{
                      this.getNearByPlaces(latlng.lat, latlng.lng);
                  });
              }
          }
        },
        data(){
            return{
                individualLat: null,
                individualLng: null,
                individualName: null,
                loading: true,
                display: false,
                showModal: false,
                nearByRadius: 500,
                nearByURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
                type: 'restaurant',
                proxy: 'https://cors-anywhere.herokuapp.com/',
                key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
                restaurantData: [],
                errorMessage: ''
            }
        },
        methods: {
            getNearByPlaces(lat, lng){
                axios.get(`${this.proxy}${this.nearByURL}location=${lat},${lng}&radius=${this.nearByRadius}&type=${this.type}&key=${this.key}`)
                    .then((res)=>{
                        this.restaurantData  = res.data.results;
                        this.isLoading(this.restaurantData);
                        this.hideContent();
                    }).catch((err)=>{
                    if (err){
                        this.errorMessage = "A Network Error has Occured, Please Check your Internet Connection";
                        console.log(err);
                    }
                })
            },
            toggleModal(data){
                this.individualLat = data.lat;
                this.individualLng = data.lng;
                this.individualName = data.name;
                this.showModal = !this.showModal;
            },
            isLoading(restaurantDataArray){
                if (restaurantDataArray && restaurantDataArray.length !== 0){
                    this.loading = !this.loading;
                }
            },
            hideContent(){
                this.display = !this.display;
            }
        },
        mounted(){

        }
    }
</script>

<style scoped>
    .hideContent{
        display: none;
    }
    .card-footer, .card-header{
        background-color: #00C851;
        font-family: Roboto,sans-serif;
        color: white;
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

.card{
    margin-bottom: 15px;
}

    .navbar{
        padding: 30px;
    }

    .container{
        margin-top: 50px;
    }
</style>