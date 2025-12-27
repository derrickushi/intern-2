const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI not found in .env.local');
    process.exit(1);
}

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    year: Number,
    condition: String,
    details: { type: Map, of: String },
    isFeatured: { type: Boolean, default: false },
    currentInventory: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const availableImages = {
    'Newspapers': [
        '/products/newspaper-moon.png',
        '/products/newspaper-nano.png'
    ],
    'Coins': [
        '/products/coin-roman.png'
    ],
    'Currency': [
        '/products/currency-silver.png'
    ],
    'Other': [
        '/products/coin-roman.png',
        '/products/newspaper-moon.png'
    ]
};

async function distributeImages() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products.`);

        let updatedCount = 0;

        for (const product of products) {
            const categoryImages = availableImages[product.category] || availableImages['Other'];

            // Simple hash of title to pick a consistent image
            const charSum = product.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const imageIndex = charSum % categoryImages.length;
            const selectedImage = categoryImages[imageIndex];

            // Only update if images array is empty or generic
            // For now, we overwrite based on user request to "fetch all products and ... generate image"
            // Since we can't generate, we assign.

            product.images = [selectedImage];
            await product.save();
            updatedCount++;
            console.log(`Updated "${product.title}" with image: ${selectedImage}`);
        }

        console.log(`✅ Successfully updated ${updatedCount} products.`);

    } catch (error) {
        console.error('❌ Update failed:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
    }
}

distributeImages();
