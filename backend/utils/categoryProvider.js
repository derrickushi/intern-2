async function fetchCategories() {
  const categories = ['Newspapers', 'Coins', 'Currency', 'Other']
  return Promise.resolve(categories)
}

export default fetchCategories