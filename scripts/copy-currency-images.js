const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\derri\\.gemini\\antigravity\\brain\\4b0a7ac8-9f06-44d3-baa3-8c2b93a6a37f';
const publicDir = 'c:\\Users\\derri\\Downloads\\kushi\\derric\\public\\products';

// Mapping of generated images to their final names
const imageMapping = {
    'italian_lira_1000_1767330811228.png': 'currency/italian_lira_1000.webp',
    'chinese_republic_dollar_1767330828197.png': 'currency/chinese_republic_dollar.webp',
    'austrian_krone_1902_1767330845169.png': 'currency/austrian_krone_1902.webp',
    'indian_rupee_1943_1767330862447.png': 'currency/indian_rupee_1943.webp',
    'mexican_peso_revolutionary_1767330884106.png': 'currency/mexican_peso_revolutionary.webp',
    'dutch_guilder_1920_1767330900855.png': 'currency/dutch_guilder_1920.webp',
    'zimbabwe_trillion_dollar_1767330919291.png': 'currency/zimbabwe_trillion_dollar.webp'
};

console.log('📝 Processing 7 unique currency images...\n');

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
console.log(`\n🎉 Currency image processing complete!`);
