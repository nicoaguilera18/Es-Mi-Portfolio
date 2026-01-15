// ==========================
// ELEMENTOS DEL DOM
// ==========================
const priceInput = document.getElementById("productPrice");
const qtyInput = document.getElementById("quantity");
const taxInput = document.getElementById("tax");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const totalCostSpan = document.getElementById("totalCost");
const taxAmountSpan = document.getElementById("taxAmount");
const totalWithTaxSpan = document.getElementById("totalWithTax");

// ==========================
// CALCULAR PRESUPUESTO
// ==========================
calculateBtn.addEventListener("click", calculateBudget);

function calculateBudget() {
  const price = parseFloat(priceInput.value);
  const quantity = parseInt(qtyInput.value);
  const taxPercent = parseFloat(taxInput.value);

  if (isNaN(price) || isNaN(quantity) || isNaN(taxPercent)) {
    alert("Por favor completá todos los campos correctamente.");
    return;
  }

  if (price < 0 || quantity <= 0 || taxPercent < 0) {
    alert("Los valores ingresados no son válidos.");
    return;
  }

  const total = price * quantity;
  const taxAmount = total * (taxPercent / 100);
  const totalWithTax = total + taxAmount;

  totalCostSpan.textContent = formatCurrency(total);
  taxAmountSpan.textContent = formatCurrency(taxAmount);
  totalWithTaxSpan.textContent = formatCurrency(totalWithTax);
}

// ==========================
// LIMPIAR RESULTADOS
// ==========================
clearBtn.addEventListener("click", clearBudget);

function clearBudget() {
  priceInput.value = "";
  qtyInput.value = "";
  taxInput.value = "";

  totalCostSpan.textContent = "0";
  taxAmountSpan.textContent = "0";
  totalWithTaxSpan.textContent = "0";
}

// ==========================
// FORMATO MONEDA
// ==========================
function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}
