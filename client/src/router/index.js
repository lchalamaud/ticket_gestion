import Vue from 'vue'
import Router from 'vue-router'
import Tickets from '@/components/Tickets'
import NewTicket from '@/components/NewTicket'
import EditTicket from '@/components/EditTicket'
import DeleteTicket from '@/components/DeleteTicket'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/tickets',
      name: 'Tickets',
      component: Tickets
    },
    {
      path: '/tickets/new',
      name: 'NewTicket',
      component: NewTicket
    },
    {
      path: '/tickets/:id',
      name: 'EditTicket',
      component: EditTicket
    },
    {
      path: '/tickets/delete/:id',
      name: 'DeleteTicket',
      component: DeleteTicket
    }
  ]
})
