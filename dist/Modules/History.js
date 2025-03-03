const historyDiv = document.getElementById("history");
const fullHistoryDiv = document.getElementById("full-history");
const MIN_TEXTAREA_HEIGHT = 28;
const MAX_TEXTAREA_HEIGHT = 70;
const History = {
    history: JSON.parse(localStorage.getItem("calculation-history") || "[]"),
    /**
     * Set the history entries
     *
     * @param {string} exp
     * @param {string} res
     */
    setHistory(exp, res) {
        const lastKey = this.history.length > 0 ? this.history[this.history.length - 1].key : 0;
        const newHistoryEntry = {
            key: lastKey + 1,
            expression: exp,
            result: res
        };
        this.history.push(newHistoryEntry);
        localStorage.setItem("calculation-history", JSON.stringify(this.history));
    },
    /**
     * Get the history entries
     *
     * @return {*}  {HistoryEntry[]}
     */
    getHistory() {
        return this.history;
    },
    /**
     * Format the history entries into a HTMLDivElement
     *
     * @return {*}  {HTMLDivElement}
     */
    formatHistory() {
        const historyContainer = document.createElement("div");
        this.history.forEach(entry => {
            const historyItem = document.createElement("div");
            historyItem.style.paddingBottom = "9px";
            historyItem.style.marginTop = "9px";
            historyItem.style.borderBottom = "1px solid rgb(204, 202, 202)";
            const expressionSpan = document.createElement("span");
            expressionSpan.classList.add("font-medium");
            expressionSpan.innerText = entry.expression;
            const equalsSign = document.createTextNode(" = ");
            const resultSpan = document.createElement("span");
            resultSpan.style.fontSize = "1.3rem";
            resultSpan.style.fontWeight = "bolder";
            resultSpan.innerText = entry.result;
            // Append elements to the history item
            historyItem.appendChild(expressionSpan);
            historyItem.appendChild(equalsSign);
            historyItem.appendChild(resultSpan);
            // Append history item to container
            historyContainer.appendChild(historyItem);
        });
        return historyContainer;
    },
    /**
     * Clear the history entries
     */
    clearHistory() {
        localStorage.removeItem('calculation-history');
        this.history = [];
    },
    /**
     * Set the history UI
     */
    setHistoryUI() {
        const historyBtn = document.getElementById("history-btn");
        if (this.history.length > 0) {
            historyBtn.style.display = "block";
            let newTextareaHeight = MIN_TEXTAREA_HEIGHT * (this.history.length + 1);
            historyDiv.style.height = `${Math.min(newTextareaHeight, MAX_TEXTAREA_HEIGHT)}px`;
            historyDiv.style.paddingBottom = "10px";
            historyDiv.innerHTML = ""; // Clear previous history
            historyDiv.appendChild(History.formatHistory());
            historyDiv.style.display = "block";
            historyDiv.scrollTop = historyDiv.scrollHeight;
            fullHistoryDiv.appendChild(History.formatHistory());
            fullHistoryDiv.style.paddingRight = "5px";
            fullHistoryDiv.scrollTop = fullHistoryDiv.scrollHeight;
        }
        else {
            historyBtn.style.display = "none";
        }
    }
};
export { History };
//# sourceMappingURL=History.js.map