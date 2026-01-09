// Script to update all image paths in antiqueInventory.js
const fs = require('fs');
const path = require('path');

const inventoryPath = path.join(__dirname, '..', 'backend', 'utils', 'antiqueInventory.js');
let content = fs.readFileSync(inventoryPath, 'utf8');

console.log('📝 Updating image paths in antiqueInventory.js...\n');

// Update remaining newspaper images
content = content.replace(
    /title: "Wall Street Crash 1929",[\s\S]*?images: \['\/products\/newspaper-moon\.png'\]/,
    match => match.replace('/products/newspaper-moon.png', '/products/newspapers/wall-street-crash.png')
);

content = content.replace(
    /title: "WWI Armistice Declared",[\s\S]*?images: \['\/products\/newspaper-moon\.png'\]/,
    match => match.replace('/products/newspaper-moon.png', '/products/newspapers/wwi-armistice.png')
);

// Update remaining coin images
const coinUpdates = [
    ['Byzantine Gold Solidus', 'byzantine-solidus'],
    ['Chinese Cash Coin', 'chinese-cash'],
    ['Morgan Silver Dollar', 'morgan-dollar'],
    ['French Napoleon Gold Franc', 'napoleon-franc'],
    ['British Sovereign Gold Coin', 'british-sovereign'],
    ['Mercury Dime', 'mercury-dime'],
    ['Japanese Samurai Era Coin', 'samurai-coin']
];

coinUpdates.forEach(([title, filename]) => {
    const regex = new RegExp(`title: "${title}",[\\s\\S]*?images: \\['\\/products\\/coin-roman\\.png'\\]`);
    content = content.replace(regex, match =>
        match.replace('/products/coin-roman.png', `/products/coins/${filename}.png`)
    );
});

// Update currency images
const currencyUpdates = [
    ['1899 Silver Certificate', 'silver-certificate-1899'],
    ['Confederate 10 Dollar Bill', 'confederate-bill'],
    ['French Assignat', 'french-assignat'],
    ['German Hyperinflation Mark', 'german-mark'],
    ['British Pound Note 1914', 'british-pound-1914'],
    ['Russian Imperial Ruble', 'russian-ruble'],
    ['Japanese Military Yen', 'japanese-yen'],
    ['Italian Lira 1000 Note', 'italian-lira'],
    ['Chinese Republic Dollar', 'chinese-dollar'],
    ['Austrian Krone 1902', 'austrian-krone'],
    ['Indian Rupee 1943', 'indian-rupee'],
    ['Mexican Peso Revolutionary', 'mexican-peso'],
    ['Dutch Guilder 1920', 'dutch-guilder'],
    ['Zimbabwe Trillion Dollar', 'zimbabwe-dollar']
];

currencyUpdates.forEach(([title, filename]) => {
    const regex = new RegExp(`title: "${title}",[\\s\\S]*?images: \\['\\/products\\/currency-silver\\.png'\\]`);
    content = content.replace(regex, match =>
        match.replace('/products/currency-silver.png', `/products/currency/${filename}.png`)
    );
});

// Update other items
const otherUpdates = [
    ['Antique Pocket Watch', 'pocket-watch'],
    ['Victorian Magnifying Glass', 'magnifying-glass'],
    ['Antique Fountain Pen', 'fountain-pen']
];

otherUpdates.forEach(([title, filename]) => {
    const regex = new RegExp(`title: "${title}",[\\s\\S]*?images: \\['\\/products\\/coin-roman\\.png'\\]`);
    content = content.replace(regex, match =>
        match.replace('/products/coin-roman.png', `/products/other/${filename}.png`)
    );
});

// Save the updated file
fs.writeFileSync(inventoryPath, content, 'utf8');

console.log('✅ Updated all image paths!');
console.log('📦 All products now have unique image paths');
