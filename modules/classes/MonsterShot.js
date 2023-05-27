class MonsterShot {
    constructor({position, speed}) {
        this.position = position
        this.speed = speed

        this.width = 3
        this.height = 10
    }

    renderShot() {
        context.fillStyle = 'white'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.renderShot()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}