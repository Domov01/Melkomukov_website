// ========== 1. ФОРМА ЗАКАЗА ПРОДУКТА ==========
const nameInput = document.getElementById('customerName');
const phoneInput = document.getElementById('customerPhone');
const productSelect = document.getElementById('productSelect');
const quantityInput = document.getElementById('quantity');
const addressInput = document.getElementById('address');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const orderDisplayBlock = document.getElementById('orderDisplayBlock');
const orderDetailsDiv = document.getElementById('orderDetails');

function validateName() {
    const name = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    if (name === '') {
        nameError.textContent = 'Имя обязательно для заполнения';
        return false;
    }
    if (name.length < 2) {
        nameError.textContent = 'Имя должно содержать минимум 2 символа';
        return false;
    }
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if (!nameRegex.test(name)) {
        nameError.textContent = 'Имя может содержать только буквы и пробелы';
        return false;
    }
    nameError.textContent = '';
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneError = document.getElementById('phoneError');
    if (phone === '') {
        phoneError.textContent = 'Телефон обязателен';
        return false;
    }
    const phoneRegex = /^[\+\d\s\(\)\-]{5,20}$/;
    if (!phoneRegex.test(phone)) {
        phoneError.textContent = 'Введите корректный номер телефона';
        return false;
    }
    phoneError.textContent = '';
    return true;
}

function validateProduct() {
    const product = productSelect.value;
    const productError = document.getElementById('productError');
    if (product === '') {
        productError.textContent = 'Выберите блюдо из списка';
        return false;
    }
    productError.textContent = '';
    return true;
}

function validateQuantity() {
    const quantity = parseInt(quantityInput.value);
    const quantityError = document.getElementById('quantityError');
    if (isNaN(quantity) || quantity < 1) {
        quantityError.textContent = 'Количество должно быть не менее 1';
        return false;
    }
    if (quantity > 20) {
        quantityError.textContent = 'Максимум 20 позиций за раз';
        return false;
    }
    quantityError.textContent = '';
    return true;
}

function validateAddress() {
    const address = addressInput.value.trim();
    const addressError = document.getElementById('addressError');
    if (address === '') {
        addressError.textContent = 'Адрес доставки обязателен';
        return false;
    }
    if (address.length < 5) {
        addressError.textContent = 'Укажите более подробный адрес';
        return false;
    }
    addressError.textContent = '';
    return true;
}

function validateOrderForm() {
    return validateName() && validatePhone() && validateProduct() && validateQuantity() && validateAddress();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function displayOrderData() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const product = productSelect.value;
    const quantity = quantityInput.value;
    const address = addressInput.value.trim();

    const orderText = `
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Блюдо:</strong> ${escapeHtml(product)}</p>
        <p><strong>Количество:</strong> ${escapeHtml(quantity)}</p>
        <p><strong>Адрес:</strong> ${escapeHtml(address)}</p>
        <p><strong>Статус:</strong> Заказ принят</p>
    `;
    orderDetailsDiv.innerHTML = orderText;
    orderDisplayBlock.style.display = 'block';
    alert('Заказ оформлен!\n\nИмя: ' + name + '\nТелефон: ' + phone + '\nБлюдо: ' + product + '\nКоличество: ' + quantity + '\nАдрес: ' + address);
}

submitOrderBtn.addEventListener('click', function() {
    if (validateOrderForm()) {
        displayOrderData();
        const orderCard = document.getElementById('orderFormCard');
        orderCard.classList.add('highlight-effect');
        setTimeout(function() { orderCard.classList.remove('highlight-effect'); }, 600);
    } else {
        const firstError = document.querySelector('#orderFormCard .error-msg:not(:empty)');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        alert('Пожалуйста, исправьте ошибки в форме заказа.');
    }
});

nameInput.addEventListener('blur', validateName);
phoneInput.addEventListener('blur', validatePhone);
productSelect.addEventListener('change', validateProduct);
quantityInput.addEventListener('input', validateQuantity);
addressInput.addEventListener('blur', validateAddress);

// ========== 2. ФОРМА ОБРАТНОГО ЗВОНКА ==========
const callbackForm = document.getElementById('callbackForm');
const callbackMessageDiv = document.getElementById('callbackMessage');

callbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (callbackForm.checkValidity()) {
        const firstName = document.getElementById('callbackFirstName').value.trim();
        const lastName = document.getElementById('callbackLastName').value.trim();
        const phone = document.getElementById('callbackPhone').value.trim();
        const dateTime = document.getElementById('callbackDateTime').value;
        const quantity = document.getElementById('callbackQuantity').value;
        const payment = document.getElementById('callbackPayment').value;
        
        let formattedDateTime = dateTime ? dateTime.replace('T', ' ') : 'не указано';
        
        alert('ЗАЯВКА НА ОБРАТНЫЙ ЗВОНОК\n\nИмя: ' + firstName + '\nФамилия: ' + lastName + '\nТелефон: ' + phone + '\nДата/время: ' + formattedDateTime + '\nКол-во человек: ' + quantity + '\nСпособ оплаты: ' + payment);
        
        callbackMessageDiv.textContent = 'Заявка отправлена! Мы перезвоним ' + firstName + ' на номер ' + phone;
        callbackMessageDiv.className = 'message success';
        
        callbackForm.reset();
        
        setTimeout(function() {
            callbackMessageDiv.textContent = 'Заполните форму, все поля с * обязательны';
            callbackMessageDiv.className = 'message';
        }, 5000);
    } else {
        callbackForm.reportValidity();
        callbackMessageDiv.textContent = 'Пожалуйста, заполните все поля корректно (формат телефона: 123-456-789)';
        callbackMessageDiv.className = 'message error';
    }
});

