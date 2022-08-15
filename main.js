screen_width = window.innerWidth;
screen_height = window.innerHeight;
apple = "apple.png";
draw_apple = "";
speak_data = "";
content = Math.floor(Math.random() * 100);
x = "";
y = "";
to_number = Number(content);

function preload() {
  loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML =
    "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {
  console.log(event);
  var content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML =
    "The speech has been recognized as : " + content;
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML =
      "The speech has not recognized a number";
  }
};

function setup() {
  canvas = createCanvas(screen_width, screen_height - 150);
}

function draw() {
  if (draw_apple == "set") {
    for (let i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 900);
      y = Math.floor(Math.random() * 600);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples Drawn";
    draw_apple = "set";
    speak();
  }
}

function speak() {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = "";
}
