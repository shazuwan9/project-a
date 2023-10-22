const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSRC: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSRC: './img/shop.png',
    scale: 2.75,
    frameMax: 6
})

const gravity = 0.7

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSRC: './img/samuraiMack/Idle.png',
    scale: 2.5,
    frameMax: 8,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSRC: './img/samuraiMack/Idle.png',
            frameMax: 8
        },
        run: {
            imageSRC: './img/samuraiMack/Run.png',
            frameMax: 8,
        },
        jump: {
            imageSRC: './img/samuraiMack/Jump.png',
            frameMax: 2,
        },
        fall: {
            imageSRC: './img/samuraiMack/Fall.png',
            frameMax: 2,
        },
        attack1: {
            imageSRC: './img/samuraiMack/Attack1.png',
            frameMax: 6,
        },
        takeHit: {
            imageSRC: './img/samuraiMack/Take Hit - white silhouette.png',
            frameMax: 4,
        },
        death: {
            imageSRC: './img/samuraiMack/Death.png',
            frameMax: 6,
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    imageSRC: './img/kenji/Idle.png',
    scale: 2.5,
    frameMax: 4,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSRC: './img/kenji/Idle.png',
            frameMax: 4
        },
        run: {
            imageSRC: './img/kenji/Run.png',
            frameMax: 8,
        },
        jump: {
            imageSRC: './img/kenji/Jump.png',
            frameMax: 2,
        },
        fall: {
            imageSRC: './img/kenji/Fall.png',
            frameMax: 2,
        },
        attack1: {
            imageSRC: './img/kenji/Attack1.png',
            frameMax: 4,
        },
        takeHit: {
            imageSRC: './img/kenji/Take Hit.png',
            frameMax: 3,
        },
        death: {
            imageSRC: './img/kenji/Death.png',
            frameMax: 7,
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
})

const keys = {
    //Player
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    //Enemy
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //Player Movement
    player.velocity.x = 0
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }

    if(player.velocity.y < 0) {
        player.switchSprite('jump')
    }
    else if(player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //Enemy Movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    }
    else if(enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //Detect for collison (Attack Box)
    //Player
    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking && player.frameCurrent === 4) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }
    if(player.isAttacking && player.frameCurrent === 4) {
        player.isAttacking = false
    }
    
    //Enemy
    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking && enemy.frameCurrent === 2) {
        player.takeHit()
        enemy.isAttacking = false;
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }
    if(enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false
    }

    //End Game if Health reach 0
    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerID})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if(!player.dead) {
        switch (event.key) {
            //Player
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'w':
                player.velocity.y = -20
                break
            case ' ':
                player.attack()
                break
        }
    }
    if(!enemy.dead) {
        switch (event.key) {
            //Enemy
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowUp':
                enemy.velocity.y = -20
                break
            case 'ArrowDown':
                enemy.attack()
                break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //Player
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

        //Enemy
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
})