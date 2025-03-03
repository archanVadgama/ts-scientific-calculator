const historyDiv = document.getElementById("history") as HTMLDivElement;
const fullHistoryDiv = document.getElementById("full-history") as HTMLDivElement;
const MIN_TEXTAREA_HEIGHT: number = 28; 
const MAX_TEXTAREA_HEIGHT: number = 70;

/**
 * @interface HistoryEntry
*/

interface HistoryEntry {
    key: number;
    expression: string;
    result: string;
}

const History = {
    
    history: JSON.parse(localStorage.getItem("calculation-history") || "[]") as HistoryEntry[],

    /**
     * Set the history entries
     *
     * @param {string} exp
     * @param {string} res
     */
    setHistory(exp: string, res: string): void {
        const lastKey = this.history.length > 0 ? this.history[this.history.length - 1].key : 0;
        const newHistoryEntry: HistoryEntry = {
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
    getHistory(): HistoryEntry[] {
        return this.history;
    },

    /**
     * Format the history entries into a HTMLDivElement
     *
     * @return {*}  {HTMLDivElement}
     */
    formatHistory(): HTMLDivElement {
        const historyContainer: HTMLDivElement = document.createElement("div");

        this.history.forEach(entry => {
            const historyItem: HTMLDivElement = document.createElement("div");
            historyItem.style.paddingBottom = "9px";
            historyItem.style.marginTop = "9px";
            historyItem.style.borderBottom = "1px solid rgb(204, 202, 202)";

            const expressionSpan: HTMLSpanElement = document.createElement("span");
            expressionSpan.classList.add("font-medium");
            expressionSpan.innerText = entry.expression;

            const equalsSign: Text = document.createTextNode(" = ");

            const resultSpan: HTMLSpanElement = document.createElement("span");
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
    clearHistory(): void {
        localStorage.removeItem('calculation-history');
        this.history = [];
    },
    
    /**
     * Set the history UI
     */
    setHistoryUI(): void {
        const historyBtn = document.getElementById("history-btn") as HTMLElement;

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
        } else {
            historyBtn.style.display = "none";
        }
    }
};

export { History };
