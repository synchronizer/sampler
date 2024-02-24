export default class Clock {

  constructor(audioContext) {
    this.bpm = 120;
    this.run = false;
    this.iteration = 0;
    this.audioContext = audioContext;
  }

  do() {

    this.action(this.iteration, this.audioContext.currentTime)

    const osc = this.audioContext.createOscillator(),
          gainNode = this.audioContext.createGain();

    gainNode.gain.value = 0

    osc.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    osc.start(this.audioContext.currentTime)
    osc.stop(this.audioContext.currentTime + 60 / (this.bpm * 4))

    osc.onended = e => {

      gainNode.disconnect()
      this.iteration += 1

      if (this.run) {
        this.do()
      }
    }

  }

  start() {
    this.run = true
    this.iteration = 0
    this.do()
  }

  stop() {
    this.run = false
  }
  bpm(value) {
    this.bpm = value
  }
  action() {

  }


}
