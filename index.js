const readline = require('readline');

const { Player } = require('./classes/Player')
const { DominionGame } = require('./classes/DominionGame')
const { Card } = require('./classes/Card')

const { villageEffect } = require('./utils/effects')
const { startPlayerTurn } = require('./utils/startPlayerTurn')
const { performBuyPhase } = require('./utils/performBuyPhase')
const { performCleanupPhase } = require('./utils/performCleanupPhase')

// Create a new Dominion game instance
const game = Object.create(DominionGame);

// Add players to the game
async function addPlayersToGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questionAsync = (query) => new Promise(resolve => rl.question(query, resolve));

  const numPlayers = await questionAsync('How many players do you want to add? ');
  for (let i = 1; i <= numPlayers; i++) {
    const name = await questionAsync(`Enter the name of Player ${i}: `);
    game.players.push(new Player(name));
  }

  rl.close();

  // Add cards and initialize decks
  addCardsToGame();
  game.initializeDecks();

  // Start the game after all players have been added
  startGame();
}

addPlayersToGame();

// Add cards to the game
function addCardsToGame() {
  // game.cards.push(new Card("Village", 3, "Action", villageEffect));
  game.cards.push(new Card("Copper", 0, "Treasure", null, 1)); // Copper value is 1
  game.cards.push(new Card("Silver", 3, "Treasure", null, 2)); // Silver value is 2
  game.cards.push(new Card("Gold", 6, "Treasure", null, 3)); // Gold value is 3

}

addCardsToGame();
// Add more cards as needed

// Initialize player decks
game.initializeDecks();

// Start the game
function startGame() {
  // Create an interface for input and output
  if (game.players.length === 0) {
    console.log("No players have been added to the game.");
    return;
  }

  let turnCount = 0;
  const maxTurns = game.players.length * 3

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Simple game loop
  let currentPlayerIndex = 0;

  async function nextTurn() {
    const currentPlayer = game.players[currentPlayerIndex];

    // Start player's turn by drawing cards
    startPlayerTurn(currentPlayer);

    // Action Phase
    await currentPlayer.performAction(rl, game);

    // Buy Phase
    await performBuyPhase(currentPlayer, rl, game);

    // Cleanup Phase
    performCleanupPhase(currentPlayer);

    currentPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    if (currentPlayerIndex === 0) {
      turnCount++; // Increment turn count after a full round
    }

    // Check for game-ending condition
    if (turnCount >= maxTurns) {
      endGame();
    } else {
      await nextTurn();
    }
  }

  function endGame() {
    console.log("Game Over");
    rl.close();
  }

  nextTurn();
}

startGame();
