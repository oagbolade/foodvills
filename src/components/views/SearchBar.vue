<template>
  <div class="wrap">
    <div class="search">
      <form @submit="submitForm">
        <input
          id="searchTextField"
          v-model="address"
          ref="address"
          type="text"
          class="searchTerm"
          placeholder="Enter your Location"
        />
        <button type="submit" class="searchButton">
          <font-awesome-icon icon="search" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      address: ""
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.address = this.$refs.address.value;

      if (this.address.trim() === "") {
        return false;
      }
      window.location = `/latlng?address=${this.address}`;
    }
  },
  mounted() {
    this.$loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_KEY}&libraries=places`
    )
      .then(() => {
        let defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-33.8902, 151.1759),
          new google.maps.LatLng(-33.8474, 151.2631)
        );

        let input = document.getElementById("searchTextField");
        let options = {
          //bounds: defaultBounds,
          types: ["establishment"],
          componentRestrictions: { country: "ng" }
        };

        let autocomplete = new google.maps.places.Autocomplete(input, options);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

.search {
  width: 100%;
  position: relative;
}

.searchTerm {
  float: left;
  width: 100%;
  border: 3px solid #00b4cc;
  padding: 5px;
  height: 50px;
  border-radius: 5px;
  outline: none;
  color: black;
}

.searchTerm:focus {
  color: black;
}

.searchButton {
  position: absolute;
  right: -50px;
  width: 46px;
  height: 50px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 950px) {
  .wrap {
    width: 70%;
  }
}

@media screen and (max-width: 650px) {
  .wrap {
    width: 70%;
    padding-right: 10px;
  }
}
</style>