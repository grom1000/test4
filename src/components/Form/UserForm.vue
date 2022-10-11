<template>
    <div class="bg-gray-500 opacity-75 fixed top-0 left-0 w-full h-full table">
        <div class="align-middle table-cell text-center">
            <div class="bg-white p-6 rounded-lg inline-block" v-on-clickaway="away">
                <span v-html="getUserResp" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway';

export default {
    name: 'UserForm',
    mixins: [clickaway],
    computed: mapGetters(['getUserResp']),
    created() {
        document.addEventListener("keydown", this.pressEscButton);
    },
    methods: {
        ...mapMutations([
            'closeUserModal',
        ]),
        away() {
            this.closeUserModal()
        },
        pressEscButton($event) {
            if ($event.key === "Escape" || $event.keyCode === 27) {
                this.closeUserModal()
            }
        },
    },
    destroyed() {
        document.removeEventListener("keydown", this.pressEscButton);
    },
}
</script>