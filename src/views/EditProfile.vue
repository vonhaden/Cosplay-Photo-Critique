<template>
    <div id="content">
        <b-container>
            <b-row>
                <b-col class="p-4">
                    <h2>Edit Account</h2>

                    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                        <b-form @submit.prevent="handleSubmit(updateAccount)">

                            <!-- Handle -->
                            <validation-provider
                                name="handle"
                                mode="lazy"
                                :rules="{ required: true, alpha_dash: true, min: 3, max: 100 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Handle:" label-for="handle">
                                    <b-form-input
                                        id="handle"
                                        name="handle"
                                        v-model="account.handle"
                                        :state="errors[0] ? false : null"
                                    ></b-form-input>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    <b-form-text>This is your photography handle and your display name on the site</b-form-text>
                                </b-form-group>
                            </validation-provider>

                            <!-- Name -->
                            <validation-provider
                                name="name"
                                mode="lazy"
                                :rules="{ required: true, alpha_spaces: true, min: 3, max: 100 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Name:" label-for="name">
                                    <b-form-input
                                        id="name"
                                        name="name"
                                        v-model="account.name"
                                        :state="errors[0] ? false : null"
                                    ></b-form-input>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    <b-form-text>Enter your name</b-form-text>
                                </b-form-group>
                            </validation-provider>

                            <!-- Email -->
                            <validation-provider
                                name="email"
                                mode="lazy"
                                :rules="{ required: true, email: true, min: 3, max: 100 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Email:" label-for="email">
                                    <b-form-input
                                        id="email"
                                        name="email"
                                        v-model="account.email"
                                        :state="errors[0] ? false : null"
                                    ></b-form-input>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                    <b-form-text>Enter your email.</b-form-text>
                                </b-form-group>
                            </validation-provider>

                            <!-- Bio -->
                            <validation-provider
                                name="bio"
                                mode="lazy"
                                :rules="{ max: 3000 }"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Handle:" label-for="handle">
                                    <b-form-textarea
                                        id="bio"
                                        name="bio"
                                        rows="6"
                                        v-model="account.bio"
                                        :state="errors[0] ? false : null"
                                    ></b-form-textarea>
                                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>
                            <b-button type="submit">Edit Profile</b-button>
                        </b-form>
                    </ValidationObserver>
                    
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: "EditProfile",
    components: {
        ValidationObserver,
        ValidationProvider
    },
    mixins: [UserMixin],
    data() {
        return {
            account: {}
        };
    },
    firestore() {
        return {
            account: DB.collection("accounts").doc(this.authUser.uid)
        };
    },
    methods: {
        updateAccount() {
            DB.collection("accounts")
                .doc(this.authUser.uid)
                .update(this.account)
                .then(() => {
                    console.log("Account updated");
                    this.$router.push({ name: 'profile', params: { id: this.authUser.uid }});
                })
                .catch(function(error) {
                    console.log("Error updating account:", error);

                    //TODO let the user know
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/profile.scss";
</style>
