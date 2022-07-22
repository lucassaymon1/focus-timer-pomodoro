import Controls from "./controls.js"
import Timer from "./timer.js"
import Sound from "./sounds.js"

import {
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonSoundOn,
  buttonSoundOff,
  buttonStop,
  minutesDisplay,
  secondsDisplay
} from "./elements.js"

//pegar o valor do hue; selecionar o huesec e aplicar a cor do hue - o valor;

let minutes = Number(minutesDisplay.textContent)

const controls = Controls({
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop
})

const timer = Timer({
  minutesDisplay, 
  secondsDisplay,
  resetControls: controls.reset,
  minutes
})

const sound = Sound()

buttonPlay.addEventListener('click', function() {
  controls.play()
  timer.countdown()
  sound.pressButton()
  //sound recebe a função Sound()
})

buttonPause.addEventListener('click', function() {
  controls.pause()
  timer.hold()
  sound.pressButton()
})

buttonStop.addEventListener('click', function() {
  controls.reset()
  timer.reset()
  sound.pressButton()
})

buttonSoundOff.addEventListener('click', function() {
  buttonSoundOn.classList.remove('hide')
  buttonSoundOff.classList.add('hide')
  sound.bgAudio.play()
})

buttonSoundOn.addEventListener('click', function() {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  sound.bgAudio.pause()
})

buttonSet.addEventListener('click', function() {
  let newMinutes = controls.getMinutes()

  if (!newMinutes) {
    timer.reset()
    return
  }

  minutes = newMinutes
  timer.updateDisplay(minutes, 0)
  timer.updateMinutes(minutes)
})