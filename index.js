var going = false
var score = 0
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
class Background {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.width = canvas.width
        this.height = canvas.height
    }
    draw() {
        c.fillStyle = 'deepskyblue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Player {
    constructor() {
      this.position = {
          x: 100,
          y: 100
      }
      this.velocity = {
          x: 0,
          y: 0
      }
      this.size = canvas.width / 20
      this.width = this.size
      this.height = this.size
    }
    draw() {
        c.fillStyle = 'yellow'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Obstacle{
    constructor(){
        this.position ={
            x: canvas.width,
            y: 0
        }
        this.width = canvas.width / 10
        this.height = canvas.height
    }
    draw(){
        c.fillStyle = 'chartreuse'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Hole{
    constructor(){
        this.position ={
            x: canvas.width,
            y: canvas.width
        }
        this.width = canvas.width / 10 + 5
        this.height = 175
    }
    draw(){
        c.fillStyle = 'deepskyblue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Start {
    constructor() {
        this.text = 'Click anywhere to play'
    }
    draw(){
        c.font = "30px Serif"
        c.fillStyle = 'black'
        c.fillText(this.text, (canvas.width / 2) - 150,  canvas.height - 150)
    }
}
class Title {
    constructor() {
        this.text = 'Jumpy Block'
        this.x = canvas.width / 2 - 90
    }
    draw(){
        c.font = "90 Serif"
        c.fillStyle = 'black'
        c.fillText(this.text, this.x, 150)
    }
}
class Score{
    draw(){
        c.font = '100px serif';
        c.fillStyle = ('black')
        c.fillText(score, 20, 100);
    }
}
const player = new Player()
const obstacles = []
const holes = []
const background = new Background()
const title = new Title()
const start = new Start()
const theScore = new Score()

const keys = {
    space: {
        pressed: false
    }
}
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    if (going){
        obstacles.forEach(obstacle => {
            obstacle.position.x--
            if (obstacle.position.x + obstacle.width <= 0){
                obstacles.shift()
            }
        obstacle.draw()
        })
        holes.forEach(hole => {
            hole.position.x--
            hole.draw()
            while (hole.position.y + hole.height > canvas.height){
                hole.position.y = Math.floor(Math.random() * canvas.height)
            if (hole.position.x + hole.width <= 0){
             holes.shift()
            }
        }
        })
        player.velocity.y -= .1
        player.position.y -= player.velocity.y
        if (player.position.y + player.height >= canvas.height){
            player.position.y = canvas.height - player.height
            player.velocity.y = 0
        }else if (player.position.y <= 0){
            player.position.y = 0
            player.velocity.y = 0
        }
        if (keys.space.pressed){
            player.velocity.y = 3
        }
        player.draw()
        theScore.draw()
    }else{
        title.draw()
        start.draw()
    }
    for (i in obstacles) {
            if (player.position.x + player.width > obstacles[i].position.x && player.position.x < obstacles[i].position.x + obstacles[i].width && !(player.position.y + player.height > holes[i].position.y && player.position.y < holes[i].position.y + holes[i].height)){
                window.location.reload()
            }
    }
}
animate()
setInterval(function(){
    obstacles.push(new Obstacle())
    holes.push(new Hole())
}, 2300)
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 32:
        //space
            keys.space.pressed = true
            break;
    }
})
addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 32:
        //space
            keys.space.pressed = false
            break;
    }
})
addEventListener('mousedown', () => {
    keys.space.pressed = true
    going = true
})
addEventListener('mouseup', () => {
    keys.space.pressed = false
})
setInterval(function(){
    score++
}, 100)