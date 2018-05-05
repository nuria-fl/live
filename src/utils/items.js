import items from '@/data/items'
import craftableItems from '@/data/craftableItems'
import cookableItems from '@/data/cookableItems'

const allItems = [...items, ...craftableItems, ...cookableItems]

const getName = itemId => {
  const item = allItems.find(item => item.id === itemId)

  return item ? item.name : itemId
}

export default {
  getName
}
