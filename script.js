document.addEventListener('touchstart', function() {}, {passive: true});
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const navSelect = document.getElementById('nav-select');
for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', () => {
        navSelect.style.left = i * 32 + '%';
        pages.forEach(item => item.setAttribute('hidden', ''));
        navBtns.forEach(item => item.setAttribute('aria-selected', 'false'));
        pages[i].removeAttribute('hidden');
        navBtns[i].setAttribute('aria-selected', 'true');
    })
}

const productBoxes = document.querySelectorAll('.product-box');
const order = document.getElementById('order');
const orderParts = order.querySelectorAll('.display-box');

const lonelyBox = document.querySelector('.lonely-product-box');
const lonelyIncrementBtns = lonelyBox.querySelectorAll('.q-btn');
const lonelyDeleteBtn = lonelyBox.querySelector('.delete-btn');
const lonelyTotalValue = lonelyBox.querySelector('.quantity-value');
const lonelyOrderedProducts = orderParts[4].querySelector('.quantity');
const lonelyOrderedQuantity = lonelyOrderedProducts.querySelector('.quantity-value');
for (let btn of lonelyIncrementBtns) {
    btn.addEventListener('click', () => {
        orderComplete.removeAttribute('hidden');
        lonelyDeleteBtn.removeAttribute('hidden');
        lonelyTotalValue.textContent = Number(lonelyTotalValue.textContent) + Number(btn.dataset.quantity);
        lonelyOrderedProducts.removeAttribute('hidden');
        lonelyOrderedQuantity.textContent = lonelyTotalValue.textContent;
    })
}
lonelyDeleteBtn.addEventListener('click', () => {
            lonelyTotalValue.textContent = 0;
            lonelyOrderedQuantity.textContent = 0;
            lonelyOrderedProducts.setAttribute('hidden', '');
            const allNums = order.querySelectorAll('.quantity-value');
            let totalSum = 0;
            for (let num of allNums) {
                totalSum += Number(num.textContent);
                console.log(totalSum)
            }
            if (totalSum === 0) {
                orderComplete.setAttribute('hidden', '');
            }
            lonelyDeleteBtn.setAttribute('hidden', '');
        })

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
        selectorBtns[p].addEventListener('click', switchTab);
        displays[p].addEventListener('click', switchTab);

        const incrementBtns = incrementBtnsBoxes[p].querySelectorAll('.q-btn');
        for (let btn of incrementBtns) {
            btn.addEventListener('click', () => {
                orderComplete.removeAttribute('hidden');
                deleteBtns[p].removeAttribute('hidden');
                totalValues[p].textContent = Number(totalValues[p].textContent) + Number(btn.dataset.quantity);
                orderedProducts[p].removeAttribute('hidden');
                orderedQuantity[p].textContent = totalValues[p].textContent;
            })
        }
        deleteBtns[p].addEventListener('click', () => {
            totalValues[p].textContent = 0;
            orderedQuantity[p].textContent = 0;
            orderedProducts[p].setAttribute('hidden', '');
            const allNums = order.querySelectorAll('.quantity-value');
            let totalSum = 0;
            for (let num of allNums) {
                totalSum += Number(num.textContent);
                console.log(totalSum)
            }
            if (totalSum === 0) {
                orderComplete.setAttribute('hidden', '');
            }
            deleteBtns[p].setAttribute('hidden', '');
        })
    }
}
const orderComplete = document.getElementById('order-complete');
const ordersBox = document.getElementById('orders-box');
orderComplete.addEventListener('click', () => {
    ordersBox.appendChild(order);
    orderComplete.setAttribute('hidden', "");
})