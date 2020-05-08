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
    </div>
</template>

<script>
export default {
    name: "Critique",
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
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/critique";
</style>
