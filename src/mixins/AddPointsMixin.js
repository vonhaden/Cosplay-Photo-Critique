import firebase from "firebase/app";
import { DB } from "../firebase/db";

export const AddPointsMixin = {
    methods: {
        addPoints(pointValue) {
            // Document reference
            const accountRef = DB.collection("accounts").doc(this.authUser.uid);

            // Set points
            const increment = firebase.firestore.FieldValue.increment(pointValue);

            // Update points
            accountRef.update({ points: increment });
        }
    }
};
