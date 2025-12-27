const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

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

const dummyProducts = [
    {
        title: "Nano Banana Discovery",
        description: "Original newspaper article covering the shocking discovery of the Nano Banana. Tiny fruit, massive potential!",
        price: 500,
        images: ['/products/newspaper-nano.png'],
        category: 'Newspapers',
        year: 1900,
        condition: 'Good',
        details: { "publication": "The Daily Fruit", "date": "1900-01-29" },
        currentInventory: 5,
        isFeatured: true
    },
    {
        title: "Nano Banana Scientific Report",
        description: "Follow-up scientific report on the nutritional density of the Nano Banana.",
        price: 350,
        images: ['/products/newspaper-nano.png'],
        category: 'Newspapers',
        year: 1901,
        condition: 'Fair',
        details: { "publication": "Science Weekly", "date": "1901-05-15" },
        currentInventory: 3,
        isFeatured: false
    },
    {
        title: "Historic Peace Treaty",
        description: "Rare first edition covering the signing of the Great Peace Treaty. A momentous day in history.",
        price: 300,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1919,
        condition: 'Aged',
        details: { "publication": "The Chronicle", "date": "1919-06-28" },
        currentInventory: 1,
        isFeatured: true
    },
    {
        title: "Industrial Revolution Begins",
        description: "An early account of the steam engine's impact on industry.",
        price: 275,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1840,
        condition: 'Fragile',
        details: { "publication": "Industrial Gazette", "date": "1840-03-12" },
        currentInventory: 2,
        isFeatured: false
    },
    {
        title: "Explorer Returns Home",
        description: "Celebratory Headline announcing the return of the famous expedition.",
        price: 450,
        images: ['/products/newspaper-nano.png'],
        category: 'Newspapers',
        year: 1922,
        condition: 'Good',
        details: { "publication": "The Globe", "date": "1922-11-04" },
        currentInventory: 1,
        isFeatured: false
    },
    {
        title: "First Flight Success",
        description: "Historic report of the first powered flight.",
        price: 600,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1903,
        condition: 'Fair',
        details: { "publication": "Aviation Daily", "date": "1903-12-18" },
        currentInventory: 1,
        isFeatured: true
    },
    {
        title: "Stock Market Crash",
        description: "Black Tuesday headline. A somber piece of economic history.",
        price: 200,
        images: ['/products/newspaper-nano.png'],
        category: 'Newspapers',
        year: 1929,
        condition: 'Torn',
        details: { "publication": "Wall St Journal", "date": "1929-10-29" },
        currentInventory: 1,
        isFeatured: false
    },
    {
        title: "Transatlantic Cable Complete",
        description: "News of the first message sent across the Atlantic.",
        price: 320,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1858,
        condition: 'Good',
        details: { "publication": "The Telegraph", "date": "1858-08-16" },
        currentInventory: 2,
        isFeatured: false
    },
    {
        title: "Exposition Opens",
        description: "Details from the opening of the World's Fair.",
        price: 150,
        images: ['/products/newspaper-nano.png'],
        category: 'Newspapers',
        year: 1893,
        condition: 'Good',
        details: { "publication": "Chicago Tribune", "date": "1893-05-01" },
        currentInventory: 4,
        isFeatured: false
    },
    {
        title: "Comet Sighting",
        description: "Scientific and public reaction to the passing of Halley's Comet.",
        price: 180,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1910,
        condition: 'Good',
        details: { "publication": "The Observer", "date": "1910-05-19" },
        currentInventory: 3,
        isFeatured: false
    }
];

async function seedDummyData() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('\n📦 Seeding dummy products...');
        await Product.insertMany(dummyProducts);
        console.log(`✅ Added ${dummyProducts.length} dummy products`);

    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
    }
}

seedDummyData();
