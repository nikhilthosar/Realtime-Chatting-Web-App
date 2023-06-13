const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('tune.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
});


const usrname = prompt("Enter your name to join");
console.log("New User is :: ", usrname);
socket.emit('newjoined', usrname);

socket.on('user-joined', usrname => {
    console.log("New User Joined");
    append(`${usrname} joined the chat`, 'right');
});

socket.on('receive', data => {
    console.log("New User Joined");
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    console.log("New User Joined");
    append(`${name} left the chat`, 'left');
});
