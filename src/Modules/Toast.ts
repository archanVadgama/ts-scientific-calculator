// toastModule.ts

let toastTimeout: number;

/**
 * Show a toast message
 *
 * @export
 * @param {string} message
 * @return {*}  {void}
 */
export function showToast(message: string): void {
    
    // Create toast element
    const toast: HTMLDivElement = document.createElement("div");
    toast.style.boxShadow = "0 0 15px 3px rgba(104,103,103,0.7)";
    toast.classList.add("toast");

    // Create text element
    const text: HTMLSpanElement = document.createElement("span");
    text.innerText = message;
    toast.appendChild(text);

    // Create close button
    const closeButton: HTMLButtonElement = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.style.marginLeft = "10px";
    closeButton.style.marginRight = "-10px";
    closeButton.onclick = () => closeToast(toast);
    toast.appendChild(closeButton); // Append close button to toast

    // Append toast to container
    const container: HTMLElement | null = document.getElementById("toast-container");
    if (!container) {
        console.error("Toast container element not found");
        return;
    }
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10); // Wait for element to be appended before adding show class

    startToastTimer(toast); // Start timer for toast

    toast.addEventListener("mouseenter", () => clearTimeout(toastTimeout)); // Stop timer on hover
    toast.addEventListener("mouseleave", () => startToastTimer(toast)); // Restart timer on mouse leave
}

/**
 * Start the timer for the toast
 *
 * @param {HTMLDivElement} toast
 */
function startToastTimer(toast: HTMLDivElement): void {
    toastTimeout = setTimeout(() => closeToast(toast), 2000); // Close after 2 seconds
}

/**
 * Close the toast
 *
 * @param {HTMLDivElement} toast
 */
function closeToast(toast: HTMLDivElement): void {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300); // Wait for closing animation before removal
}
