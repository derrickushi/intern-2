// Script to update antiqueInventory.js with new image paths
const fs = require('fs');
const path = require('path');

const inventoryPath = path.join(__dirname, '..', 'backend', 'utils', 'antiqueInventory.js');

// Read the current inventory file
let content = fs.readFileSync(inventoryPath, 'utf8');

// Image path replacements - update products that have generated images
const replacements = [
    // Newspapers
    {
        old: 'title: "Apollo 11 Moon Landing",\n        description: "An original print of The New York Times from July 21, 1969, covering the historic Apollo 11 moon landing. A true collector\'s piece.",\n        price: 250,\n        images: [\'/products/newspaper-moon.png\'],',
        new: 'title: "Apollo 11 Moon Landing",\n        description: "An original print of The New York Times from July 21, 1969, covering the historic Apollo 11 moon landing. A true collector\'s piece.",\n        price: 250,\n        images: [\'/products/newspapers/apollo-11.png\'],'
    },

    {
        old: 'title: "V-E Day Celebration",\n        description: "Vintage newspaper headline announcing the end of World War II in Europe. Historic moment captured in print.",\n        price: 180,\n        images: [\'/products/newspaper-moon.png\'],',
        new: 'title: "V-E Day Celebration",\n        description: "Vintage newspaper headline announcing the end of World War II in Europe. Historic moment captured in print.",\n        price: 180,\n        images: [\'/products/newspapers/ve-day.png\'],'
    },

    {
        old: 'title: "Titanic Disaster Report",\n        description: "Rare newspaper clipping detailing the sinking of the Titanic. One of the most tragic maritime disasters.",\n        price: 1200,\n        images: [\'/products/newspaper-moon.png\'],',
        new: 'title: "Titanic Disaster Report",\n        description: "Rare newspaper clipping detailing the sinking of the Titanic. One of the most tragic maritime disasters.",\n        price: 1200,\n        images: [\'/products/newspapers/titanic.png\'],'
    },

    {
        old: 'title: "JFK Assassination Report",\n        description: "Original newspaper from November 22, 1963, reporting the assassination of President John F. Kennedy.",\n        price: 350,\n        images: [\'/products/newspaper-moon.png\'],',
        new: 'title: "JFK Assassination Report",\n        description: "Original newspaper from November 22, 1963, reporting the assassination of President John F. Kennedy.",\n        price: 350,\n        images: [\'/products/newspapers/jfk.png\'],'
    },
];

console.log('📝 Updating antiqueInventory.js with new image paths...\n');

let updateCount = 0;
replacements.forEach((replacement, index) => {
    if (content.includes(replacement.old)) {
        content = content.replace(replacement.old, replacement.new);
        updateCount++;
        console.log(`  ✓ Updated image path ${index + 1}`);
    }
});

// Write the updated content back
fs.writeFileSync(inventoryPath, content, 'utf8');

console.log(`\n✅ Updated ${updateCount} image paths in antiqueInventory.js`);
console.log('📦 File saved successfully!');
