class Monster {
    constructor({position}) {
        this.speed = {
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src = './images/monster.png';

        image.onload = () => {
            const scale = 0.13;

            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;

            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    renderMonster() {
        // Draw the player on the canvas
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update({speed}) {
        if (this.image) {
            this.renderMonster();
            this.position.x += speed.x;
            this.position.y += speed.y;
        }
    }

    shoot(monsterShots) {
        audio.monsterShoot.play();
        monsterShots.push(
            new MonsterShot({
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height
                },
                speed: {
                    x: 0,
                    y: 5
                }
            })
        )
    }
}
