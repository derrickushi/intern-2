const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const https = require('https');
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

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                const location = response.headers.location;
                let newUrl = location;
                if (location && !location.startsWith('http')) {
                    const originalUrl = new URL(url);
                    newUrl = `${originalUrl.protocol}//${originalUrl.host}${location}`;
                }

                // Follow redirect
                downloadImage(newUrl, filepath).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file async
            reject(err.message);
        });
    });
};

const getImageUrl = (category) => {
    // Adding a random timestamp param to skip cache and get meaningful variation
    const ts = Date.now() + Math.random();
    switch (category) {
        case 'Newspapers':
            return `https://loremflickr.com/800/600/vintage,newspaper?lock=${ts}`;
        case 'Coins':
            return `https://loremflickr.com/800/600/ancient,coin?lock=${ts}`;
        case 'Currency':
            return `https://loremflickr.com/800/600/vintage,money?lock=${ts}`;
        default:
            return `https://loremflickr.com/800/600/antique,object?lock=${ts}`;
    }
}

async function updateImages() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products to update.`);

        let count = 0;
        const productsDir = path.join(process.cwd(), 'public', 'products');

        if (!fs.existsSync(productsDir)) {
            fs.mkdirSync(productsDir, { recursive: true });
        }

        for (const product of products) {
            const imageName = `web-${product._id}.jpg`;
            const imagePath = path.join(productsDir, imageName);
            const imageUrl = getImageUrl(product.category);

            console.log(`Downloading image for "${product.title}" (${product.category})...`);

            try {
                await downloadImage(imageUrl, imagePath);

                // Update DB
                product.images = [`/products/${imageName}`];
                await product.save();

                count++;
                console.log(`✅ Updated ${product.title}`);

                // Be polite to the image server
                await new Promise(r => setTimeout(r, 1000));
            } catch (err) {
                console.error(`❌ Failed to download/update for ${product.title}:`, err);
            }
        }

        console.log(`\n🎉 Successfully updated ${count} products with unique web images.`);

    } catch (error) {
        console.error('❌ Script failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
    }
}

updateImages();
