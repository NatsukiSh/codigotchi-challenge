const micBtn = document.getElementById("microphone");
const panelsData = document.getElementById("panels-data");
const transcript = document.getElementById("transcript");
const screen = document.getElementById("screen");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const commands = ["eat", "sleep", "dance"];

function onStartListening() {
  recognition.start();

  panelsData.classList.add("talking");
}

function onResult(event) {
  panelsData.classList.remove("talking");

  const text = event.results[0][0].transcript;

  transcript.innerText = `You said: ${text}`;

  const action = commands.find(function (command) {
    return text.toLowerCase().includes(command);
  });

  if (action) {
    screen.classList.add(`codigotchi-screen_${action}`);
  } else {
    transcript.textContent += `Invalid command!`;
  }
  setTimeout(function () {
    screen.classList.remove(`codigotchi-screen_${action}`);
    transcript.innerText = "";
  }, 3000);
}

micBtn.addEventListener("click", onStartListening);
recognition.addEventListener("result", onResult);
