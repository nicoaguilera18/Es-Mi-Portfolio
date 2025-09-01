const productName = document.getElementById('productName');
const productQty = document.getElementById('productQty');
const productPrice = document.getElementById('productPrice');
const productDiscount = document.getElementById('productDiscount');
const addProductBtn = document.getElementById('addProductBtn');
const productList = document.getElementById('productList');
const subtotalSpan = document.getElementById('subtotal');
const taxAmountSpan = document.getElementById('taxAmount');
const totalSpan = document.getElementById('total');
const taxInput = document.getElementById('tax');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Función para calcular totales
function calculateTotals() {
  let subtotal = 0;
  products.forEach(p => {
    const price = p.price * p.qty;
    const discountAmount = price * (p.discount / 100 || 0);
    subtotal += price - discountAmount;
  });
  const taxAmount = subtotal * (taxInput.value / 100);
  const total = subtotal + taxAmount;

  subtotalSpan.textContent = subtotal.toFixed(2);
  taxAmountSpan.textContent = taxAmount.toFixed(2);
  totalSpan.textContent = total.toFixed(2);
}

// Función para renderizar la lista
function renderList() {
  productList.innerHTML = '';
  products.forEach((p, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${p.name} - ${p.qty} x $${p.price.toFixed(2)} 
                    ${p.discount ? `(-${p.discount}%)` : ''} 
                    = $${((p.price * p.qty) * (1 - (p.discount / 100 || 0))).toFixed(2)}
                    <button class="deleteBtn">X</button>`;
    li.querySelector('.deleteBtn').addEventListener('click', () => {
      products.splice(index, 1);
      saveAndRender();
    });
    productList.appendChild(li);
  });
  calculateTotals();
}

// Guardar en localStorage y renderizar
function saveAndRender() {
  localStorage.setItem('products', JSON.stringify(products));
  renderList();
}

// Agregar producto
addProductBtn.addEventListener('click', () => {
  if (!productName.value || !productQty.value || !productPrice.value) return;

  products.push({
    name: productName.value,
    qty: parseFloat(productQty.value),
    price: parseFloat(productPrice.value),
    discount: parseFloat(productDiscount.value) || 0
  });

  productName.value = '';
  productQty.value = '';
  productPrice.value = '';
  productDiscount.value = '';

  saveAndRender();
});

// Cambiar IVA
taxInput.addEventListener('input', calculateTotals);

// Limpiar todo
clearBtn.addEventListener('click', () => {
  products = [];
  saveAndRender();
});

// Exportar a PDF (simple)
exportBtn.addEventListener('click', () => {
  let content = 'Presupuesto:\n\n';
  products.forEach(p => {
    content += `${p.name} - ${p.qty} x $${p.price.toFixed(2)} ${p.discount ? `(-${p.discount}%)` : ''} = $${((p.price*p.qty)*(1-(p.discount/100||0))).toFixed(2)}\n`;
  });
  content += `\nSubtotal: $${subtotalSpan.textContent}\nIVA: $${taxAmountSpan.textContent}\nTotal: $${totalSpan.textContent}`;
  
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "presupuesto.txt";
  link.click();
});

// Inicializar
renderList();
