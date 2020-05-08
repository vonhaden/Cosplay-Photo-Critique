<template>
    <div id="content" class="contentphoto">
        <b-container fluid class="imageDisplay p-4">
            <a :href="photo.image" :style="backgroundimg"></a>
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
                    <div v-if="critiques != ''">
                        <h2>Critiques</h2>
                        <displaycritiques
                            v-for="critique in critiques"
                            :critique="critique"
                            :key="critique.id"
                            class="comment"
                        ></displaycritiques>
                        <div class="divider"></div>
                    </div>
                    <!--                    <addcritique v-if="authUser" :id="id" :auth-user="authUser" class="addcomment"></addcritique>-->
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";

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
        backgroundimg() {
            let bgimg = this.photo.image;
            return "background-image: url(" + bgimg + ")";
        },

        formattedDate() {
            return this.photo.datetime.toDate().toLocaleDateString();
        }
    }
};
</script>
