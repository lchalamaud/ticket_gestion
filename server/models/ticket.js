var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
    societe: String,
    nom: String,
    tel: String,
    mail: String,
    type: String,
    contrat: Boolean,
    store: Boolean,
    commentaire: String,
    date: Date,
    etat: String
});

var Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;