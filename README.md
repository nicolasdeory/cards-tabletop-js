# Cards-tabletop-js

An online tabletop simulator with cards and poker chips.
Made with NodeJS, Socket.io and CreateJS.

https://github.com/nicolasdeory/cards-tabletop-js/assets/1417708/b4e98ce6-63a7-47a4-9b8e-371859b7e599

### Features

 *  Ability to freely move and flip cards ,with all movements synced with all clients.
 * Every player (up to 4) has a cloth where they can store cards without anyone else seeing, moving, or flipping them.
 * These cloths are useful to play card games where each player should only be able to see their cards.
 * Shuffle deck button accessible to all players.
 * Console commands

Right now, any player who joins the session beyond the fourth one, will be able to move cards and chips normally, but they won't have a personal cloth to store their cards.

### How to run
`node index.js`
Then navigate to `localhost:3000` or `<YOUR_HOST_IP>:3000`

### Console Commands

**Spawn Item**
```
spawn <item> [n]
```
Places *n* objects of the type specified, at the default location. Example: spawn chipRed 2

For an updated list of available items, check [index.js](https://github.com/guachitonico/cards-tabletop-js/blob/master/index.js)

**Stop Server**
```
stop
```
Disconnects all sockets from the server. Right now it works essentially the same as ending the NodeJS process or closing the console.






### TODO:

  * Dynamically add player cloths based on player count
  * Player cursors
  
### Artwork:

 * [Playing Cards and Chips by UnkindFox](https://opengameart.org/content/playing-card-assets-52-cards-deck-chips)
