# TypeScript-scientific-calculator

A fully functional scientific calculator built using HTML, CSS, and TypeScript. It supports both basic and advanced mathematical calculations, including trigonometric, logarithmic, and exponential functions. The calculator also features memory and history functionality, a modern user interface, and theme toggling between light and dark modes.

## Technologies Used
- **HTML** - Structure of the application.
- **CSS** -  Styling and UI design.
- **TypeScript** - Implements functionalities with strong typing and modular structure.

## Installation and Setup:
Clone the repository:

```
git clone https://github.com/archanVadgama/ts-scientific-calculator.git
```

Navigate to the project directory:

```
cd ts-scientific-calculator
```

Install dependencies:

```
npm install
```

Compile TypeScript:

```
tsc
```

Open index.html in a browser to use the calculator.


## File Structure

- assets  
    - images (contains screenshot images)
    - css  
        - style.css  (Contains all the styles for the calculator) 
-dist
    -it contains transpile javascript code
-src (it contains all typescript files)
    - Modules  
        - Calculator.ts  (Contains all the classes and methods for basic and advanced calculations)  
        - Error.ts  (Contains all the error messages and error checking methods)  
        - Evaluate.ts  (Contains the logic where the input string is evaluated and the operation is performed)  
        - EventHandlers.ts  (Contains all the event handlers for button clicks and keyboard input)  
        - History.ts  (Contains all objects related to history, such as setting, getting, and clearing history)  
        - ThemeMode.ts  (Contains logic for toggling between light and dark themes)  
        - Toast.ts  (Contains the logic for displaying toast messages)  
      - main.ts  (Contains all the logic for handling interactions on the page)  
- index.html  (The main HTML file to load the calculator)  
- readme.md  (This README file)

## Screenshots
#### Normal
![Normal](https://raw.githubusercontent.com/archanVadgama/ts-scientific-calculator/refs/heads/main/assets/images/laptop.png)

#### With History UI 
![With History UI](https://raw.githubusercontent.com/archanVadgama/ts-scientific-calculator/refs/heads/main/assets/images/laptop_with_history.png)

## Concepts Covered
- Created separate modules for each mathematical operation
- Applied **IIFE** (Immediately Invoked Function Expressions)
- Used **Object-Oriented Programming** (OOP) principles
- **Prototype** inheritance
- Implemented **Event Listeners** and **Event Delegation**
- Worked with **`this` keyword**, **scope chain**, and **closures**
- Understood **hoisting** and the **call stack**

## Features
- **Basic calculator functionality** (addition, subtraction, multiplication, division)
- **Scientific calculator functionality** (trigonometric, logarithmic, and exponential functions)
- **Memory functionality** (save and recall results)
- **History functionality** (view and clear previous calculations)
- **Full history** (detailed log of all past calculations)
- **Clear history** (reset stored history)
- **Trigonometric functions** (`sin()`, `cos()`, `tan()`)
- **Exponential functions** (`e`, `π`)
- **Logarithmic functions** (`log()`)
- **Toggle mode** between **dark mode** and **light mode**
- **Modern UI** with a responsive design
- **Toast messages** for user feedback
- Supports **keyboard input** and **button click events** on the calculator
- **Error handling** for invalid inputs or operations

## Supported Calculations

### Basic Calculations:
- `56 + 6`
- `59 - 65`
- `9 * 5`
- `9 / 5`
- `2^3` (Exponentiation)
- `sin(58)`
- `cos(45)`
- `tan(35)`
- `log(20)`

### Advanced Calculations:
- `56 + 69 + 9 - 3`
- `78 + 90 × 4 - 2 ÷ 23 % 100`
- `cos( 45 × 78 × sin( 89 - 9 ) )`
