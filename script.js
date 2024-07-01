let startTime;
let lapTimes = [];
let lapCounter = 1;
let timer;
let isRunning = false;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("start").style.display = "inline-block";
        document.getElementById("pause").style.display = "none";
        document.getElementById("restart").style.display = "inline-block";
        document.getElementById("reset").style.display = "inline-block";
        document.getElementById("resetlaps").style.display = "none";
        isRunning = false;
    } else {
        if (lapCounter === 1) {
            document.getElementById("laps").innerHTML = "";
            lapTimes = [];
        }
        startTime = Date.now() - (lapCounter > 1 ? lapTimes[lapCounter - 2] : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById("start").style.display = "none";
        document.getElementById("pause").style.display = "inline-block";
        document.getElementById("restart").style.display = "none";
        document.getElementById("reset").style.display = "none";
        document.getElementById("resetlaps").style.display = "inline-block";
        isRunning = true;
    }
}

function lap() {
    if (isRunning) {
        let lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        let lapDisplay = formatTime(lapTime);
        let lapItem = document.createElement("li");
        lapItem.innerHTML = `Lap ${lapCounter}: ${lapDisplay}`;
        document.getElementById("laps").appendChild(lapItem);
        lapCounter++;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").innerHTML = "00:00:00.000";
    document.getElementById("laps").innerHTML = "";
    lapCounter = 1;
    lapTimes = [];
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("pause").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("reset").style.display = "none";
    document.getElementById("resetlaps").style.display = "none";
    isRunning = false;
}

function restart() {
    clearInterval(timer);
    document.getElementById("display").innerHTML = "00:00:00.000";
    lapCounter = 1;
    lapTimes = [];
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("pause").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("reset").style.display = "none";
    document.getElementById("resetlaps").style.display = "none";
    isRunning = false;
}

function resetlaps() {
    document.getElementById("laps").innerHTML = "";
    lapCounter = 1;
    lapTimes = [];
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime;
    document.getElementById("display").innerHTML = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor(milliseconds / 60000) % 60;
    let seconds = Math.floor(milliseconds / 1000) % 60;
    let ms = milliseconds % 1000;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms, 3)}`;
}

function pad(number, length = 2) {
    return String(number).padStart(length, "0");
}
