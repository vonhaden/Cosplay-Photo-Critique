import firebase from "firebase/app";
import { DB } from "../firebase/db";

export const PhotoCounterMixin = {
    methods: {
        addPhotoCount(photoCount) {
            // Document reference
            const countRef = DB.collection("photos-meta").doc("photo-count");

            // Set points
            const increment = firebase.firestore.FieldValue.increment(photoCount);

            // Update points
            countRef
                .update({ count: increment })
                .then(function() {
                    console.log("Photo Count Updated");
                })
                .catch(function(error) {
                    console.log("Error updating photo count: ", error);
                });
        },
        removePhotoCount(photoCount) {
            // Document reference
            const countRef = DB.collection("photos-meta").doc("photo-count");

            // Set points
            const decrement = firebase.firestore.FieldValue.increment(-photoCount);

            // Update points
            countRef
                .update({ count: decrement })
                .then(function() {
                    console.log("Photo Count Updated");
                })
                .catch(function(error) {
                    console.log("Error updating photo count: ", error);
                });
        }
    }
};
