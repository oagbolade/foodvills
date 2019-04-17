<template>
    <div>
        Hello<button class="btn btn-danger">Hi!</button>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "FetchLatLng",
        data(){
            return{
                url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?',
                nearByRadius: 500,
                nearByURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
                type: 'restaurant',
                proxy: 'https://cors-anywhere.herokuapp.com/',
                key: 'AIzaSyAw0JQxK1CapRxAZbTo1TtIJal281p48VU',
                inputtype: 'textquery',
                input: 'andela nigeria',
                fields: 'photos,formatted_address,name,rating,opening_hours,geometry',
                loading: false
            }
        },
        methods: {
            // Google Places Api handles this, be sure to add a
            // FIELDS parameter and pass in geometry so you can
            // access the lat and lng
            getLatLng(){
                axios.get(`${this.proxy}${this.url}input=${this.input}&inputtype=${this.inputtype}&fields=${this.fields}&key=${this.key}`,)
                .then((res)=>{
                    let candidates = res.data.candidates;
                    candidates.forEach((candidate)=>{
                        let lat = candidate.geometry.location.lat;
                        let lng = candidate.geometry.location.lng;
                        console.log(lat,lng);
                    })
                }).catch((err)=> {
                    console.log(err);
                })
            },

            getNearByPlaces(lat, lng){
                axios.get(`${this.proxy}${this.nearByURL}location=${lat},${lng}&radius=${this.nearByRadius}&type=${this.type}&key=${this.key}`,)
                    .then((res)=>{
                        let results = res.data.results;
                        results.forEach((result)=>{
                            console.log(result);
                        })
                    }).catch((err)=>{
                        console.log(err);
                })
            }
        },
        created(){
            this.getLatLng();
            this.getNearByPlaces(6.5537807, 3.366543)
        }
    }
</script>

<style scoped>

</style>