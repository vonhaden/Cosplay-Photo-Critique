<template>
    <b-container class="home">
        <PhotoCards :load-more="true"></PhotoCards>
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
