import objects from '@/data/objects'
import consumables from '@/data/consumables'

const base = {
  value: {
    health: 0,
    food: 0,
    water: 0,
    energy: 0
  },
  risk: 0,
  daysToPerish: 0,
  usesUntilBreakdown: 0
}

const consumableItems = consumables.map((item) => ({
  ...item,
  consumable: true
}))

const items = [...objects, ...consumableItems].map((item) => {
  return {
    ...base,
    ...item
  }
})

export default items
