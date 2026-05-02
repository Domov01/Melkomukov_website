// ============================================
// ПУНКТ 5: ДВА ЭЛЕМЕНТА С ИЗМЕНЕНИЕМ CSS СТИЛЕЙ
// ============================================

// ЭЛЕМЕНТ №1: Поле ввода телефона (меняет цвет в зависимости от длины)
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        const length = this.value.length;
        
        if (length < 6) {
            this.style.backgroundColor = '#fff0f0';
            this.style.borderColor = '#e74c3c';
            this.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
        } else if (length >= 6 && length < 11) {
            this.style.backgroundColor = '#fffbe0';
            this.style.borderColor = '#f39c12';
            this.style.boxShadow = '0 0 0 2px rgba(243, 156, 18, 0.2)';
        } else {
            this.style.backgroundColor = '#e8f8e8';
            this.style.borderColor = '#27ae60';
            this.style.boxShadow = '0 0 0 2px rgba(39, 174, 96, 0.2)';
        }
    });
}

// ЭЛЕМЕНТ №2: Карточки услуг (анимация при наведении через JS)
const cards = document.querySelectorAll('[data-card]');
cards.forEach(card => {
    // При наведении мыши
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'all 0.3s ease';
        this.style.boxShadow = '0 20px 35px rgba(0,0,0,0.15)';
        
        // Находим иконку внутри карточки и вращаем её
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'rotate(5deg)';
            img.style.transition = 'transform 0.3s ease';
        }
    });
    
    // Когда мышь уходит
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.05)';
        
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'rotate(0deg)';
        }
    });
});

// ============================================
// НОВАЯ ФОРМА: Валидация на чистом JS (пункт 3)
// ============================================

const orderForm = document.getElementById('orderForm');
const orderResult = document.getElementById('orderResult');
const resultContent = document.getElementById('resultContent');

// Функции валидации
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateService() {
    const selected = document.querySelector('input[name="service"]:checked');
    return selected !== null;
}

function validateFile() {
    const fileInput = document.getElementById('orderFile');
    const file = fileInput.files[0];
    
    if (!file) {
        return true; // файл не обязателен
    }
    
    // Проверка размера файла (максимум 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return false;
    }
    
    return true;
}

// Функция показа ошибок
function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('visible');
    }
}

function hideError(elementId) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.remove('visible');
    }
}

// Обработчик отправки формы
if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        
        // Получаем значения
        const name = document.getElementById('orderName').value;
        const email = document.getElementById('orderEmail').value;
        const selectedService = document.querySelector('input[name="service"]:checked');
        const serviceValue = selectedService ? selectedService.value : '';
        const fileInput = document.getElementById('orderFile');
        const fileName = fileInput.files[0] ? fileInput.files[0].name : 'Не выбран';
        
        // Валидация имени
        if (!validateName(name)) {
            showError('nameError', 'Имя должно содержать минимум 2 символа');
            isValid = false;
        } else {
            hideError('nameError');
        }
        
        // Валидация email
        if (!validateEmail(email)) {
            showError('emailError', 'Введите корректный e-mail (пример: name@domain.com)');
            isValid = false;
        } else {
            hideError('emailError');
        }
        
        // Валидация услуги
        if (!validateService()) {
            showError('serviceError', 'Пожалуйста, выберите услугу');
            isValid = false;
        } else {
            hideError('serviceError');
        }
        
        // Валидация файла
        if (!validateFile()) {
            showError('fileError', 'Размер файла не должен превышать 5 МБ');
            isValid = false;
        } else {
            hideError('fileError');
        }
        
        // ПУНКТ 4: Вывод данных на страницу
        if (isValid) {
            // Формируем текст для вывода
            const resultText = `
                Имя: ${name}\n
                E-mail: ${email}\n
                Услуга: ${serviceValue}\n
                Файл: ${fileName}
            `;
            
            // Вариант 1: Вывод через alert
            alert('✅ Форма успешно отправлена!\n\n' + resultText);
            
            // Вариант 2: Вывод на страницу (дублируем для наглядности)
            resultContent.textContent = resultText;
            orderResult.style.display = 'block';
            
            // Опционально: очистить форму
            // orderForm.reset();
        } else {
            // Скрываем предыдущий результат при ошибке
            orderResult.style.display = 'none';
        }
    });
}

// ============================================
// СТАРАЯ ФОРМА: HTML5 валидация + вывод в alert (пункт 4)
// ============================================

const callbackForm = document.getElementById('callbackForm');
if (callbackForm) {
    callbackForm.addEventListener('submit', function(event) {
        // НЕ отменяем событие, чтобы HTML5 валидация сработала первой
        // Но нам нужно перехватить данные ПОСЛЕ валидации
        
        // Небольшая задержка, чтобы HTML5 валидация успела сработать
        setTimeout(() => {
            if (callbackForm.checkValidity()) {
                event.preventDefault(); // отменяем реальную отправку
                
                const inputs = callbackForm.querySelectorAll('input');
                let formData = '';
                
                inputs.forEach(input => {
                    const placeholder = input.placeholder || input.type;
                    const value = input.value || '(не заполнено)';
                    formData += `${placeholder}: ${value}\n`;
                });
                
                alert('📞 Запрос на обратный звонок отправлен!\n\n' + formData);
                
                // Опционально: очистить форму
                // callbackForm.reset();
            }
        }, 10);
    });
}