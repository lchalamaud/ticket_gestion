<template>
<div class="tickets">
  <div class='dashboard'>
    <h1>Quizzbox Support</h1>
    <div class='dashboard_content'>
      <div class='dashboard_element active' @click='toggleNouveau($event)'>
        <span v-if="nouveauCount < 10" class='dashboard_element_count'>0{{ nouveauCount }}</span>
        <span v-else class='dashboard_element_count'>{{ nouveauCount }}</span>
        <span class='dashboard_element_title'  id='nouveau'>Nouveau</span>
      </div>
      <div class='dashboard_element active' @click='toggleEc($event)'>
        <span v-if="ecCount < 10" class='dashboard_element_count'>0{{ ecCount }}</span>
        <span v-else class='dashboard_element_count'>{{ ecCount }}</span>
        <span class='dashboard_element_title' id='ec'>En Cours</span>
      </div>
      <div class='dashboard_element active' @click='toggleFerme($event)'>
        <span v-if="fermeCount < 10" class='dashboard_element_count'>0{{ fermeCount }}</span>
        <span v-else class='dashboard_element_count'>{{ fermeCount }}</span>
        <span class='dashboard_element_title' id='ferme'>Fermé</span>
      </div>
    </div>
  </div>
  <div v-if="tickets.length > 0" class="table-wrap">
    <div class="table_header">
      <div>
        <select @change="tableSizeUpdate">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div>
        <input type="checkbox" @click='toggleAllTickets' id="cb_old_ticket" />
        <label for="cb_old_ticket">Afficher les tickets fermés des jours précédents</label>
      </div>
      <div>
        <router-link v-bind:to="{ name: 'NewTicket' }" class="add_ticket_link">Ajouter</router-link>
      </div>
    </div>
    <div class="table_content">
      <table>
        <thead>
          <tr>
            <th class="date_col" @click="sort('date')" nowrap>
              <div>
                <label>Date</label>
                <span v-if="currentSort == 'date'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('societe')" nowrap>
              <div>
                <label>Société</label>
                <span v-if="currentSort == 'societe'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon sort_neutral"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('nom')" nowrap>
              <div>
                <label>Nom</label>
                <span v-if="currentSort == 'nom'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('tel')" nowrap>
              <div>
                <label>Tel</label>
                <span v-if="currentSort == 'tel'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('mail')" nowrap>
              <div>
                <label>@mail</label>
                <span v-if="currentSort == 'mail'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('type')" nowrap>
              <div>
                <label>Type</label>
                <span v-if="currentSort == 'type'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('contrat')" nowrap>
              <div>
                <label>CA</label>
                <span v-if="currentSort == 'contrat'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('store')" nowrap>
              <div>
                <label>Store</label>
                <span v-if="currentSort == 'store'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th @click="sort('etat')" nowrap>
              <div>
                <label>Etat</label>
                <span v-if="currentSort == 'etat'" class="sort_icon"><font-awesome-icon v-if="currentSortDir == 'asc'" icon="caret-up" class="sort_icon_asc" />
                  <font-awesome-icon v-else-if="currentSortDir == 'desc'" icon="caret-down" class="sort_icon_desc" />
                </span>
                <span v-else class="sort_icon"><font-awesome-icon icon="sort" /></span>
              </div>
            </th>
            <th class='icontd'></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in sortedTickets" :key="ticket.id" v-tooltip="ticket.commentaire">
            <td>{{ ticket.date | formatDate }}</td>
            <td>{{ ticket.societe }}</td>
            <td>{{ ticket.nom }}</td>
            <td>{{ ticket.tel }}</td>
            <td><a v-bind:href="'mailto:'+ticket.mail">{{ ticket.mail }}</a></td>
            <td>{{ ticket.type }}</td>
            <td class='center_col'><span v-if="ticket.contrat == true"><font-awesome-icon icon="check" /></span></td>
            <td class='center_col'><span v-if="ticket.store == true"><font-awesome-icon icon="check" /></span></td>
            <td class='center_col'><div class='app_etat_btn' v-bind:class='ticket.etat' @click='toggleEtat(ticket, $event)'><span>{{ onlyUppercase(ticket.etat) }}</span></div></td>
            <td>
              <router-link v-bind:to="{ name: 'EditTicket', params: { id: ticket._id } }"><font-awesome-icon class='icon' id='edit' icon="edit" /></router-link>
              <router-link v-bind:to="{ name: 'DeleteTicket', params: { id: ticket._id } }"><font-awesome-icon class='icon' id='trash' icon="trash" /></router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="page">{{ (currentPage-1) * pageSize + 1 }} - {{ (nouveauCount + ecCount + fermeCount &lt; currentPage * pageSize ? nouveauCount + ecCount + fermeCount : currentPage * pageSize ) }} ({{ tickets.filter((ticket) => this.printable(ticket)).length }})</div>
      <i class="paginate prevPage" @click="prevPage($event)" v-bind:class="prevPageBtnClass"><font-awesome-icon icon="angle-left" /></i>
      <i class="paginate nextPage" @click="nextPage($event)" v-bind:class="nextPageBtnClass"><font-awesome-icon icon="angle-right" /></i>
    </div>
  </div>
  <div v-else>
    Il n'y a aucun ticket... En ajouter un?<br /><br />
    <router-link v-bind:to="{ name: 'NewTicket' }" class="add_ticket_link">Ajouter</router-link>
  </div>
</div>
</template>

