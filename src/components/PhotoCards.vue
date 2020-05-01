<template>
    <b-card-group columns>
        <b-card
            v-for="photo in photos"
            class="photocard"
            :title="photo.handle"
            :img-src="photo.image"
            img-alt="photo.title"
            img-top
            :key="photo.id"
            @click="
                $router.push({
                    name: 'photo',
                    params: {
                        id: photo.id
                    }
                })
            "
        >
            <b-card-text>
                {{ photo.name }}
            </b-card-text>
        </b-card>
    </b-card-group>
</template>

<script>
import { DB } from "../firebase/db";

export default {
    name: "PhotoCards",
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
