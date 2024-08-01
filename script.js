class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; //this is to ensure decimal number is only pressed once.
    this.currentOperand = this.currentOperand.toString() + number.toString(); //we are converting to string because javascript will try to add these numbers like 1+1=2 instead of just 11. inorder words it is to make the currentOperand keep arranging the numbers side by side instead of just adding it.
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '−':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
// because equalsButton is a single button, instead of document.querySelectorall we are going to use just document.querySelector
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// Step 1: Select all of the different number buttons(from line 94 - 105), operand and the delete button.
//  Data Attribute was used to select all of the buttions. I.e if it is a number it will be data-number etc. This is used instead of classes because it is easier to see what part of HTML is being targeted by javasxript;

// Step 2: Problem: How are we going to store the information for what number is typed in the current and previous operands, how to store the operations etc.
// Solution: It's to create a class, a Calculator class. (from line 1 - 90)

// Step 3: Inside the class, there's going to be a constructor which will take all the inputs  and functions for our calculator.

// Step 4: The constructor is going to take two parameters: previous and current text elements (previousOperandTextElement, currentOperandTextElement).
// this is essential because we need to know where to place our display text for our calculator. (line 2 - 6)

// Step 5: Next, we want to think of all the operations our calculator class can conform, we habe the clearing function, delete function, the adding of the numbers, the equals function and the adding of all the operations.
// The clear function is to clear out different variables
// The delete function is to remove a single number.
// appendNumber function will append the number anytime a user clicks on a number to add to the screen. It will also have numbers as its parameters
// chooseOperation function will activate anytime a user clicks on the operation button(i.e +, -, /, * ). It will also have operations as its parameters.
// compute function will compute a single value for what we need to display.
// updateDisplay function will allow us update the vlaue inside our output.

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Think of the different properties our calculator needs to store; thepreviousoperend entered, thecurrentoperand the user is working on and the operation they selected(you've got to think like this).
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// The clear function (line 8): All it needs to do is to remove all the values. to do this
// step 1: we assign the currentOperand and previous operand to an empty string. (line 9 - 10)
// also set the operation to undefined since they don't have any operation selected.
// Lastly add the clear function to the constructor to call the clear function beacuase we want to clear allof our inputs and set them to the default values as soon as we create a new calculator.

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// the 'this' keyword refers to the context in which a function is executed. It is a reference to the object to which the function belongs.
//(Therefore, all the functions in the Calculator class belongs solely to the class).
//Understanding how this works is crucial for writing and debugging JavaScript code, especially when dealing with object-oriented programming and event handling.

// Here's a breakdown of the syntax and its usage in your code:

// this Keyword
// Contextual Reference: The this keyword is used inside methods of an object and refers to the object itself. It allows you to access the object's properties and methods from within its own methods.
// Example.

// function Calculator() {
//     this.currentOperand = '';
//     this.previousOperand = '';
//     this.operation = undefined;
// }

// const calc = new Calculator();
// In a constructor function, this refers to the newly created object when the function is called with the new keyword.
//================================================================================================================================================================================================================================

// Now that we know all the things our calculator can do defined by the functions inside the class function(Calculator) and the different variables that it can hold,
// lets work on the *hooking* up our different variables on line 92 - 103 and make them operate on our Calculator object
// The following steps are to show you how to hook our variable with the created class function (Calculator)
// 
