const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__output')

const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

keys.addEventListener('click', e => {
if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType
    if (!action) {
        calculator.dataset.previousKeyType = 'number'
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent
        }
        else {
            display.textContent = displayedNum + keyContent
        }
    }
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        
        if (firstValue && operator && previousKeyType !== 'operator'  &&
        previousKeyType !== 'calculate') {
            const calValue = calculate(firstValue, operator, secondValue)
            display.textContent = calValue
            calculator.dataset.firstValue = calValue
        }
        else {
            // If there are no calculations, set displayedNum as the firstValue
            calculator.dataset.firstValue = displayedNum
        }
        key.classList.add('is-depressed' )
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.firstValue = displayedNum
        calculator.dataset.operator = action

    }
    if (action === 'decimal') {
        calculator.dataset.previousKeyType = 'decimal'
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
        }
        else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            display.textContent = '0.'
        }
    }
    
    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } 
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
    }
    
    if (action === 'calculate') {
        calculator.dataset.previousKeyType = 'calculate'
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum
                secondValue = calculator.dataset.modValue
            }
        
            display.textContent = calculate(firstValue, operator, secondValue)
        }
        calculator.dataset.modValue = secondValue
        display.textContent = calculate(firstValue, operator, secondValue)
        
    }

    Array.from(key.parentNode.children).forEach(k =>
        k.classList.remove('is-depressed'),
    )
}
})