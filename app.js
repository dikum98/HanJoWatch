const select = (selector) => document.querySelector(selector);
const timeElement = select('time');
const controls = select('.controls');
const HanjoWatch = (function () {
  const INITIALTIME = '00:00:00.0';
  const setDigit = (item) => (item + '').padStart(2, '0');
  const parseTime = (timeCount) => {
    let milliSeconds = timeCount % 10;
    let seconds = parseInt(timeCount / 10);
    seconds = setDigit(seconds > 59 ? seconds % 60 : seconds);
    let minutes = timeCount > 599 ? parseInt(timeCount / 600) : 0;
    minutes = setDigit(minutes);
    return `00:${minutes}:${seconds}:${milliSeconds}`;
  };
  function HanjoWatch() {
    this.timerId = null;
    this.timeCount = 0;
  }
  HanjoWatch.prototype.intervalHandler = function (timeElement) {
    this.timeCount += 1;
    timeElement.innerHTML = parseTime(this.timeCount);
  };
  HanjoWatch.prototype.runTimer = function (timeElement) {
    this.timerId = setInterval(() => this.intervalHandler(timeElement), 100);
  };
  HanjoWatch.prototype.pauseTimer = function () {
    clearInterval(this.timerId);
  };
  HanjoWatch.prototype.resumeTimer = function (timeElement) {
    this.timerId = setInterval(() => this.intervalHandler(timeElement), 100);
  };
  HanjoWatch.prototype.resetTimer = function (timeElement) {
    clearInterval(this.timerId);
    this.timeCount = 0;
    timeElement.innerHTML = INITIALTIME;
  };
  return HanjoWatch;
})();

const newHanjo = new HanjoWatch();

controls.addEventListener('click', ({ target }) => {
  if (target.tagName !== 'BUTTON') {
    return;
  }
  switch (target.innerText) {
    case 'START':
      newHanjo.runTimer(timeElement);
      break;
    case 'STOP':
      newHanjo.pauseTimer(timeElement);
      break;
    case 'RESUME':
      newHanjo.resumeTimer(timeElement);
      break;
    case 'LAP':
      newHanjo.runTimer(timeElement);
      break;
    case 'RESET':
      newHanjo.resetTimer(timeElement);
      break;
    default:
      break;
  }
});
