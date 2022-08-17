const select = (selector) => document.querySelector(selector);
const timeElement = select('time');
const controls = select('.controls');

function HanjoWatch() {
  this.timerId = null;
  this.timeCount = 0;
  this.constructor.INITIALTIME = '00:00:00.0';
  this.constructor.setDigit = (item) => (item + '').padStart(2, '0');
  this.constructor.parseTime = (timeCount) => {
    let milliSeconds = this.timeCount % 10;
    let seconds = parseInt(this.timeCount / 10);
    seconds = this.constructor.setDigit(seconds > 59 ? seconds % 60 : seconds);
    let minutes = this.timeCount > 599 ? parseInt(this.timeCount / 600) : 0;
    minutes = this.constructor.setDigit(minutes);
    return `00:${minutes}:${seconds}:${milliSeconds}`;
  };
}
HanjoWatch.prototype.intervalHandler = function (timeElement) {
  this.timeCount += 1;
  timeElement.innerHTML = this.constructor.parseTime(this.timeCount);
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
  timeElement.innerHTML = this.constructor.INITIALTIME;
};

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
