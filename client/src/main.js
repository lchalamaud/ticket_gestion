// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import moment from 'moment'
import VTooltip from 'v-tooltip'
import DatePicker from 'vue2-datepicker'
import IOdometer from 'vue-odometer'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash, faEdit, faCheck, faAngleLeft,
  faAngleRight, faCaretDown, faCaretUp, faSort
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faTrash, faEdit, faCheck, faAngleLeft,
  faAngleRight, faCaretDown, faCaretUp, faSort
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSocketio, 'http://localhost:8081')
Vue.use(VTooltip)
Vue.use(DatePicker)
Vue.use(IOdometer)
Vue.config.productionTip = false

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  socket: { connect: function () {} },
  components: { App },
  template: '<App/>'
})
