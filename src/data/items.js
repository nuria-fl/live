export default [
  {
    type: 'food',
    id: 'berries',
    name: 'Berries',
    value: {
      food: 3,
      water: 3
    },
    risk: 0,
    action: 'scavenge',
    description: 'Small amount of vitamins and water'
  },
  {
    type: 'food',
    id: 'meat',
    name: 'Raw meat',
    value: {
      food: 20
    },
    risk: 6,
    action: 'hunt',
    description: 'Careful, might have parasites!'
  },
  {
    type: 'drink',
    id: 'water-dirty',
    name: 'Dirty Water',
    value: {
      water: 20
    },
    risk: 6,
    action: 'scavenge',
    description: 'It will calm your thirst, but might make you sick'
  },
  {
    type: 'junk',
    id: 'salt',
    name: 'Salt',
    action: 'scavenge',
    description: 'Useful to preserve food'
  },
  {
    type: 'junk',
    id: 'string',
    name: 'String',
    action: 'scavenge',
    description: 'Useful for crafting'
  },
  {
    type: 'junk',
    id: 'wood',
    name: 'Wood',
    action: 'scavenge',
    description: 'Useful for crafting'
  },
  {
    type: 'junk',
    id: 'plastic',
    name: 'Plastic',
    action: 'scavenge',
    description: 'Useful for crafting'
  },
  {
    type: 'junk',
    id: 'bottle',
    name: 'Empty bottle',
    action: 'scavenge',
    description: 'Useful for crafting'
  },
  {
    type: 'junk',
    id: 'flint',
    name: 'Flint',
    action: 'scavenge',
    description: 'Useful for crafting'
  },
  {
    type: 'junk',
    id: 'medicinal-herbs',
    name: 'Medicinal herbs',
    action: 'scavenge',
    description: 'Healing properties when brewed'
  }
]
