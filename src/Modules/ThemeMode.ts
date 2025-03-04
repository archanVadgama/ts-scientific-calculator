import { showToast } from "./Toast.js";

// Function to initialize the theme based on local storage
export function initializeTheme() {
    let toggleMode = document.querySelector(".toggle-mode") as HTMLElement;
    let calculator = document.getElementsByClassName("calculator")[0] as HTMLElement;
     
    // Check the saved theme mode from localStorage or default to light mode
    const themeMode:string = localStorage.getItem("theme-mode") === "dark-mode"
      ? "dark-mode"
      : "light-mode";
    
    // Set the theme mode
    setThemeMode(themeMode, toggleMode, calculator);
    
    // Ensure the element exists before adding event listeners
    if (toggleMode) {
      
      // Apply the saved theme
      const savedTheme:string = localStorage.getItem("theme-mode") ?? "light-mode";
      if (savedTheme === "dark-mode") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.add("light-mode");
      }

      // Add event listener for toggling the theme
      toggleMode.addEventListener("click", function () {
        const themeMode:string = document.body.classList.contains("dark-mode")
          ? "light-mode"
          : "dark-mode";
          
        // Set the theme mode
        setThemeMode(themeMode, toggleMode, calculator);
        
        // Call showToast function if necessary (ensure showToast is available)
        showToast(`Change to ${themeMode}`);
        
        // Toggle class and update localStorage
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme-mode", themeMode);
      });
    }
  }

  /**
   * Set the theme mode
   *
   * @param {string} themeMode
   * @param {HTMLElement} buttonElement
   * @param {HTMLElement} calculator
   */
  function setThemeMode(themeMode:string, buttonElement: HTMLElement, calculator: HTMLElement):void {
    
    // Change the UI for dark or light mode
    if (themeMode === "dark-mode") {
      buttonElement.innerHTML = '<i class="fa-solid fa-sun"></i>'; // sun icon for dark mode
      document.body.style.backgroundColor = "#1b1c1d";
      calculator.style.backgroundColor = "#1b1c1d";
    } else {
      buttonElement.innerHTML = '<i class="fa-solid fa-moon"></i>'; // moon icon for light mode
      document.body.style.backgroundColor = "#f4f4f4";
      calculator.style.backgroundColor = "#fff";
    }
  }
  
  // Function to open the history popup
  export function openHistoryPopup() {
    let historyBtn = document.getElementById("history-btn") as HTMLElement;
    let fullHistoryContainer = document.getElementById("full-history-container") as HTMLElement;
    
    historyBtn.addEventListener("click", function () {
      fullHistoryContainer.style.display = "block";
    });
  }
  
  // Function to close the history popup
  export function closeHistoryPopup() {
    let closeBtn = document.getElementById("close-btn") as HTMLElement;
    let fullHistoryContainer = document.getElementById("full-history-container") as HTMLElement;

    closeBtn.addEventListener("click", function () {
      fullHistoryContainer.style.display = "none";
    });
  }
  