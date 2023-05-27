class Arrow {
    constructor({position, speed, color}) {
        this.position = position;
        this.speed = speed;

        this.radius = 4;
        this.color = color;
    }

    renderArrow() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update() {
        this.renderArrow();
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}