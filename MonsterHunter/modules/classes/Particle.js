class Particle {
    constructor({position, speed, radius, color, fades}) {
        this.position = position;
        this.speed = speed;

        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades;
    }

    renderParticle() {
        context.save();
        context.globalAlpha = this.opacity;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    }

    update() {
        this.renderParticle();
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.fades) {
            this.opacity -= 0.01;
        }
    }
}