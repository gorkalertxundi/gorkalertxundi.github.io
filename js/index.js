const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5;
let img = new Image()
img.src = "../assets/Main Characters/Virtual Guy/jump32x32.png"

class Player {
    constructor(x, y, width, height, color) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = width
        this.height = height
        this.color = color
        this.score = 0
    }

    draw() {
        // c.fillStyle = this.color
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(img, this.position.x, this.position.y, this.height, this.width)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor(x, y, width, height, color) {
        this.position = {
            x: x,
            y: y
        }
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player(100, 10, 32, 32, 'red')
const x_player_vel = 5
const platforms = [new Platform(400, 350, 100, 10, 'green'), 
                    new Platform(100, 450, 100, 10, 'green')]

const keys = {
    right: {
        isDown: false,
    },
    left: {
        isDown: false,
    }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate) // executes a code snippet at a specified time in the future.
    c.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    // player movement
    if(keys.right.isDown && player.position.x < 400) { // a partir de 400px el personaje se para y las palataformas a la izquierda a la misma velocidad
        player.velocity.x = x_player_vel
    } else if (keys.left.isDown && player.position.x > 100) { // a partir de 400px el personaje se para y las plataformas a la derecha
        player.velocity.x = -x_player_vel
    } else {
        player.velocity.x = 0

        if(keys.right.isDown) {
            scrollOffset += x_player_vel
            platforms.forEach(platform => {
                platform.position.x -= x_player_vel
            })
        } else if (keys.left.isDown) {
            scrollOffset -= x_player_vel
            platforms.forEach(platform => {
                platform.position.x += x_player_vel
            })
        }
    }

    // collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y // Y axis collision
            && player.position.x + player.width >= platform.position.x // X left axis collision
            && player.position.x <= platform.position.x + platform.width) { // X right axis collision
            player.velocity.y = 0
        }
    })

    // finish line detection
    if (scrollOffset > 2000) {
        // alert('You win!')
        console.log('You win!')
    }
}

animate()

addEventListener('keydown', (event) => {
    switch(event.keyCode) {
        case 65: // A
            keys.left.isDown = true
            break
        case 68: // D
            keys.right.isDown = true
            break
        case 87: // W
            player.velocity.y -= 20
            break
        case 83: // S
            // player.velocity.y += 10
            break
    }
})

addEventListener('keyup', (event) => {
    switch(event.keyCode) {
        case 65: // A
            keys.left.isDown = false
            break
        case 68: // D
            keys.right.isDown = false
            break
        case 87: // W
            // player.velocity.y -= 5
            break
        case 83: // S
            // player.velocity.y += 10
            break
    }
})