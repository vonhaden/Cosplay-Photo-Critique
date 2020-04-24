<template>
    <b-container class="home">
        <PhotoCards />
    </b-container>
</template>


<script>
// @ is an alias to /src
import PhotoCards from "../components/PhotoCards";

export default {
    name: "Home",
    components: {
        PhotoCards
    }
};
</script>
