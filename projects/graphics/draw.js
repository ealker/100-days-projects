var PIXEL_WIDTH  = 640
var PIXEL_HEIGHT = 480

var WIN_WIDTH  = window.innerWidth
var WIN_HEIGHT = window.innerHeight

var ratio_width  = WIN_WIDTH / PIXEL_WIDTH
var ratio_height = WIN_HEIGHT / PIXEL_HEIGHT
var pixel_size = Math.floor(Math.min(ratio_width, ratio_height))

var canvas = document.getElementById("canvas")
canvas.width = PIXEL_WIDTH * pixel_size
canvas.height = PIXEL_HEIGHT * pixel_size

var ctx = canvas.getContext("2d")

function setPixel(ctx, x, y) {
  if (x > 0 && x < PIXEL_WIDTH && y > 0 && y < PIXEL_HEIGHT)
    ctx.fillRect(x*pixel_size, y*pixel_size, pixel_size, pixel_size)
}

var screen_dist = 400

function drawPoint3d(ctx, p) {
  var x = Math.round(p.x * (screen_dist / p.z))
  var y = Math.round(p.y * (screen_dist / p.z))
  setPixel(ctx, x + PIXEL_WIDTH/2, y + PIXEL_HEIGHT/2)
}

var cube = [
  { x: 50,  y: 50,  z: 250},
  { x: 50,  y: 50,  z: 150},
  { x: 50,  y: -50, z: 250},
  { x: -50, y: 50,  z: 250},
  { x: 50,  y: -50, z: 150},
  { x: -50, y: 50,  z: 150},
  { x: -50, y: -50, z: 250}, 
  { x: -50, y: -50, z: 150}
]

var edges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [1, 5],
  [2, 4],
  [2, 6],
  [3, 5],
  [3, 6],
  [4, 7],
  [5, 7],
  [6, 7],
]

var keyState = {
  up: false,
  down: false,
  left: false,
  right: false,
  z: false,
  x: false
}

document.addEventListener('keydown', (e) => {
  var keyName = e.key 
  if (keyName == "ArrowUp")    keyState.up = true
  if (keyName == "ArrowDown")  keyState.down = true
  if (keyName == "ArrowLeft")  keyState.left = true
  if (keyName == "ArrowRight")  keyState.right = true
  if (keyName == "z") keyState.z = true
  if (keyName == "x") keyState.x = true
});

document.addEventListener('keyup', function(e) {
  var keyName = e.key || e["keyIdentifier"] 
  if (keyName == "ArrowUp"    || keyName == "Up")    keyState.up = false
  if (keyName == "ArrowDown"  || keyName == "Down")  keyState.down = false
  if (keyName == "ArrowLeft"  || keyName == "Left")  keyState.left = false
  if (keyName == "ArrowRight" || keyName == "Right") keyState.right = false
  if (keyName == "z") keyState.z = false
  if (keyName == "x") keyState.x = false
})

var transform = {x: 0, y: 0, z: 0}

function drawLine(ctx, x1, y1, x2, y2) {
  // ensure line from left to right
  if (x2 < x1) {
    var xt = x1
    var yt = y1
    x1 = x2
    y1 = y2
    x2 = xt
    y2 = yt
  }

  var x = x1
  var y = y1
  var s = (x2 - x1) / (y2 - y1)
  if ((s > 0 && s <= 1) || (s == 0 && y2 > y1)) {
    while (y <= y2) {
      setPixel(ctx, Math.round(x), y)
      y++
      x += s
    }
  } else if ((s < 0 && s >= -1) || (s == 0 && y2 < y1)) {
    while (y >= y2) {
      setPixel(ctx, Math.round(x), y)
      y--
      x -= s
    }
  } else if (s < -1) {
    while (x <= x2) {
      setPixel(ctx, x, Math.round(y))
      x++
      y += 1/s
    }
  } else if (s > 1) {
    while (x <= x2) {
      setPixel(ctx, x, Math.round(y))
      x++
      y += 1/s
    }
  }
}

function drawLine3d(ctx, p1, p2) {
  var x1 = Math.round(p1.x * (screen_dist / p1.z))
  var y1 = Math.round(p1.y * (screen_dist / p1.z))
  var x2 = Math.round(p2.x * (screen_dist / p2.z))
  var y2 = Math.round(p2.y * (screen_dist / p2.z))
  drawLine(ctx, x1 + PIXEL_WIDTH/2, y1 + PIXEL_HEIGHT/2, x2 + PIXEL_WIDTH/2, y2 + PIXEL_HEIGHT/2)
}


function drawFrame() {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, PIXEL_WIDTH*pixel_size, PIXEL_HEIGHT*pixel_size)


  // draw edges
  for (var j = 0; j < edges.length; j++) {
    var p1 = cube[edges[j][0]]
    var p2 = cube[edges[j][1]]
    var newP1 = {x: p1.x + transform.x, y: p1.y + transform.y, z: p1.z + transform.z}
    var newP2 = {x: p2.x + transform.x, y: p2.y + transform.y, z: p2.z + transform.z}
    ctx.fillStyle = "red"
    drawLine3d(ctx, newP1, newP2)
  }

  // update cube location
  if (keyState.left)  { transform.x -= 5 }
  if (keyState.right) { transform.x += 5 }
  if (keyState.up)    { transform.y -= 5 }
  if (keyState.down)  { transform.y += 5 }
  if (keyState.z) { transform.z -= 5 }
  if (keyState.x) { transform.z += 5 }

  window.requestAnimationFrame(drawFrame)
}

window.requestAnimationFrame(drawFrame)



// function drawRainbow() {
//     ctx.fillStyle = "yellow"
//     drawLine(ctx, 10, 60, 10, 100)
//     drawLine(ctx, 10, 60, 20, 100)
//     drawLine(ctx, 10, 60, 30, 100)
//     drawLine(ctx, 10, 60, 40, 100)
//     drawLine(ctx, 10, 60, 50, 100)

//     ctx.fillStyle = "red"
//     drawLine(ctx, 10, 60, 10, 20)
//     drawLine(ctx, 10, 60, 20, 20)
//     drawLine(ctx, 10, 60, 30, 20)
//     drawLine(ctx, 10, 60, 40, 20)
//     drawLine(ctx, 10, 60, 50, 20)

//     ctx.fillStyle = "green"
//     drawLine(ctx, 10, 60, 50, 30)
//     drawLine(ctx, 10, 60, 50, 40)
//     drawLine(ctx, 10, 60, 50, 50)
//     drawLine(ctx, 10, 60, 50, 60)

//     ctx.fillStyle = "purple"
//     drawLine(ctx, 10, 60, 50, 70)
//     drawLine(ctx, 10, 60, 50, 80)
//     drawLine(ctx, 10, 60, 50, 90)
// }