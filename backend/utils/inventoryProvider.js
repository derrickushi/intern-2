/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

async function fetchInventory(searchText = '') {
  try {
    const IS_SERVER = typeof window === 'undefined';
    const baseURL = IS_SERVER ? (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001') : '';
    const queryParams = new URLSearchParams();
    if (searchText) {
      queryParams.append('q', searchText);
    }
    console.log(`Fetching inventory from: ${baseURL}/api/inventory?${queryParams.toString()}`);
    const response = await fetch(`${baseURL}/api/inventory?${queryParams.toString()}`);
    const data = await response.json();
    console.log('Inventory fetch success:', data.success, 'Count:', data.products?.length);

    if (data.success) {
      // Map MongoDB _id to id for compatibility
      const products = data.products.map(product => ({
        ...product,
        id: product._id,
      }));
      return products;
    }

    return [];
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

export {
  fetchInventory
};