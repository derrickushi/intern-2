const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\derri\\.gemini\\antigravity\\brain\\4b0a7ac8-9f06-44d3-baa3-8c2b93a6a37f';
const publicDir = 'c:\\Users\\derri\\Downloads\\kushi\\derric\\public\\products';

// Mapping of generated files to their target names
const fileMapping = {
    // Newspapers
    'wall_street_crash_newspaper_1767288351176.png': 'newspapers/wall_street_crash_newspaper.png',
    'wwi_armistice_newspaper_1767288374369.png': 'newspapers/wwi_armistice_newspaper.png',

    // Coins
    'byzantine_gold_solidus_1767288498075.png': 'coins/byzantine_gold_solidus.png',
    'morgan_silver_dollar_1767288533508.png': 'coins/morgan_silver_dollar.png',
    'napoleon_gold_franc_1767288553701.png': 'coins/napoleon_gold_franc.png',
    'british_sovereign_gold_1767288574172.png': 'coins/british_sovereign_gold.png',
    'mercury_dime_1767288591537.png': 'coins/mercury_dime.png',
    'japanese_samurai_coin_1767288611098.png': 'coins/japanese_samurai_coin.png',

    // Currency
    '1899_silver_certificate_1767288658869.png': 'currency/1899_silver_certificate.png',
    'confederate_10_dollar_1767288680222.png': 'currency/confederate_10_dollar.png'
};

console.log('📦 Copying and renaming generated images to public/products/...\n');

let copiedCount = 0;
let errorCount = 0;

for (const [sourceFile, targetPath] of Object.entries(fileMapping)) {
    const sourcePath = path.join(artifactDir, sourceFile);
    const targetFullPath = path.join(publicDir, targetPath);

    try {
        // Check if source exists
        if (!fs.existsSync(sourcePath)) {
            console.log(`  ⚠️  Source not found: ${sourceFile}`);
            errorCount++;
            continue;
        }

        // Ensure target directory exists
        const targetDir = path.dirname(targetFullPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Copy file
        fs.copyFileSync(sourcePath, targetFullPath);
        console.log(`  ✓ Copied: ${targetPath}`);
        copiedCount++;

    } catch (error) {
        console.error(`  ✗ Error copying ${sourceFile}:`, error.message);
        errorCount++;
    }
}

console.log(`\n✅ Complete! Copied ${copiedCount} files.`);
if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} errors encountered.`);
}
