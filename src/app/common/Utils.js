export function debounce(fn, wait = 300) {
  let timeout
  return (abort, ...args) => {
    function later() {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    if (abort) return
    timeout = setTimeout(later, wait)
  }
}

export function makeItRain() {
  //clear out everything
  makeItClear()

  let increment = 0
  let drops = ""
  let backDrops = ""

  while (increment < 33) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
    //random number between 5 and 2
    let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))
    //increment
    increment += randoFiver
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment*3 + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>'
    backDrops += '<div class="drop" style="right: ' + increment*3 + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>'
  }

  document.getElementsByClassName('front-row')[0].innerHTML = drops
  document.getElementsByClassName('back-row')[0].innerHTML = backDrops
}

export function makeItSnow() {
  //clear out everything
  makeItClear()

  let increment = 0
  let snowflakes = ""

  while (increment < 50) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
    //random number between 5 and 2
    let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))
    //increment
    increment += randoFiver
    if (randoHundo % 2) {
      snowflakes += '<div class="snowflake"></div>'
    } else {
      snowflakes += '<div class="snowflake snowflake snowflake--big"></div>'
    }
    document.getElementsByClassName('snowflakes')[0].innerHTML = snowflakes
  }
}

export function makeItClear() {
  //clear out everything
  let el = document.getElementById('front-row')
  while (el.firstChild) el.removeChild(el.firstChild)
  el = document.getElementById('back-row')
  while (el.firstChild) el.removeChild(el.firstChild)
  el = document.getElementsByClassName('snowflakes')[0]
  while (el.firstChild) el.removeChild(el.firstChild)
}

export function makeItStarry(canvasId) {
  let canvas = document.getElementById(canvasId),
  context = canvas.getContext("2d"),
  stars = 200

  for (var i = 0; i < stars; i++) {
    let x = Math.random() * canvas.offsetWidth
    let y = Math.random() * canvas.offsetHeight
    context.fillStyle = "white"
    context.fillRect(x,y,1,1)
  }
}

export function capitalizeText(s) {
  return s.length ? s[0].toUpperCase() + s.substr(1) : s
}