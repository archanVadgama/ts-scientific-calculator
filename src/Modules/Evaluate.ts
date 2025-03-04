import { Calculator, AdvanceCalculation } from "./Calculator.js";
import { Error } from "./Error.js";

// immediately invoked function expression (IIFE)
export const CalculatorModule = function () {
    
    type TStringNumberArray = (string | number)[]
    type TMathLookup = Record<string, number>;

    // PRECEDENCE for each operators
    const PRECEDENCE: TMathLookup  = {
        "+": 1,
        "-": 1,
        "×": 2,
        "÷": 2,
        "^": 3, 
    };

    // scientific functions 
    const SCIENTIFIC_FUNCTIONS: string[] = [
        "sin",
        "cos",
        "tan",
        "log",
        "cube",
        "degree",
        "radian",
        "√",
        "!",
    ];
    
    // CONSTANT
    const CONSTANT: TMathLookup = {
        'π': Math.PI,
        'e': Math.E,
    };

    // This method will check if the input is a number or a constant
    function isNumber(value: string | number): boolean {
        return !isNaN(Number(value)) || value in CONSTANT;
    }

    // Function to tokenize the input expression
    // Basically it will convert expression into tokens array as below example
    // input: "56 + 69 + 9 - 3"
    // output/token: [56, '+', 69, '+', 9, '-', 3]
    function tokenize(expression: string ): TStringNumberArray {
        const tokens: TStringNumberArray = [];
        let number: string = "";
        let i: number = 0;
        
        // it will iterate thought each character in the expression
        while (i < expression.length) {
            const char: (string | number) = expression[i];

            if (isNumber(char) || char === ".") {

                // It will handle CONSTANT
                if (char in CONSTANT) {
                    tokens.push(CONSTANT[char]);
                    i++;
                } else {
                    number += char;
                    i++;
                }
            } else if (char === "(" || char === ")") {
                
                // It will handle  parentheses
                if (number) {
                    tokens.push(parseFloat(number));
                    number = "";
                }
                tokens.push(char);
                i++;
            } else if (char in PRECEDENCE) {
                // It will handle  operators
                if (number) {
                    tokens.push(parseFloat(number));
                    number = "";
                }
                tokens.push(char);
                i++;
            } else {
                // Check for scientific functions
                const functionName: string = SCIENTIFIC_FUNCTIONS.find((func) =>
                    expression.startsWith(func, i)
                ) ?? "";  // if result will be undefined then it will send blank string              
                
                if (functionName) {
                    if (number) {
                        tokens.push(parseFloat(number));
                        number = "";
                    }
                    tokens.push(functionName);
                    i += functionName.length;
                } else {
                    i++; // It will skip unrecognized characters
                }
            }
        }

        // Push the last number in tokens if exists
        if (number) {
            tokens.push(parseFloat(number));
        }

        if(tokens.length.toString() <= '1') {
            return tokens; // convert this to string sin future when handle eventlistener file
        }

        return tokens;
    }

    // Function to convert infix to postfix
    // it will take token and convert it to postfix
    // input: [56, '+', 69, '+', 9, '-', 3]
    // output: [56, 69, '+', 9, '+', 3, '-']
    function infixToPostfix(tokens: TStringNumberArray): TStringNumberArray | string {
        const output: TStringNumberArray = [];
        const operators: string[] = [];
        let token: string | number;
        
        for (token of tokens) {
            if (isNumber(token)) {
                // Push numbers directly to the output
                output.push(token);
            } else if (typeof token === "string" && SCIENTIFIC_FUNCTIONS.includes(token)) {
                // Push functions to the operator stack
                operators.push(token);
            } else if (typeof token === "string" && token in PRECEDENCE) {
                // Handle operators
                while (
                    operators.length &&
                    operators[operators.length - 1] !== "(" &&
                    PRECEDENCE[operators[operators.length - 1]] >= PRECEDENCE[token]
                ) {
                    const poppedOperator: string | undefined = operators.pop();
                    if (poppedOperator !== undefined) {
                        output.push(poppedOperator);
                    }
                }
                operators.push(token);
            } else if (token === "(") {
                operators.push(token);
            } else if (token === ")") {
                // Pop operators until '(' is encountered
                while (operators.length && operators[operators.length - 1] !== "(") {
                    const poppedOperator: string | undefined = operators.pop();
                    if (poppedOperator !== undefined) {
                        output.push(poppedOperator);
                    }
                }
                operators.pop(); // Remove the '('

                // Check if the next operator is a function and push it
                if (operators.length && SCIENTIFIC_FUNCTIONS.includes(operators[operators.length - 1])) {
                    const functionOperator: string | undefined = operators.pop();
                    if (functionOperator !== undefined) {
                        output.push(functionOperator);
                    }
                }
            }
        }

        // Pop all remaining operators
        while (operators.length) {
            const remainingOperator = operators.pop();
            if (remainingOperator !== undefined) {
                output.push(remainingOperator);
            }
        }

        return output;
    }

    // Function to evaluate postfix expression
    function evaluatePostfix(postfix: TStringNumberArray | string, selectedMode: string): string {
        const stack: number[] = [];
        let result: number;
        for (let token of postfix) {
            if (typeof token === "number" && isNumber(token)) {
                // Convert string to number before pushing
                stack.push(token);
            } else if (typeof token === "string" && SCIENTIFIC_FUNCTIONS.includes(token)) {
                
                const value1: number | undefined = stack.pop();

                if (value1 === undefined) {
                    return Error[2].message;
                }
    
                // Instance for advance calculation
                let advanceCalculate = new AdvanceCalculation(value1);
    
                // try-catch to handle errors
                try {
                    switch (token) {
                        case "sin":
                            result = selectedMode === 'radian' ? advanceCalculate.sinR() : advanceCalculate.sinD();
                            break;
                        case "cos":
                            result = selectedMode === 'radian' ? advanceCalculate.cosR() : advanceCalculate.cosD();
                            break;
                        case "tan":
                            result = selectedMode === 'radian' ? advanceCalculate.tanR() : advanceCalculate.tanD();
                            break;
                        case "log":
                            result = advanceCalculate.log10();
                            break;
                        case "√": 
                            result = advanceCalculate.sqrt();
                            break;
                        case "!":
                            result = advanceCalculate.fact();
                            break;
                        default:
                            return Error[3].message;
                    }
                } catch (error) {
                    return Error[3].message;
                }
    
                stack.push(Number.isInteger(result) ? result : parseFloat(result.toFixed(10)));
            } else {
                const value2: number | undefined = stack.pop();
                const value1: number | undefined = stack.pop();
    
                if (value1 === undefined || value2 === undefined) {
                    return Error[2].message;
                }
    
                // Instance for basic calculation
                let basicCalculate = new Calculator(value1, value2);
    
                try {
                    switch (token) {
                        case "+":
                            result = basicCalculate.add();
                            break;
                        case "-":
                            result = basicCalculate.subtract();
                            break;
                        case "×":
                            result = basicCalculate.multiply();
                            break;
                        case "÷":
                            if (value2 === 0) {
                                return Error[6].message;
                            }
                            result = basicCalculate.division();
                            break;
                        case "^":
                            result = basicCalculate.basePower();
                            break;
                        default:
                            return Error[3].message;
                    }
                } catch (error) {
                    return Error[3].message;
                }
    
                stack.push(Number.isInteger(result) ? result : parseFloat(result.toFixed(10)));
            }
        }
    
        if (stack.length !== 1) {
            return Error[8].message;
        }
    
        return stack.pop()?.toString() ?? Error[8].message;
    }
    

    // public evaluate function
    return {
        evaluate: function (expression: string, selectedMode: string='radian') : string {
            if (expression.trim() === "") {
                return "0";
            }
            
            // remove any spaces from the expression
            expression = expression.replace(/\s+/g, "");
            
            // tokenize the expression
            const tokens: TStringNumberArray = tokenize(expression);
            
            // check this at last maybe it return expression as it is
            if(typeof tokens === 'string') {
                if(expression == tokens){
                    return tokens
                }
            }
            
            // convert infix to postfix
            const postfix = infixToPostfix(tokens);

            // It will evaluate the postfix expression
            return evaluatePostfix(postfix, selectedMode);
        }
    };
}();

