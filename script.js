function scrollToGallery(){
    const gallerySection = document.getElementById("gallery");
    if (gallerySection){
        gallerySection.scrollIntoView({behavior:"smooth"});
    }
}
function scrollToPizza(){
    const banner = document.getElementById("Rn-Pizza");
    if(banner){
    banner.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToBurger(){
    const Burger = document.getElementById("Burger-Home");
    if(Burger){
    Burger.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToFriedChicken(){
    const FriedChicken = document.getElementById("Fried-Chicken-Home");
    if(FriedChicken){
    FriedChicken.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToPasta(){
    const Pasta = document.getElementById("Main-Meal-Home");
    if(Pasta){
    Pasta.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToSuchi(){
    const Suchi = document.getElementById("Suchi-Home");
    if(Suchi){
    Suchi.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToCakes(){
    const Cakes = document.getElementById("cakes-pastries-Home");
    if(Cakes){
    Cakes.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToDrinks(){
    const Drinks = document.getElementById("Drinks-Home");
    if(Drinks){
    Drinks.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToCoffee(){
    const Coffee = document.getElementById("Coffee-Home");
    if(Coffee){
    Coffee.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToIceCream(){
    const IceCream = document.getElementById("Ice-Cream-Home");
    if(IceCream){
    IceCream.scrollIntoView({behavior: "smooth"});
    }
}

function scrollToPizzaMenu(){
    const PizzaMenu = document.getElementById("PizzaMenu");
    if(PizzaMenu){
    PizzaMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToBurgerMenu(){
    const BurgerMenu = document.getElementById("BurgerMenu");
    if(BurgerMenu){
    BurgerMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToFriedChickenMenu(){
    const FriedChickenMenu = document.getElementById("FriedChickenMenu");
    if(FriedChickenMenu){
    FriedChickenMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToMainMealMenu(){
    const MainMealMenu = document.getElementById("MainMealMenu");
    if(MainMealMenu){
    MainMealMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToSuchiMenu(){
    const SuchiMenu = document.getElementById("SuchiMenu");
    if(SuchiMenu){
    SuchiMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToCakesMenu(){
    const CakesMenu = document.getElementById("CakesMenu");
    if(CakesMenu){
    CakesMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToDrinksMenu(){
    const DrinksMenu = document.getElementById("DrinksMenu");
    if(DrinksMenu){
    DrinksMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToCoffeeMenu(){
    const CoffeeMenu = document.getElementById("CoffeeMenu");
    if(CoffeeMenu){
    CoffeeMenu.scrollIntoView({behavior: "smooth"});
    }
}
function scrollToIceCreamMenu(){
    const IceCreamMenu = document.getElementById("IceCreamMenu");
    if(IceCreamMenu){
    IceCreamMenu.scrollIntoView({behavior: "smooth"});
    }
}


function scrollToBookTable(){
    const BookATable = document.getElementById("BookATable");
    if(BookATable){
    BookATable.scrollIntoView({behavior: "smooth"});
    }
}

function openUserModal(){
    document.getElementById("userModal").style.display = "flex";
}
function closeUserModal(){
    document.getElementById("userModal").style.display = "none";
}
window.onclick = function(event) {
    const modal = document.getElementById("userModal");
    if (event.target == modal){
        modal.style.display = "none";
    }
}

// ==========================================
// 1. استرجاع بيانات السلة من الـ LocalStorage
// ==========================================
let cart = JSON.parse(localStorage.getItem("myCart")) || [];

// دالة حفظ السلة
function saveCart() {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

// ==========================================
// 2. دوال إضافة المنتجات للسلة
// ==========================================

// إضافة أكلة عادية
function addToCart(itemName, itemPrice) {
  let price = Number(itemPrice) || 0;
  let existingItem = cart.find(item => item.name === itemName);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ name: itemName, price: price, quantity: 1 });
  }

  saveCart();
  updateCartDOM();
  showToast("Added to cart: " + itemName);
}

// إضافة أكلة بأحجام (Small / Medium / Large)
function addWithSizeToCart(btnElement) {
  const card = btnElement.closest('.card') || btnElement.parentElement;
  if (!card) return;

  const titleElement = card.querySelector('h3') || card.querySelector('h2');
  const selectElement = card.querySelector('select');

  if (!titleElement || !selectElement) return;

  const itemName = titleElement.innerText.trim();
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const size = selectedOption.getAttribute('data-size') || selectedOption.innerText.trim();
  const price = Number(selectedOption.value) || 0;

  const fullItemName = itemName + " (" + size + ")";

  let existingItem = cart.find(item => item.name === fullItemName);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ name: fullItemName, price: price, quantity: 1 });
  }

  saveCart();
  updateCartDOM();
  showToast("Added to cart: " + fullItemName);
}

// ==========================================
// 3. دوال التحكم في الكميات والمسح
// ==========================================

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartDOM();
}

function increaseQuantity(index) {
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  saveCart();
  updateCartDOM();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartDOM();
}

// ==========================================
// 4. رسم وعرض السلة على الشاشة (DOM)
// ==========================================

// 🔔 دالة إنشاء الـ Toast Notification المظبوطة
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  
  // 🎨 استخدام SVG لعلامة الصح المضمونة 100%
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);

  setTimeout(() => { toast.classList.add("show"); }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.remove(); }, 300);
  }, 3000);
}

// 🛒 دالة تحديث السلة بالأبعاد الواضحة وأيقونة Trash السليمة
function updateCartDOM() {
  const container = document.getElementById("cart-items-container");
  const totalElement = document.getElementById("cart-total");

  if (!container || !totalElement) return;

  if (cart.length === 0) {
    container.innerHTML = '<p id="empty-cart-msg" style="text-align: center; color: white;">Your cart is empty!</p>';
    totalElement.innerText = "0 L.E";
    
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = "0";
    return;
  }

  container.innerHTML = "";
  let totalSum = 0;
  let totalQtySum = 0;

  cart.forEach((item, index) => {
    let qty = item.quantity ? item.quantity : 1;
    item.quantity = qty;

    let price = Number(item.price) || 0;
    let itemTotal = price * qty;
    
    totalSum += itemTotal;
    totalQtySum += qty;

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.padding = "10px 0";
    div.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
    div.style.color = "white";

    div.innerHTML = `
      <span style="font-size: 14px; font-weight: 500; line-height: 1.3; flex: 1; padding-right: 10px; word-break: normal;">${item.name}</span>
      
      <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0; margin-left: auto;">
        <button onclick="decreaseQuantity(${index})" style="width: 22px; height: 22px; line-height: 18px; padding: 0; cursor: pointer; background: #f1c40f; border: none; border-radius: 4px; font-weight: bold; font-size: 14px;">-</button>
        <span style="min-width: 16px; text-align: center; font-size: 13px; font-weight: bold;">${qty}</span>
        <button onclick="increaseQuantity(${index})" style="width: 22px; height: 22px; line-height: 18px; padding: 0; cursor: pointer; background: #f1c40f; border: none; border-radius: 4px; font-weight: bold; font-size: 14px;">+</button>
        
        <span style="margin-left: 6px; margin-right: 6px; font-weight: bold; font-size: 13px; min-width: 55px; text-align: right;">${itemTotal} L.E</span>
        
        <button onclick="removeFromCart(${index})" title="Delete" style="background: none; border: none; cursor: pointer; padding: 2px; display: flex; align-items: center; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff4757">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    `;

    container.appendChild(div);
  });

  totalElement.innerText = totalSum + " L.E";

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = totalQtySum;
  }
}

// ==========================================
// 5. التحكم في فتح وغلق نافذة السلة (Modal)
// ==========================================

function openCartModal() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.style.display = "flex";
    updateCartDOM();
  }
}

function closeCartModal() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  const modal = document.getElementById("cartModal");
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
};

// ==========================================
// 6. دالة البحث في الأكلات
// ==========================================

function toggleSearchBar() {
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "flex";
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.focus();
    } else {
      searchBox.style.display = "none";
    }
  }
}

function searchFood() {
  var input = document.getElementById("searchInput").value.toLowerCase().trim();
  var allItems = document.querySelectorAll(".card, .menu-item, .gallery-item, [class*='card']");
  var noResults = document.getElementById("noResultsMsg");
  var found = 0;

  allItems.forEach(function(item) {
    var itemText = item.innerText ? item.innerText.toLowerCase() : "";
    if (input === "" || itemText.includes(input)) {
      item.style.setProperty("display", "", "important");
      found++;
    } else {
      item.style.setProperty("display", "none", "important");
    }
  });

  if (noResults) {
    noResults.style.display = (found === 0 && input !== "") ? "block" : "none";
  }
}

// ==========================================
// 7. تشغيل السلة تلقائياً عند تحميل الصفحة
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
  updateCartDOM();
});

function toggleSearchBar() {
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "flex"; // استخدام flex لضبط المحاذاة في المنتصف
      document.getElementById("searchInput").focus();
    } else {
      searchBox.style.display = "none";
    }
  }
}

function searchFood() {
  const inputElement = document.getElementById("searchInput");
  if (!inputElement) return;

  const input = inputElement.value.toLowerCase().trim();
  
  // البحث في كروت الأكلات الفعلية فقط عشان التصميم ميبظش
  const cards = document.querySelectorAll(".card");
  const noResultsMsg = document.getElementById("noResultsMsg");
  
  // كل العناوين والبانرات وقسم المعرض اللي ممكن يعمل شكل غريب أثناء البحث
  const extraSections = document.querySelectorAll("#Home, #gallery, .banner, .Burger, h5, .gallery-section, .FriedChicken, .Pasta, .Suchi, .Cakes, .Drinks, .Coffee, .IceCream");

  let foundCount = 0;

  cards.forEach(card => {
    const titleElement = card.querySelector("h3");
    
    if (titleElement) {
      // تنظيف اسم الوجبة من المسافات الزائدة ونزول السطر
      const titleText = titleElement.innerText.toLowerCase().replace(/\s+/g, ' ').trim();

      if (input === "" || titleText.includes(input)) {
        card.style.display = ""; // إظهار الكارت بحجمه وشكله الطبيعي
        foundCount++;
      } else {
        card.style.display = "none"; // إخفاء الكارت غير المطابق
      }
    }
  });

  // لما نكون بنكتب كلمة بحث: نخفي البانرات والمعرض عشان النتايج تبان نظيفة ومظبوطة
  if (input !== "") {
    extraSections.forEach(sec => sec.style.display = "none");
  } else {
    // لما نمسح البحث: نرجع كل حاجة أصلية زي ما كانت
    extraSections.forEach(sec => sec.style.display = "");
  }

  // رسالة عدم وجود نتائج
  if (noResultsMsg) {
    if (foundCount === 0 && input !== "") {
      noResultsMsg.style.display = "block";
    } else {
      noResultsMsg.style.display = "none";
    }
  }
}


// 📅 كود فحص الحجز المظبوط لسكشن BookATable
document.addEventListener("DOMContentLoaded", function () {
  // 1. العثور على زرار Book Now عن طريق الـ id="Btn" أو السكشن
  const bookBtn = document.getElementById("Btn") || document.querySelector("#BookATable button");
  const bookSection = document.getElementById("BookATable");

  if (bookBtn && bookSection) {
    bookBtn.addEventListener("click", function (e) {
      e.preventDefault(); // منع أي سلوك افتراضي

      // 2. جلب جميع الخانات النصية والأرقام جوه سكشن BookATable
      const inputs = bookSection.querySelectorAll("input");
      let allFilled = true;

      // 3. فحص كل خانة هل فيها كلام ولا فاضية
      inputs.forEach(input => {
        if (!input.value.trim()) {
          allFilled = false;
        }
      });

      // 4. النتيجة
      if (!allFilled) {
        showToast("Please fill in all fields first!", true); // إشعار أحمر
      } else {
        showToast("Table booked successfully!", false); // إشعار أخضر
        
        // تفريغ الخانات بعد النجاح
        inputs.forEach(input => input.value = "");
      }
    });
  }
});

function showToast(message, isError = false) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${isError ? 'error' : ''}`;
  
  const icon = isError 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => { toast.classList.add("show"); }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.remove(); }, 300);
  }, 3000);
}
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}