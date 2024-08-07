class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //The clear() function is designed to reset the state of a calculator by clearing the current operand, the previous operand, and the current operation. This is typically used in a calculator to implement a "clear" or "AC" (All Clear) function.
  clear() {
    this.currentOperand = ''; //This line sets the currentOperand to an empty string.This effectively clears any value that the user has currently entered.
    this.previousOperand = ''; //This line sets the previousOperand to an empty string. This clears any stored value that was previously used in a computation.
    this.operation = undefined; //This line sets the operation to undefined. This clears any stored operation (such as addition, subtraction, etc.) that was to be performed between previousOperand and currentOperand.
  }

  //The delete() function is designed to remove the last character from the currentOperand property of an object. This is typically used in a calculator to implement a "backspace" function.
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); //this.currentOperand = this.currentOperand.toString():This line ensures that currentOperand is treated as a string, regardless of its original type (number or string). This also helps in appending digits and also allow manipulating individual characters (converting to string will help in deleting the las digit)
  } //slice(0, -1) is a method that extracts a section of a string and returns it as a new string. The arguments 0 and -1 specify the start and end of the section to extract: 0 means start at the beginning of the string.
  //-1 means stop one character from the end of the string.
  //Effectively, slice(0, -1) returns a new string that contains all characters from the original string except the last one.

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; //this is to ensure decimal number is only pressed once. And i wrote thins using the if statement, the condition is to check if the number is a decimal and(&&) to check that we don't already have a decimal in the currenOperandTextElement(this is going to allow you append decimal just once)
    this.currentOperand = this.currentOperand.toString() + number.toString(); //we are converting to string because javascript will try to add these numbers like 1+1=2 instead of just 11. inorder words it is to make the currentOperand keep arranging the numbers side by side instead of just adding it together.
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return; //If the currentOperand is empty, the method returns immediately and does nothing. In other words If the condition is true then the code below won't execute further. There has to be something in the currentOperand for it to compute
    if (this.previousOperand !== '') {
      //If there is already a value in previousOperand, the compute method is called to perform the current operation using previousOperand and currentOperand. in other words this condition simply allows the calculator to comput the previous operation and automatically put the new operation or current operation beside the newly computed operation.
      this.compute(); //This supports chaining operations.
    }
    this.operation = operation; //The operation is set to the value passed from the button’s text (e.g., '+', '−', '×', or '÷').
    this.previousOperand = this.currentOperand; //The current operand is moved to the previousOperand with the operation appliedby it side.
    this.currentOperand = ''; //The currentOperand is cleared to prepare for the next number input.
  }

  compute() {
    let computation; //step one is to initialize computation. This is GOING TO BE THE RESULT OF OUR COMPUTE FUNCTION
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand); //The previousOperand and currentOperand are being converted from strings to numbers using parseFloat. These converted numbers are stored in the variables prev and current.
    if (isNaN(prev) || isNaN(current)) return; //This checks if either prev or current is not a number (NaN). If either is not a number, the function returns immediately without doing any calculation.
    switch (
      this.operation //This switch statement checks the value of this.operation and performs the corresponding arithmetic operation:
    ) {
      case '+':
        computation = prev + current; //If this.operation is '+', it adds prev and current.
        break;
      case '−':
        computation = prev - current; //If this.operation is '−', it subtracts current from prev.
        break;
      case '×':
        computation = prev * current; //If this.operation is '×', it multiplies prev by current.
        break;
      case '÷':
        computation = prev / current; //If this.operation is '÷', it divides prev by current.
        break;
      default: //The result of the chosen operation is stored in computation. Also return will prevent computation if it doean't have any of these operations
        return;
    }
    this.currentOperand = computation; //this.currentOperand is updated with the result of the computation.
    this.operation = undefined; //this.operation is set to undefined, indicating that the operation is complete.
    this.previousOperand = ''; //this.previousOperand is cleared by setting it to an empty string.
  }

  //The getDisplayNumber function takes a number as input and returns it as a formatted string suitable for display. This function handles the formatting of the number, including adding commas as thousands separators and ensuring proper handling of decimal points.
  getDisplayNumber(number) {
    const stringNumber = number.toString(); //The input number is converted to a string and stored in the variable stringNumber.
    const integerDigits = parseFloat(stringNumber.split('.')[0]); //stringNumber.split('.')[0] splits the string at the decimal point and takes the part before the decimal point, which represents the integer part. parseFloat converts this back to a number and stores it in integerDigits.
    const decimalDigits = stringNumber.split('.')[1]; //stringNumber.split('.')[1] takes the part after the decimal point, which represents the decimal part, and stores it in decimalDigits.
    let integerDisplay; //Initialize the integer display variable.
    //Check if the integer part is a valid number
    if (isNaN(integerDigits)) {
      integerDisplay = ''; //isNaN(integerDigits) checks if integerDigits is not a number. If it is NaN, integerDisplay is set to an empty string.
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0, //If integerDigits is a valid number, it is formatted using toLocaleString with the locale set to 'en' (English) and maximumFractionDigits set to 0. This ensures the integer part is displayed with commas as thousands separators and without any fractional digits.
      }); //maximumFractionDigit set to 0 is to ensure theris just one decimal point.
    }
    //Combine the integer and decimal parts
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`; //If decimalDigits is not null, it means there is a decimal part. The function returns the formatted integer part combined with the decimal part, separated by a dot.
    } else {
      return integerDisplay; //If decimalDigits is null, the function returns just the formatted integer part
    }
  }


  //The updateDisplay function updates the text elements in the calculator's display to show the current state of the operands and the operation. It uses the getDisplayNumber function to format the numbers properly.
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(    //this.currentOperandTextElement is a reference to the DOM element where the current operand (the number currently being entered or operated on) is displayed.
      this.currentOperand   //this.getDisplayNumber(this.currentOperand) formats this.currentOperand using the getDisplayNumber function.
    );  //The formatted current operand is then set as the inner text of this.currentOperandTextElement, updating the display with the current operand.
    // This line checks if an operation (such as +, -, *, or /) has been selected. If this.operation is not null, it means an operation is currently in progress.
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(    //This calls the getDisplayNumber method with this.previousOperand as the argument. getDisplayNumber returns a formatted string representation of this.previousOperand, potentially adding commas for thousands separators and preserving any decimal places.
        this.previousOperand //This will  Update the Previous Operand Display with the Operation
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = ''; //If no operation is selected (this.operation is null), the inner text of this.previousOperandTextElement is set to an empty string. This clears the previous operand display, as there is no operation in progress
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

//now we have to hook the calculator with the operations button, we do the same with numberButtons. forEach to loop over the operantionsButton.
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    //addEventListener to define the custom behavior that will be executed when the event occurs or when the button is clicked.
    calculator.chooseOperation(button.innerText); //this is to invoke the chooseOperation method on the calculator instance whenever the operationButton is clicked. having Button.innerText as it parameter
    calculator.updateDisplay(); //this is to invoke the updateDisplay method on the calculator instance whenever the operation has been chosen. This makes changes to the screen
  });
});

//an eventListener is added to the equalButton, that allows us to customize the button(for it to do what we want it to do)
equalsButton.addEventListener('click', (button) => {
  calculator.compute(); //this is invoking the compute method in the calculator. This is to compute/solve the current operation.
  calculator.updateDisplay(); //this is to invole the updateDisplay method so as to display the solution to the operation
});

//This code sets up an event listener for an "all clear" button on a calculator. When the button is clicked, it calls the clear() method on the calculator object to reset its state, and then calls the updateDisplay() method to refresh the display to reflect the cleared state.
allClearButton.addEventListener('click', (button) => {
  //allClearButton is a reference to the DOM element representing the "all clear" button on the calculator. addEventListener('click', ...) attaches an event listener to the allClearButton. This means that when the button is clicked, the specified callback function will be executed.
  calculator.clear(); //This line calls the clear() method on the calculator object. The clear() method is responsible for resetting the calculator's state by clearing the currentOperand, previousOperand, and operation.
  calculator.updateDisplay(); //After clearing the state, This line calls the updateDisplay() method on the calculator object. The updateDisplay() method refreshes the calculator's display to reflect the current state. Since the clear() method has reset the state, the display will now show an empty or initial state (typically "0" or a blank display).
});

//This code sets up an event listener for a "delete" button on a calculator. When the button is clicked, it calls the delete() method on the calculator object to remove the last character from the current operand, and then calls the updateDisplay() method to refresh the display to reflect the updated state.
deleteButton.addEventListener('click', (button) => {
  //deleteButton is a reference to the DOM element representing the "delete" button on the calculator. addEventListener('click', ...) attaches an event listener to the deleteButton. This means that when the button is clicked, the specified callback function will be executed
  calculator.delete(); //This line calls the delete() method on the calculator object.The delete() method is responsible for removing the last character from the currentOperand property of the calculator. This simulates a "backspace" or "delete" functionality, allowing the user to correct their input by deleting the most recently entered digit or character.
  calculator.updateDisplay(); // This line calls the updateDisplay() method on the calculator object. The updateDisplay() method refreshes the calculator's display to reflect the current state. Since the delete() method has modified the currentOperand, the display will now show the updated value with the last character removed.
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
