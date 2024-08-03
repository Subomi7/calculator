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
    if (number === '.' && this.currentOperand.includes('.')) return; //this is to ensure decimal number is only pressed once. And i wrote thins using the if statement, the condition is to check if the number is a decimal and(&&) to check that we don't already have a decimal in the currenOperandTextElement(this is going to allow you append decimal just once)
    this.currentOperand = this.currentOperand.toString() + number.toString(); //we are converting to string because javascript will try to add these numbers like 1+1=2 instead of just 11. inorder words it is to make the currentOperand keep arranging the numbers side by side instead of just adding it together.
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return; //If the currentOperand is empty, the method returns immediately and does nothing. In other words If the condition is true then the code below won't execute further.
    if (this.previousOperand !== '') {
      //If there is already a value in previousOperand, the compute method is called to perform the current operation using previousOperand and currentOperand.
      this.compute(); //This supports chaining operations.
    }
    this.operation = operation; //The operation is set to the value passed from the button’s text (e.g., '+', '−', '×', or '÷').
    this.previousOperand = this.currentOperand; //The current operand is moved to the previousOperand.
    this.currentOperand = ''; //The currentOperand is cleared to prepare for the next number input.
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

const calculator = new Calculator( //you are creating a new instance of the Calculator class. This instance has access to all the methods defined in the Calculator class.
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
  //now we have to hook the calculator with the operations button, we do the same with numberButtons. forEach to loop over the operantionsButton.
  button.addEventListener('click', () => {
    //addEventListener to define the custom behavior that will be executed when the event occurs or when the button is clicked.
    calculator.chooseOperation(button.innerText); //this is to invoke the chooseOperation method on the calculator instance whenever the operationButton is clicked. having Button.innerText as it parameter
    calculator.updateDisplay(); //this is to invoke the updateDisplay method on the calculator instance whenever the operation has been chosen
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

// Step 1: Select all of the different number buttons(from line 94 - 105), operand and the delete buttons.
//  Data Attribute was used to select all of the buttions. I.e if it is a number it will be data-number etc. This is used instead of classes because it is easier to see what part of HTML is being targeted by javasxript;

// Step 2: Problem: How are we going to store the information for what number is typed in the current and previous operands, how to store the operations etc.
// Solution: It's to create a class, a Calculator class. (from line 1 - 90)

// Step 3: Inside the class, there's going to be a constructor which will take all the inputs  and functions for our calculator.

// Step 4: The constructor is going to take two parameters: previous and current text elements (previousOperandTextElement, currentOperandTextElement).
// this is essential because we need to know where to place our display text for our calculator. (line 2 - 6)

// Step 5: Next, we want to think of all the operations our calculator class can conform, we have the clearing function, delete function, the adding of the numbers, the equals function and the adding of all the operations. These are all the methods the calculator will perform
// The clear function is to clear out different variables
// The delete function is to remove a single number.

// appendNumber function will append the number anytime a user clicks on a number to add to the screen. It also has number as its parameters
// as users we also need to be alble to add operaations to the number

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

//  Step 1: First, we declare a variable, calculator, using const with the value of the variable being the class function (Calculator);
// illustration: const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement). The parameters added is required because you want to transfer our constructor into it. in other words, calculator holds all the value of class function (Calculator). The keyword 'new' is used to define classes.
//question: (1) why are we declaring it again? that is Class Calculation. Why dont we use it direct. Why didn't we treat it as a component and declare it with <Calculator />

// Step 2 : Next,  to hook our calculator variable with the numberButtons, we select our numberButtons and loop over all the differnt buttons using '.forEach' method,
// afer looping over all these buttons, i added an event listener(.addEventListener),This allows me to define custom behavior that will be executed when the event occurs or when the button is clicked.
// Custom Event: for every button that is clicked we want the particular number to show/reflect on the currentOperandTextElement or the [data-current-operand].
// So we call the function/object inside the class function(Calculator) which has been assigned to calculator using the way object calls its key(element.key),
// after that we have display the number using the updateDisplay function.

//
