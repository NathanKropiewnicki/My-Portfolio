const backendURL = "https://my-portfolio-hys2.vercel.app/api/chat";

document.addEventListener("DOMContentLoaded", () => {
  // Create chatbot button
  const button = document.createElement("div");
  button.id = "chatbot-button";
  button.innerHTML = "💬";

  // Create chatbot window
  const chatWindow = document.createElement("div");
  chatWindow.id = "chatbot-window";
  chatWindow.style.display = "none";
  chatWindow.innerHTML = `
    <div id="chat-box"></div>
    <div id="chatbot-input">
      <input id="chat-input" type="text" placeholder="Ask me anything...">
      <button id="send-btn">Send</button>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(chatWindow);

  const chatBox = chatWindow.querySelector("#chat-box");

  // Temporary under construction message
  const tempMessage = document.createElement("div");
  tempMessage.classList.add("bot-message");
  tempMessage.innerText = "⚠️ Chatbot is under construction. Please check back later!";
  chatBox.appendChild(tempMessage);

  // Toggle chat window
  button.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "flex" ? "none" : "flex";
  });

  // Handle sending messages
  const sendButton = chatWindow.querySelector("#send-btn");
  const chatInput = chatWindow.querySelector("#chat-input");

  const sendMessage = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Display user's message
    const userMsgEl = document.createElement("div");
    userMsgEl.className = "user-message";
    userMsgEl.textContent = userMessage;
    chatBox.appendChild(userMsgEl);
    chatInput.value = "";

    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      // Display bot's message
      const botMsgEl = document.createElement("div");
      botMsgEl.className = "bot-message";
      botMsgEl.textContent = data.reply || "No response.";
      chatBox.appendChild(botMsgEl);
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "bot-message error";
      errorMsg.textContent = "Error connecting to the server.";
      chatBox.appendChild(errorMsg);
    }
  };

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});

