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
        const target = event.target; // Target as HTMLElement
        const button = target.closest(".button"); // Find closest button
        if (!button)
            return; // Exit if no button is found
        const value = (_a = button.dataset.value) !== null && _a !== void 0 ? _a : ""; // Get the value of the button
        if (!value)
            return; // Exit if no value is present
        isError(display); // Check for errors and reset the display if needed
        switch (value) {
            case "degree":
            case "radian":
                // Remove 'active' class from the previously active button
                if (activeButton)
                    activeButton.classList.remove("active");
                // Add 'active' class to the clicked button
                button.classList.add("active");
                showToast(`Change to ${value}`);
                break;
            case "=":
                if (display.value === "")
                    return;
                try {
                    selectedMode = (_b = activeButton.dataset.value) !== null && _b !== void 0 ? _b : "radian";
                    // Evaluate the expression and set the result
                    let result = CalculatorModule.evaluate(display.value, selectedMode);
                    // Check if the result is a number and set the history
                    if (!isNaN(Number(result))) {
                        History.setHistory(display.value, result);
                        History.setHistoryUI();
                    }
                    display.value = result;
                }
                catch (_d) {
                    display.value = Error[2].message; // Show error message if evaluation fails
                }
                break;
            case "C":
                display.value = ""; // Clear display
                break;
            case "sin(":
                display.value += display.value !== "" ? " × sin( " : " sin( ";
                break;
            case "cos(":
                display.value += display.value !== "" ? " × cos( " : " cos( ";
                break;
            case "tan(":
                display.value += display.value !== "" ? " × tan( " : " tan( ";
                break;
            case "log(":
                display.value += display.value !== "" ? " × log( " : " log( ";
                break;
            case "π":
            case "e":
                display.value += display.value ? ` × ${value}  ` : ` ${value} `;
                break;
            case ".":
                let lastOperator = (_c = display.value.split(" ").pop()) !== null && _c !== void 0 ? _c : "";
                if (lastOperator.includes("."))
                    return;
                display.value += lastOperator === "" || isNaN(Number(lastOperator)) ? "0." : value;
                break;
            case "D":
                isError(display);
                display.value = display.value.slice(0, -1); // Delete last character
                break;
            default:
                // Handle numbers and operators
                display.value += NUMBER_KEYS.includes(value) ? value : ` ${value} `;
                break;
        }
    });
    // event listener that will be triggered when a key is pressed in keyboard
    document.addEventListener("keydown", function (e) {
        var _a, _b;
        isError(display);
        selectedMode = (_a = activeButton.dataset.value) !== null && _a !== void 0 ? _a : "radian";
        switch (e.key) {
            case "Enter":
                if (display.value === "")
                    return;
                try {
                    // Evaluate the expression
                    let result = CalculatorModule.evaluate(display.value, selectedMode);
                    // Check if the result is a number and set the history
                    if (!isNaN(Number(result))) {
                        History.setHistory(display.value, result);
                        History.setHistoryUI(); // Set history
                    }
                    display.value = result;
                }
                catch (_c) {
                    display.value = Error[2].message;
                }
                break;
            case "Escape":
                display.value = ""; // Clear input
                break;
            case "S":
            case "s":
                display.value += display.value !== "" ? " × sin( " : " sin( ";
                break;
            case "C":
            case "c":
                display.value += display.value !== "" ? " × cos( " : " cos( ";
                break;
            case "T":
            case "t":
                display.value += display.value !== "" ? " × tan( " : " tan( ";
                break;
            case "L":
            case "l":
                display.value += display.value !== "" ? " × log( " : " log( ";
                break;
            case "Delete":
            case "Backspace":
                isError(display);
                display.value = display.value.slice(0, -1); // Delete last character
                break;
            case ".":
                let lastOperator = (_b = display.value.split(" ").pop()) !== null && _b !== void 0 ? _b : "";
                if (!lastOperator.includes(".")) {
                    display.value += lastOperator === "" || isNaN(Number(lastOperator)) ? "0." : ".";
                }
                break;
            case "*":
                display.value += " × ";
                break;
            case "/":
                display.value += " ÷ ";
                break;
            default:
                if (NUMBER_KEYS.concat(OPERATIONS_KEYS).includes(e.key)) {
                    isError(display);
                    display.value += NUMBER_KEYS.includes(e.key) ? e.key : ` ${e.key} `;
                }
                break;
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