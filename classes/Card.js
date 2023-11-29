class Card {
  constructor(name, cost, type, effect, value) {
    this.name = name;
    this.cost = cost;
    this.type = type;
    this.effect = effect;
    this.value = value; // Add value property
  }
  // ... rest of the Card class ...
}


module.exports = { Card }