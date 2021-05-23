const G =  9.81; //gravitational acceleration

const launchButton = document.querySelector("#launchButton")
const clearButton =  document.querySelector('#resetButton')
const velocityInput = document.querySelector("#inputVelocity")
const projectionAngleInput = document.querySelector("#inputAngle")
const console = document.querySelector(".console")

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

clearButton.addEventListener('click', clear, false);
launchButton.addEventListener('click', plotProjectile,false)

function clear(){
  clearCanvas() 
  clearConsole()
}

function clearCanvas() {
  ctx.moveTo(0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearConsole(){
console.value = '';
}

function plotProjectile(){
  let velocity = velocityInput.value
  let projectionAngle = degreesToRadians(projectionAngleInput.value)
  let time = calculateTime(velocity,projectionAngle)
  calculatePoints(velocity, projectionAngle, time)
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateTime(velocity, angle) {
  return 2 * velocity * Math.sin(angle) / G;
}

function calculatePoints(velocity, angle, time) {
  ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
  for (var i = 0; i < Math.ceil(time * 10); i++) {
    let point = getPointCoordinates(velocity, angle, i / 10);
    drawPoint(point.x, canvas.height - point.y);
  }
}

function getPointCoordinates(velocity, angle, time) {
  return {
    x: velocity * time * Math.cos(angle),
    y: velocity * time * Math.sin(angle) - 0.5 * G * Math.pow(time, 2)
  };
}

function drawPoint(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  addToConsole(` X: ${x} Y: ${y}, \n`);
  ctx.closePath();
  ctx.fill();
}

function addToConsole(text) {
  console.value += text;
}



