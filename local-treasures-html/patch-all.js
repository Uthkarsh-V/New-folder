const fs = require('fs');

const dir = 'c:/Users/Uthkarsh gowda.V/OneDrive/Desktop/New folder/local-treasures-html/';
['index.html', 'buyer-dashboard.html', 'product.html', 'cart.html', 'orders.html'].forEach(file => {
    try {
        let content = fs.readFileSync(dir + file, 'utf8');
        if (!content.includes('db.js')) {
            content = content.replace('</body>', '<script src="db.js"></script>\\n</body>');
            fs.writeFileSync(dir + file, content);
            console.log('Injected db.js into ' + file);
        }
    } catch(e){}
});
