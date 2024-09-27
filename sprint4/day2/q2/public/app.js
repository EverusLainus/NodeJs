const socket = io("http://localhost:4000");

let currentChannel = null;

socket.on("channelList", (channels) => {
  const channelSelect = document.getElementById("channel-select");
  channelSelect.innerHTML = channels
    .map((ch) => `<option>${ch.name}</option>`)
    .join("");
  if (channels.length > 0 && !currentChannel) {
    joinChannel(channels[0].name);
  }
});

document.getElementById("channel-select").addEventListener("change", (e) => {
  joinChannel(e.target.value);
});

socket.on("message", (msg) => {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>${msg.username}:</strong> ${msg.text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on("channelMessages", (messages) => {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = messages
    .map((msg) => `<p><strong>${msg.username}:</strong> ${msg.text}</p>`)
    .join("");
  chatBox.scrollTop = chatBox.scrollHeight;
});
const createChannelButton = document.getElementById("sendMessage");

createChannelButton.addEventListener("click", function () {
  createChannel();
});

const sendMessageButton = document.getElementById("sendMessage");

sendMessageButton.addEventListener("click", function () {
  sendMessage();
});

function createChannel() {
  const channelName = document.getElementById("new-channel").value;
  socket.emit("createChannel", channelName);
  document.getElementById("new-channel").value = "";
}

function joinChannel(channelName) {
  currentChannel = channelName;
  socket.emit("joinChannel", channelName);
}

function sendMessage() {
  const message = document.getElementById("message-input").value;
  if (message && currentChannel) {
    socket.emit("message", { channel: currentChannel, text: message });
    document.getElementById("message-input").value = "";
  }
}