<script>
import TicketsService from '@/services/TicketsService'
export default {
  name: 'tickets',
  data () {
    return {
      tickets: [],
      nouveauCount: '',
      nouveauFilter: '',
      ecCount: '',
      ecFilter: '',
      fermeCount: '',
      fermeFilter: '',
      currentSort: 'date',
      currentSortDir: 'desc',
      pageSize: 5,
      currentPage: 1,
      allTickets: false,
      nextPageBtnClass: 'disable',
      prevPageBtnClass: 'disable'
    }
  },
  created () {
    this.nouveauFilter = true
    this.ecFilter = true
    this.fermeFilter = true
  },
  mounted () {
    this.getTickets()
    this.$socket.on('NEW_TICKET', (data) => {
      this.tickets.unshift(data)
      this.updateDashboard()
    })
    this.$socket.on('UPTODATE_TICKET', (data) => {
      var ticket = this.tickets[this.getTicketIndexById(data._id)]
      ticket.societe = data.societe
      ticket.nom = data.nom
      ticket.tel = data.tel
      ticket.mail = data.mail
      ticket.type = data.type
      ticket.date = data.date
      ticket.contrat = data.contrat
      ticket.store = data.store
      ticket.commentaire = data.commentaire
      ticket.etat = data.etat
      this.updateDashboard()
    })
    this.$socket.on('TICKET_DELETED', (id) => {
      this.tickets.splice(this.getTicketIndexById(id), 1)
      this.updateDashboard()
    })
  },
  methods: {
    async getTickets () {
      const response = this.allTickets ? await TicketsService.fetchAllTickets() : await TicketsService.fetchTickets()
      this.tickets = response.data.tickets
      this.prevPageBtnClass = 'disable'
      if (this.tickets.length > this.pageSize) this.nextPageBtnClass = null
      else this.nextPageBtnClass = 'disable'
      this.updateDashboard()
    },
    async toggleAllTickets () {
      this.allTickets = !this.allTickets
      this.currentPage = 1
      this.getTickets()
    },
    async toggleEtat (ticket, event) {
      var params = {
        id: ticket._id,
        societe: ticket.societe,
        nom: ticket.nom,
        tel: ticket.tel,
        mail: ticket.mail,
        type: ticket.type,
        date: ticket.date,
        contrat: ticket.contrat,
        store: ticket.store,
        commentaire: ticket.commentaire
      }
      var etatBtnClass = event.target.closest('.app_etat_btn').classList
      if (etatBtnClass.contains('Nouveau')) {
        params.etat = 'EC'
        etatBtnClass.replace('Nouveau', 'EC')
      } else if (etatBtnClass.contains('EC')) {
        params.etat = 'Ferme'
        etatBtnClass.replace('EC', 'Ferme')
      } else if (etatBtnClass.contains('Ferme')) {
        params.etat = 'Nouveau'
        etatBtnClass.replace('Ferme', 'Nouveau')
      }
      await this.$socket.emit('UPDATE_TICKET', params)
    },
    getTicketIndexById (id) {
      return this
        .tickets
        .map((ticket) => ticket._id)
        .indexOf(id)
    },
    countEtat (type) {
      return this
        .tickets
        .filter((ticket) => ticket.etat === type)
        .length
    },
    updateDashboard () {
      this.nouveauCount = this.countEtat('Nouveau')
      this.ecCount = this.countEtat('EC')
      this.fermeCount = this.countEtat('Ferme')
    },
    isNouveau (ticket) {
      if (ticket.etat === 'Nouveau' && this.nouveauFilter) {
        return true
      }
      return false
    },
    isEc (ticket) {
      if (ticket.etat === 'EC' && this.ecFilter) {
        return true
      }
      return false
    },
    isFerme (ticket) {
      if (ticket.etat === 'Ferme' && this.fermeFilter) {
        return true
      }
      return false
    },
    printable (ticket) {
      return this.isNouveau(ticket) + this.isEc(ticket) + this.isFerme(ticket)
    },
    toggleNouveau (event) {
      event.target.closest('.dashboard_element').classList.toggle('active')
      this.nouveauFilter = !this.nouveauFilter
    },
    toggleEc (event) {
      event.target.closest('.dashboard_element').classList.toggle('active')
      this.ecFilter = !this.ecFilter
    },
    toggleFerme (event) {
      event.target.closest('.dashboard_element').classList.toggle('active')
      this.fermeFilter = !this.fermeFilter
    },
    sort (column) {
      if (column === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = column
    },
    nextPage (event) {
      if ((this.currentPage * this.pageSize) < this.tickets.filter((ticket) => this.printable(ticket)).length) {
        this.currentPage++
        this.prevPageBtnClass = null
        if (this.currentPage >= Math.ceil(this.tickets.filter((ticket) => this.printable(ticket)).length / this.pageSize)) this.nextPageBtnClass = 'disable'
      }
    },
    prevPage (event) {
      if (this.currentPage > 1) {
        this.currentPage--
        this.nextPageBtnClass = null
        if (this.currentPage <= 1) this.prevPageBtnClass = 'disable'
      }
    },
    onlyUppercase (string) {
      return string.length > 2 ? string.slice(0, 1) : string
    },
    tableSizeUpdate () {
      this.currentPage = 1
      this.pageSize = event.target.value
      this.prevPageBtnClass = 'disable'
      if (this.tickets.length > this.pageSize) this.nextPageBtnClass = null
      else this.nextPageBtnClass = 'disable'
    }
  },
  computed: {
    sortedTickets () {
      return this.tickets
        .slice().sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        })
        .filter((ticket) => this.printable(ticket))
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize
          let end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
        })
    }
  }
}
</script>

<style>
@import '../assets/css/ticket.css'
</style>
