function startPlayerTurn(player) {
  // Example: Draw 5 cards at the start of the turn
  for (let i = 0; i < 5; i++) {
    player.drawCard();
  }
  
  // Then proceed with the rest of the turn
  // ...
}

module.exports = {
  startPlayerTurn
}