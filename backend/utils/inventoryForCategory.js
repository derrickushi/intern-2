import { getInventory } from './inventoryService'
import { inventoryByCategory } from './inventoryByCategory'

async function inventoryForCategory(category) {
  const inventory = await getInventory()
  const byCategory = inventoryByCategory(inventory)
  console.log(`Requested category: "${category}"`);
  console.log(`Available categories: ${Object.keys(byCategory).join(', ')}`);
  return byCategory[category]?.items || []
}

export default inventoryForCategory