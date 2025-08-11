const backendURL = "https://my-portfolio-hys2.vercel.app/api/chat";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("div");
  button.id = "chatbot-button";
  button.innerHTML = "💬";

  const chatWindow = document.createElement("div");
  chatWindow.id = "chatbot-window";
  chatWindow.innerHTML = `
    <div id="chat-box"></div>
    <div id="chatbot-input">
      <input id="chat-input" type="text" placeholder="Ask me anything...">
      <button>Send</button>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(chatWindow);

  button.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "flex" ? "none" : "flex";
  });

document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    function addMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(sender);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage("user", message);
        userInput.value = "";
        addMessage("bot", "Thinking...");

        try {
            const response = await fetch("https://my-portfolio-hys2.vercel.app/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            chatBox.lastChild.textContent = data.message || "No response from bot.";
        } catch (error) {
            console.error(error);
            chatBox.lastChild.textContent = "Error connecting to server.";
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});


