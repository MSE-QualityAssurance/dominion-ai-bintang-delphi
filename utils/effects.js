const villageEffect = (player, game) => {
  console.log(`${player.name} plays Village.`);
  
  // Example effects: draw a card and get additional actions
  player.drawCard();
  player.actions += 2; // Assuming you have an 'actions' property on the player to track available actions
};

module.exports = {
  villageEffect
}