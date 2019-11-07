<template>
  <div>
    <Error v-bind:errorMessage="errorMessage" />
    <div class="col-6 offset-5"></div>
    <div>
      <!--<Results v-bind:coordinates="allCoordinates" v-bind:restaurantNames="restaurantNames" />-->
      <div class="navbar">
        <NavBar />
        <Spinner v-if="this.loading" />
      </div>
      <div class="container" v-bind:key="" v-for="restaurant in restaurantData">
        <div class="col-md-6 offset-md-4">
          <div class="card">
            <div class="card-header">
              <h4>{{restaurant.name}}</h4>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>
                  <b>Address:</b>
                  {{restaurant.vicinity}}
                </p>
                <p v-if="restaurant.opening_hours">
                  <b>Opening Hours:</b> Open
                </p>
                <p v-else-if="!restaurant.opening_hours">
                  <b>Opening Hours:</b> Closed
                </p>
                <p>
                  <b>Customer Ratings(5):</b>
                  {{roundNumber(restaurant.rating)}}
                </p>
                <p>
                  <button
                    class="btn btn-success"
                    @click="toggleModal({lat: restaurant.geometry.location.lat, lng: restaurant.geometry.location.lng, name: restaurant.name}), toggleSpinner()"
                  >View Map</button>
                </p>
              </blockquote>
            </div>
            <div class="card-footer">
              <p class="mb-0">
                <b>Customer Ratings(5):</b>
                {{ roundNumber(restaurant.rating) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MapModel
      v-if="showModal"
      @toggleModal="toggleModal({lat: null, lng: null, name: null})"
      v-bind:lat="individualLat"
      v-bind:lng="individualLng"
      v-bind:restaurantName="individualName"
      @toggleSpinner="toggleSpinner"
    />
  </div>
</template>

<script>
import axios from "axios";
import Error from "./views/Error";
import NavBar from "./views/NavBar";
import MapModel from "./views/MapModal";
import Spinner from './Spinner'

export default {
  name: "FetchNearByPlaces",
  components: { Error, MapModel, NavBar, Spinner },
  props: ["latlng"],
  watch: {
    latlng: function() {
      this.toggleSpinner();
      if (this.latlng && this.latlng.length !== 0) {
        this.latlng.forEach(latlng => {
          this.getNearByPlaces(latlng.lat, latlng.lng);
        });
      }
    }
  },
  data() {
    return {
      individualLat: null,
      individualLng: null,
      individualName: null,
      loading: false,
      showModal: false,
      nearByRadius: 500,
      nearByURL:
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
      type: "restaurant",
      proxy: "https://cors-anywhere.herokuapp.com/",
      key: process.env.VUE_APP_GOOGLE_MAPS_KEY || process.env.API_KEY,
      restaurantData: [],
      errorMessage: ""
    };
  },
  methods: {
    getNearByPlaces(lat, lng) {
      axios
        .get(
          `${this.proxy}${this.nearByURL}location=${lat},${lng}&radius=${this.nearByRadius}&type=${this.type}&key=${this.key}`
        )
        .then(res => {
          this.restaurantData = res.data.results;
          if(this.dataExists(this.restaurantData)){
            this.toggleSpinner();
          }
        })
        .catch(err => {
          if (err) {
            this.errorMessage =
              "A Network Error has Occured, Please Check your Internet Connection";
            console.log(err);
          }
        });
    },
    toggleModal(data) {
        this.individualLat = data.lat;
        this.individualLng = data.lng;
        this.individualName = data.name;
        this.showModal = !this.showModal;
    },
    dataExists(restaurantDataArray) {
      if (restaurantDataArray && restaurantDataArray.length !== 0) {
        return true;
      }
    },
    toggleSpinner(){
      this.loading = !this.loading;
    },
    roundNumber(number) {
      if (!number) {
        return "Not available";
      }
      return Math.round(number * 10) / 10;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.card-footer,
.card-header {
  background-color: #00c851;
  font-family: Roboto, sans-serif;
  color: white;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.card {
  margin-bottom: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.navbar {
  padding: 30px;
}

.container {
  margin-top: 50px;
}
</style>