// ========== 3. ИГРА "УГАДАЙ ЧИСЛО" ==========
const difficulties = {
    easy: { min: 1, max: 10, attempts: 7 },
    medium: { min: 1, max: 20, attempts: 5 },
    hard: { min: 1, max: 50, attempts: 4 }
};

let currentDiff = 'medium';
let secretNumber = null;
let attemptsLeft = null;
let maxAttempts = null;
let minRange = null;
let maxRange = null;
let gameActive = true;

const guessInputGame = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newGameBtn = document.getElementById('newGameBtn');
const messageBox = document.getElementById('messageBox');

const diffEasy = document.getElementById('diffEasy');
const diffMedium = document.getElementById('diffMedium');
const diffHard = document.getElementById('diffHard');

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message';
    if (type === 'success') {
        messageBox.classList.add('success');
    } else if (type === 'error') {
        messageBox.classList.add('error');
    }
}

function startNewGame() {
    const config = difficulties[currentDiff];
    minRange = config.min;
    maxRange = config.max;
    maxAttempts = config.attempts;
    attemptsLeft = maxAttempts;
    gameActive = true;
    
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    
    guessInputGame.value = '';
    guessInputGame.disabled = false;
    guessBtn.disabled = false;
    guessInputGame.focus();
    
    showMessage('Новая игра! Угадай число от ' + minRange + ' до ' + maxRange);
}

function setDifficulty(difficulty) {
    currentDiff = difficulty;
    
    diffEasy.classList.remove('active-diff');
    diffMedium.classList.remove('active-diff');
    diffHard.classList.remove('active-diff');
    
    if (difficulty === 'easy') diffEasy.classList.add('active-diff');
    if (difficulty === 'medium') diffMedium.classList.add('active-diff');
    if (difficulty === 'hard') diffHard.classList.add('active-diff');
    
    startNewGame();
}

function makeGuess() {
    if (!gameActive) {
        showMessage('Игра окончена. Нажмите "Новая игра".', 'error');
        return;
    }
    
    const rawValue = guessInputGame.value.trim();
    
    if (rawValue === '') {
        showMessage('Введите число.', 'error');
        guessInputGame.value = '';
        guessInputGame.focus();
        return;
    }
    
    const guess = Number(rawValue);
    
    if (isNaN(guess) || !Number.isInteger(guess)) {
        showMessage('Введите целое число от ' + minRange + ' до ' + maxRange + '.', 'error');
        guessInputGame.value = '';
        guessInputGame.focus();
        return;
    }
    
    if (guess < minRange || guess > maxRange) {
        showMessage('Число должно быть от ' + minRange + ' до ' + maxRange + '.', 'error');
        guessInputGame.value = '';
        guessInputGame.focus();
        return;
    }
    
    attemptsLeft--;
    
    if (guess === secretNumber) {
        gameActive = false;
        guessBtn.disabled = true;
        guessInputGame.disabled = true;
        showMessage('Победа! Вы угадали число ' + secretNumber + ' за ' + (maxAttempts - attemptsLeft) + ' попыток.', 'success');
        return;
    }
    
    const hint = guess > secretNumber ? 'меньше' : 'больше';
    
    if (attemptsLeft === 0) {
        gameActive = false;
        guessBtn.disabled = true;
        guessInputGame.disabled = true;
        showMessage('Игра окончена. Загаданное число было ' + secretNumber + '.', 'error');
    } else {
        showMessage('Не угадал. Загаданное число ' + hint + '. Осталось попыток: ' + attemptsLeft);
        guessInputGame.value = '';
        guessInputGame.focus();
    }
}

guessBtn.addEventListener('click', makeGuess);
newGameBtn.addEventListener('click', startNewGame);
guessInputGame.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') makeGuess();
});
diffEasy.addEventListener('click', function() { setDifficulty('easy'); });
diffMedium.addEventListener('click', function() { setDifficulty('medium'); });
diffHard.addEventListener('click', function() { setDifficulty('hard'); });
startNewGame();

// ========== 4. ДИНАМИЧЕСКИЕ ИЗМЕНЕНИЯ CSS ==========
const surpriseBox = document.getElementById('surpriseBox');
const toggleSurpriseBtn = document.getElementById('toggleSurpriseBtn');

toggleSurpriseBtn.addEventListener('click', function() {
    surpriseBox.classList.toggle('hide');
    if (surpriseBox.classList.contains('hide')) {
        toggleSurpriseBtn.textContent = 'Показать сюрприз';
        toggleSurpriseBtn.style.background = '#28a745';
    } else {
        toggleSurpriseBtn.textContent = 'Спрятать/Показать сюрприз';
        toggleSurpriseBtn.style.background = '#fd7e14';
    }
});

surpriseBox.addEventListener('click', function() {
    if (!surpriseBox.classList.contains('hide')) {
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        surpriseBox.style.backgroundColor = randomColor;
        surpriseBox.style.transform = 'scale(1.02)';
        setTimeout(function() { surpriseBox.style.transform = 'scale(1)'; }, 300);
        alert('Вы активировали скидку 20% на первый заказ!');
    } else {
        alert('Сначала покажите блок с сюрпризом');
    }
});

const callbackCardTitle = document.querySelector('#callbackCard h2');
callbackCardTitle.style.transition = 'all 0.3s ease';
callbackCardTitle.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(5px)';
    this.style.color = '#007bff';
});
callbackCardTitle.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0px)';
    this.style.color = '#333';
});

const callbackCard = document.getElementById('callbackCard');
callbackForm.addEventListener('submit', function() {
    if(callbackForm.checkValidity()) {
        callbackCard.style.boxShadow = '0 0 0 2px #28a745, 0 2px 8px rgba(0,0,0,0.1)';
        setTimeout(function() { callbackCard.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; }, 1000);
    }
});