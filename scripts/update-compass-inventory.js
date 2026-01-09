// Script to update Vintage Compass inventory in the database
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    images: [String],
    category: String,
    year: Number,
    condition: String,
    isFeatured: Boolean,
    details: Map,
    currentInventory: Number,
    createdAt: Date,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function updateVintageCompassInventory() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find and update the Vintage Compass product
        const result = await Product.findOneAndUpdate(
            { title: 'Vintage Compass' },
            { $set: { currentInventory: 10 } },
            { new: true }
        );

        if (result) {
            console.log('✅ Successfully updated Vintage Compass inventory to 10');
            console.log('Product details:', {
                title: result.title,
                currentInventory: result.currentInventory,
                price: result.price
            });
        } else {
            console.log('⚠️  Vintage Compass product not found in database');
            console.log('You may need to seed the database first');
        }

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('❌ Error updating inventory:', error);
        process.exit(1);
    }
}

updateVintageCompassInventory();
