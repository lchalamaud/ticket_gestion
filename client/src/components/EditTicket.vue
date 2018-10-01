<template>
<div class="tickets">
  <h2>Editer le Ticket</h2>
  <div class="form">
    <div>
      <input type="text" class="text_input" name="societe" placeholder="Société" v-model="societe">
    </div>
    <div>
      <input type="text" class="text_input" name="nom" placeholder="Nom P." v-model="nom">
    </div>
    <div>
      <input type="text" class="text_input" name="tel" placeholder="Téléphone" v-model="tel">
    </div>
    <div>
      <input type="text" class="text_input" name="mail" placeholder="@mail" v-model="mail">
    </div>
    <div>
      <textarea name="commentaire" placeholder="Ajouter un commentaire..." v-model="commentaire"></textarea>
    </div>
    <div>
      <select v-model="etat">
        <option value="Nouveau">Nouveau</option>
        <option value="EC">EC</option>
        <option value="Ferme">Fermé</option>
      </select>
    </div>
    <div>
      <date-picker v-model="date" type="datetime" class="datetime" :lang="lang" :time-picker-options="timePickerOptions" format="[le] MM-DD-YYYY [à] HH:mm"></date-picker>
    </div>
    <div class="radio_input">
      <input type="radio" name="type" id="achat" value="Achat" v-model="type" checked><label for="achat">Achat</label>
      <input type="radio" name="type" id="location" value="Loc." v-model="type"><label for="location">Location</label>
    </div>
    <div class="checkbox_input">
      <input type="checkbox" name="contrat" id="contrat" v-model="contrat"><label for="contrat">Contrat d'assistance</label>
      <input type="checkbox" name="store" id="store" v-model="store"><label for="store">Accès au store</label>
    </div>
    <div>
      <button class="app_ticket_btn" @click="updateTicket">Editer</button>
      <router-link v-bind:to="{ name: 'Tickets'}" class="app_ticket_btn">Annuler</router-link>
    </div>
  </div>
</div>
</template>

<script>
import TicketsService from '@/services/TicketsService'
export default {
  name: 'EditTicket',
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
      lang: 'fr',
      timePickerOptions: {
        start: '00:00',
        step: '00:15',
        end: '23:45'
      }
    }
  },
  mounted () {
    this.getTicket()
  },
  methods: {
    async getTicket () {
      const response = await TicketsService.getTicket({
        id: this.$route.params.id
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
    async updateTicket () {
      var ticket = {
        id: this.$route.params.id,
        societe: this.societe,
        nom: this.nom,
        tel: this.tel,
        mail: this.mail,
        type: this.type,
        date: this.date,
        contrat: this.contrat,
        store: this.store,
        commentaire: this.commentaire,
        etat: this.etat
      }
      await this.$socket.emit('UPDATE_TICKET', ticket)
      this.$router.push({ name: 'Tickets' })
    }
  }
}
</script>

<style type="text/css" scoped>
.form .text_input,
.form input[type="datetime"],
.form select,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
  border-radius: 4px;
  color: #555;
}
.form .radio_input,
.form .checkbox_input{
  width: 500px;
  margin: 20px auto;
}
.form .radio_input label,
.form .checkbox_input label{
  margin-right: 20px;
}
input[type="checkbox"],
input[type="radio"]{
  width: 20px;
  height: 20px;
  display: inline;
  vertical-align: middle;
}
textarea {
  height: 100px;
}
.form select {
  width: 522px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.form .datetime{
  width: 522px;
  height: 32px;
  font-size: 12px;
  margin: 0;
}
.form .datetime .mx-input-wrapper{
  margin: 0;
}
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
