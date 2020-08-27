<template>
    <div>
        <b-button
            variant="danger"
            class="mt-2"
            @click="$bvModal.show('modal-critique-delete')"
            >Delete
        </b-button>

        <b-modal id="modal-critique-delete" centered>
            <template v-slot:modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-button size="sm" variant="outline-danger" @click="close()">
                    Close
                </b-button>
                <h5>Delete Critique?</h5>
            </template>

            <template v-slot:default>
                <p>This critique will be deleted and can not be restored.</p>
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
    name: "DeleteCritiqueModal",
    methods: {
        triggerDelete() {
            // Closes the modal
            this.$bvModal.hide("modal-critique-delete");

            // Triggers parent deletePhoto method
            this.$parent.deleteCritique();
        }
    }
};
</script>
