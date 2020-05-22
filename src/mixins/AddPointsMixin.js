import firebase from "firebase/app";
import { DB } from "../firebase/db";

export const AddPointsMixin = {
    methods: {
        addPoints(pointValue) {
            // Set points
            const increment = firebase.firestore.FieldValue.increment(pointValue);

            // Document reference
            const storyRef = DB.collection("accounts").doc(this.authUser.uid);

            // Update points
            storyRef.update({ points: increment });
        }
    }
};
