import { fetchInventory } from './inventoryProvider'
import { inventoryByCategory } from './inventoryByCategory'

async function inventoryForCategory(category) {
  const inventory = await fetchInventory()
  const byCategory = inventoryByCategory(inventory)
  console.log(`Requested category: "${category}"`);
  console.log(`Available categories: ${Object.keys(byCategory).join(', ')}`);
  return byCategory[category]?.items || []
}

export default inventoryForCategory