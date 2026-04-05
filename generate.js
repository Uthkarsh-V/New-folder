const fs = require('fs');

const categories = ["Food", "Textiles", "Handicrafts", "Spices", "Jewelry", "Art", "Pottery"];
const names = [
    "Darjeeling Tea", "Kanjeevaram Saree", "Mysore Sandalwood Soap", "Kashmiri Saffron",
    "Bikaneri Bhujia", "Malabar Pepper", "Tirupati Laddu", "Hyderabad Pearls",
    "Dhaka Muslin", "Pochampally Saree", "Guntur Chilli", "Chanderi Silk",
    "Warangal Wooden Toys", "Madhubani Painting", "Surat Zari", "Agra Petha",
    "Assam Orthodox Tea", "Kangra Tea", "Munnar Cardamom", "Kullu Shawl",
    "Bhagalpuri Silk", "Sambalpuri Saree", "Odisha Ikat", "Bastar Iron Craft",
    "Nisan Ivory", "Brassware of Moradabad", "Firozabad Brass", "Aligarh Glass",
    "Banarasi Brocade", "Lucknow Chikan", "Kashmiri Walnut Wood Carving",
    "Naga Mircha", "Alleppey Green Cardamom", "Coorg Arabica Coffee",
    "Wayanad Robusta Coffee", "Malabar Robusta Coffee", "Nilgiri Orthodox Tea",
    "Navara Rice", "Pokkali Rice", "Palakkadan Matta Rice", "Bhalia Wheat",
    "Gir Kesar Mango", "Mahabaleshwar Strawberry", "Nagpur Orange",
    "Jalgaon Sweet Orange", "Nashik Orange", "Sangli Banana",
    "Ratnagiri Grapes", "Kutch Embroidery", "Tangaliya Shawl",
    "Sankheda woven Saree", "Ajrakh Printing", "Chopda Wood Craft",
    "Thanjavur Paintings", "Kanchipuram Silk", "Bhavani Jamakkalam",
    "Madurai Sungudi", "Coimbatore Sungudi", "Salem Silk",
    "Arani Silk", "Toda Embroidery", "Swamimalai Bronze Icons",
    "Temple Jewellery of Nagercoil", "Phulkari", "Bagh Prints of Madhya Pradesh",
    "Chanderi Fabric", "Leather Toys of Indore", "Maheshwari Sarees",
    "Bell Metal Ware of Datia and Tikamgarh", "Gada", "Sikki Grass Products",
    "Bhagalpur Silk", "Applique Tanka Embroidery", "Pipli Applique Work",
    "Khandua Saree", "Gopalpur Tussar Fabrics"
];

const latRanges = [8, 34]; // India approx lats
const lngRanges = [68, 97]; // India approx lngs

const extraProducts = [];
for (let i = 21; i <= 90; i++) {
    const lat = (Math.random() * (latRanges[1] - latRanges[0]) + latRanges[0]).toFixed(4);
    const lng = (Math.random() * (lngRanges[1] - lngRanges[0]) + lngRanges[0]).toFixed(4);
    const name = names[i % names.length];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 10000) + 100;
    const stock = Math.floor(Math.random() * 100) + 1;

    extraProducts.push(`            { id: "${i}", name: "${name}", category: "${category}", sellerName: "Seller ${i}", price: ${price}, lat: ${lat}, lng: ${lng}, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: ${stock}, sellerId: "seller${i}" }`);
}

let dbContent = fs.readFileSync('local-treasures-html/db.js', 'utf8');

// replace closing bracket of products array
const replacement = ",\n" + extraProducts.join(",\n") + "\n        ];";
dbContent = dbContent.replace("        ];", replacement);

fs.writeFileSync('local-treasures-html/db.js', dbContent);
console.log('Patch complete!');
