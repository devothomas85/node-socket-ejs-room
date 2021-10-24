const socket = io();
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

if (messageForm != null) {
  const name = prompt("Enter Group name ?");

  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta"><span></span></p>
    <p class="text">
      You Joined
    </p>`;

  messageContainer.appendChild(div);

  //messageContainer.append("You Joined");
  socket.emit("new-user", roomName, name);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

socket.on("/room-created", (room) => {
  /*
    <div><%= room %></div>
      <a href="/<% room %>">Join</a>
  */
  const roomElement = document.createElement("div");
  roomElement.innerText = room;
  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  roomLink.innerText = "join";
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

socket.on("chat-message", (data) => {
  appendMessage(data);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

function appendMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.name} <span></span></p>
    <p class="text">
      ${message}
    </p>`;
  document.querySelector(".message-container").appendChild(div);

  // const messageElement = document.createElement("div");
  // messageElement.innerText = message;
  // messageContainer.append(messageElement);
}
