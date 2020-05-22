<template>
    <div id="content">
        <b-container fluid>
            <b-row class="profile-header-bg">
                <b-container>
                    <b-col class="py-4 profile-header">
                        <div class="profile-avatar">
                            <img :src="account.photoURL" alt="Profile picture">
                        </div>
                        <div>
                            <h3>{{ account.handle }}</h3>
                            <h4>{{ account.name }}</h4>
                            <h5>Member since {{ formattedDate }}</h5>
                        </div>
                    </b-col>
                </b-container>
            </b-row>

            <b-container>
                <b-row>
                    <b-col lg="6" sm="12" class="py-4">
                        <h4>Bio</h4>
                        <p>{{ account.bio }}</p>
                        <b-button v-if="authUser.uid === this.id" :to="{ name: 'editProfile' }">Edit</b-button>
                    </b-col>

                    <b-col lg="6" sm="12" class="py-4">
                        <h4>Progress</h4>
                        <div class="level-details">
                            <h5>Level {{ currentLevel }}</h5>
                            <h6>{{ levelTitle }}</h6>
                        </div>

                        <b-progress :value="levelProgress" :max="levelTotal" height="2rem" variant="secondary" show-value></b-progress>
                        <p>Photos Uploaded: {{ photosUploaded }}</p>
                        <p>Critiques Made: {{ critiquesMade }}</p>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";

export default {
    name: "Profile",
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
            account: {},
            photos: {},
            critiques: {},
            levels: {},
            level1: {},
            level2: {},
            level3: {},
            level4: {},
            level5: {},
            level6: {}
        };
    },
    firestore() {
        return {
            account: DB.collection("accounts").doc(this.id),
            photos: DB.collection("photos").where("uid", "==", this.id),
            critiques: DB.collection("critiques").where("uid", "==", this.id),
            levels: DB.collection("levels"),
            level1: DB.collection("levels").doc("1"),
            level2: DB.collection("levels").doc("2"),
            level3: DB.collection("levels").doc("3"),
            level4: DB.collection("levels").doc("4"),
            level5: DB.collection("levels").doc("5"),
            level6: DB.collection("levels").doc("6")
        };
    },
    computed: {
        formattedDate() {
            return this.account.created.toDate().toLocaleDateString();
        },
        photosUploaded() {
            return this.photos.length;
        },
        critiquesMade() {
            return this.critiques.length;
        },
        currentLevel() {
            let points = this.account.points;

            if (points < this.level2.points) {
                return 1;
            } else if (points < this.level3.points) {
                return 2;
            } else if (points < this.level4.points) {
                return 3;
            } else if (points < this.level5.points) {
                return 4;
            } else if (points < this.level6.points) {
                return 5;
            } else if (points > this.level6.points) {
                return 6;
            } else {
                return 1;
            }
        },
        levelTitle() {
            let points = this.account.points;

            if (points < this.level2.points) {
                return this.level1.title;
            } else if (points < this.level3.points) {
                return this.level2.title;
            } else if (points < this.level4.points) {
                return this.level3.title;
            } else if (points < this.level5.points) {
                return this.level4.title;
            } else if (points < this.level6.points) {
                return this.level5.title;
            } else if (points > this.level6.points) {
                return this.level6.title;
            } else {
                return this.level1.title;
            }
        },
        levelProgress() {
            let points = this.account.points;

            if (points < this.level2.points) {
                return points;
            } else if (points < this.level3.points) {
                return points - this.level2.points;
            } else if (points < this.level4.points) {
                return points - this.level3.points;
            } else if (points < this.level5.points) {
                return points - this.level4.points;
            } else if (points < this.level6.points) {
                return points - this.level5.points;
            } else if (points > this.level6.points) {
                return Number(this.level6.points);
            } else {
                return points;
            }
        },
        levelTotal() {
            let points = this.account.points;

            if (points < this.level2.points) {
                return Number(this.level2.points);
            } else if (points < this.level3.points) {
                return Number(this.level3.points - this.level2.points);
            } else if (points < this.level4.points) {
                return Number(this.level4.points - this.level3.points);
            } else if (points < this.level5.points) {
                return Number(this.level5.points - this.level4.points);
            } else if (points < this.level6.points) {
                return Number(this.level6.points - this.level5.points);
            } else if (points >= this.level6.points) {
                return Number(this.level6.points);
            } else {
                return Number(this.level2.points);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/profile.scss";
</style>
