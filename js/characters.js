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
            case 'e':
                fireball.velocity.x = 2
                fireball.position.x = player.position.x
                fireball.position.y = player.position.y + player.width
                fireball.end = false
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