<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">FoodVills</a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <a href="/"><button class="btn btn-outline-success my-2 my-sm-0" type="submit">Back</button></a>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    li h5{
        align-content: center;
    }

    @media screen and (max-width: 650px) {
        .myBackground {
            background-image: url("../../assets/backgroundImagesFoodVillsSmall.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: absolute;
            width: 100%;
            height: auto;
            top: 0;
            margin: 0;
            bottom: 0;
        }
    }
</style>