<template>
    <div>
        <div class="col-md-6 offset-md-5 col-sm-4" v-bind:class="{ 'loader': this.loading }"></div>
        <transition name="modal">
            <div v-bind:class="{'hideContent': !this.display }">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">

                            <div class="modal-header">
                                <slot name="header">
                                    <h3>{{this.restaurantName}}</h3>
                                </slot>
                            </div>
                            <div class="modal-body">
                                <slot name="body">
                                    <div id="map"></div>
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <!--default footer here-->
                                    <button class="btn btn-danger" @click="$emit('toggleModal')">
                                        Close
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

            <!-- use the modal component, pass in the prop -->
            <modal v-if="showModal" @close="showModal = false">

            </modal>
    </div>
</template>

<script>
    export default {
        name: "MapModal",
        props: {
            restaurantName: String,
            lat: Number,
            lng: Number
        },
        data() {
            return{
                showModal: false,
                display: false,
                loading: true
            }
        },
        methods: {
            initMap() {
                let restaurant = {lat: this.lat, lng: this.lng};
                this.isLoading(restaurant);
                let map = new google.maps.Map(
                    document.getElementById('map'), {zoom: 15, center: restaurant});
                let marker = new google.maps.Marker({position: restaurant, map: map});
            },
            isLoading(coordinateData){
                if (coordinateData.lng.length !== 0 && coordinateData.lng.length !== 0){
                    this.loading = !this.loading;
                    this.display = !this.display;
                }
            }
        },
        mounted(){
            this.$loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_KEY}`)
                .then(() => {
                    this.initMap();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
</script>

<style scoped>
    .hideContent{
        display: none;
    }

    /*Loading Spinner Start*/
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
    /*Loading Spinner End*/

    #map {
        width: 100%;
        height: 400px;
        background-color: grey;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 70%;
        height: auto;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 0;
        padding: 5px;
    }

    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    @media screen and (max-width: 650px) {
        #map {
           height: 230px;
        }

        .modal-container {
            width: 97%;
        }
    }
</style>