let display = document.getElementById('display');

/**
 * Appends a number to the display
 * @param {string} num - The number to append
 */
function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else if (num === '.' && display.value.includes('.')) {
        return;
    } else {
        display.value += num;
    }
}

/**
 * Appends an operator to the display
 * @param {string} operator - The operator to append (+, -, *, /, %)
 */
function appendOperator(operator) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        return;
    }
    
    if (display.value === '') {
        return;
    }
    
    display.value += operator;
}

/**
 * Clears the display
 */
function clearDisplay() {
    display.value = '0';
}

/**
 * Deletes the last character from the display
 */
function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

/**
 * Calculates the result of the expression in the display
 */
function calculate() {
    try {
        // Replace display operators with JavaScript operators
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/−/g, '-');
        
        // Validate expression
        if (expression === '' || /[+\-*/%]$/.test(expression)) {
            return;
        }
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

/**
 * Handle keyboard input
 */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        if (key === '*') {
            appendOperator('*');
        } else if (key === '/') {
            event.preventDefault();
            appendOperator('/');
        } else {
            appendOperator(key);
        }
    } else if (key === '%') {
        appendOperator('%');
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
