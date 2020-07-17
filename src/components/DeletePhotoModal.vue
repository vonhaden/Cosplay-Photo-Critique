<template>
    <div>
        <b-button variant="danger" @click="$bvModal.show('modal-photo-delete')">Delete Photo</b-button>

        <b-modal id="modal-photo-delete" centered>
            <template v-slot:modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-button size="sm" variant="outline-danger" @click="close()">
                    Close
                </b-button>
                <h5>Delete Photo?</h5>
            </template>

            <template v-slot:default>
                <p>This photo will be deleted along will all critiques on it. You will not be able to restore it.</p>
            </template>

            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button
                        size="sm"
                        variant="danger"
                        @click="triggerDelete()"
                >
                    Delete
                </b-button>
                <b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="cancel()"
                >
                    Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "DeletePhotoModal",
    methods: {
        triggerDelete() {
            // Closes the modal
            this.$bvModal.hide("modal-photo-delete");

            // Triggers parent deletePhoto method
            this.$parent.deletePhoto();
        }
    }
};
</script>
