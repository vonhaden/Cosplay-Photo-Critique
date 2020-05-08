<template>
    <b-card-group columns>
        <PhotoCard
            v-for="photo in photos"
            :photo="photo"
            :key="photo.id"
        ></PhotoCard>
    </b-card-group>
</template>

<script>
import { DB } from "../firebase/db";
import PhotoCard from "./PhotoCard";

export default {
    name: "PhotoCards",
    components: {
        PhotoCard
    },
    data() {
        return {
            newPhoto: {
                image: null
            },
            photos: [] //placeholder until firebase data is loaded
        };
    },
    firestore: {
        photos: DB.collection("photos")
            .where("uploaded", "==", true)
            .orderBy("datetime", "desc")
    }
};
</script>
