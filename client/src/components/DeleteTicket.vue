<template>
<div class="tickets">
  <h2>Supprimer le Ticket</h2>
  <p>Voulez-vous supprimer le ticket {{societe}} - {{nom}}</p>
  <button class="app_ticket_btn" @click="deleteTicket">Supprimer</button>
  <router-link v-bind:to="{ name: 'Tickets'}" class="app_ticket_btn">Annuler</router-link>
</div>
</template>

<script>
import TicketsService from '@/services/TicketsService'
export default {
  name: 'DeleteTicket',
  data () {
    return {
      societe: '',
      nom: '',
      tel: '',
      mail: '',
      type: '',
      contrat: '',
      store: '',
      commentaire: '',
      date: '',
      etat: '',
      id: this.$route.params.id
    }
  },
  mounted () {
    this.getTicket()
  },
  methods: {
    async getTicket () {
      const response = await TicketsService.getTicket({
        id: this.id
      })
      this.societe = response.data.societe
      this.nom = response.data.nom
      this.tel = response.data.tel
      this.mail = response.data.mail
      this.date = response.data.date
      this.type = response.data.type
      this.contrat = response.data.contrat
      this.store = response.data.store
      this.commentaire = response.data.commentaire
      this.etat = response.data.etat
    },
    async deleteTicket () {
      this.$socket.emit('DELETE_TICKET', this.id)
      this.$router.push({ name: 'Tickets' })
    }
  }
}
</script>

<style type="text/css" scoped>
.app_ticket_btn {
  background: #ef8534;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 240px;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
</style>
