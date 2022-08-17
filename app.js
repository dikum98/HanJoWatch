// start 클릭 : setInterval 100ms 간격으로 시작
// stop 클릭 : clearInterval

const select = (selector) => document.querySelector(selector);
const INITIALTIME = '00:00:00.0';
const timeElement = select('time');
const startButton = select('.button-start');
const stopButton = select('.button-stop');
const resumeButton = select('.button-resume');
const resetButton = select('.button-reset');

function HanjoWatch() {
  this.timerId = null;
  this.timeCount = 0;

  const setDigit = (item) => {
    return (item + '').padStart(2, '0');
  };

  const parseTime = (timeCount) => {
    let milliSeconds = timeCount % 10;
    let seconds = parseInt(timeCount / 10);
    seconds = setDigit(seconds > 59 ? seconds % 60 : seconds);
    let minutes = timeCount > 599 ? parseInt(timeCount / 600) : 0;
    minutes = setDigit(minutes);
    return `00:${minutes}:${seconds}:${milliSeconds}`;
  };

  this.intervalHandler = (timeElement) => () => {
    this.timeCount += 1;
    timeElement.innerHTML = parseTime(this.timeCount);
  };

  this.runTimer = () => {
    this.timerId = setInterval(this.intervalHandler(timeElement), 100);
  };

  this.pauseTimer = () => {
    clearInterval(this.timerId);
  };

  this.resumeTimer = () => {
    this.timerId = setInterval(this.intervalHandler(timeElement, this.timeCount), 100);
  };

  this.resetTimer = () => {
    clearInterval(this.timerId);
    this.timeCount = 0;
    timeElement.innerHTML = INITIALTIME;
  };
}

const hanjoWatch = new HanjoWatch();

startButton.addEventListener('click', hanjoWatch.runTimer);
stopButton.addEventListener('click', hanjoWatch.pauseTimer);
resumeButton.addEventListener('click', hanjoWatch.resumeTimer);
resetButton.addEventListener('click', hanjoWatch.resetTimer);
