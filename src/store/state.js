import { MAX, MAXINVENTORY } from '../data/constants'
import items from '@/data/items'
import recipes from '@/data/recipes'
import upgrades from '@/data/upgrades'

const state = {
  username: '',
  gameOver: false,
  causeOfDeath: null,
  paused: false,
  disabled: false,
  stats: {
    health: MAX,
    water: MAX,
    food: MAX,
    energy: MAX
  },
  existingItems: items,
  inventory: [],
  hasFire: false,
  isSick: false,
  daysSurvived: 0,
  currentPage: 'home'
}

const isCraftable = recipe => {
  // mixin so state is reactive?
  const inventory = state.inventory.map(item => item.id)
  const currentItems = []

  let isCraftable

  recipe.itemsNeeded.forEach(itemNeeded => {
    const idx = inventory.indexOf(itemNeeded)

    if (idx !== -1) {
      // if we find the item we remove it from the temp inventory
      inventory.splice(idx, 1)
      currentItems.push(itemNeeded)
    } else {
      isCraftable = false
    }
  })

  // if we have all the items we can craft the item
  // TODO: is length enough? deepEqual?

  if (currentItems.length === recipe.itemsNeeded.length) {
    isCraftable = true
    if (recipe.upgradesNeeded && recipe.upgradesNeeded.indexOf('fire') > -1 && !state.hasFire) {
      isCraftable = false
    }
  }

  return isCraftable
}

const getters = {
  isInventoryFull: () => state.inventory.length === MAXINVENTORY,
  slotsInInventoryLeft: () => MAXINVENTORY - state.inventory.length,
  recipes: () => {
    return recipes.map(recipe => {
      return {
        ...recipe,
        isCraftable: isCraftable(recipe)
      }
    })
  },
  upgrades: () => {
    return upgrades.map(upgrade => {
      return {
        ...upgrade,
        isCraftable: isCraftable(upgrade)
      }
    })
  }
}

export { state, getters }
