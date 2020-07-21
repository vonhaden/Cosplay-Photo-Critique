<template>
    <div id="content" class="photo-page">
        <!-- Photo -->
        <b-container fluid class="photo-display p-4">
            <div class="photo-wrapper">
                <b-img v-if="photo" :src="photo.image" :alt="altText"/>
            </div>
        </b-container>

        <b-container class="photo-content">
            <b-row>
                <b-col lg="6" sm="12" class="photodetails mb-4 mb-lg-0" v-if="photo">
                    <div class="phototitle">
                        <h1>{{ photo.title }}</h1>
                        <h3>{{ formattedDate }}</h3>
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

                    <div class="buttons" v-if="isCreator || isModerator">
                        <DeletePhotoModal></DeletePhotoModal>
                    </div>
                </b-col>

                <b-col lg="6" sm="12" class="usercomments">
                    <div v-if="critiques != ''">
                        <h2>Critiques</h2>
                        <Critique
                            v-for="critique in critiques"
                            :critique="critique"
                            :auth-user="authUser"
                            :key="critique.id"
                        ></Critique>
                        <div class="divider"></div>
                    </div>
                    <AddCritique
                        v-if="authUser"
                        :id="id"
                        :auth-user="authUser"
                        class="addcomment"
                    ></AddCritique>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";
import { Storage } from "../firebase/storage";
import Critique from "../components/Critique";
import AddCritique from "../components/AddCritique";
import DeletePhotoModal from "../components/DeletePhotoModal";

export default {
    name: "Photo",
    components: {
        DeletePhotoModal,
        Critique,
        AddCritique
    },
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
            // Method that deletes the photo and attached critiques.
            // Create a storage reference from our storage service
            let storageRef = Storage.ref();

            // Create a reference to the file to delete
            let photoRef = storageRef.child("photos/" + this.id);

            // Create a reference for the critique
            let critiquesRef = DB.collection("critiques");

            // Set photo to null to prevent errors
            this.photo = null;

            // Delete the photo file
            photoRef
                .delete()
                .then(function() {
                    // File deleted successfully
                    console.log("Image removed from storage");
                })
                .catch(function(error) {
                    console.error("Error removing image from storage: ", error);
                });

            // Delete critiques attached to image
            critiquesRef
                .where("photoid", "==", this.id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref
                            .delete()
                            .then(() => {
                                console.log("Comment deleted: " + doc.id);
                            })
                            .catch(function(error) {
                                console.error(
                                    "Error removing critique from storage: ",
                                    error
                                );
                            });
                    });
                })
                .catch(function(error) {
                    console.log("Error getting critiques: ", error);
                });

            // Delete the photo collection
            DB.collection("photos")
                .doc(this.id)
                .delete()
                .then(() => {
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
