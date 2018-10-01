const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const log = require('node-file-logger');

const app = express();
log.SetUserOptions({
    timeZone: 'Europe/Paris',
    folderPath: './logs/',
    dateBasedFileNaming: true,
    fileNamePrefix: 'Logs_',
    fileNameSuffix: '',
    fileNameExtension: '.log',
    dateFormat: 'YYYY_MM_DD',
    timeFormat: 'hh:mm:ss'
});
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(cors());

/***************************
 **   Connect to the DB   **
 ***************************/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tickets', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
    log.Info("Database Connection Succeeded");
})
var Ticket = require("../models/ticket");



/********************
 **   Route HTTP   **
 ********************/

/*  /tickets    */
/*  GET ALL   */
app.get('/tickets/all', function(req, res){
    Ticket.find({}, 'societe nom tel mail type contrat store commentaire date etat', function (error, tickets) {
        if (error) {
            console.error(error);
            log.Error(error);
        }
        res.send({
            tickets: tickets
        })
        log.Info('GET | /tickets/all | SUCCESS');
    }).sort({date:-1})
});

/*  GET TODAY+NOUVEAU+EC   */
app.get('/tickets', function(req, res){
    var today = new Date();
    today.setUTCHours(0, 0, 0, 0)
    Ticket.find({$or : [ { date : { $gte: today } }, { etat : 'Nouveau' }, { etat : 'EC' } ]}, 'societe nom tel mail type contrat store commentaire date etat', function (error, tickets) {
        if (error) {
            console.error(error);
            log.Error(error);
        }
        res.send({
            tickets: tickets
        })
        log.Info('GET | /tickets | SUCCESS');
    }).sort({date:-1})
});

/*  GET ID   */
app.get('/tickets/:id', (req, res) => {
  var db = req.db;
  Ticket.findById(req.params.id, 'societe nom tel mail type contrat store commentaire date etat', function (error, ticket) {
    if (error) {
        console.error(error);
        log.Error(error);
    }
    res.send(ticket);
    log.Info('GET | /ticket/' + req.params.id + ' | SUCCESS');
  })
})


/*********************************
 **   Listenning on port 8081   **
 *********************************/
const server = app.listen(process.env.PORT || 8081, function() {
    log.Info('Server listening on port ' + server.address().port)
});


/***************************
 **   Socket management   **
 ***************************/
const io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('Socket : ' + socket.id + ' -> ON');
    log.Info('Socket : ' + socket.id + ' -> ON')
    socket.on('ADD_TICKET', (data) => {
        var societe = data.societe;
        var nom = data.nom;
        var tel = data.tel;
        var mail = data.mail;
        var type = data.type;
        var contrat = data.contrat?true:false;
        var store = data.store?true:false;
        var commentaire = data.commentaire;
        var date = data.date;
        var etat = data.etat;
        var new_ticket = new Ticket({
            societe: societe,
            nom: nom,
            tel: tel,
            mail: mail,
            type: type,
            contrat: contrat,
            store: store,
            commentaire: commentaire,
            date: date,
            etat: etat
        })
        new_ticket.save(function (error, ticket) {
            if (error) {
                console.log(error)
                log.Error(error);
            }
            io.emit('NEW_TICKET', ticket)
            log.Info('POST | SOCKET ' + socket.id + ' | TICKET_ADDED ' + JSON.stringify(new_ticket) + ' | SUCCESS');
        })
    })
    socket.on('UPDATE_TICKET', (data) => {
        Ticket.findById(data.id, 'societe nom tel mail type contrat store commentaire date etat', function (error, ticket) {
            var beforeTicket = ticket;
            ticket.societe = data.societe;
            ticket.nom = data.nom;
            ticket.tel = data.tel;
            ticket.mail = data.mail;
            ticket.date = data.date;
            ticket.type = data.type;
            ticket.contrat = data.contrat?true:false;
            ticket.store = data.store?true:false;
            ticket.commentaire = data.commentaire;
            ticket.etat = data.etat;
            ticket.save(function (error) {
                if (error) {
                    console.log(error)
                    log.Error(error);
                }
                io.emit('UPTODATE_TICKET', ticket)
                log.Info('UPDATE | /tickets/' + data.id + ' | ' + JSON.stringify(beforeTicket) + ' => ' + JSON.stringify(ticket) + 'SUCCESS');
            })
        })
    })
    socket.on('DELETE_TICKET', (id) => {
        Ticket.deleteOne(
            {
                _id: id
            },
            function (error) {
                if (error) {
                    console.log(error)
                    log.Error(error);
                }
                io.emit('TICKET_DELETED', id)
                log.Info('DEL | /tickets/' + id + ' | SUCCESS');
            }
        )
    })
    socket.on('disconnect', function () {
        console.log('Socket : ' + socket.id + ' -> OFF');
        log.Info('Socket : ' + socket.id + ' -> OFF');
    });
})