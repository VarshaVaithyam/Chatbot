const webhookUrl = "https://varshavaithyam06.app.n8n.cloud/webhook/CHATBOT";

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender; // "user" or "bot"
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);

  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth"
  });

  return msgDiv;
}

async function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  // 1️⃣ Show user message
  addMessage(message, "user");
  input.value = "";

  // 2️⃣ Show typing indicator
  const typingDiv = addMessage("Thinking...", "bot");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    // 3️⃣ Show AI reply
    typingDiv.innerText = data.reply || "No response from AI";

  } catch (error) {
    typingDiv.innerText = "⚠️ Unable to connect to server";
    console.error("Fetch error:", error);
  }
}
