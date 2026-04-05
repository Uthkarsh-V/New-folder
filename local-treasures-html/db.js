function initDB() {
    if (!localStorage.getItem('lt_users')) {
        const users = [
            { id: 'buyer1', name: 'Buyer User', email: 'buyer@lt.com', password: 'password', role: 'buyer' },
            { id: 'seller1', name: 'Guru Sweets', email: 'seller@lt.com', password: 'password', role: 'seller' }
        ];
        localStorage.setItem('lt_users', JSON.stringify(users));
    }

    // Force seed large dataset if not present
    let existingProducts = JSON.parse(localStorage.getItem('lt_products') || '[]');
    if (existingProducts.length < 30) {
        localStorage.removeItem('lt_products');
    }

    if (!localStorage.getItem('lt_products')) {
        const products = [
            { id: "1", name: "Authentic Mysore Pak", category: "Food", sellerName: "Guru Sweets", price: 650, lat: 12.3052, lng: 76.6552, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 50, sellerId: "seller1" },
            { id: "2", name: "Pure Mysore Silk Sari", category: "Textiles", sellerName: "KSIC Weavers", price: 8500, lat: 12.2980, lng: 76.6400, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 10, sellerId: "seller2" },
            { id: "3", name: "Sandalwood Carving", category: "Handicrafts", sellerName: "Cauvery Emporium", price: 2100, lat: 12.3100, lng: 76.6450, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 5, sellerId: "seller3" },
            { id: "4", name: "Kanchipuram Silk Saree", category: "Textiles", sellerName: "Pachaiyappa's", price: 15400, lat: 12.8185, lng: 79.6947, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 2, sellerId: "seller4" },
            { id: "5", name: "Kashmiri Black Pepper", category: "Spices", sellerName: "Srinagar Farms", price: 1200, lat: 34.0837, lng: 74.7973, img: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=60", stock: 100, sellerId: "seller5" },
            { id: "6", name: "Jaipur Blue Pottery", category: "Handicrafts", sellerName: "Rajasthan Arts", price: 3400, lat: 26.9124, lng: 75.7873, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 15, sellerId: "seller6" },
            { id: "7", name: "Assam Pashmina Shawl", category: "Textiles", sellerName: "Himalayan Weaves", price: 12500, lat: 34.1, lng: 74.8, img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=500&auto=format&fit=crop&q=60", stock: 8, sellerId: "seller7" },
            { id: "8", name: "Kerala Ghost Pepper", category: "Spices", sellerName: "Munnar Spices", price: 800, lat: 10.0892, lng: 77.0595, img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&auto=format&fit=crop&q=60", stock: 200, sellerId: "seller8" },
            { id: "9", name: "Darjeeling Golden Tea", category: "Food", sellerName: "Makaibari Estate", price: 2500, lat: 27.0360, lng: 88.2627, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=60", stock: 40, sellerId: "seller9" },
            { id: "10", name: "Lucknowi Chikankari Kurta", category: "Textiles", sellerName: "Awadh Weavers", price: 4200, lat: 26.8467, lng: 80.9462, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 25, sellerId: "seller10" },
            { id: "11", name: "Goan Cashew Feni", category: "Food", sellerName: "Cazulo Distillery", price: 1800, lat: 15.2993, lng: 74.1240, img: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500&auto=format&fit=crop&q=60", stock: 30, sellerId: "seller11" },
            { id: "12", name: "Varanasi Zari Zardosi", category: "Textiles", sellerName: "Banaras Looms", price: 11000, lat: 25.3176, lng: 82.9739, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 5, sellerId: "seller12" },
            { id: "13", name: "Kondapalli Wooden Toys", category: "Handicrafts", sellerName: "Andhra Artisans", price: 1500, lat: 16.6346, lng: 80.5367, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 45, sellerId: "seller13" },
            { id: "14", name: "Guntur Sannam Chilli", category: "Spices", sellerName: "Deccan Spices", price: 400, lat: 16.3067, lng: 80.4365, img: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=60", stock: 300, sellerId: "seller14" },
            { id: "15", name: "Patan Patola Saree", category: "Textiles", sellerName: "Gujarat Heritage", price: 45000, lat: 23.8493, lng: 72.1158, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 1, sellerId: "seller15" },
            { id: "16", name: "Madurai Sungudi Saree", category: "Textiles", sellerName: "Meenakshi Looms", price: 3200, lat: 9.9252, lng: 78.1198, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 18, sellerId: "seller16" },
            { id: "17", name: "Ooty Homemade Chocolates", category: "Food", sellerName: "Nilgiri Bakers", price: 900, lat: 11.4100, lng: 76.6950, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 60, sellerId: "seller17" },
            { id: "18", name: "Kolkata Terracotta Art", category: "Handicrafts", sellerName: "Bengal Clay", price: 2800, lat: 22.5726, lng: 88.3639, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 22, sellerId: "seller18" },
            { id: "19", name: "Coorg Eucalyptus Honey", category: "Food", sellerName: "Western Ghats Apiary", price: 750, lat: 12.3375, lng: 75.8069, img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?w=500&auto=format&fit=crop&q=60", stock: 80, sellerId: "seller19" },
            { id: "20", name: "Agra Ittar (Perfume)", category: "Handicrafts", sellerName: "Mughal Scents", price: 3500, lat: 27.1767, lng: 78.0081, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 25, sellerId: "seller20" },
            { id: "21", name: "Kanjeevaram Saree", category: "Textiles", sellerName: "Kanchi Weaves", price: 12000, lat: 12.8364, lng: 79.7036, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 5, sellerId: "seller21" },
            { id: "22", name: "Kashmiri Saffron", category: "Spices", sellerName: "Pampore Farms", price: 2500, lat: 34.0253, lng: 74.9351, img: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=60", stock: 15, sellerId: "seller22" },
            { id: "23", name: "Bikaneri Bhujia", category: "Food", sellerName: "Marwar Snacks", price: 250, lat: 28.0229, lng: 73.3119, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 150, sellerId: "seller23" },
            { id: "24", name: "Malabar Pepper", category: "Spices", sellerName: "Kerala Spices Co.", price: 600, lat: 10.8505, lng: 76.2711, img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&auto=format&fit=crop&q=60", stock: 200, sellerId: "seller24" },
            { id: "25", name: "Hyderabad Pearls", category: "Jewelry", sellerName: "Nizam Jewels", price: 5500, lat: 17.3850, lng: 78.4867, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 20, sellerId: "seller25" },
            { id: "26", name: "Madhubani Painting", category: "Art", sellerName: "Mithila Arts", price: 3000, lat: 26.3475, lng: 86.0823, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 10, sellerId: "seller26" },
            { id: "27", name: "Surat Zari Craft", category: "Handicrafts", sellerName: "Gujarat Threads", price: 1800, lat: 21.1702, lng: 72.8311, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 40, sellerId: "seller27" },
            { id: "28", name: "Kangra Tea", category: "Food", sellerName: "Himalaya Brews", price: 1500, lat: 32.0998, lng: 76.2691, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=60", stock: 50, sellerId: "seller28" },
            { id: "29", name: "Bhagalpuri Silk", category: "Textiles", sellerName: "Bihar Looms", price: 6500, lat: 25.2425, lng: 86.9842, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 12, sellerId: "seller29" },
            { id: "30", name: "Sambalpuri Saree", category: "Textiles", sellerName: "Odisha Weavers", price: 7200, lat: 21.4682, lng: 83.9786, img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=500&auto=format&fit=crop&q=60", stock: 8, sellerId: "seller30" },
            { id: "31", name: "Bastar Iron Craft", category: "Handicrafts", sellerName: "Chhattisgarh Arts", price: 2100, lat: 19.0763, lng: 82.0298, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 15, sellerId: "seller31" },
            { id: "32", name: "Brassware of Moradabad", category: "Handicrafts", sellerName: "UP Metals", price: 3400, lat: 28.8386, lng: 78.7733, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 25, sellerId: "seller32" },
            { id: "33", name: "Firozabad Glassware", category: "Handicrafts", sellerName: "Glass Arts Inc", price: 1100, lat: 27.1592, lng: 78.3957, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 60, sellerId: "seller33" },
            { id: "34", name: "Kashmiri Walnut Carving", category: "Handicrafts", sellerName: "Srinagar Woods", price: 4500, lat: 34.0836, lng: 74.7972, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 18, sellerId: "seller34" },
            { id: "35", name: "Naga Mircha (Bhut Jolokia)", category: "Spices", sellerName: "Naga Farms", price: 1400, lat: 26.1584, lng: 94.5624, img: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=60", stock: 80, sellerId: "seller35" },
            { id: "36", name: "Wayanad Robusta Coffee", category: "Food", sellerName: "Kerala Brews", price: 850, lat: 11.6854, lng: 76.1320, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=60", stock: 120, sellerId: "seller36" },
            { id: "37", name: "Gir Kesar Mango", category: "Food", sellerName: "Gujarat Orchards", price: 1200, lat: 21.0506, lng: 70.8251, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 40, sellerId: "seller37" },
            { id: "38", name: "Nagpur Orange", category: "Food", sellerName: "Maharashtra Citris", price: 600, lat: 21.1458, lng: 79.0882, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 150, sellerId: "seller38" },
            { id: "39", name: "Kutch Embroidery", category: "Textiles", sellerName: "Ahir Crafts", price: 3500, lat: 23.7337, lng: 69.8597, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 20, sellerId: "seller39" },
            { id: "40", name: "Thanjavur Paintings", category: "Art", sellerName: "Chola Arts", price: 8000, lat: 10.7870, lng: 79.1378, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 5, sellerId: "seller40" },
            { id: "41", name: "Toda Embroidery", category: "Textiles", sellerName: "Nilgiri Tribals", price: 2400, lat: 11.4064, lng: 76.6932, img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=500&auto=format&fit=crop&q=60", stock: 12, sellerId: "seller41" },
            { id: "42", name: "Phulkari Shawl", category: "Textiles", sellerName: "Punjab Weaves", price: 3200, lat: 31.1471, lng: 75.3412, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 18, sellerId: "seller42" },
            { id: "43", name: "Maheshwari Saree", category: "Textiles", sellerName: "MP Silks", price: 4800, lat: 22.1764, lng: 75.5861, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 10, sellerId: "seller43" },
            { id: "44", name: "Solapur Chaddar", category: "Textiles", sellerName: "Solapur Looms", price: 900, lat: 17.6599, lng: 75.9064, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 35, sellerId: "seller44" },
            { id: "45", name: "Darjeeling Tea", category: "Food", sellerName: "Bengal Greens", price: 1600, lat: 27.0360, lng: 88.2627, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=60", stock: 45, sellerId: "seller45" },
            { id: "46", name: "Pochampally Ikat", category: "Textiles", sellerName: "Telangana Threads", price: 5400, lat: 17.0427, lng: 78.8256, img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=500&auto=format&fit=crop&q=60", stock: 12, sellerId: "seller46" },
            { id: "47", name: "Tirupati Laddu", category: "Food", sellerName: "Tirumala Sweets", price: 300, lat: 13.6288, lng: 79.4192, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 100, sellerId: "seller47" },
            { id: "48", name: "Chanderi Fabric", category: "Textiles", sellerName: "Gwalior Weaves", price: 3800, lat: 24.7176, lng: 78.1345, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 22, sellerId: "seller48" },
            { id: "49", name: "Blue Pottery of Jaipur", category: "Handicrafts", sellerName: "Pink City Arts", price: 2500, lat: 26.9124, lng: 75.7873, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 25, sellerId: "seller49" },
            { id: "50", name: "Assam Orthodox Tea", category: "Food", sellerName: "Brahmaputra Estates", price: 1100, lat: 26.2006, lng: 92.9376, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=60", stock: 60, sellerId: "seller50" },
            { id: "51", name: "Sikkim Large Cardamom", category: "Spices", sellerName: "Gangtok Spices", price: 2800, lat: 27.5330, lng: 88.5122, img: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=60", stock: 40, sellerId: "seller51" },
            { id: "52", name: "Mizo Chilli", category: "Spices", sellerName: "Aizawl Hot", price: 900, lat: 23.1645, lng: 92.9376, img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&auto=format&fit=crop&q=60", stock: 70, sellerId: "seller52" },
            { id: "53", name: "Bangalore Pearl", category: "Jewelry", sellerName: "Deccan Gems", price: 5000, lat: 12.9716, lng: 77.5946, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 15, sellerId: "seller53" },
            { id: "54", name: "Mysore Sandalwood Oil", category: "Handicrafts", sellerName: "Karnataka Soaps", price: 4500, lat: 12.2958, lng: 76.6394, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 25, sellerId: "seller54" },
            { id: "55", name: "Kullu Shawl", category: "Textiles", sellerName: "Himachal Weaves", price: 2900, lat: 31.9578, lng: 77.1095, img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=500&auto=format&fit=crop&q=60", stock: 18, sellerId: "seller55" },
            { id: "56", name: "Bagh Print MP", category: "Textiles", sellerName: "Dhar Prints", price: 1800, lat: 22.3619, lng: 74.7937, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 30, sellerId: "seller56" },
            { id: "57", name: "Kinaram Wood Craft", category: "Handicrafts", sellerName: "Varanasi Woods", price: 1600, lat: 25.3176, lng: 82.9739, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 20, sellerId: "seller57" },
            { id: "58", name: "Bhavani Jamakkalam", category: "Textiles", sellerName: "Erode Carpets", price: 1200, lat: 11.4554, lng: 77.6826, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 35, sellerId: "seller58" },
            { id: "59", name: "Joynagar Moa", category: "Food", sellerName: "Bengal Sweets", price: 400, lat: 22.1762, lng: 88.4230, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 75, sellerId: "seller59" },
            { id: "60", name: "Alleppey Coir", category: "Handicrafts", sellerName: "Kerala Backwaters", price: 800, lat: 9.4981, lng: 76.3388, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 50, sellerId: "seller60" },
            { id: "61", name: "Ganjam Ikat", category: "Textiles", sellerName: "Odisha Ikat", price: 5800, lat: 19.3800, lng: 84.9700, img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=500&auto=format&fit=crop&q=60", stock: 12, sellerId: "seller61" },
            { id: "62", name: "Salem Fabric", category: "Textiles", sellerName: "TN Weavers", price: 1400, lat: 11.6643, lng: 78.1460, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 40, sellerId: "seller62" },
            { id: "63", name: "Jalpaiguri Honey", category: "Food", sellerName: "Dooars Apiary", price: 500, lat: 26.5404, lng: 88.7408, img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?w=500&auto=format&fit=crop&q=60", stock: 90, sellerId: "seller63" },
            { id: "64", name: "Khandua Saree", category: "Textiles", sellerName: "Cuttack Silks", price: 6200, lat: 20.4625, lng: 85.8830, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 8, sellerId: "seller64" },
            { id: "65", name: "Nashik Grapes", category: "Food", sellerName: "Maharashtra Vineyards", price: 350, lat: 19.9975, lng: 73.7898, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 120, sellerId: "seller65" },
            { id: "66", name: "Bhalia Wheat", category: "Food", sellerName: "Gujarat Grains", price: 180, lat: 22.2587, lng: 71.1924, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 200, sellerId: "seller66" },
            { id: "67", name: "Kangra Paintings", category: "Art", sellerName: "HP Arts", price: 4500, lat: 32.0955, lng: 76.2691, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 6, sellerId: "seller67" },
            { id: "68", name: "Pokkali Rice", category: "Food", sellerName: "Kerala Farms", price: 200, lat: 10.0159, lng: 76.3419, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 180, sellerId: "seller68" },
            { id: "69", name: "Burdwan Sitabhog", category: "Food", sellerName: "Bengal Snacks", price: 300, lat: 23.2324, lng: 87.8615, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 80, sellerId: "seller69" },
            { id: "70", name: "Pipli Applique", category: "Handicrafts", sellerName: "Puri Craft", price: 1500, lat: 20.1212, lng: 85.8306, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 28, sellerId: "seller70" },
            { id: "71", name: "Dharwad Cotton", category: "Textiles", sellerName: "Karnataka Cottons", price: 1200, lat: 15.4589, lng: 75.0078, img: "https://images.unsplash.com/photo-1583391733958-65e27a69b76c?w=500&auto=format&fit=crop&q=60", stock: 35, sellerId: "seller71" },
            { id: "72", name: "Gadwal Saree", category: "Textiles", sellerName: "Telangana Looms", price: 8500, lat: 16.2289, lng: 77.8016, img: "https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=500&auto=format&fit=crop&q=60", stock: 10, sellerId: "seller72" },
            { id: "73", name: "Bhadrak Mihidana", category: "Food", sellerName: "Indian Sweets", price: 320, lat: 21.0560, lng: 86.4950, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60", stock: 65, sellerId: "seller73" },
            { id: "74", name: "Cuttack Silver Filigree", category: "Jewelry", sellerName: "Odisha Silver", price: 6500, lat: 20.4625, lng: 85.8830, img: "https://images.unsplash.com/photo-1610419266155-fc42c1ab2090?w=500&auto=format&fit=crop&q=60", stock: 12, sellerId: "seller74" },
            { id: "75", name: "Aligarh Padlocks", category: "Handicrafts", sellerName: "UP Metals", price: 900, lat: 27.8974, lng: 78.0880, img: "https://images.unsplash.com/photo-1544485558-cc30ebad3234?w=500&auto=format&fit=crop&q=60", stock: 45, sellerId: "seller75" }
        ];
        localStorage.setItem('lt_products', JSON.stringify(products));
    }

    if (!localStorage.getItem('lt_cart')) {
        localStorage.setItem('lt_cart', JSON.stringify([]));
    }

    if (!localStorage.getItem('lt_orders')) {
        localStorage.setItem('lt_orders', JSON.stringify([]));
    }
}

// User Auth
function getUsers() { return JSON.parse(localStorage.getItem('lt_users') || '[]'); }
function saveUsers(users) { localStorage.setItem('lt_users', JSON.stringify(users)); }
function getCurrentUser() { return JSON.parse(localStorage.getItem('lt_current_user') || 'null'); }
function login(user) { localStorage.setItem('lt_current_user', JSON.stringify(user)); }
function logout() { localStorage.removeItem('lt_current_user'); window.location.href = 'index.html'; }

// Products
function getProducts() { return JSON.parse(localStorage.getItem('lt_products') || '[]'); }
function saveProducts(products) { localStorage.setItem('lt_products', JSON.stringify(products)); }

// Cart
function getCart() { return JSON.parse(localStorage.getItem('lt_cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('lt_cart', JSON.stringify(cart)); }
function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find(i => i.productId === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ productId, qty });
    }
    saveCart(cart);
}
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(i => i.productId !== productId);
    saveCart(cart);
}
function clearCart() { saveCart([]); }

// Orders
function getOrders() { return JSON.parse(localStorage.getItem('lt_orders') || '[]'); }
function saveOrders(orders) { localStorage.setItem('lt_orders', JSON.stringify(orders)); }
function createOrder(orderData) {
    const orders = getOrders();
    orders.push({
        id: 'LT-' + Math.floor(Math.random() * 100000),
        date: new Date().toISOString(),
        ...orderData
    });
    saveOrders(orders);
}

// Queries / Interactions
function getQueries() { return JSON.parse(localStorage.getItem('lt_queries') || '[]'); }
function saveQueries(queries) { localStorage.setItem('lt_queries', JSON.stringify(queries)); }
function askQuery(productId, sellerId, text) {
    const queries = getQueries();
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Check if conversation already exists
    let query = queries.find(q => q.productId === productId && q.buyerId === currentUser.id);
    const msg = { senderId: currentUser.id, senderName: currentUser.name, text, date: new Date().toISOString() };
    
    if (query) {
        query.messages.push(msg);
    } else {
        queries.push({
            id: 'Q-' + Date.now(),
            productId: productId,
            buyerId: currentUser.id,
            buyerName: currentUser.name,
            sellerId: sellerId,
            messages: [msg]
        });
    }
    saveQueries(queries);
}
function replyQuery(queryId, text) {
    const queries = getQueries();
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    let query = queries.find(q => q.id === queryId);
    if (query) {
        query.messages.push({
            senderId: currentUser.id,
            senderName: currentUser.name,
            text: text,
            date: new Date().toISOString()
        });
        saveQueries(queries);
    }
}

// Run init on load
initDB();