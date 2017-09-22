var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var readline = require('readline');

const CARD_SCALE = 0.7;
const CHIP_SCALE = 0.7;

var cards = [];
var chips = [];
deckNames = ["Clubs","Diamonds","Hearts","Spades"]
cardNames = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

var playerIDs = [];

for (var i = 0; i < deckNames.length; i++) {
  for (var j = 0; j < cardNames.length; j++) {
    var card = {
      x: 100,
      y: 300,
      name: deckNames[i] + cardNames[j],
      flipped: true
    }
    cards.push(card);
  }
}


app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket) {
  console.log("User has connected!");
  playerIDs.push(socket.id);
  socket.emit('playerno', playerIDs.indexOf(socket.id));
  socket.emit('send cards', cards);
  socket.emit('send chips', chips);

  socket.on('cardmove',function(data) {
    cards[data.card].x = data.x;
    cards[data.card].y = data.y;
    var card_data = {
      name: cards[data.card].name,
      card: data.card,
      x: data.x,
      y: data.y,
      flipped: cards[data.card].flipped,
      scale: data.scale,
      player: data.player
    }
    io.sockets.emit('update card', card_data);
  });

  socket.on('item move',function(data) {
    chips[data.chip].x = data.x;
    chips[data.chip].y = data.y;
    var chip_data = {
      name: chips[data.chip].name,
      chip: data.chip,
      x: data.x,
      y: data.y,
      player: data.player
    }
    io.sockets.emit('update item', chip_data);
  });

  socket.on('card flipped',function(cardno) {
    cards[cardno].flipped = !cards[cardno].flipped;
    var card_data = {
      name: cards[cardno].name,
      card: cardno,
      flipped: cards[cardno].flipped
    }
    io.sockets.emit('flipcard', card_data);
  });

  socket.on('shuffle',function() { // FISHER-YATES SHUFFLE
    for (let i = cards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
    }
    for (var i = 0; i < cards.length; i++) {
      cards[i].x = 100;
      cards[i].y = 300;
      cards[i].flipped = true;
      var card_data = {
        name: cards[i].name,
        card: i,
        x: cards[i].x,
        y: cards[i].y,
        flipped: cards[i].flipped,
        scale: CARD_SCALE
      }
      io.sockets.emit('update card', card_data)
    }
  })

  socket.on('disconnect', function() {
    var index = playerIDs.indexOf(socket.id);
    playerIDs.splice(index,1);
    console.log(playerIDs);
    for (var i = 0; i < playerIDs.length; i++) {
      io.sockets.connected[playerIDs[i]].emit('playerno',i);
    }
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

setInterval(tick, 10);

function tick() {
  if (playerIDs.length > 0) {
    for (var i = 0; i < playerIDs.length; i++) {
      io.sockets.connected[playerIDs[i]].emit('reveal',i);
    }
  }
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(cmd){
  var args = cmd.split(" ");
  console.log(args);
  switch (args[0]) {
    case 'spawn':
      var chip_data = {
        x: 300,
        y: 400,
        name: args[1]
      }
      for (var i = 0; i < args[2]; i++) {
        io.sockets.emit("spawnitem", chip_data);
        chips.push(chip_data);
      }
      break;
    case "stop":
      Object.keys(io.sockets.sockets).forEach(function(s) {
        io.sockets.sockets[s].disconnect(true);
      });
      process.exit();
      break;
    case "clear":
      console.log('\033c');
      console.log('TABLETOP CARDS - Card Tabletop Simulator')
      console.log('Nicolás de Ory 2017\r\n')
      break;
    default:
      console.log('Unknown command: ' + cmd);
  }
});
