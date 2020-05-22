<template>
    <div id="content">
        <b-container fluid v-if="photo">
            <b-row>
                <b-col lg="6" sm="12" class="submitphotoimage">
                    <b-img :src="photo.image" fluid alt="Uploaded photo"></b-img>
                </b-col>
                <b-col lg="6" sm="12" class="p-4">
                    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                        <b-form @submit.prevent="handleSubmit(addDetails)">
                            <!-- Title -->
                            <validation-provider
                                name="title"
                                mode="lazy"
                                :rules="{ required: true, min: 3, max: 100 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Photo Title:" label-for="title">
                                    <b-form-input
                                        id="title"
                                        name="title"
                                        v-model="photo.title"
                                        :state="errors[0] ? false : null"
                                    ></b-form-input>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    <b-form-text>Enter a title for your photo</b-form-text>
                                </b-form-group>
                            </validation-provider>
                            <!-- Subject -->
                            <validation-provider
                                name="subject"
                                mode="lazy"
                                :rules="{ required: true, min: 3, max: 200 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Subject(s):" label-for="subject">
                                    <b-form-input
                                        id="subject"
                                        name="subject"
                                        v-model="photo.subject"
                                        :state="errors[0] ? false : null"
                                    ></b-form-input>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    <b-form-text>Enter the subject(s) of your photo.</b-form-text>
                                </b-form-group>
                            </validation-provider>
                            <!-- Meta Settings Row -->
                            <b-row>
                                <!-- Shutter Speed -->
                                <validation-provider
                                    name="shutter"
                                    mode="lazy"
                                    :rules="{ required: true }"
                                    v-slot="{ errors }"
                                    class="col-lg-4 xs-col-12"
                                >
                                    <b-form-group label="Shutter Speed:" label-for="shutter">
                                        <b-form-select
                                            id="shutter"
                                            name="shutter"
                                            v-model="photo.shutter"
                                            :options="shutterOptions"
                                            :state="errors[0] ? false : null"
                                        ></b-form-select>
                                        <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                </validation-provider>

                                <!-- Aperture -->
                                <validation-provider
                                    name="aperture"
                                    mode="lazy"
                                    :rules="{ required: true, decimal: true, max: 10 }"
                                    v-slot="{ errors }"
                                    class="col-lg-4 xs-col-12"
                                >
                                    <b-form-group label="Aperture:" label-for="aperture">
                                        <b-form-select
                                            id="aperture"
                                            name="aperture"
                                            v-model="photo.aperture"
                                            :options="apertureOptions"
                                            :state="errors[0] ? false : null"
                                        ></b-form-select>
                                        <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                </validation-provider>

                                <!-- ISO -->
                                <validation-provider
                                    name="iso"
                                    mode="lazy"
                                    :rules="{ required: true, numeric: true, max: 10 }"
                                    v-slot="{ errors }"
                                    class="col-lg-4 xs-col-12"
                                >
                                    <b-form-group label="ISO:" label-for="iso">
                                        <b-form-select
                                            id="iso"
                                            name="iso"
                                            v-model="photo.iso"
                                            :options="isoOptions"
                                            :state="errors[0] ? false : null"
                                        ></b-form-select>
                                        <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                </validation-provider>
                            </b-row>
                            <!-- Comment -->
                            <validation-provider
                                name="comment"
                                mode="lazy"
                                :rules="{ max: 3000 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Comments:" label-for="comment">
                                    <b-form-textarea
                                        id="comment"
                                        name="comment"
                                        rows="6"
                                        v-model="photo.comment"
                                        :state="errors[0] ? false : null"
                                    ></b-form-textarea>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    <b-form-text>This is your photography handle and your display name on the site</b-form-text>
                                </b-form-group>
                            </validation-provider>
                            <b-button type="submit">Submit Photo</b-button>
                        </b-form>
                    </ValidationObserver>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { DB } from "../firebase/db";
import firebase from "firebase/app";

export default {
    name: "PhotoDetails",
    components: {
        ValidationObserver,
        ValidationProvider
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
            photo: null,
            shutterOptions: ['1', '1/2', '1/4', '1/5', '1/6', '1/8', '1/10', '1/13', '1/15', '1/20', '1/25', '1/30', '1/40', '1/45', '1/50', '1/60', '1/80', '1/90', '1/100', '1/125', '1/160', '1/180', '1/200', '1/250', '1/320', '1/350', '1/400', '1/500', '1/640', '1/750', '1/800', '1/1000', '1/1250', '1/1500', '1/1600', '1/2000', '1/2500', '1/3000', '1/3200', '1/4000', '1/5000', '1/6000', '1/6400', '1/8000'],
            isoOptions: ['50', '100', '125', '160', '200', '250', '320', '400', '500', '640', '800', '1000', '1250', '1600', '2000', '2500', '3200', '4000', '5000', '5000', '6400', '8000', '10000', '12800', '16000', '20000', '25600', '51200', '102400', '102400', '409600'],
            apertureOptions: ['1.0', '1.1', '1.2', '1.4', '1.6', '1.7', '1.8', '2', '2.2', '2.4', '2.5', '2.8', '3.2', '3.3', '3.5', '4', '4.5', '4.8', '5.0', '5.6', '6.3', '6.7', '7.1', '8', '9', '9.5', '10', '11', '13', '14', '16', '18', '19', '20', '22', '25', '27', '29', '32', '36', '38', '40', '45', '51', '54', '57', '64'],
        };
    },
    firestore() {
        return {
            photo: DB.collection("photos").doc(this.id)
        };
    },
    methods: {
        addPoints() {
            // Set points
            const increment = firebase.firestore.FieldValue.increment(2);

            // Document reference
            const storyRef = DB.collection("accounts").doc(this.authUser.uid);

            // Update read count
            storyRef.update({ points: increment });
            console.log("Points added");
        },
        addDetails() {
            // Add points for uploading
            this.addPoints();

            // Change upload value to true
            this.photo.uploaded = true;

            // Upload changes
            DB.collection("photos")
                .doc(this.id)
                .update(this.photo)
                .then(() => {
                    console.log("Details added");
                    this.$router.push({ name: "home" });
                })
                .catch(function(error) {
                    console.log("Error adding details:", error);

                    //TODO let the user know
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/photo-details";
</style>
