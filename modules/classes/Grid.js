class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.speed = {
            x: 3,
            y: 0
        }

        this.monsters = [];

        const columns = Math.floor(Math.random() * 10 + 5);
        const rows = Math.floor(Math.random() * 5 + 2);

        this.width = columns * 95;

        for (let i = 0; i < columns; ++i) {
            for (let j = 0; j < rows; ++j) {
                this.monsters.push(new Monster({
                    position: {
                        x: i * 95,
                        y: j * 95
                    }
                }));
            }
        }
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        this.speed.y = 0;

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.speed.x = -this.speed.x * 1.15;
            this.speed.y = 30;
        }
    }
}