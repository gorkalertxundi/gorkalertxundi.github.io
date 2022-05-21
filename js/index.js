const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1;

let playeridle = new Image()
playeridle.src = "../assets/Main Characters/Mask Dude/idle32x32.png"

let playerrun = new Image()
playerrun.src = "../assets/Main Characters/Mask Dude/run32x32.png"

let playerjump = new Image()
playerjump.src = "../assets/Main Characters/Mask Dude/run32x32.png"

let terrain44 = new Image()
terrain44.src = "../assets/Terrain/TerrainPink46x48.png"

let spike16 = new Image()
spike16.src = "../assets/Traps/Spikes/spike16x16.png"

let start = new Image()
start.src = "../assets/Items/Checkpoints/Start/start_idle64x64.png"

let reinforcebox = new Image()
reinforcebox.src = "../assets/Items/Boxes/Box3/idle.png"

let box = new Image()
box.src = "../assets/Items/Boxes/Box1/idle.png"

let controls = new Image()
controls.src = "../assets/portfolio/intro/controls.png"

class Player {
    constructor(x, y, width, height) {
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
        this.frames = 1
        this.score = 0
        this.sprites = {
            idle: {
                sprite: playeridle,
                frames: 10
            },
            run: {
                sprite: playerrun,
                frames: 11
            },
            jump: {
                sprite: playerjump,
                frames: 0
            },
        }
        this.currentSprite = this.sprites.idle
    }

    draw() {
        c.drawImage(this.currentSprite.sprite, 
            32 * this.frames, 
            0,
            32,
            32,
            this.position.x, 
            this.position.y, 
            this.height, 
            this.width)
    }

    update() {
        this.frames++
        if (this.frames > this.currentSprite.frames) this.frames = 1
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
    }
}

class Platform {
    constructor(x, y, width, height, texture, isKillable) {
        this.position = {
            x: x,
            y: y
        }
        this.width = width
        this.height = height
        this.texture = texture
        this.isKillable = isKillable
    }

    draw() {
        c.drawImage(this.texture, this.position.x, this.position.y, this.height, this.width)
    }
}

class CanvasText {
    constructor(x, y, text, color, font) {
        this.x = x
        this.y = y
        this.text = text
        this.color = color
        this.font = font
    }

    draw() {
        c.fillStyle = this.color
        c.font = this.font
        c.fillText(this.text, this.x, this.y)
    }
}

let player = null
let x_player_vel = null
let platforms = null
let boxes = null
let elements = null
let texts = null
let scrollOffset = null

const keys = {
    right: {
        isDown: false,
    },
    left: {
        isDown: false,
    }
}

init()

function init() {
    player = new Player(100, 10, 52, 52)
    x_player_vel = 5

    const platformsize = 60
    const spikesize = {
        height: 16,
        width: 32
    }

    platforms = [ 
                    new Platform(0, canvas.height-platformsize, platformsize, platformsize, terrain44, false), 
                    new Platform(60, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(120, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(180, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(240, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(300, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(360, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(420, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(480, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(540, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(600, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(660, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(720, canvas.height-spikesize.height, spikesize.height, spikesize.width, spike16, true),
                    new Platform(752, canvas.height-spikesize.height, spikesize.height, spikesize.width, spike16, true),
                    new Platform(784, canvas.height-spikesize.height, spikesize.height, spikesize.width, spike16, true),
                    new Platform(816, canvas.height-spikesize.height, spikesize.height, spikesize.width, spike16, true),
                    new Platform(848, canvas.height-spikesize.height, spikesize.height, spikesize.width, spike16, true),
                    new Platform(880, canvas.height-spikesize.height, spikesize.height, spikesize.width, spike16, true),
                    new Platform(912, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(972, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1032, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1092, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1152, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1212, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1272, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1332, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1392, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1452, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                    new Platform(1512, canvas.height-platformsize, platformsize, platformsize, terrain44, false),
                ]

    const boxsize = {
        width: 30,
        height: 30
    }
    boxes = [ new Platform(450, canvas.height-platformsize-160, boxsize.height, boxsize.width, reinforcebox),
        new Platform(480, canvas.height-platformsize-160, boxsize.height, boxsize.width, reinforcebox),
        new Platform(510, canvas.height-platformsize-160, boxsize.height, boxsize.width, reinforcebox),
        new Platform(540, canvas.height-platformsize-160, boxsize.height, boxsize.width, reinforcebox),
        new Platform(570, canvas.height-platformsize-160, boxsize.height, boxsize.width, reinforcebox),
    ]

    elements = [ new Platform(70, canvas.height-platformsize-80, 80, 80, start),
        new Platform(70, canvas.height-platformsize-300, 90, 325, controls),
        ]
    
    texts = [new CanvasText(70, canvas.height-platformsize-400, "Use the following controls to move around my portfolio", "white", "25px Arial")]

    keys.right.isDown = false
    keys.left.isDown = false

    scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate) // executes a code snippet at a specified time in the future.
    c.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    
    boxes.forEach(box => {
        box.draw()
    })
    elements.forEach(element => {
        element.draw()
    })
    texts.forEach(text => {
        text.draw()
    })
    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()
    
    let allElements = platforms.concat(boxes)
    
    // collision detection
    allElements.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y // Y axis collision
            && player.position.x + player.width >= platform.position.x // X left axis collision
            && player.position.x <= platform.position.x + platform.width) { // X right axis collision
            player.velocity.y = 0
            if (platform.isKillable) {
                init()
            }
        }
    })

    allElements = allElements.concat(elements)
    // player movement
    if(keys.right.isDown && player.position.x < 400) { // a partir de 400px el personaje se para y las palataformas a la izquierda a la misma velocidad
        player.velocity.x = x_player_vel
    } else if ((keys.left.isDown && player.position.x > 100)
                || keys.left.isDown && scrollOffset === 0 && player.position.x > 0) { // a partir de 400px el personaje se para y las plataformas a la derecha
        player.velocity.x = -x_player_vel
    } else {
        player.velocity.x = 0
        
        if(keys.right.isDown) {
            scrollOffset += x_player_vel
            allElements.forEach(platform => {
                platform.position.x -= x_player_vel
            })
            texts.forEach(text => {
                text.x -= x_player_vel
            })
        } else if (keys.left.isDown && scrollOffset > 0) {
            scrollOffset -= x_player_vel
            allElements.forEach(platform => {
                platform.position.x += x_player_vel
            })
            texts.forEach(text => {
                text.x += x_player_vel
            })
        }
    }

    

    // finish line detection
    if (scrollOffset > 2000) {
        // alert('You win!')
        console.log('You win!')
    }

    // lose condition
    if(player.position.y >= canvas.height) {
        init()
    }
}

animate()

addEventListener('keydown', (event) => {
    switch(event.keyCode) {
        case 65: // A
            keys.left.isDown = true
            player.currentSprite = player.sprites.run
            break
        case 68: // D
            keys.right.isDown = true
            player.currentSprite = player.sprites.run
            break
        case 87: // W
        case 32: // Space
            player.velocity.y -= 20
            player.currentSprite = player.sprites.jump
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
            player.currentSprite = player.sprites.idle
            break
        case 68: // D
            keys.right.isDown = false
            player.currentSprite = player.sprites.idle
            break
        case 87: // W
        case 32:
            player.currentSprite = player.sprites.idle
            // player.velocity.y -= 5
            break
        case 83: // S
            // player.velocity.y += 10
            break
    }
})
