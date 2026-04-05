const fs = require('fs');

const path = 'local-treasures-html/db.js';
let content = fs.readFileSync(path, 'utf8');

const target = "        ];";

if (!content.includes(target)) {
    console.error("Target NOT FOUND in db.js!");
    process.exit(1);
}

const extraProducts = [];
for (let i = 21; i <= 90; i++) {
    const lat = (Math.random() * (34 - 8) + 8).toFixed(4);
    const lng = (Math.random() * (97 - 68) + 68).toFixed(4);
    const price = Math.floor(Math.random() * 10000) + 100;
    const stock = Math.floor(Math.random() * 100) + 1;
    
    // just dummy strings for diverse Indian products
    const name = "Regional Product " + i;
    const category = ["Food", "Textiles", "Handicrafts", "Spices", "Art", "Jewelry"][Math.floor(Math.random() * 6)];
    
    extraProducts.push(`            { id: "${i}", name: "${name}", category: "${category}", sellerName: "Seller ${i}", price: ${price}, lat: ${lat}, lng: ${lng}, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: ${stock}, sellerId: "seller${i}" }`);
}

const replacement = ",\\n" + extraProducts.join(",\\n") + "\\n        ];";
content = content.replace(target, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully patched db.js");
