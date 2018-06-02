/* eslint-disable */
/* for documentation purposes only */

const item = {
  uid: String, // generated, unique
  id: String,
  name: String,
  description: String,
  type: 'tool | item', // maybe not needed
  action: 'scavenge | hunt | craft',
  value: {
    food: Number,
    water: Number,
    energy: Number
  },
  risk: Number,
  consumable: Boolean,
  daysToPerish: Number, // 0 for non perishable items
  usesUntilBreakdown: Number // 0 for non degrading items
  // probability of being found (will depend on area)
}

const consumable = {
  uid: String, // generated, unique
  id: String,
  name: String,
  description: String,
  action: 'scavenge | hunt | craft',
  value: {
    food: Number,
    water: Number,
    energy: Number
  },
  risk: Number,
  daysToPerish: Number // 0 for non perishable items
}

const object = { // tool or junk
  uid: String, // generated, unique
  id: String,
  name: String,
  description: String,
  action: 'scavenge | hunt | craft',
  usesUntilBreakdown: Number // 0 for non degrading items
}

const equipment = {
  uid: String, // generated, unique
  id: String,
  name: String,
  description: String,
  stats: {} // to be defined
}

const upgrade = {
  id: String,
  name: String,
  description: String,
  itemsNeeded: [item.id],
  toolsNeeded: [item.id]
}

const recipe = {
  itemsNeeded: [item.id],
  result: [item.id],
  toolsNeeded: [item.id],
  upgradesNeeded: [upgrade.id],
  category: 'consumable | weapon | tool | medicine'
}
