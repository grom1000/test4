<template>
    <div class="bg-gray-500 opacity-75 fixed top-0 left-0 w-full h-full table">
        <div class="align-middle table-cell text-center">
            <form action="" class="mx-2.5 sm:mx-0 bg-white p-6 rounded-lg sm:inline-block" @submit.prevent="onSubmit"
                v-on-clickaway="away">
                <div class="text-2xl mb-6 text-left">
                    Заказать звонок
                </div>
                <div class="flex flex-wrap sm:flex-nowrap mb-5">
                    <div class="flex flex-col w-full sm:pr-5">
                        <label class="mb-1 text-left" for="name">
                            Имя*
                        </label>
                        <input type="text" id="name" placeholder="Иван Иванов" v-model="name"
                            class="sm:w-44 h-9 border-solid border-2 border-gray-300 rounded-sm py-2 px-3"
                            :class="{invalid: $v.name.$dirty && !$v.name.required}">
                        <span class="form-error" v-if="$v.name.$dirty && !$v.name.required">Поле Имя не должно
                            быть пустым</span>
                    </div>
                    <div class="flex flex-col w-full sm:pr-5">
                        <label class="mb-1 text-left" for="phone">
                            Телефон*
                        </label>
                        <input type="tel" v-mask="'+7##########'" id="phone" placeholder="+7 (___) ___-__-__"
                            v-model="phone"
                            class="sm:w-44 h-9 border-solid border-2 border-gray-300 rounded-md py-2 px-3"
                            :class="{invalid: ($v.phone.$dirty && !$v.phone.required) || ($v.phone.$dirty && !$v.phone.minLength)}">
                        <span class="form-error" v-if="$v.phone.$dirty && !$v.phone.required">Поле Телефон не должно
                            быть пустым</span>
                        <span class="form-error" v-else-if="$v.phone.$dirty && !$v.phone.minLength">Поле телефон должно
                            содержать 11
                            цифр</span>
                    </div>
                    <div class="flex flex-col w-full sm:pr-5">
                        <label class="mb-1 text-left" for="email">
                            Email*
                        </label>
                        <input type="text" id="email" placeholder="you@example.com" v-model.trim="email"
                            class="sm:w-44 h-9 border-solid border-2 border-gray-300 rounded-md py-2 px-3"
                            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
                        <span class="form-error" v-if="$v.email.$dirty && !$v.email.required">Поле email не должно
                            быть пустым</span>
                        <span class="form-error" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный
                            email</span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label class="mb-1 text-left" for="city">
                            Город*
                        </label>
                        <select class="sm:w-44 h-9 border-solid border-2 border-gray-300 rounded-md pl-2"
                            v-model="city_id">
                            <option v-for="option in options" :key="option.id" :value="option.id">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="flex justify-end">
                    <form-button class="bg-green-600 btn w-full sm:max-w-176" type="submit">Отправить
                    </form-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import FormButton from '@/components/Button/Button.vue'
import { mapMutations, mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

import { mixin as clickaway } from 'vue-clickaway';
import { mask } from 'vue-the-mask'

export default {
    name: 'Form',
    mixins: [clickaway],
    directives: { mask },
    data() {
        return {
            name: "",
            phone: "",
            email: "",
            city_id: null,
            options:
                [
                    {
                        id: 1,
                        name: "Москва"
                    },
                    {
                        id: 2,
                        name: "Санкт-Петербург"
                    },
                    {
                        id: 3,
                        name: "Казань"
                    }
                ]
        }
    },
    components: {
        FormButton
    },
    created() {
        document.addEventListener("keydown", this.pressEscButton);
    },
    mounted() {
        this.city_id = this.$store.getters.getCityId
    },
    validations: {
        name: {
            required
        },
        phone: {
            required,
            minLength: minLength(12)
        },
        email: {
            email,
            required
        }
    },
    methods: {
        onSubmit() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            } else {
                this.fetchUser({
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    city_id: this.city_id
                })
                this.closeModal()
            }
        },
        ...mapMutations([
            'closeModal',
        ]),
        ...mapActions([
            'fetchUser'
        ]),
        away() {
            this.closeModal()
        },
        pressEscButton($event) {
            if ($event.key === "Escape" || $event.keyCode === 27) {
                this.closeModal()
            }
        },
    },
    destroyed() {
        document.removeEventListener("keydown", this.pressEscButton);
    },
}
</script>