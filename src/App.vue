<template>
  <div id="app">
    <app-form v-if="modalVisible" />
    <app-user-form v-if="userModalVisible"/>
    <div class="mt-2.5 sm:mt-5 sm:pl-10 xl:pl-20">
      <app-button class="bg-blue-500 w-full sm:w-auto mx-2.5 sm:mr-5 mb-2.5 sm:mb-0 btn" @click.native="showModal(1)">Заказать в Москву</app-button>
      <app-button class="bg-teal-600 w-full sm:w-auto mx-2.5 sm:mx-0 btn" @click.native="showModal(2)">Заказать в Санкт-Петербург</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/Button/Button.vue'
import AppForm from '@/components/Form/Form.vue'
import AppUserForm from '@/components/Form/UserForm.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    AppButton,
    AppForm,
    AppUserForm
  },
  computed: mapGetters(['modalVisible', 'userModalVisible']),
  methods: {
    ...mapMutations([
      'showModal',
    ])
  }
}
</script>