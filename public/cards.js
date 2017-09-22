$(function () {

  const CARD_SCALE = 0.7;
  const CHIP_SCALE = 0.7;
  const CIGAR_SCALE = 0.13;
  cards = [];
  chips = [];
  playercloths = [];
  playerclothlabels = [];
  loaded = false;

  playerN = 100;

  // -- LOADING -- //

  var queue = new createjs.LoadQueue(true);
  queue.loadManifest(
    [
    {id:"cardClubs2", src:"cardClubs2.png"},
    {id:"cardClubs3", src:"cardClubs3.png"},
    {id:"cardClubs4", src:"cardClubs4.png"},
    {id:"cardClubs5", src:"cardClubs5.png"},
    {id:"cardClubs6", src:"cardClubs6.png"},
    {id:"cardClubs7", src:"cardClubs7.png"},
    {id:"cardClubs8", src:"cardClubs8.png"},
    {id:"cardClubs9", src:"cardClubs9.png"},
    {id:"cardClubs10", src:"cardClubs10.png"},
    {id:"cardClubsJ", src:"cardClubsJ.png"},
    {id:"cardClubsQ", src:"cardClubsQ.png"},
    {id:"cardClubsK", src:"cardClubsK.png"},
    {id:"cardClubsA", src:"cardClubsA.png"},
    {id:"cardDiamonds2", src:"cardDiamonds2.png"},
    {id:"cardDiamonds3", src:"cardDiamonds3.png"},
    {id:"cardDiamonds4", src:"cardDiamonds4.png"},
    {id:"cardDiamonds5", src:"cardDiamonds5.png"},
    {id:"cardDiamonds6", src:"cardDiamonds6.png"},
    {id:"cardDiamonds7", src:"cardDiamonds7.png"},
    {id:"cardDiamonds8", src:"cardDiamonds8.png"},
    {id:"cardDiamonds9", src:"cardDiamonds9.png"},
    {id:"cardDiamonds10", src:"cardDiamonds10.png"},
    {id:"cardDiamondsJ", src:"cardDiamondsJ.png"},
    {id:"cardDiamondsQ", src:"cardDiamondsQ.png"},
    {id:"cardDiamondsK", src:"cardDiamondsK.png"},
    {id:"cardDiamondsA", src:"cardDiamondsA.png"},
    {id:"cardHearts2", src:"cardHearts2.png"},
    {id:"cardHearts3", src:"cardHearts3.png"},
    {id:"cardHearts4", src:"cardHearts4.png"},
    {id:"cardHearts5", src:"cardHearts5.png"},
    {id:"cardHearts6", src:"cardHearts6.png"},
    {id:"cardHearts7", src:"cardHearts7.png"},
    {id:"cardHearts8", src:"cardHearts8.png"},
    {id:"cardHearts9", src:"cardHearts9.png"},
    {id:"cardHearts10", src:"cardHearts10.png"},
    {id:"cardHeartsJ", src:"cardHeartsJ.png"},
    {id:"cardHeartsQ", src:"cardHeartsQ.png"},
    {id:"cardHeartsK", src:"cardHeartsK.png"},
    {id:"cardHeartsA", src:"cardHeartsA.png"},
    {id:"cardSpades2", src:"cardSpades2.png"},
    {id:"cardSpades3", src:"cardSpades3.png"},
    {id:"cardSpades4", src:"cardSpades4.png"},
    {id:"cardSpades5", src:"cardSpades5.png"},
    {id:"cardSpades6", src:"cardSpades6.png"},
    {id:"cardSpades7", src:"cardSpades7.png"},
    {id:"cardSpades8", src:"cardSpades8.png"},
    {id:"cardSpades9", src:"cardSpades9.png"},
    {id:"cardSpades10", src:"cardSpades10.png"},
    {id:"cardSpadesJ", src:"cardSpadesJ.png"},
    {id:"cardSpadesQ", src:"cardSpadesQ.png"},
    {id:"cardSpadesK", src:"cardSpadesK.png"},
    {id:"cardSpadesA", src:"cardSpadesA.png"},
    {id:"chipBlack", src:"chipBlackWhite.png"},
    {id:"chipBlue", src:"chipBlueWhite.png"},
    {id:"chipGreen", src:"chipGreenWhite.png"},
    {id:"chipRed", src:"chipRedWhite.png"},
    {id:"card_bg", src:"cardBack_blue5.png"},
    {id:"cloth_bg", src:"cloth_bg.png"},
    {id:"cigar", src:"cigar.png"},
    ]);

    // -- CLOTH CREATION -- //
    for (var i = 0; i < 4; i++) {
      var playercloth = new createjs.Container();
      var playerlabel = new createjs.Text("Player " + (i+1) + "'s Cards", "bold 30px Arial", "#FFFFFF");
      switch (i) {
        case 0:
          playercloth.x = 0;
          playercloth.y = 715;
          playerlabel.x = 125;
          playerlabel.y = 25;
          break;
        case 1:
          playercloth.x = 650;
          playercloth.y = 715;
          playerlabel.x = 140;
          playerlabel.y = 25;
          break;
        case 2:
          playercloth.x = 650
          playercloth.y = 0;
          playerlabel.x = 140;
          playerlabel.y = 25;
          break;
        case 3:
          playercloth.x = 0;
          playercloth.y = 0;
          playerlabel.x = 140;
          playerlabel.y = 25;
          break;
      }
      playercloths.push(playercloth);
      playerclothlabels.push(playerlabel);
    }
  // -- ON LOADING COMPLETE -- //
  queue.on('complete',function(evt){
    stage.removeChild(progtext);

    // CLOTHS
    var clothimg = queue.getResult("cloth_bg");

    for (var i = 0; i < 4; i++) {
      var plyr = new createjs.Bitmap(clothimg);
      plyr.scaleX=0.53;
      plyr.scaleY=0.25;

      var hue = 0;
      var brightness = 0;
      switch (i) {
        case 0:
          hue = 100;
          break;
        case 1:
          hue = 180;
          break;
        case 2:
          hue = 20;
          break;
        case 3:
          brightness = 50;
          hue = 60;
          break;
      }
      var colormatrix = new createjs.ColorMatrix().adjustHue(hue).adjustBrightness(brightness);
      plyr.filters = [ new createjs.ColorMatrixFilter(colormatrix)];
      var bounds = plyr.getBounds();
      playerclothlabels[i].textAlign = "center";

    	playercloths[i].addChild(plyr,playerclothlabels[i]);
      plyr.cache(plyr.x,plyr.y,bounds.width,bounds.height);
    	stage.addChild(playercloths[i]);
    }

    stage.update();

    loadCards();
    loadChips();
    for (var i = 0; i < playercloths.length; i++) {
      stage.setChildIndex( playercloths[i], stage.getNumChildren() - (i+1));
    }
    loaded = true;
  });

  // --- SOCKET STUFF --- //
  var socket = io();

  socket.on('update card',function(data){
    if (loaded) {
      cards[data.card].x = data.x;
      cards[data.card].y = data.y;
      if(data.flipped == true) {
        var img = queue.getResult("card_bg");
        if (cards[data.card].image != img) {
          cards[data.card].image = img
        }
      } else {
        var img = queue.getResult("card" + data.name);
        if (cards[data.card].image != img) {
          cards[data.card].image = img
        }
      }
      if (cards[data.card].scaleX != data.scale) {
        cards[data.card].scaleX = data.scale;
        cards[data.card].scaleY = data.scale;
      }
      var hue=0;
      switch (data.player) {
        case 0:
          hue = 100;
          break;
        case 1:
          hue = 180;
          break;
        case 2:
          hue = 20;
          break;
        case 3:
          hue = 60;
          break;
      }
      stage.setChildIndex( cards[data.card], stage.getNumChildren() - ((playercloths.length + 1) + (chips.length))); // PLAYER CLOTHS
      stage.update();
    }

  });

  socket.on('update item',function(data){
    if (loaded) {
      chips[data.chip].x = data.x;
      chips[data.chip].y = data.y;
      stage.setChildIndex( chips[data.chip], stage.getNumChildren() - 1); // PLAYER CLOTHS
      stage.update();
    }

  });

  // TODO: IMPLEMENT IF DISCONNECT, CLEAR CARDS!!

  socket.on('flipcard',function(data){
    if (loaded) {
      if(data.flipped) {
        var img = queue.getResult("card_bg");
        cards[data.card].image = img

      } else {
        var img = queue.getResult("card" + data.name);
        cards[data.card].image = img
      }
      stage.update();
    }

  });

  socket.on('spawnitem',function(chipdata){
    if (loaded) {
      var img = queue.getResult(chipdata.name);
      var ch = new createjs.Bitmap(img);
      ch.x = chipdata.x;
      ch.y = chipdata.y;
      if (chipdata.name == "cigar") {
        itemscale = CIGAR_SCALE;
        ch.rotation = -20;
      } else {
        itemscale = CHIP_SCALE;
      }
      ch.scaleX = itemscale;
      ch.scaleY = itemscale;

      ch.on("pressmove",function(evt) {
        mobileDblClick = false;
        evt.target.x = evt.stageX - 23;
        evt.target.y = evt.stageY - 23;

        var data = {
          chip: chips.indexOf(evt.target),
          x: evt.target.x,
          y: evt.target.y,
          player: playerN
        };
        socket.emit('item move', data); // CHECK IF OTHER PLAYER DECK!
        stage.setChildIndex( chips[data.chip], stage.getNumChildren() - 1);
        stage.update();
      });

      stage.addChild(ch);
      stage.setChildIndex(ch, stage.getNumChildren() - 1);
      chips.push(ch)
      stage.update();
    } else {
      var props = {
        x: chipdata.x,
        y: chipdata.y,
        name: chipdata.name,
      }
      server_initial_chips.push(props)
    }
  });

  socket.on('reveal',function(n) {
    if (typeof playercloths[n] !== "undefined") {
      playercloths[n].alpha = 0.3;
      playerclothlabels[n].text = "YOUR CARDS"
    }
  });

  socket.on('playerno', function(no) {
    playerN = no;
    playertext.text = "You are Player " + (no+1);
  });

  socket.on('send cards', function(recv_cards){
    server_initial_cards = recv_cards;
  });

  socket.on('send chips', function(recv_chips){
    server_initial_chips = recv_chips;
  });

  var stage = new createjs.Stage("game");
  createjs.Touch.enable(stage, true, false);
  stage.enableMouseOver(10);
  createjs.Ticker.addEventListener("tick", stage);
  var bg = new createjs.Bitmap("background.jpg");
  bg.x = 0
  bg.y = 0
  bg.image.onload = function() { stage.update(); }
  stage.addChild(bg);

  var progtext = new createjs.Text("Loading...", "bold 10px Arial","#FFFFFF")
  progtext.x = progtext.y = 20;
  stage.addChild(progtext);
  queue.on('progress',function(evt){
    progtext.text = "Loading... " + Math.floor(evt.loaded * 100) + '%';
    stage.update();
  });

  var playertext = new createjs.Text("You are spectating.", "20px Arial","#FFFFFF")
  playertext.x = 20;
  playertext.y = 615;
  stage.addChild(playertext);


  var shuffle = new createjs.Text("SHUFFLE", "bold 25px Arial","#ff5214");
  shuffle.x = 50;
  shuffle.y = 650;
  shuffle.on("mouseover",function() { shuffle.color = "#ffa500"});
  shuffle.on("mouseout",function() {
    shuffle.color = "#ff5214";
  });
  shuffle.on("click", function() { socket.emit('shuffle');});
  stage.addChild(shuffle);


  function flipCard(crd) {
    socket.emit('card flipped',cards.indexOf(crd));
  }

  var mobilePressTimer;
  var mobileDblClick;

  function loadCards() {
    for (var i = 0; i < server_initial_cards.length; i++) {
      var img = queue.getResult("card" + server_initial_cards[i].name);
      var c = new createjs.Bitmap(img);
      c.x = server_initial_cards[i].x;
      c.y = server_initial_cards[i].y;
      c.scaleX = CARD_SCALE;
      c.scaleY = CARD_SCALE;

      c.on("pressmove",function(evt) {

        allowedToMove = true;
        for (var i = 0; i < playercloths.length; i++) {
          var pt = playercloths[i].globalToLocal(evt.target.x + 20, evt.target.y + 20);
          if (playercloths[i].hitTest(pt.x,pt.y) && i != playerN) {
            allowedToMove = false;
          }
        }
        if (allowedToMove) {
          evt.target.x = evt.stageX - 49;
          evt.target.y = evt.stageY - 66;


          var cardincloth = false;
          playercloths.forEach(function(elem){
            var pt = elem.globalToLocal(evt.target.x + 20, evt.target.y + 20);
            if (elem.hitTest(pt.x, pt.y)) { // TODO: FIX
              evt.target.scaleX = CARD_SCALE - 0.2;
              evt.target.scaleY  = CARD_SCALE - 0.2;
              cardincloth = true;
            }
          });
          if (!cardincloth) {
            evt.target.scaleX = CARD_SCALE;
            evt.target.scaleY = CARD_SCALE;
          }
          var data = {
            card: cards.indexOf(evt.target),
            x: evt.target.x,
            y: evt.target.y,
            scale: evt.target.scaleX,
            player: playerN
          };
          socket.emit('cardmove', data); // CHECK IF OTHER PLAYER DECK!
          stage.update();
        }
      });

      c.on("click", function(evt) {
          clearTimeout(mobilePressTimer);
          if (mobileDblClick) {
            flipCard(evt.target);
            mobileDblClick = false;
          } else {
            mobileDblClick = true;
            mobilePressTimer = setTimeout(function(){ mobileDblClick = false; },200)
          }

      });
      stage.addChild(c);
      cards.push(c)
      if(server_initial_cards[i].flipped == true) {
        var img = queue.getResult("card_bg");
        cards[i].image = img;
        //cards[i].image.onload = function() { stage.update(); }
      }

      stage.update();
    }
  }

  function loadChips() {

    for (var i = 0; i < server_initial_chips.length; i++) {
      var img = queue.getResult(server_initial_chips[i].name);
      var ch = new createjs.Bitmap(img);
      ch.x = server_initial_chips[i].x;
      ch.y = server_initial_chips[i].y;
      if (server_initial_chips[i].name == "cigar") {
        itemscale = CIGAR_SCALE;
        ch.rotation = -20;
      } else {
        itemscale = CHIP_SCALE;
      }
      ch.scaleX = itemscale;
      ch.scaleY = itemscale;

      ch.on("pressmove",function(evt) {
        mobileDblClick = false;
        evt.target.x = evt.stageX - 23;
        evt.target.y = evt.stageY - 23;

        var data = {
          chip: chips.indexOf(evt.target),
          x: evt.target.x,
          y: evt.target.y,
          player: playerN
        };
        socket.emit('item move', data); // CHECK IF OTHER PLAYER DECK!
        stage.setChildIndex( chips[data.chip], stage.getNumChildren() - 1);
        stage.update();
      });

      stage.addChild(ch);
      stage.setChildIndex(ch, stage.getNumChildren() - 1);
      chips.push(ch)
      stage.update();
    }
  }

  setInterval(gameTick,10);

  function gameTick() {
    for (var i = 0; i < playercloths.length; i++) {
      if (typeof playercloths[i] !== "undefined") {
        if (playercloths[i].alpha != 1 && i != playerN) {
          playercloths[i].alpha = 1;
          playerclothlabels[i].text = "Player " + (i+1) + "'s Cards";
        }
      }
    }
  }

});
