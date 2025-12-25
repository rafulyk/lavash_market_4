//ГЛОБАЛЬНОЕ
document.addEventListener('touchstart', function() {}, {passive: true});

const productBoxes = document.querySelectorAll('.product-box');
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const navBar = document.getElementById('nav-bar');
const ordersBox = document.getElementById('orders-box');
const navMarker = document.querySelector('.nav-marker');
const orderBtnHide = document.getElementById('order-btn-hide');
const orderBtnBox = document.getElementById('order-btn-box');
const order = document.getElementById('order');
const orderParts = order.querySelectorAll('.display-box');
const orderBtn = document.getElementById('order-btn');
const closeOrderBtn = document.getElementById('close-order-btn');
const allQuantityValues = document.querySelectorAll('.quantity-value');
const totalSum = orderBtn.querySelector('span');
function openOrderBtnFunction() {
    if (pages[1].hasAttribute('hidden') === false) {
        orderBtnBox.removeAttribute('hidden');
        navBar.setAttribute('hidden', '')
    }
}
function orderBtnHideFunction() {
    orderBtnBox.setAttribute('hidden', '');
    navBar.removeAttribute('hidden');
}
function calcAllQuantity() {
    const allNums = order.querySelectorAll('.quantity-value');
    let totalSum = 0;
    for (let num of allNums) {
        totalSum += Number(num.textContent);
    }
    return totalSum;
}
function closeOrderFunction() {
    productBoxes.forEach(item => item.removeAttribute('hidden'));
    lonelyBox.removeAttribute('hidden');
    order.setAttribute('hidden', '');
}


//НАВБАР: ПЕРЕКЛЮЧЕНИЕ МЕЖДУ СТРАНИЦАМИ И КНОПКА ЗАКАЗА
for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', () => {
        navMarker.style.left = i * 32 + '%';
        pages.forEach(item => item.setAttribute('hidden', ''));
        navBtns.forEach(item => item.setAttribute('aria-selected', 'false'));
        pages[i].removeAttribute('hidden');
        navBtns[i].setAttribute('aria-selected', 'true');
    })
}
orderBtnHide.addEventListener('click', () => {
    orderBtnHideFunction();
    closeOrderFunction();
})
navMarker.addEventListener('click', () => {
    if (calcAllQuantity() !== 0) {
        openOrderBtnFunction();
    }
})


//ПЕРВЫЕ ЧЕТЫРЕ БЛОКА С НЕСКОЛЬКИМИ ТОВАРАМИ
for (let b = 0; b < productBoxes.length; b++) {
    const selectorBtns = productBoxes[b].querySelectorAll('.selector-btn');
    const btnsImgBoxes = productBoxes[b].querySelectorAll('.btns-img-box');
    const incrementBtnsBoxes = productBoxes[b].querySelectorAll('.increment-btns');
    const deleteBtns = productBoxes[b].querySelectorAll('.delete-btn');
    const totalValues = productBoxes[b].querySelectorAll('.quantity-value');
    const displays = productBoxes[b].querySelectorAll('.quantity');
    const orderedProducts = orderParts[b].querySelectorAll('.quantity');
    const orderedQuantity = orderParts[b].querySelectorAll('.quantity-value');

    for (let p = 0; p < selectorBtns.length; p++) {
        const incrementBtns = incrementBtnsBoxes[p].querySelectorAll('.q-btn');
        selectorBtns[p].addEventListener('click', switchTab);
        displays[p].addEventListener('click', switchTab);
        function switchTab() {
            selectorBtns.forEach(btn => btn.classList.remove('active-selector'));
            selectorBtns[p].classList.add('active-selector');
            btnsImgBoxes.forEach(item => item.setAttribute('hidden', ''));
            btnsImgBoxes[p].removeAttribute('hidden');
            displays.forEach(item => item.classList.add('hide'));
            displays[p].classList.remove('hide');
            selectorBtns.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            selectorBtns[p].setAttribute('aria-selected', 'true');
        }
        for (let btn of incrementBtns) {
            btn.addEventListener('click', () => {
                deleteBtns[p].removeAttribute('hidden');
                totalValues[p].textContent = Number(totalValues[p].textContent) + Number(btn.dataset.quantity);
                orderedProducts[p].removeAttribute('hidden');
                orderedQuantity[p].textContent = totalValues[p].textContent;
                totalSum.textContent = calcAllQuantity() + 'шт';
                openOrderBtnFunction();
            })
        }
        deleteBtns[p].addEventListener('click', () => {
            totalValues[p].textContent = 0;
            orderedQuantity[p].textContent = 0;
            orderedProducts[p].setAttribute('hidden', '');
            deleteBtns[p].setAttribute('hidden', '');
            if (calcAllQuantity() === 0) {
                orderBtnHideFunction();
            }
        })
    }
}


//ОТДЕЛЬНО ДЛЯ ПОСЛЕДНЕГО БЛОКА, ТАК КАК В НЁМ ВСЕГО ОДИН ТОВАР, ЛОГИКА РАБОТЫ ДРУГАЯ
const lonelyBox = document.querySelector('.lonely-product-box');
const lonelyIncrementBtns = lonelyBox.querySelectorAll('.q-btn');
const lonelyDeleteBtn = lonelyBox.querySelector('.delete-btn');
const lonelyTotalValue = lonelyBox.querySelector('.quantity-value');
const lonelyOrderedProducts = orderParts[4].querySelector('.quantity');
const lonelyOrderedQuantity = lonelyOrderedProducts.querySelector('.quantity-value');

for (let btn of lonelyIncrementBtns) {
    btn.addEventListener('click', () => {
        lonelyDeleteBtn.removeAttribute('hidden');
        lonelyTotalValue.textContent = Number(lonelyTotalValue.textContent) + Number(btn.dataset.quantity);
        lonelyOrderedProducts.removeAttribute('hidden');
        lonelyOrderedQuantity.textContent = lonelyTotalValue.textContent;
        totalSum.textContent = calcAllQuantity() + 'шт';
        openOrderBtnFunction();
    })
}
lonelyDeleteBtn.addEventListener('click', () => {
            lonelyTotalValue.textContent = 0;
            lonelyOrderedQuantity.textContent = 0;
            lonelyOrderedProducts.setAttribute('hidden', '');
            
            if (calcAllQuantity() === 0) {
                orderBtnHideFunction();
            }
            lonelyDeleteBtn.setAttribute('hidden', '');
        })


//ОТПРАВЛЯЕМ ЗАКАЗ
orderBtn.addEventListener('click', () => {
    if (order.hasAttribute('hidden') === false) {
        orderParts.forEach(item => ordersBox.appendChild(item));
        closeOrderFunction();
        orderBtnHideFunction();
        alert('Ваш заказ отправлен! Отслеживайте Ваши заказы в личном кабинете!');
        for (let a = 0; a < 10; a++) {
            allQuantityValues[a].textContent = 0
        }
    } else {
        productBoxes.forEach(item => item.setAttribute('hidden', ''));
        lonelyBox.setAttribute('hidden', '');
        order.removeAttribute('hidden');
    }
})
closeOrderBtn.addEventListener('click', closeOrderFunction);