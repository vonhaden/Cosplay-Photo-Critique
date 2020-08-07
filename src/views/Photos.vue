<template>
    <b-container class="home">
        <PhotoCards />
    </b-container>
</template>

<script>
import PhotoCards from "@/components/PhotoCards";

export default {
    name: "Photos",
    components: {
        PhotoCards
    }
};
</script>
