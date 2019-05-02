<template>
    <div>
        <Error v-bind:errorMessage="errorMessage" />
        <Results v-bind:coordinates="allCoordinates" v-bind:restaurantNames="restaurantNames" />
        <div v-bind:key="" v-for="restaurant in restaurantData">
            <div class="col-6 offset-3">
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
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Results from "./Results";
    import Error from './views/Error';

    export default {
        name: "FetchNearByPlaces",
        components: {Results, Error},
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
                nearByRadius: 500,
                nearByURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
                type: 'restaurant',
                proxy: 'https://cors-anywhere.herokuapp.com/',
                key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
                loading: false,
                restaurantData: [],
                restaurantNames: [],
                allCoordinates: [],
                errorMessage: ''
            }
        },
        methods: {
            getNearByPlaces(lat, lng){
                axios.get(`${this.proxy}${this.nearByURL}location=${lat},${lng}&radius=${this.nearByRadius}&type=${this.type}&key=${this.key}`)
                    .then((res)=>{
                        let result = res.data.results;
                        this.restaurantData = result;
                        for (let i = 0; i < result.length; i++){
                            let names = result[i].name;
                            let coordinates = result[i].geometry.location;
                            this.allCoordinates.push(coordinates);
                            this.restaurantNames.push(names);
                        }
                    }).catch((err)=>{
                    if (err){
                        this.errorMessage = "A Network Error has Occured, Please Check your Internet Connection";
                        console.log(err);
                    }
                })
            }
        }
    }
</script>

<style scoped>
.card{
    margin-bottom: 15px;
    margin-top: 10px;
}
</style>