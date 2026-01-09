import dbConnect from '../lib/mongodb';
import Product from '../models/Product';

export async function getInventory(search = '') {
  await dbConnect();
  
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Fetch products
  const products = await Product.find(query).sort({ createdAt: -1 });
  
  // Serialize Mongoose documents to JSON-compatible objects
  // This is necessary because Next.js props must be serializable
  return products.map(product => {
    const p = product.toObject({ virtuals: true });
    p._id = p._id.toString();
    p.id = p._id; // Ensure 'id' legacy property exists
    p.createdAt = p.createdAt.toISOString();
    
    // Convert Map 'details' to plain object if it exists
    if (p.details && p.details instanceof Map) {
      p.details = Object.fromEntries(p.details);
    } else if (p.details && typeof p.details === 'object' && !Array.isArray(p.details)) {
        // Double check if it's a map-like object that survived toObject
        // Sometimes mongoose toObject with {flattenMaps: true} is needed, but we can do it manually
        // If it is already an object, ensuring it's not a complex wrapper
        // But the error explicitly said [object Map]
    }
    
    return p;
  });
}
