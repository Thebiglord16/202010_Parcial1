let socket_io = require("socket.io");
var io = socket_io();

const mongo = require("./db/mongo");

io.on('connection', function (socket) {

    mongo.getDatabase(db => {
        mongo.findPropuestas(db, docs => {
            io.sockets.emit('messages', docs);
        });
    })

    socket.on("new-message", data => {
        mongo.getDatabase(db => {
            mongo.findPropuestas(db, docs =>{
                if(docs.length == 0) data.oferta = 15000000;
                else {
                    data.oferta = docs[docs.length-1].oferta + Math.random() * 5000000 + 5000000;
                    console.log(docs[docs.length-1].oferta);
                }
                mongo.insertPropuesta(db, () =>{
                    console.log(data);
                    sendNotification();
                }, data)
            })
        })
    })
});

sendNotification = () => {
    mongo.getDatabase(db => {
        mongo.findPropuestas(db, docs => {
            io.sockets.emit('messages', docs);
        });
    })
}

module.exports.sendNotification = sendNotification;
module.exports.io = io;
