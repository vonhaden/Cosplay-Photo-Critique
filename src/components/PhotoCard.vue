<template>
    <b-card
        class="photo-card"
        :title="photo.handle"
        :img-src="photo.image"
        :img-alt="photo.title"
        img-top
        @click="
            $router.push({
                name: 'photo',
                params: {
                    id: photo.id
                }
            })
        "
    >
        <b-card-text>
            {{ photo.name }}
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    name: "PhotoCard",
    props: {
        photo: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/photocard.scss";
</style>
