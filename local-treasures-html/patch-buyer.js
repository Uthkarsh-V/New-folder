const fs = require('fs');
const path = 'c:/Users/Uthkarsh gowda.V/OneDrive/Desktop/New folder/local-treasures-html/buyer-dashboard.html';
let html = fs.readFileSync(path, 'utf8');

// Replace mapping/listing logic to merge staticProducts AND getProducts()
// find the render block
if (html.includes('const staticProducts')) {
   // where does staticProducts end?
   html = html.replace('];\\n        ', '];\\n\\n        // Merge live db products with static ones\\n        const products = [...staticProducts, ...getProducts()];\\n        ');
   fs.writeFileSync(path, html);
   console.log('patched buyer-dashboard');
}
