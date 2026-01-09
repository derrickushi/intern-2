// Script to update database with expanded antique inventory
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const antiqueInventory = require('../backend/utils/antiqueInventory').default;

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

async function updateInventory() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        console.log('📦 Clearing existing products...');
        await Product.deleteMany({});
        console.log('✅ Cleared old inventory\n');

        console.log('📝 Adding new products...');
        let addedCount = 0;
        let categoryCount = {
            'Newspapers': 0,
            'Coins': 0,
            'Currency': 0,
            'Other': 0
        };

        for (const item of antiqueInventory) {
            await Product.create(item);
            addedCount++;
            categoryCount[item.category]++;
            console.log(`  ✓ Added: ${item.title} (${item.category})`);
        }

        console.log('\n📊 Summary:');
        console.log(`  Total products added: ${addedCount}`);
        console.log(`  - Newspapers: ${categoryCount.Newspapers}`);
        console.log(`  - Coins: ${categoryCount.Coins}`);
        console.log(`  - Currency: ${categoryCount.Currency}`);
        console.log(`  - Other: ${categoryCount.Other}`);

        console.log('\n✅ Database successfully updated with expanded inventory!');

        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    } catch (error) {
        console.error('❌ Error updating inventory:', error);
        process.exit(1);
    }
}

updateInventory();
