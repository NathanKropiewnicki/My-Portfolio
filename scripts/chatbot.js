const backendURL = "https://my-portfolio-hys2.vercel.app";

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

  async function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage);
    inputField.value = "";

    // Show thinking message
    const thinkingMsgId = appendMessage("Bot", "Thinking...");

    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      updateMessage(thinkingMsgId, "Bot", data.reply || "Sorry, I couldn't understand.");
    } catch (error) {
      updateMessage(thinkingMsgId, "Bot", "Error connecting to the server.");
    }
  }

  function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    const id = Date.now();
    messageElem.dataset.id = id;
    messageElem.textContent = `${sender}: ${text}`;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
    return id;
  }

  function updateMessage(id, sender, text) {
    const chatBox = document.getElementById("chat-box");
    const msgElem = [...chatBox.children].find(m => m.dataset.id == id);
    if (msgElem) msgElem.textContent = `${sender}: ${text}`;
  }

  chatWindow.querySelector("button").addEventListener("click", sendMessage);
  chatWindow.querySelector("input").addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
});

