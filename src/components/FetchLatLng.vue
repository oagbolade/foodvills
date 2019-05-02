<template>
    <div>
        <Error v-bind:errorMessage="errorMessage" />
        <div class="container-fluid" v-bind:class="{'main': this.errorMessage}">
            <NearByPlaces v-bind:latlng="latlngArray" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import NearByPlaces from './FetchNearByPlaces';
    import Error from './views/Error';

    export default {
        name: "FetchLatLng",
        components: {
            Error,
          NearByPlaces
        },
        data(){
            return{
                url: 'https://maps.googleapis.com/maps/api/geocode/json?',
                type: 'restaurant',
                proxy: 'https://cors-anywhere.herokuapp.com/',
                key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
                inputtype: 'textquery',
                address: '',
                fields: 'photos,formatted_address,name,rating,opening_hours,geometry',
                latlngArray: [],
                loading: false,
                errorMessage: ''
            }
        },
        methods: {
            // Google Places Api handles this, be sure to add a
            // FIELDS parameter and pass in geometry so you can
            // access the lat and lng

            //Edit: I was not supposed to use places API,
            // all I needed were lat, lng cordinates,
            // geocoding API works just fine
            getLatLng(){
                axios.get(`${this.proxy}${this.url}address=${this.address}&key=${this.key}`,)
                .then((res)=>{
                    if (res.data.results.length === 0){
                        this.errorMessage = "Your search returned no results, please check that you entered your address correctly";
                        return false;
                    }
                    // console.log(res.data.results.length === 0);
                    let lat = res.data.results[0].geometry.location.lat;
                    let lng = res.data.results[0].geometry.location.lng;
                    this.latlngArray.push({'lat':lat, 'lng': lng});
                }).catch((err)=> {
                    if (err){
                        this.errorMessage = "A Network Error has Occured, Please Check your Internet Connection";
                        console.log(err);
                    }
                })
            },
            getURL(){
                let captured = location.search.split('address=').splice(1).join('').split('&')[0]; // Value is in [1] ('384' in our case)
                this.address = captured ? captured : 'Lagos';
            }
        },
        async mounted(){
            console.log(process.env.VUE_APP_GOOGLE_MAPS_KEY);
            await this.getURL();
            await this.getLatLng();
        }
    }
</script>

<style scoped>
    .main{
        display: none;
    }
</style>