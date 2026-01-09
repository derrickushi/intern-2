// Script to copy generated images to public folder and update inventory
const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\derri\\.gemini\\antigravity\\brain\\4b0a7ac8-9f06-44d3-baa3-8c2b93a6a37f';
const publicDir = path.join(__dirname, '..', 'public', 'products');

// Create directories
const dirs = ['newspapers', 'coins', 'currency', 'other'];
dirs.forEach(dir => {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// Image mappings - from generated images to product paths
const imageMappings = [
    // Newspapers
    { pattern: 'apollo_11_newspaper_*.png', dest: 'newspapers/apollo-11.png' },
    { pattern: 've_day_newspaper_*.png', dest: 'newspapers/ve-day.png' },
    { pattern: 'titanic_newspaper_*.png', dest: 'newspapers/titanic.png' },
    { pattern: 'jfk_newspaper_*.png', dest: 'newspapers/jfk.png' },
    { pattern: 'pearl_harbor_newspaper_*.png', dest: 'newspapers/pearl-harbor.png' },
    { pattern: 'berlin_wall_newspaper_*.png', dest: 'newspapers/berlin-wall.png' },
    { pattern: 'queen_victoria_newspaper_*.png', dest: 'newspapers/queen-victoria.png' },
    { pattern: 'wright_brothers_newspaper_*.png', dest: 'newspapers/wright-brothers.png' },
    { pattern: 'lincoln_assassination_newspaper_*.png', dest: 'newspapers/lincoln.png' },
    { pattern: 'dday_newspaper_*.png', dest: 'newspapers/dday.png' },

    // Coins
    { pattern: 'roman_denarius_coin_*.png', dest: 'coins/roman-denarius.png' },
    { pattern: 'silver_dollar_1804_*.png', dest: 'coins/silver-dollar-1804.png' },
    { pattern: 'greek_drachma_coin_*.png', dest: 'coins/greek-drachma.png' },
    { pattern: 'victorian_penny_coin_*.png', dest: 'coins/victorian-penny.png' },
    { pattern: 'spanish_piece_eight_*.png', dest: 'coins/spanish-piece-eight.png' },
    { pattern: 'indian_head_penny_*.png', dest: 'coins/indian-head-penny.png' },
];

console.log('\n📦 Copying generated images to public folder...\n');

let copiedCount = 0;
let missingCount = 0;

imageMappings.forEach(mapping => {
    try {
        // Find the file with wildcard pattern
        const files = fs.readdirSync(artifactDir).filter(file => {
            const pattern = mapping.pattern.replace('*', '');
            return file.includes(pattern.replace('.png', ''));
        });

        if (files.length > 0) {
            const sourcePath = path.join(artifactDir, files[0]);
            const destPath = path.join(publicDir, mapping.dest);

            fs.copyFileSync(sourcePath, destPath);
            console.log(`  ✓ Copied: ${mapping.dest}`);
            copiedCount++;
        } else {
            console.log(`  ⚠ Missing: ${mapping.pattern}`);
            missingCount++;
        }
    } catch (error) {
        console.error(`  ❌ Error copying ${mapping.pattern}:`, error.message);
        missingCount++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`  ✅ Copied: ${copiedCount} images`);
console.log(`  ⚠️  Missing: ${missingCount} images (will be generated later)`);
console.log(`\n✨ Images are now available in public/products/`);
