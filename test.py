import json
import random

categories = ["Food", "Textiles", "Handicrafts", "Spices", "Jewelry", "Art", "Pottery"]
names = {
    "Food": ["Darjeeling Tea", "Mangoes", "Saffron", "Cashews", "Honey", "Pickle"],
    "Textiles": ["Pashmina Shawl", "Kanjeevaram Silk", "Banarasi Saree", "Cotton Kurta", "Bandhani Dupatta"],
    "Handicrafts": ["Bamboo Basket", "Wood Carving", "Brass Idol", "Jute Bag", "Terracotta Horse"],
    "Spices": ["Black Pepper", "Cardamom", "Cinnamon", "Turmeric", "Cumin"],
    "Jewelry": ["Silver Anklet", "Toad Ring", "Gold Necklace", "Pearl Bangle", "Temple Jewelry"],
    "Art": ["Madhubani Painting", "Warli Art", "Pattachitra", "Tanjore Painting", "Miniature Painting"],
    "Pottery": ["Blue Pottery", "Khurja Pottery", "Black Clay Pottery", "Terracotta Pot", "Clay Lamp"]
}
sellers = ["Rajan", "Priya", "Amit", "Sneha", "Karan", "Pooja", "Vikram", "Anjali", "Rahul", "Neha", "Suresh", "Kavita", "Ramesh", "Sunita", "Rajesh", "Geeta", "Mahesh", "Sita", "Ganesh", "Rekha"]
images = [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    "https://images.unsplash.com/photo-1583394838336-aced9783e20e",
    "https://images.unsplash.com/photo-1599839619722-39751411ea63",
    "https://images.unsplash.com/photo-1610991950961-0ae750cddeed",
    "https://images.unsplash.com/photo-1558024227-2c5e5fbf9ef9"
]

items = []
for i in range(21, 91):
    cat = random.choice(categories)
    name = random.choice(names[cat])
    seller_name = random.choice(sellers)
    price = random.randint(100, 5000)
    lat = round(random.uniform(8.07, 35.0), 4)
    lng = round(random.uniform(68.1, 97.4), 4)
    img = random.choice(images)
    stock = random.randint(1, 50)
    
    item = {
        "id": str(i),
        "name": name,
        "category": cat,
        "sellerName": seller_name,
        "price": price,
        "lat": lat,
        "lng": lng,
        "img": img,
        "stock": stock,
        "sellerId": f"seller{i}"
    }
    items.append(item)

with open("output.json", "w") as f:
    json.dump(items, f)
