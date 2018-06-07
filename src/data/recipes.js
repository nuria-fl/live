export default [
  {
    name: 'Rope',
    description: '',
    itemsNeeded: ['string', 'string'],
    toolsNeeded: [],
    upgradesNeeded: [],
    result: ['rope'],
    category: 'tool'
  },
  {
    name: 'Bow',
    description: '',
    itemsNeeded: ['string', 'wood'],
    toolsNeeded: [],
    upgradesNeeded: [],
    result: ['bow'],
    category: 'weapon'
  },
  {
    name: 'Knife',
    description: '',
    itemsNeeded: ['flint', 'wood', 'rope'],
    toolsNeeded: [],
    upgradesNeeded: [],
    result: ['knife'],
    category: 'tool'
  },
  {
    name: 'Jerky',
    description: '',
    itemsNeeded: ['meat', 'salt'],
    toolsNeeded: [],
    upgradesNeeded: [],
    result: ['jerky'],
    category: 'consumable'
  },
  {
    name: 'Medicinal tea',
    description: '',
    itemsNeeded: ['water-clean', 'medicinal-herbs'],
    toolsNeeded: [],
    upgradesNeeded: [],
    result: ['medicinal-tea'],
    category: 'medicine'
  },
  {
    name: 'Cooked meat',
    description: '',
    itemsNeeded: ['meat'],
    toolsNeeded: [],
    upgradesNeeded: ['fire'],
    result: ['meat-cooked'],
    category: 'consumable'
  },
  {
    name: 'Clean water',
    description: '',
    itemsNeeded: ['water-dirty'],
    toolsNeeded: [],
    upgradesNeeded: ['fire'],
    result: ['water-clean'],
    category: 'consumable'
  },
  {
    name: 'Skinned rabbit',
    description: 'Obtain meat and pelt',
    itemsNeeded: ['rabbit'],
    toolsNeeded: ['knife'],
    upgradesNeeded: [],
    result: ['meat', 'rabbit-pelt'],
    category: 'other'
  }
]
