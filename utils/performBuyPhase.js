async function performBuyPhase(player, rl, game) {
  console.log(`${player.name}'s Buy Phase`);

  // Count coins in hand
  const coins = player.hand.filter(card => card.type === "Treasure").reduce((total, card) => total + card.value, 0);

  console.log(`${player.name} has ${coins} coins to spend.`);

  // Show available cards to buy (simplified)
  console.log("Available cards to buy:");
  game.cards.forEach((card, index) => {
    console.log(`${index + 1}: ${card.name} (Cost: ${card.cost})`);
  });

  const questionAsync = (query) => new Promise(resolve => rl.question(query, resolve));
  const cardIndex = await questionAsync('Choose a card to buy (enter number, or 0 to skip): ');
  const index = parseInt(cardIndex) - 1;

  // Assuming a simplified purchase mechanism
  if (index >= 0 && index < game.cards.length && game.cards[index].cost <= coins) {
    const selectedCard = game.cards[index];
    console.log(`${player.name} buys ${selectedCard.name}.`);
    player.discardPile.push(selectedCard);
    // Subtract coins if necessary, adjust supply, etc.
  } else if (index === -1) {
    console.log(`${player.name} skips buying.`);
  } else {
    console.log('Invalid choice.');
  }
}

module.exports = {
  performBuyPhase
}