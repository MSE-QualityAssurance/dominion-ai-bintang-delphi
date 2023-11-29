function performCleanupPhase(player) {
  console.log(`${player.name}'s Cleanup Phase`);

  // Move all cards from hand and play area to discard pile
  player.discardPile.push(...player.hand);
  player.hand = [];

  // Draw a new hand of 5 cards
  for (let i = 0; i < 5; i++) {
    player.drawCard();
  }
}

module.exports = {
  performCleanupPhase
}