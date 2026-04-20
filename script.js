const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const moods = ["bratty", "lazy", "angry"];
let mood = random(moods);

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function detectIntent(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) return "greet";
  if (msg.includes("how are you")) return "status";
  if (msg.includes("your name")) return "name";
  if (msg.includes("help")) return "help";
  if (msg.includes("love") || msg.includes("like")) return "emotion";

  return "unknown";
}


function maybeChangeMood() {
  if (Math.random() < 0.3) {
    mood = random(moods);
  }
}


function generateResponse(message) {
  const intent = detectIntent(message);

  const responses = {
    greet: ["ugh... hi.", "yeah? what.", "oh it's YOU."],
    status: ["bad.", "why do you care?", "I'm bored."],
    name: ["I'm Little Timmy.", "you already know that.", "stop asking."],
    help: ["no.", "figure it out.", "I'm not helping."],
    emotion: ["that's weird.", "stop it.", "ew."],
    unknown: ["what?", "huh?", "that made no sense.", "you're confusing me."]
  };

  let reply = random(responses[intent]);

  if (mood === "angry") reply = reply.toUpperCase() + "!!!";
  if (mood === "lazy") reply = "..." + reply;
  if (mood === "bratty") reply = reply + " 🙄";

  return reply;
}


function addMessage(text, type) {
  const div = document.createElement("div");
  div.textContent = text;
  div.classList.add(type);

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}


function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;


  addMessage(msg, "user");


  const reply = generateResponse(msg);
  setTimeout(() => {
    addMessage(reply, "bot");
  }, 400);

  userInput.value = "";

  maybeChangeMood();
}


sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});


addMessage("Little Timmy is online... unfortunately.", "bloop");
