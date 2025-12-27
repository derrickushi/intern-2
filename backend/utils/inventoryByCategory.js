function inventoryByCategory(inventory) {
  return inventory.reduce((acc, next) => {
    const category = next.category
    if (acc[category]) {
      acc[category].items.push(next)
    } else {
      acc[category] = { items: [next] }
    }
    return acc
  }, {})
}

export {
  inventoryByCategory
}