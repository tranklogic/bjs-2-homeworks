class AlarmClock  {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы')
    }
    if (this.getClocksByTime(time).length) {
      console.warn('Уже присутствует звонок на это же время');
    }
    this.alarmCollection.push({callback, time, canCall: true})
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(i=>i.time !== time)
  }

  runClock(clock) {
  if (clock.canCall) {
    clock.canCall = false;
    clock.callback()
  }
  }

  getClocksByTime(time) {
    return this.alarmCollection.filter(i=>i.time === time)
  }

  getCurrentFormattedTime() {
    return AlarmClock.getFormattedTime(new Date())
  }

  start() {
    if (this.intervalId) {
      return
    }
    this.intervalId = setInterval(()=>{
      this.getClocksByTime(this.getCurrentFormattedTime())
      .forEach(this.runClock)
    }, 1000)
  }

  stop() {
    clearInterval (this.intervalId);
    this.intervalId = null;
  }

  resetAllCalls () {
    this.alarmCollection.forEach(c=>c.canCall = true)
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }

  static getFormattedTime(date) {
    return [date.getHours(), date.getMinutes()]
    .map(i=>(i<10 ? '0' + i : i))
    .join(':')
  }

}
function testcase() {
  const alarm = new AlarmClock();
  alarm.addClock(AlarmClock.getFormattedTime(new Date()), ()=>{
    alert('Wake up!');
    alarm.stop();
  })
  alarm.start()
}
//testcase()