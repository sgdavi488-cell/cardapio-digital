const grid = document.querySelector("#menu-grid");
const statusLine = document.querySelector("#api-status");
const cart = new Map();
let menu = [];
let activeCategory = "Todos";
let searchTerm = "";

const money = value => value.toLocaleString("pt-BR", {style:"currency",currency:"BRL"});

// Se uma foto externa falhar, tenta outras imagens automaticamente.
const imageBackups = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
];
window.handleDishImageError = function(image) {
  const next = Number(image.dataset.backup || 0);
  if (next < imageBackups.length) {
    image.dataset.backup = String(next + 1);
    image.src = imageBackups[next];
  } else {
    image.classList.add("image-unavailable");
    image.removeAttribute("src");
  }
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

async function loadMenu() {
  try {
    // A API do projeto é o próprio arquivo JSON publicado junto com o site.
    const response = await fetch("./data/menu.json");
    if (!response.ok) throw new Error("Não foi possível carregar o menu.");
    menu = await response.json();
    statusLine.textContent = `${menu.length} opções no cardápio · toque em adicionar para escolher`;
    renderMenu();
  } catch (error) {
    statusLine.textContent = "Não foi possível carregar o menu. Atualize a página para tentar novamente.";
    grid.innerHTML = '<p class="no-results">Nosso menu está temporariamente indisponível.</p>';
  }
}

function renderMenu() {
  const visible = menu.filter(item => {
    const categoryMatch = activeCategory === "Todos" || item.category === activeCategory;
    const searchMatch = (item.name + " " + item.description).toLocaleLowerCase("pt-BR").includes(searchTerm);
    return categoryMatch && searchMatch;
  });
  grid.innerHTML = visible.length ? visible.map(item => `
    <article class="dish-card">
      <div class="dish-photo"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" onerror="handleDishImageError(this)"><span class="dish-category">${escapeHTML(item.tag || item.category)}</span></div>
      <div class="dish-info">
        <div class="dish-title-line"><h3>${escapeHTML(item.name)}</h3><span class="dish-price">${money(item.price)}</span></div>
        <p class="dish-description">${escapeHTML(item.description)}</p>
        <button class="add-button" data-add="${item.id}">Adicionar à sacola <span>＋</span></button>
      </div>
    </article>`).join("") : '<p class="no-results">Não encontramos pratos com esse nome.</p>';
}

document.querySelector("#filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderMenu();
});
document.querySelector("#search").addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLocaleLowerCase("pt-BR");
  renderMenu();
});

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2100);
}
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = Number(button.dataset.add);
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  showToast("Adicionado à sacola! Toque em Sacola para conferir.");
});

function renderCart() {
  const entries = [...cart.entries()];
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [id, quantity]) => sum + menu.find(item => item.id === id).price * quantity, 0);
  document.querySelector("#cart-count").textContent = count;
  document.querySelector("#cart-total").textContent = money(total);
  document.querySelector("#checkout").disabled = count === 0;
  document.querySelector("#cart-items").innerHTML = entries.length ? entries.map(([id, quantity]) => {
    const item = menu.find(product => product.id === id);
    return `<div class="cart-row"><div><h3>${escapeHTML(item.name)}</h3><small>${money(item.price)} · ${money(item.price * quantity)}</small></div><div class="quantity"><button data-change="${id}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${quantity}</span><button data-change="${id}" data-delta="1" aria-label="Aumentar quantidade">＋</button></div></div>`;
  }).join("") : '<p class="empty-cart">Sua sacola está vazia por enquanto.</p>';
}
document.querySelector("#cart-items").addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const id = Number(button.dataset.change);
  const next = (cart.get(id) || 0) + Number(button.dataset.delta);
  if (next <= 0) cart.delete(id); else cart.set(id, next);
  renderCart();
});

function setCartOpen(open) {
  document.body.classList.toggle("cart-open", open);
  document.querySelector("#cart-drawer").setAttribute("aria-hidden", String(!open));
}
document.querySelector("#open-cart").addEventListener("click", () => setCartOpen(true));
document.querySelector("#close-cart").addEventListener("click", () => setCartOpen(false));
document.querySelector("#drawer-backdrop").addEventListener("click", () => setCartOpen(false));
document.addEventListener("keydown", event => { if (event.key === "Escape") setCartOpen(false); });

document.querySelector("#checkout").addEventListener("click", () => {
  const number = (window.RESTAURANT_CONFIG?.whatsappNumber || "").replace(/\D/g, "");
  if (!number) {
    showToast("Configure o WhatsApp no arquivo config.js para receber pedidos.");
    return;
  }
  const lines = [...cart.entries()].map(([id, quantity]) => {
    const item = menu.find(product => product.id === id);
    return `• ${quantity}x ${item.name} — ${money(item.price * quantity)}`;
  });
  const total = [...cart.entries()].reduce((sum, [id, quantity]) => sum + menu.find(item => item.id === id).price * quantity, 0);
  const message = ["Olá! Gostaria de fazer este pedido:", "", ...lines, "", `Total: ${money(total)}`, "", "Aguardo a confirmação. Obrigado!"].join("\n");
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

loadMenu();