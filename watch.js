let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 1;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1000);
        running = true;
    }
}


function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapNumber = 1;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapNumber++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    
    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}