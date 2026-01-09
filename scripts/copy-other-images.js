const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\derri\\.gemini\\antigravity\\brain\\4b0a7ac8-9f06-44d3-baa3-8c2b93a6a37f';
const publicDir = 'c:\\Users\\derri\\Downloads\\kushi\\derric\\public\\products';

// Mapping of generated images to their final names
const imageMapping = {
    'vintage_compass_1767350862201.png': 'other/vintage_compass.webp',
    'antique_pocket_watch_1767350880172.png': 'other/pocket_watch.webp',
    'victorian_magnifying_glass_1767350897612.png': 'other/magnifying_glass.webp',
    'antique_fountain_pen_1767350916550.png': 'other/fountain_pen.webp'
};

console.log('📝 Processing 4 missing Other category images...\n');

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
console.log(`\n🎉 Other category image processing complete!`);
