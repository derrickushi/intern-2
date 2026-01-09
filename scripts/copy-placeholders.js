// Quick script to copy existing placeholders for missing images
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'products');

// Source placeholder images
const placeholders = {
    newspaper: path.join(publicDir, 'newspaper-moon.png'),
    coin: path.join(publicDir, 'coin-roman.png'),
    currency: path.join(publicDir, 'currency-silver.png')
};

console.log('📋 Copying placeholder images for missing products...\n');

// Newspapers - copy to missing ones
const newspaperFiles = ['wall-street-crash.png', 'wwi-armistice.png'];
newspaperFiles.forEach(file => {
    const dest = path.join(publicDir, 'newspapers', file);
    if (!fs.existsSync(dest)) {
        fs.copyFileSync(placeholders.newspaper, dest);
        console.log(`  ✓ Created: newspapers/${file}`);
    }
});

// Coins - copy to missing ones
const coinFiles = [
    'byzantine-solidus.png', 'chinese-cash.png', 'morgan-dollar.png',
    'napoleon-franc.png', 'british-sovereign.png', 'mercury-dime.png',
    'samurai-coin.png'
];
coinFiles.forEach(file => {
    const dest = path.join(publicDir, 'coins', file);
    if (!fs.existsSync(dest)) {
        fs.copyFileSync(placeholders.coin, dest);
        console.log(`  ✓ Created: coins/${file}`);
    }
});

// Currency - copy to missing ones
const currencyFiles = [
    'silver-certificate-1899.png', 'confederate-bill.png', 'french-assignat.png',
    'german-mark.png', 'british-pound-1914.png', 'russian-ruble.png',
    'japanese-yen.png', 'italian-lira.png', 'chinese-dollar.png',
    'austrian-krone.png', 'indian-rupee.png', 'mexican-peso.png',
    'dutch-guilder.png', 'zimbabwe-dollar.png'
];
currencyFiles.forEach(file => {
    const dest = path.join(publicDir, 'currency', file);
    if (!fs.existsSync(dest)) {
        fs.copyFileSync(placeholders.currency, dest);
        console.log(`  ✓ Created: currency/${file}`);
    }
});

// Other - copy coin placeholder
const otherFiles = [
    'vintage-compass.png', 'pocket-watch.png',
    'magnifying-glass.png', 'fountain-pen.png'
];
otherFiles.forEach(file => {
    const dest = path.join(publicDir, 'other', file);
    if (!fs.existsSync(dest)) {
        fs.copyFileSync(placeholders.coin, dest);
        console.log(`  ✓ Created: other/${file}`);
    }
});

console.log('\n✅ All placeholder images created!');
console.log('📝 Note: Generic placeholders used temporarily');
console.log('🎨 Will be replaced with realistic images when quota resets');
