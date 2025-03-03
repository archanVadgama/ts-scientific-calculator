import { CalculatorModule } from "./Evaluate.js";
import { History } from "./History.js";
import { Error, isError } from "./Error.js";
import { showToast } from "./Toast.js";
/**
 * Set up event handlers for the calculator
 *
 * @export
 */
export function setupEventHandlers() {
    // Get the display element
    const display = document.getElementById("display");
    // Get the calculator buttons container
    const calculatorButtons = document.querySelector(".calculator-buttons");
    // keyboard keys array
    const NUMBER_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const OPERATIONS_KEYS = [".", "-", "+", "/", "*", "%", "(", ")", "π"];
    const activeButton = document.querySelector(".active"); // this will find current active button
    let selectedMode = "radian"; // default mode is radian
    History.setHistoryUI(); //set history on page load
    // iterate through each element and check which one is clicked
    calculatorButtons.addEventListener("pointerdown", function (event) {
        var _a, _b, _c;
        // Check if the clicked element is a button (and not something else)
        const target = event.target; // Cast target as HTMLElement
        if (!(target === null || target === void 0 ? void 0 : target.closest(".button")))
            return;
        const button = target.closest(".button");
        if (!button)
            return;
        const value = (_a = button.dataset.value) !== null && _a !== void 0 ? _a : ""; // Get the value of the button
        if (!value)
            return;
        // Check for errors and reset the display if needed
        isError(display);
        // 'degree' or 'radian' button click to toggle 'active' class
        if (value === "degree" || value === "radian") {
            // If their is an active button it will remove the 'active' class from it
            if (activeButton) {
                activeButton.classList.remove("active");
            }
            // Add the 'active' class to the clicked button
            button.classList.add("active");
            showToast("Change to " + value);
            return;
        }
        // Handle the "=" button to evaluate the expression
        if (value === "=") {
            if (display.value === "")
                return;
            try {
                selectedMode = (_b = activeButton.dataset.value) !== null && _b !== void 0 ? _b : "radian";
                let result = CalculatorModule.evaluate(display.value, selectedMode);
                if (!isNaN(Number(result))) {
                    History.setHistory(display.value, result);
                    History.setHistoryUI();
                }
                display.value = result;
                return;
            }
            catch (_d) {
                display.value = Error[2].message;
                return;
            }
        }
        // Handle the 'C' button (clear the display)
        if (value === "C") {
            display.value = "";
            return;
        }
        if (value === "π" || value === "e") {
            if (display.value !== "") {
                display.value = display.value + ` × ${value}  `;
            }
            else {
                display.value = display.value + ` ${value} `;
            }
            return;
        }
        // If the key is a decimal point (.), ensure only added once
        // example: 1 + 2.3 + 4.5
        if (value === ".") {
            let lastOperator = (_c = display.value.split(" ").pop()) !== null && _c !== void 0 ? _c : "";
            if (lastOperator.includes(".")) {
                return;
            }
            if (lastOperator === "" || isNaN(Number(lastOperator))) {
                display.value += "0.";
            }
            else {
                display.value += value;
            }
            return;
        }
        // Handle the 'D' button (delete the last character)
        if (value === "D") {
            isError(display);
            display.value = display.value.slice(0, -1);
            return;
        }
        // Handle numbers and operators (add them to the display)
        if (NUMBER_KEYS.includes(value)) {
            display.value += value;
            return;
        }
        display.value += " " + value + " ";
    });
    // event listener that will be triggered when a key is pressed in keyboard
    document.addEventListener("keydown", function (e) {
        var _a, _b;
        isError(display);
        selectedMode = (_a = activeButton.dataset.value) !== null && _a !== void 0 ? _a : "radian";
        // it will calculate the input
        if (e.key == "Enter" && display.value != "") {
            try {
                let result = CalculatorModule.evaluate(display.value, selectedMode);
                if (!isNaN(Number(result))) {
                    History.setHistory(display.value, result);
                    History.setHistoryUI(); // set history
                }
                display.value = result;
                return;
            }
            catch (_c) {
                display.value = Error[2].message;
                return;
            }
        }
        else if (e.key == "Escape") {
            // it will clear the input   
            display.value = "";
        }
        else if (e.key == "S" || e.key == "s") {
            // press 's' for sin()
            display.value += display.value != "" ? " × sin( " : " sin( ";
        }
        else if (e.key == "C" || e.key == "c") {
            // press 'c' for cos()
            display.value += display.value != "" ? " × cos( " : " cos( ";
        }
        else if (e.key == "T" || e.key == "t") {
            // press 't' for tan()
            display.value += display.value != "" ? " × tan( " : " tan( ";
        }
        else if (e.key == "L" || e.key == "l") {
            // press 'l' for log()
            display.value += display.value != "" ? " × log( " : " log( ";
        }
        else if (e.key == "Delete" || e.key == "Backspace") {
            // it will delete the last character
            isError(display);
            display.value = display.value.slice(0, -1);
            return;
        }
        // concat both arrays and check which key is pressed
        if (NUMBER_KEYS.concat(OPERATIONS_KEYS).includes(e.key)) {
            // Check for errors and reset the display if needed
            isError(display);
            // If the key is a decimal point (.), ensure only added once
            // example: 1 + 2.3 + 4.5
            if (e.key === ".") {
                let lastOperator = (_b = display.value.split(" ").pop()) !== null && _b !== void 0 ? _b : "";
                if (lastOperator.includes(".")) {
                    return;
                }
                if (lastOperator === "" || isNaN(Number(lastOperator))) {
                    display.value += "0.";
                }
                else {
                    display.value += e.key;
                }
                return;
            }
            else if (e.key == "*") {
                // it will change multiply(*) to ×    
                display.value += " × ";
            }
            else if (e.key == "/") {
                // it will change divide(/) to ÷
                display.value += " ÷ ";
            }
            else if (NUMBER_KEYS.includes(e.key)) {
                display.value += e.key;
            }
            else {
                display.value += " " + e.key + " ";
            }
        }
    });
    // it will clear the history
    let clearHistorySelector = document.querySelector(".clear-btn");
    let leftSideSection = document.querySelector(".left-side");
    let fullHistoryContainer = document.querySelector(".full-history-container");
    clearHistorySelector.addEventListener("click", function (e) {
        History.clearHistory();
        leftSideSection.style.display = "none";
        fullHistoryContainer.style.display = "none";
        showToast("History Cleared");
    });
}
//# sourceMappingURL=EventHandler.js.map