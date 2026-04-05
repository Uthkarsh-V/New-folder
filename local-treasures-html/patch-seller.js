const fs = require('fs');
const filepath = 'c:/Users/Uthkarsh gowda.V/OneDrive/Desktop/New folder/local-treasures-html/seller-dashboard.html';

let content = fs.readFileSync(filepath, 'utf8');

// 1. Add db.js script link if not present
if (!content.includes('<script src="db.js"></script>')) {
    content = content.replace('', '<script src="db.js"></script>\n    ');
}

// 2. Locate the existing script block
const scriptStartMarker = 'let editingRow = null;';
const scriptStartMatch = content.indexOf(scriptStartMarker);

if (scriptStartMatch !== -1) {
    const scriptStartIdx = content.lastIndexOf('<script>', scriptStartMatch);
    const scriptEndIdx = content.indexOf('</script>', scriptStartIdx);

    // Note the use of \` and \${ to escape nested literals
    let newScript = `
        let editingRow = null;
        let editingProductId = null;
        let sellerProducts = [];

        function renderInventory() {
            const tbody = document.querySelector('#inventory-table tbody');
            if (!tbody) return;
            tbody.innerHTML = '';
            
            const currentUser = getCurrentUser();
            if (!currentUser) return;

            sellerProducts = getProducts().filter(p => p.sellerId === currentUser.id);

            sellerProducts.forEach(prod => {
                const tr = document.createElement('tr');
                tr.className = "border-b border-neutral-100 hover:bg-neutral-50 text-sm";
                tr.innerHTML = \`
                    <td class="p-4 flex items-center gap-3 font-bold">
                        \${prod.name}
                    </td>
                    <td class="p-4">\${prod.category}</td>
                    <td class="p-4"><span class="px-2 py-1 bg-green-100 text-green-800 font-bold rounded-full text-xs">\${prod.stock} left</span></td>
                    <td class="p-4">₹\${prod.price}</td>
                    <td class="p-4 bg-emerald-50 text-emerald-800 font-bold">₹\${Math.floor(prod.price * 0.9)}</td>
                    <td class="p-4 text-right"><button onclick="editProduct('\${prod.id}')" class="text-blue-600 hover:underline font-bold">Edit</button></td>
                \`;
                tbody.appendChild(tr);
            });
        }

        window.onload = function() {
            const currentUser = getCurrentUser();
            if(!currentUser) {
                window.location.href = 'index.html';
                return;
            }
            const nameDisplay = document.querySelector('.text-sm.font-medium.mt-1');
            if(nameDisplay) {
                 nameDisplay.innerText = currentUser.name || 'Seller';
            }
            renderInventory();
        }

        function toggleAddProductModal() {
            const modal = document.getElementById('add-product-modal');
            if (modal) {
                modal.classList.toggle('hidden');
                modal.classList.toggle('flex');
            }
        }

        function openAddProductModal() {
            editingProductId = null;
            const title = document.getElementById('modal-title');
            const form = document.getElementById('add-product-form');
            if(title) title.innerText = "Add New Product";
            if(form) form.reset();
            toggleAddProductModal();
        }

        function editProduct(productId) {
            editingProductId = productId;
            const prod = sellerProducts.find(p => p.id === productId);
            if(!prod) return;

            const title = document.getElementById('modal-title');
            if(title) title.innerText = "Edit Product";
            
            document.getElementById('prod-name').value = prod.name;
            document.getElementById('prod-category').value = prod.category;
            document.getElementById('prod-stock').value = prod.stock;
            document.getElementById('prod-price').value = prod.price;
            document.getElementById('prod-min-price').value = Math.floor(prod.price * 0.9);

            toggleAddProductModal();
        }

        function handleAddProduct(e) {
            e.preventDefault();

            const name = document.getElementById('prod-name').value;
            const category = document.getElementById('prod-category').value;
            const stock = parseInt(document.getElementById('prod-stock').value) || 0;
            const price = parseFloat(document.getElementById('prod-price').value) || 0;
            const currentUser = getCurrentUser();

            let allProducts = getProducts();

            if (editingProductId) {
                const idx = allProducts.findIndex(p => p.id === editingProductId);
                if(idx !== -1) {
                    allProducts[idx].name = name;
                    allProducts[idx].category = category;
                    allProducts[idx].stock = stock;
                    allProducts[idx].price = price;
                }
            } else {
                allProducts.push({
                    id: 'prod_' + Date.now(),
                    name: name,
                    category: category,
                    price: price,
                    stock: stock,
                    sellerId: currentUser ? currentUser.id : 'seller1',
                    sellerName: currentUser ? currentUser.name : 'Guru Sweets',
                    lat: 12.2958 + (Math.random() - 0.5) * 0.1,
                    lng: 76.6394 + (Math.random() - 0.5) * 0.1,
                    rating: 5.0
                });
            }

            saveProducts(allProducts);
            renderInventory();
            e.target.reset();
            toggleAddProductModal();
            editingProductId = null;
        }

        function switchTab(tabId) {
            ['inventory', 'orders', 'finance'].forEach(id => {
                const view = document.getElementById('view-' + id);
                const btn = document.getElementById('tab-' + id);
                if(view) {
                    view.classList.add('hidden');
                    view.classList.remove('block');
                }
                if(btn) {
                    btn.classList.remove('bg-emerald-600', 'text-white', 'font-bold');
                    btn.classList.add('text-neutral-300', 'hover:bg-neutral-800', 'font-medium');
                }
            });

            const activeView = document.getElementById('view-' + tabId);
            const activeBtn = document.getElementById('tab-' + tabId);
            
            if(activeView) {
                activeView.classList.remove('hidden');
                activeView.classList.add('block');
            }
            if(activeBtn) {
                activeBtn.classList.add('bg-emerald-600', 'text-white', 'font-bold');
                activeBtn.classList.remove('text-neutral-300', 'hover:bg-neutral-800', 'font-medium');
            }
        }
    `;

    // 3. Construct the final content and save
    content = content.slice(0, scriptStartIdx + 8) + '\n' + newScript + '\n    ' + content.slice(scriptEndIdx);
    fs.writeFileSync(filepath, content);
    console.log('✅ seller-dashboard.html updated successfully');
} else {
    console.error('❌ Could not find script start marker "let editingRow = null;" in the file.');
}