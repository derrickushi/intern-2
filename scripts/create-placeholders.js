const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directories
const publicDir = path.join(__dirname, '..', 'public', 'products');
['newspapers', 'coins', 'currency', 'other'].forEach(dir => {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

// Category color schemes (vintage antique theme)
const themes = {
    newspapers: { bg: '#f4e8d0', text: '#2c1810', accent: '#8b4513' },
    coins: { bg: '#d4af37', text: '#1a1a1a', accent: '#b8860b' },
    currency: { bg: '#c8e6c9', text: '#1b5e20', accent: '#2e7d32' },
    other: { bg: '#d7ccc8', text: '#3e2723', accent: '#5d4037' }
};

function createPlaceholder(category, title, filename) {
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const theme = themes[category];

    // Background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Inner border
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Category label
    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText(category.toUpperCase(), width / 2, 100);

    // Title
    ctx.fillStyle = theme.text;
    ctx.font = 'bold 48px serif';
    const words = title.split(' ');
    let y = height / 2 - 40;
    let line = '';

    words.forEach((word, i) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - 120 && i > 0) {
            ctx.fillText(line, width / 2, y);
            line = word + ' ';
            y += 60;
        } else {
            line = testLine;
        }
    });
    ctx.fillText(line, width / 2, y);

    // Decorative elements
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, height - 100);
    ctx.lineTo(width - 100, height - 100);
    ctx.stroke();

    // Save
    const buffer = canvas.toBuffer('image/png');
    const filepath = path.join(publicDir, category, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`  ✓ Created: ${category}/${filename}`);
}

console.log('🎨 Creating placeholder images...\n');

// Newspapers
createPlaceholder('newspapers', 'Wall Street Crash 1929', 'wall-street-crash.png');
createPlaceholder('newspapers', 'WWI Armistice', 'wwi-armistice.png');

// Coins
createPlaceholder('coins', 'Byzantine Gold Solidus', 'byzantine-solidus.png');
createPlaceholder('coins', 'Chinese Cash Coin', 'chinese-cash.png');
createPlaceholder('coins', 'Morgan Silver Dollar', 'morgan-dollar.png');
createPlaceholder('coins', 'Napoleon Gold Franc', 'napoleon-franc.png');
createPlaceholder('coins', 'British Sovereign', 'british-sovereign.png');
createPlaceholder('coins', 'Mercury Dime', 'mercury-dime.png');
createPlaceholder('coins', 'Samurai Era Coin', 'samurai-coin.png');

// Currency
createPlaceholder('currency', '1899 Silver Certificate', 'silver-certificate-1899.png');
createPlaceholder('currency', 'Confederate Bill', 'confederate-bill.png');
createPlaceholder('currency', 'French Assignat', 'french-assignat.png');
createPlaceholder('currency', 'German Mark', 'german-mark.png');
createPlaceholder('currency', 'British Pound 1914', 'british-pound-1914.png');
createPlaceholder('currency', 'Russian Ruble', 'russian-ruble.png');
createPlaceholder('currency', 'Japanese Yen', 'japanese-yen.png');
createPlaceholder('currency', 'Italian Lira', 'italian-lira.png');
createPlaceholder('currency', 'Chinese Dollar', 'chinese-dollar.png');
createPlaceholder('currency', 'Austrian Krone', 'austrian-krone.png');
createPlaceholder('currency', 'Indian Rupee', 'indian-rupee.png');
createPlaceholder('currency', 'Mexican Peso', 'mexican-peso.png');
createPlaceholder('currency', 'Dutch Guilder', 'dutch-guilder.png');
createPlaceholder('currency', 'Zimbabwe Dollar', 'zimbabwe-dollar.png');

// Other
createPlaceholder('other', 'Vintage Compass', 'vintage-compass.png');
createPlaceholder('other', 'Pocket Watch', 'pocket-watch.png');
createPlaceholder('other', 'Magnifying Glass', 'magnifying-glass.png');
createPlaceholder('other', 'Fountain Pen', 'fountain-pen.png');

console.log('\n✅ All placeholder images created!');
console.log('📝 Note: These will be replaced with realistic images when quota resets');
