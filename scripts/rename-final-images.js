const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\derri\\.gemini\\antigravity\\brain\\4b0a7ac8-9f06-44d3-baa3-8c2b93a6a37f';
const publicDir = 'c:\\Users\\derri\\Downloads\\kushi\\derric\\public\\products';

// Mapping of generated images to their final names
const imageMapping = {
    // Coin
    'chinese_cash_coin_1767329131193.png': 'coins/chinese_cash_coin.webp',

    // Currency
    'german_reichsmark_1920s_1767329147288.png': 'currency/german_reichsmark_1920s.webp',
    'french_assignat_1790s_1767329165627.png': 'currency/french_assignat_1790s.webp',
    'russian_imperial_ruble_1767329183789.png': 'currency/russian_imperial_ruble_1900s.webp',
    'japanese_military_yen_1767329207692.png': 'currency/japanese_military_yen_1940s.webp',
    'british_pound_note_1914_1767329224376.png': 'currency/british_pound_note_1914.webp',

    // Other Items
    'antique_telescope_1767329241175.png': 'other/antique_telescope.webp',
    'vintage_typewriter_1767329257911.png': 'other/vintage_typewriter.webp',
    'gramophone_1767329273627.png': 'other/gramophone.webp'
};

console.log('📝 Starting final image processing...\n');

let successCount = 0;
let errorCount = 0;

for (const [sourceFile, targetPath] of Object.entries(imageMapping)) {
    const sourcePath = path.join(artifactDir, sourceFile);
    const targetFullPath = path.join(publicDir, targetPath);
    const targetDir = path.dirname(targetFullPath);

    try {
        // Create target directory if it doesn't exist
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
            console.log(`📁 Created directory: ${targetDir}`);
        }

        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
            console.log(`❌ Source file not found: ${sourceFile}`);
            errorCount++;
            continue;
        }

        // Copy and rename the file
        fs.copyFileSync(sourcePath, targetFullPath);
        console.log(`✅ Copied: ${sourceFile} -> ${targetPath}`);
        successCount++;

    } catch (error) {
        console.error(`❌ Error processing ${sourceFile}:`, error.message);
        errorCount++;
    }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Successfully processed: ${successCount} images`);
console.log(`   ❌ Errors: ${errorCount} images`);
console.log(`\n🎉 Final image processing complete!`);
