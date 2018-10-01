<template>
  <div class="tickets">
    <h2>Ajouter un ticket</h2>

    <div class="form">
      <div>
        <input type="text" name="societe" placeholder="Société" v-model="societe">
      </div>
      <div>
        <input type="text" name="nom" placeholder="Nom P." v-model="nom">
      </div>
      <div>
        <input type="text" name="tel" placeholder="Téléphone" v-model="tel">
      </div>
      <div>
        <input type="text" name="mail" placeholder="@mail" v-model="mail">
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
        <textarea name="commentaire" placeholder="Ajouter un commentaire..." v-model="commentaire"></textarea>
      </div>
      <div>
        <button class="app_ticket_btn" @click="addTicket">Ajouter</button>
        <router-link v-bind:to="{ name: 'Tickets'}" class="app_ticket_btn">Annuler</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewTicket',
  data () {
    return {
      societe: '',
      nom: '',
      tel: '',
      mail: '',
      type: '',
      contrat: '',
      store: '',
      commentaire: ''
    }
  },
  methods: {
    async addTicket () {
      var newTicket = {
        societe: this.societe,
        nom: this.nom,
        tel: this.tel,
        mail: this.mail,
        type: this.type,
        contrat: this.contrat,
        store: this.store,
        commentaire: this.commentaire,
        date: Date(),
        etat: 'Nouveau'
      }
      console.log(newTicket)
      await this.$socket.emit('ADD_TICKET', newTicket)
      this.$router.push({ name: 'Tickets' })
    }
  }
}
</script>

<style type="text/css" scoped>
.form input[type="text"],
.form select,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
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
.form div {
  margin: 20px;
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
}
a {
  text-decoration: none;
}
</style>
