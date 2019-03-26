import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import dictionary from '@/locales/forms/dictionary'

// setup
Validator.localize(dictionary)

Vue.use(VeeValidate)
