const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const scoreEl = document.querySelector('#scoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player();
const arrows = [];
const grids = [];
const monsterShots = [];
const particles = [];

// Define key states for player input
const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    space: {
        pressed: false
    }
};

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500); // Random interval for spawning grids
let score = 0;
let game = {
    over: false,
    active: true
};

function animate() {
    if (!game.active) {
        return;
    }

    requestAnimationFrame(animate);
    drawBackground();
    updatePlayer();
    updateArrows();
    updateGrids();
    updateMonsterShots();
    updateParticles();
    handlePlayerInput();
    spawnGrids();
    incrementFrames();
}

// Draw the background
function drawBackground() {
    context.fillStyle = '#463f3a';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Update and render player
function updatePlayer() {
    player.update();
}

// Update and render arrows
function updateArrows() {
    arrows.forEach((arrow, index) => {
        // Check if the arrow has moved off the top of the canvas
        if (arrow.position.y + arrow.radius <= 0) {
        // If the arrow is off the canvas, remove it from the arrows array
            setTimeout(() => {
                // If the arrow is still on the canvas, update its position and render it
                arrows.splice(index, 1);
            }, 0);
        } else {
            arrow.update();
        }
    });
}

// Update and render grids
function updateGrids() {
    grids.forEach((grid, gridIndex) => {
        grid.update();

        // Check if it's time to shoot for the monsters in the grid
        if (frames % 100 === 0 && grid.monsters.length > 0) {
            grid.monsters[Math.floor(Math.random() * grid.monsters.length)].shoot(monsterShots);
        }

        // Update each monster in the grid
        grid.monsters.forEach((monster, i) => {
            // Update the monster's position based on the grid's speed
            monster.update({ speed: grid.speed });

            // Check for collisions between arrows and the monster
            arrows.forEach((arrow, j) => {
                if (checkArrowMonsterCollision(arrow, monster)) {
                    setTimeout(() => {
                        handleArrowMonsterCollision(grid, monster, arrow, gridIndex);
                    }, 0);
                }
            });
        });
    });
}

// Update and render monster shots
function updateMonsterShots() {
    monsterShots.forEach((monsterShot, i) => {
        // Check if the monster shot has reached the bottom of the canvas
        if (monsterShot.position.y + monsterShot.height >= canvas.height) {
            // If the monster shot has reached the bottom, remove it from the monsterShots array
            setTimeout(() => {
                monsterShots.splice(i, 1);
            }, 0);
        } else {
            // If the monster shot hasn't reached the bottom, update its position
            monsterShot.update();
        }

        // Check for collision between the monster shot and the player
        if (checkMonsterShotPlayerCollision(monsterShot, player)) {
            setTimeout(() => {
                handleMonsterShotPlayerCollision(monsterShot);
            }, 0);
        }
    });
}

// Update and render particles
function updateParticles() {
    particles.forEach((particle, i) => {
        // Check if the particle's opacity has reached or fallen below 0
        if (particle.opacity <= 0) {
            // If the particle's opacity is 0 or less, remove it from the particles array
            setTimeout(() => {
                particles.splice(i, 1);
            }, 0);
        } else {
            // If the particle's opacity is still above 0, update
            particle.update();
        }
    });
}

// Handle player input
function handlePlayerInput() {
    if (keys.a.pressed && player.position.x >= 0) {
        player.speed.x = -5;
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.speed.x = 5;
        player.rotation = 0.15;
    } else {
        player.speed.x = 0;
        player.rotation = 0;
    }
}

// Spawn new grids
function spawnGrids() {
    // Check if the number of frames passed is a multiple of the randomInterval value
    if (frames % randomInterval === 0) {
        // Create a new Grid object and add it to the grids array
        grids.push(new Grid());

        // Generate a new randomInterval value
        randomInterval = Math.floor(Math.random() * 500 + 500);
        frames = 0;
    }
}

// Increment frame counter
function incrementFrames() {
    frames++;
}

// Start the animation
audio.backgroundMusic.play();
animate();

// Event listeners for keydown and keyup events
addEventListener('keydown', ({key}) => {
    if (game.over) {
        return;
    }

    switch (key) {
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case ' ':
            keys.space.pressed = true;

            audio.arrow.play();
            arrows.push(
              new Arrow({
                  position: {
                      x: player.position.x + player.width / 2,
                      y: player.position.y
                  },

                  speed: {
                      x: 0,
                      y: -10
                  },

                  color: '#FFC477'
              })
            );
            break;
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
    }
})