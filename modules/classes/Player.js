class Player {
    constructor() {
        this.speed = {
            x: 0,
            y: 0
        }

        this.rotation = 0;
        this.opacity = 1;

        const image = new Image();
        image.src = './images/bow-and-arrow.png';

        image.onload = () => {
            const scale = 0.20;

            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 40
            }
        }
    }

    renderPlayer() {
        // Draw the player on the canvas
        context.save();
        context.globalAlpha = this.opacity;
        context.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);
        context.rotate(this.rotation);
        context.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2);
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        context.restore();
    }

    update() {
        if (this.image) {
            this.renderPlayer();
            this.position.x += this.speed.x;
        }
    }
}
