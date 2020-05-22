<template>
    <div id="content">
        <b-container class="py-4">
            <h2>Upload Photo</h2>

            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(addPhoto)">
                    <ValidationProvider
                        name="file"
                        mode="passive"
                        rules="required:true|size:1024|mimes:image/jpeg,image/png"
                        v-slot="{ errors }"
                    >
                        <b-form-group>
                            <b-form-file
                                id="image"
                                v-model="newPhoto.image"
                                :state="errors[0] ? false : null"
                            ></b-form-file>
                            <b-form-invalid-feedback>{{
                                errors[0]
                            }}</b-form-invalid-feedback>
                            <b-form-text
                                >Image must be smaller than 1mb and be in .jpg
                                or .png format</b-form-text
                            >
                        </b-form-group>
                    </ValidationProvider>
                    <b-button type="submit">Upload Photo</b-button>
                </b-form>
            </ValidationObserver>
        </b-container>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { Photo } from "../models/PhotoModel";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { DB } from "../firebase/db";
import { Storage } from "../firebase/storage";
import { EXIF } from "exif-js";

export default {
    name: "PhotoUpload",
    components: {
        ValidationObserver,
        ValidationProvider
    },
    mixins: [UserMixin],
    data() {
        return {
            newPhoto: {
                photo: new Photo(),
                image: null
            },
            photos: [],
            account: {}
        };
    },
    methods: {
        addPhoto() {
            let thePhoto = this.newPhoto;

            // set default info
            thePhoto.photo.datetime = new Date();
            thePhoto.photo.uid = this.authUser.uid;

            let accountRef = DB.collection("accounts").doc(this.authUser.uid);

            // get the info from the account
            accountRef
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());
                        let docData = doc.data();
                        thePhoto.photo.handle = docData.handle;
                        thePhoto.photo.name = docData.name;
                        thePhoto.photo.photoURL = docData.photoURL;
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                });

            //  get the metadata from the photo
            EXIF.getData(thePhoto.image, function() {
                // set Metadata
                let allMetaData = EXIF.getAllTags(this);
                // console.log(allMetaData);
                thePhoto.photo.shutter = allMetaData.ExposureTime ? allMetaData.ExposureTime.numerator + "/" + allMetaData.ExposureTime.denominator : "";
                thePhoto.photo.iso = allMetaData.ISOSpeedRatings ? allMetaData.ISOSpeedRatings : "";
                thePhoto.photo.aperture = allMetaData.FNumber ? allMetaData.FNumber.toString() : "";
                
                // add photo to firebase
                DB.collection("photos")
                    .add(thePhoto.photo)
                    .then(function(docRef) {
                        console.log("Document added:", docRef);

                        // set the docRef id as a variable
                        let id = docRef.id;

                        // add image to firebase
                        Storage.child("photos")
                            .child(id)
                            .put(thePhoto.image)
                            .then(function(snapshot) {
                                console.log("Uploaded file", snapshot);

                                // update recipe with the image url
                                snapshot.ref
                                    .getDownloadURL()
                                    .then(function(url) {
                                        DB.collection("photos")
                                            .doc(id)
                                            .update({ image: url });
                                    });

                                // send to the next step
                                this.$router.push({
                                    name: "photoDetails",
                                    params: { id }
                                });

                                //clear form input
                                thePhoto.image = null;
                            })
                            .catch(function(error) {
                                console.log("Error uploading file:", error);

                                //TODO: Let the user know
                            });

                        // clear the form
                        thePhoto.photo = new Photo();
                    })
                    .catch(function(error) {
                        console.log("Error adding photo:", error);

                        //TODO let the user know
                    });
            });
        }
    }
};
</script>
