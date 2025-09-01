const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");
const productPrice = document.getElementById("productPrice");
const productQty = document.getElementById("productQty");
const iva = document.getElementById("iva");
const budgetList = document.getElementById("budgetList");

calcBtn.addEventListener("click", () => {
  const price = parseFloat(productPrice.value);
  const qty = parseInt(productQty.value);
  const ivaPercent = parseFloat(iva.value);

  if (isNaN(price) || isNaN(qty) || isNaN(ivaPercent)) return;

  const subtotal = price * qty;
  const ivaAmount = subtotal * (ivaPercent / 100);
  const total = subtotal + ivaAmount;

  const li = document.createElement("li");
  li.textContent = `Cantidad: ${qty}, Precio unitario: $${price.toFixed(2)}, IVA: $${ivaAmount.toFixed(2)}, Total: $${total.toFixed(2)}`;
  budgetList.appendChild(li);

  productPrice.value = "";
  productQty.value = "";
  iva.value = "21";
});

clearBtn.addEventListener("click", () => {
  budgetList.innerHTML = "";
});
