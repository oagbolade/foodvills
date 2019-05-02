<template>
    <div>
        <div class="alert alert-danger" v-if="errorMessage">
            {{errorMessage}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error",
        props: {
            errorMessage: String
        }
    }
</script>

<style scoped>
    .alert{
        text-align: center;
        margin: 10px;
    }
</style>