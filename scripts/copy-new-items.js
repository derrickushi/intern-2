const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\derri\\.gemini\\antigravity\\brain\\4b0a7ac8-9f06-44d3-baa3-8c2b93a6a37f';
const publicDir = 'c:\\Users\\derri\\Downloads\\kushi\\derric\\public\\products\\other';

// Mapping of generated images to their final names
const imageMapping = {
    'antique_oil_lamp_1767368041416.png': 'oil_lamp.webp',
    'vintage_sextant_1767368062194.png': 'sextant.webp',
    'antique_music_box_1767368082093.png': 'music_box.webp',
    'vintage_camera_1767368104876.png': 'vintage_camera.webp',
    'antique_inkwell_1767368125252.png': 'inkwell.webp'
};

console.log('📝 Processing 5 new antique item images...\n');

let successCount = 0;
let errorCount = 0;

// Create directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log(`📁 Created directory: ${publicDir}\n`);
}

for (const [sourceFile, targetFile] of Object.entries(imageMapping)) {
    const sourcePath = path.join(artifactDir, sourceFile);
    const targetPath = path.join(publicDir, targetFile);

    try {
        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
            console.log(`❌ Source file not found: ${sourceFile}`);
            errorCount++;
            continue;
        }

        // Copy and rename the file
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copied: ${sourceFile} -> ${targetFile}`);
        successCount++;

    } catch (error) {
        console.error(`❌ Error processing ${sourceFile}:`, error.message);
        errorCount++;
    }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Successfully processed: ${successCount} images`);
console.log(`   ❌ Errors: ${errorCount} images`);
console.log(`\n🎉 Image processing complete!`);
