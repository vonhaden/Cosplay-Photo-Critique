<template>
    <div id="content" class="photo-page">
        <b-container fluid class="photo-display p-4">
            <a :href="photo.image">
                <img :src="photo.image" :alt="altText"/>
            </a>
        </b-container>

        <b-container>
            <b-row>
                <b-col lg="6" sm="12" class="photodetails">
                    <div class="phototitle">
                        <h1>{{ photo.title }}</h1>
                        <h3 v-if="photo.datetime">{{ formattedDate }}</h3>
                    </div>

                    <div class="photouser">
                        <div>
                            <img
                                class="postavatar"
                                :src="photo.photoURL"
                                :alt="photo.handle"
                                height="60px"
                                width="60px"
                            />
                        </div>
                        <div class="names">
                            <h2 class="name">{{ photo.name }}</h2>
                            <h2 class="handle">{{ photo.handle }}</h2>
                        </div>
                    </div>

                    <div class="photospecs">
                        <div>
                            <p>{{ photo.shutter }} sec</p>
                        </div>
                        <div>
                            <p>f/{{ photo.aperture }}</p>
                        </div>
                        <div>
                            <p>{{ photo.iso }} ISO</p>
                        </div>
                    </div>

                    <div class="photosubject">
                        <p>Subject: {{ photo.subject }}</p>
                    </div>

                    <div class="photocomment" v-if="photo.comment">
                        <p>{{ photo.comment }}</p>
                    </div>

                    <div class="buttons" v-if="isCreator">
                        <b-button variant="danger" @click="deletePhoto"
                            >Delete</b-button
                        >
                    </div>
                </b-col>

                <b-col lg="6" sm="12" class="usercomments">
                    <!--                    <div v-if="critiques != ''">-->
                    <!--                        <h2>Critiques</h2>-->
                    <!--                        <displaycritiques-->
                    <!--                            v-for="critique in critiques"-->
                    <!--                            :critique="critique"-->
                    <!--                            :key="critique.id"-->
                    <!--                            class="comment"-->
                    <!--                        ></displaycritiques>-->
                    <!--                        <div class="divider"></div>-->
                    <!--                    </div>-->
                    <!--                    <addcritique v-if="authUser" :id="id" :auth-user="authUser" class="addcomment"></addcritique>-->
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";
import { Storage } from "../firebase/storage";

export default {
    name: "Photo",
    mixins: [UserMixin],
    props: {
        id: {
            type: String,
            required: true,
            default: ""
        }
    },
    data() {
        return {
            photo: "",
            critiques: ""
        };
    },
    firestore() {
        return {
            photo: DB.collection("photos").doc(this.id),
            critiques: DB.collection("critiques")
                .where("photoid", "==", this.id)
                .orderBy("datetime")
        };
    },
    computed: {
        altText() {
            let title = this.photo.title;
            let name = this.photo.handle;
            return title + " by " + name + ".";
        },
        formattedDate() {
            return this.photo.datetime.toDate().toLocaleDateString();
        }
    },
    methods: {
        deletePhoto() {
            // Create a storage reference from our storage service
            let storageRef = Storage.ref();

            //Create a reference to the file to delete
            let photoRef = storageRef.child("photos/" + this.id);

            // Delete the file
            photoRef
                .delete()
                .then(function() {
                    // File deleted successfully
                    console.log("Image removed from storage");
                })
                .catch(function(error) {
                    console.error("Error removing image from storage: ", error);
                });

            // delete the photo collection
            DB.collection("photos")
                .doc(this.id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                    this.$router.push({ name: "home" });
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/photo.scss";
</style>
