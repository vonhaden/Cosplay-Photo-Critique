<template>
    <div>
        <b-card-group columns class="photo-cards">
            <PhotoCard
                v-for="photo in photos"
                :photo="photo"
                :key="photo.id"
            ></PhotoCard>
        </b-card-group>
        <b-button v-if="!allPhotosLoaded" v-on:click="loadMorePhotos">Load More</b-button>
    </div>
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
            photos: [], // Placeholder until firebase data is loaded
            photoCount: "",
            photosPerLoad: 10 // Number of photos that are loaded with loadMorePhotos()
        };
    },
    firestore: {
        photos: DB.collection("photos")
            .where("uploaded", "==", true)
            .orderBy("datetime", "desc")
            .limit(10),
        photoCount: DB.collection("photos-meta").doc("photo-count")
    },
    computed: {
        allPhotosLoaded() {
            let photosLoaded = this.photos.length;
            let photosTotal = this.photoCount.count;
            return photosLoaded === photosTotal;
        }
    },
    methods: {
        loadMorePhotos() {
            // Set this equal to self
            let self = this;

            // Get the upload time of the last photo in the Photos collection
            let lastVisible = this.photos[this.photos.length - 1].datetime;

            // Query for loading the next 5 Photo
            let loadMoreQuery = DB.collection("photos")
                .where("uploaded", "==", true)
                .orderBy("datetime", "desc")
                .startAfter(lastVisible)
                .limit(self.photosPerLoad);

            // Run the Query
            loadMoreQuery
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // Add photo to Photos array
                        self.photos.push(doc.data());
                    });
                })
                .catch(function(error) {
                    console.log("Error loading photos: ", error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.photo-cards {
    margin: 2em 0;
}
</style>
