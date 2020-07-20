<template>
    <div class="critique">
        <div class="commentheader">
            <img class="commentavatar" :src="critique.photoURL" :alt="critique.handle" height="50px" width="50px">
            <div>
                <h3>{{ critique.handle }}</h3>
                <p class="datetime">{{ formattedDate }} {{ formattedTime }}</p>
            </div>
        </div>
        <div class="commentbody">
            <p>{{ critique.critique }}</p>
        </div>
        <div class="buttons d-flex flex-row-reverse" v-if="isCritiqueAuthor">
            <b-button variant="danger" class="mt-2" @click="deleteCritique">Delete</b-button>
        </div>
    </div>
</template>

<script>
import { UserMixin } from "../mixins/UserMixin";
import { DB } from "../firebase/db";

export default {
    name: "Critique",
    mixins: [UserMixin],
    props: {
        critique: {
            type: Object,
            required: true
        }
    },
    computed: {
        formattedDate() {
            return this.critique.datetime.toDate().toLocaleDateString();
        },
        formattedTime() {
            let t = this.critique.datetime.toDate().toLocaleTimeString();
            let h = t.split(":")[0];
            let m = t.split(":")[1];

            return h + ":" + m + " " + t.split(" ")[1];
        }
    },
    methods: {
        deleteCritique() {
            // Delete the critique
            DB.collection("critiques")
                .doc(this.critique.id)
                .delete()
                .then(() => {
                    console.log("Critique successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing critique: ", error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/critique";
</style>
