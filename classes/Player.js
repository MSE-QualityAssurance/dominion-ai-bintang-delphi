class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.deck = [];
    this.discardPile = [];
    this.actions = 1; // Adding an actions property
    // Add more properties and methods as needed
  }

  async performAction(rl, game) {
    while (this.actions > 0) {
      const actionCards = this.hand.filter(card => card.type === "Action");

      if (actionCards.length === 0) {
        console.log(`${this.name} has no action cards to play.`);
        break;
      }

      console.log(`${this.name}'s action cards:`);
      actionCards.forEach((card, index) => {
        console.log(`${index + 1}: ${card.name}`);
      });

      const questionAsync = (query) => new Promise(resolve => rl.question(query, resolve));

      const cardIndex = await questionAsync('Choose an action card to play (enter number, or 0 to skip): ');
      const index = parseInt(cardIndex) - 1;

      if (index >= 0 && index < actionCards.length) {
        const selectedCard = actionCards[index];
        console.log(`${this.name} plays ${selectedCard.name}.`);
        selectedCard.play(this, game); // Assuming play method reduces action count
        this.discardPile.push(selectedCard); // Move the card to the discard pile
        this.hand.splice(this.hand.indexOf(selectedCard), 1); // Remove the card from hand
      } else if (index === -1) {
        console.log(`${this.name} skips playing an action card.`);
        break;
      } else {
        console.log('Invalid choice.');
        break;
      }
    }
  }

  drawCard() {
    if (this.deck.length === 0) {
      // Handle empty deck, possibly reshuffling discard pile
      return;
    }
    const card = this.deck.pop();
    this.hand.push(card);
  }
}

module.exports = { Player };
