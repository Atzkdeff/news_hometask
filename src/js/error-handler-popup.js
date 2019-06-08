import "../styles/popup.scss";

const ErrorHandlerPopup = (function() {
    let instance = Singleton.instance;

    function Singleton() {
        if (instance) return instance;
        instance = this;
    }

    Singleton.prototype.showPopup = function (message) {
        let popup = document.createElement("div");

        popup.className = "shadow-background";
        popup.setAttribute("id", "popup-shadow");
        document.body.appendChild(popup);
        popup.insertAdjacentHTML("afterBegin", createPopupBody(message));

        addCancelEventListener(popup);
    };

    function createPopupBody(message) {
        const errorMessage = message || "Please contact your system administrator";
        return `
                <div class="popup">
                    <span class="popup-title">Something goes wrong...</span>
                    <span class="popup-error-message">${errorMessage}</span>
                    <button id="cancel-button">Got it!</button>
                </div>
        `;
    };

    function addCancelEventListener(element) {
        element.addEventListener("click", (event) => {
            const targetID = event.target.id;
            if (targetID === "cancel-button" || targetID === "popup-shadow") {
                element.remove()
            }
        });

    };

    return Singleton
})();

export default ErrorHandlerPopup;
