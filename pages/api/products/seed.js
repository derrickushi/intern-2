import dbConnect from '../../../backend/lib/mongodb';
import Product from '../../../backend/models/Product';
import { adminMiddleware } from '../../../backend/middleware/auth';
import antiqueInventory from '../../../backend/utils/antiqueInventory';

async function handler(req, res) {
    await dbConnect();

    try {
        await Product.deleteMany({}); // Clear existing data

        await Product.insertMany(antiqueInventory);

        return res.status(200).json({
            success: true,
            message: `Database seeded with ${antiqueInventory.length} antique items`,
        });
    } catch (error) {
        console.error('Seed error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error seeding database',
            error: error.message,
        });
    }
}

// Protect with admin middleware
export default adminMiddleware(handler);
