const backendURL = "https://nathankropiewnicki.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("div");
  button.id = "chatbot-button";
  button.innerHTML = "💬";

  const chatWindow = document.createElement("div");
  chatWindow.id = "chatbot-window";
  chatWindow.innerHTML = `
    <div id="chatbot-messages"></div>
    <div id="chatbot-input">
      <input type="text" placeholder="Ask me anything...">
      <button>Send</button>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(chatWindow);

  button.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "flex" ? "none" : "flex";
  });

  const sendMessage = async () => {
    const input = chatWindow.querySelector("input");
    const text = input.value.trim();
    if (!text) return;
    appendMessage("You", text);
    input.value = "";

    appendMessage("Bot", "Thinking...");
    const res = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    chatWindow.querySelectorAll("#chatbot-messages div").pop;
    appendMessage("Bot", data.answer);
  };

  chatWindow.querySelector("button").addEventListener("click", sendMessage);
  chatWindow.querySelector("input").addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
});

function appendMessage(sender, text) {
  const msgBox = document.getElementById("chatbot-messages");
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  msgBox.appendChild(msg);
  msgBox.scrollTop = msgBox.scrollHeight;
}
