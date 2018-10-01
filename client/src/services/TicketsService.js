import Api from '@/services/Api'

export default {
  fetchTickets () {
    return Api().get('tickets')
  },

  fetchAllTickets () {
    return Api().get('tickets/all')
  },

  getTicket (params) {
    return Api().get('tickets/' + params.id)
  }
}
