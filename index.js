const readline = require('readline');

// Define the Dominion game object
const DominionGame = {
  players: [],
  cards: [],
initializeDecks() {
    // Initialize decks for each player with basic cards
    this.players.forEach(player => {
        for (let i = 0; i < 7; i++) {
            player.deck.push(new Card("Copper", 0, "Treasure"));
        }
        for (let i = 0; i < 3; i++) {
            player.deck.push(new Card("Estate", 2, "Victory"));
        }
        // Add more initial cards to the player's deck
    });
},
  nextPlayer() {
    // Logic to determine the next player's turn
  },
  // Add more properties and methods as needed
};

// Define the Player object
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.deck = [];
    this.discardPile = [];
    // Add more properties and methods as needed
  }
}

// Define the Card object
class Card {
  constructor(name, cost, type) {
    this.name = name;
    this.cost = cost;
    this.type = type;
    // Add more properties and methods as needed
  }
}

// Create a new Dominion game instance
const game = Object.create(DominionGame);

// Add players to the game
function addPlayersToGame() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('How many players do you want to add? ', (numPlayers) => {
        for (let i = 1; i <= numPlayers; i++) {
            rl.question(`Enter the name of Player ${i}: `, (name) => {
                game.players.push(new Player(name));
                if (i === numPlayers) {
                    rl.close();
                    // Call the next function here
                    addCardsToGame();
                }
            });
        }
    });
}

addPlayersToGame();

// Add cards to the game
function addCardsToGame() {
    game.cards.push(new Card("Copper", 0, "Treasure"));
    game.cards.push(new Card("Silver", 3, "Treasure"));
    game.cards.push(new Card("Gold", 6, "Treasure"));
}

addCardsToGame();
// Add more cards as needed

// Initialize player decks
game.initializeDecks();

// Start the game
function startGame() {
  // Create an interface for input and output
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Simple game loop
  let currentPlayerIndex = 0;

  function nextTurn() {
    const currentPlayer = game.players[currentPlayerIndex];
    console.log(`${currentPlayer.name}'s turn`);

    // Add game turn logic here

    currentPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    if (currentPlayerIndex === 0) {
      endGame();
    } else {
      nextTurn();
    }
  }

  function endGame() {
    console.log("Game Over");
    rl.close();
  }

  nextTurn();
}

// Call the startGame function to begin the game
startGame();
