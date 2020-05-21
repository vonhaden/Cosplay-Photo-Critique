<template>
    <div>
        <h3>Add Critique</h3>

        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(addNewCritique)">
                <ValidationProvider
                    name="Critique"
                    mode="lazy"
                    :rules="{ required: true, min: 3 }"
                    v-slot="{ errors }"
                >
                    <b-form-group>
                        <b-form-textarea
                            class="textarea-tall"
                            v-model="newCritiqueText.critique"
                            placeholder="Add your critique here..."
                            rows="6"
                            :state="errors[0] ? false : null"
                        ></b-form-textarea>
                        <b-form-invalid-feedback>
                            {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </ValidationProvider>
                <b-button type="submit">Add Critique</b-button>
            </b-form>
        </ValidationObserver>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { Critique } from "../models/CritiqueModel";
import { DB } from "../firebase/db";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: "AddCritique",
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
            newCritiqueText: new Critique()
        };
    },
    methods: {
        addNewCritique() {
            let theCritique = this.newCritiqueText;

            // add critique details
            theCritique.datetime = new Date();
            theCritique.photoid = this.id;
            theCritique.uid = this.authUser.uid;

            // get the info from the account
            let accountRef = DB.collection("accounts").doc(this.authUser.uid);

            // Set self variable to allow referencing of resetForm()
            let self = this;

            accountRef
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        let docData = doc.data();
                        theCritique.handle = docData.handle;
                        theCritique.photoURL = docData.photoURL;

                        DB.collection("critiques")
                            .add(theCritique)
                            .then(function(docRef) {
                                console.log("Document written:", docRef);
                                self.resetForm();
                            })
                            .catch(function(error) {
                                console.error("Error adding document: ", error);

                                // let the user know...
                                // TODO: let the user know
                            });
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("User does not exist");
                    }
                })
                .catch(function(error) {
                    console.log("Error getting user:", error);
                });
        },
        resetForm() {
            // Reset critique
            this.newCritiqueText = new Critique();

            // Reset validation
            this.$nextTick(() => {
                this.$refs.observer.reset();
            });
        }
    }
};
</script>
