const { Card } = require('./Card')
const { villageEffect } = require('../utils/effects')

const DominionGame = {
  players: [],
  cards: [],
  initializeDecks() {
    this.players.forEach(player => {
      // Add Treasure cards
      for (let i = 0; i < 7; i++) {
        player.deck.push(new Card("Copper", 0, "Treasure", null, 1)); // Add Copper with value
      }
      // Add Victory cards
      for (let i = 0; i < 3; i++) {
        player.deck.push(new Card("Estate", 2, "Victory"));
      }
      // Shuffle the deck
      // ...
    }); 
  },  
  nextPlayer() {
    // Logic to determine the next player's turn
  },
  // Add more properties and methods as needed
};

module.exports = { DominionGame }