const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

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

    if(!fireball.end) {
        fireball.update()
        if(skillCollision({skill: fireball, target: enemy})) {
            fireball.end = true
            enemy.takeHit()
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })
        }
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