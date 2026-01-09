// Script to create placeholder images for products without images
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'products');

// Create directories if they don't exist
const dirs = ['newspapers', 'coins', 'currency', 'other'];
dirs.forEach(dir => {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

// List of images that still need to be created
const placeholderNeeded = {
    newspapers: [
        'wall-street-crash.png',
        'wwi-armistice.png'
    ],
    coins: [
        'byzantine-solidus.png',
        'chinese-cash.png',
        'morgan-dollar.png',
        'napoleon-franc.png',
        'british-sovereign.png',
        'mercury-dime.png',
        'samurai-coin.png'
    ],
    currency: [
        'silver-certificate-1899.png',
        'confederate-bill.png',
        'french-assignat.png',
        'german-mark.png',
        'british-pound-1914.png',
        'russian-ruble.png',
        'japanese-yen.png',
        'italian-lira.png',
        'chinese-dollar.png',
        'austrian-krone.png',
        'indian-rupee.png',
        'mexican-peso.png',
        'dutch-guilder.png',
        'zimbabwe-dollar.png'
    ],
    other: [
        'vintage-compass.png',
        'pocket-watch.png',
        'magnifying-glass.png',
        'fountain-pen.png'
    ]
};

console.log('📝 Creating placeholder image list...\n');

let totalNeeded = 0;
Object.keys(placeholderNeeded).forEach(category => {
    const count = placeholderNeeded[category].length;
    totalNeeded += count;
    console.log(`  ${category}: ${count} images needed`);
});

console.log(`\n📊 Total images needed: ${totalNeeded}`);
console.log('\n💡 Options:');
console.log('  1. Wait for image generation quota to reset (in ~4-5 hours)');
console.log('  2. Use existing placeholder images temporarily');
console.log('  3. Manually add images from public domain sources');

// Create a mapping file for future reference
const mappingPath = path.join(__dirname, 'image-mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify(placeholderNeeded, null, 2));
console.log(`\n✅ Image mapping saved to: ${mappingPath}`);
