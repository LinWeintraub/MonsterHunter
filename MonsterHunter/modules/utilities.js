// Utility function to check collision between two objects
function checkArrowMonsterCollision(object1, object2) {
  return (
    object1.position.y - object1.radius <= object2.position.y + object2.height &&
    object1.position.x + object1.radius >= object2.position.x &&
    object1.position.x - object1.radius <= object2.position.x + object2.width &&
    object1.position.y + object1.radius >= object2.position.y
  );
}

function checkMonsterShotPlayerCollision(object1, object2) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width
  );
}

// Handle collision between arrow and monster
function handleArrowMonsterCollision(grid, monster, arrow, gridIndex) {
  const monsterIndex = grid.monsters.indexOf(monster);
  const arrowIndex = arrows.indexOf(arrow);

  // Check if both the monster and arrow exist in their respective arrays
  if (monsterIndex !== -1 && arrowIndex !== -1) {
    score += 100;
    scoreEl.innerHTML = score;

    // Create particles at the position of the monster
    createParticles({
      object: monster,
      color: '#4FBA6F',
      fades: true
    });

    // Remove the monster and arrow from their arrays
    audio.monsterSplat.play();

    grid.monsters.splice(monsterIndex, 1);
    arrows.splice(arrowIndex, 1);

    // If there are remaining monsters in the grid
    if (grid.monsters.length > 0) {
      const firstMonster = grid.monsters[0];
      const lastMonster = grid.monsters[grid.monsters.length - 1];

      // Recalculate the width of the grid based on the position of the first and last monsters
      grid.width = lastMonster.position.x - firstMonster.position.x + lastMonster.width;

      // Set the position of the grid to the position of the first monster
      grid.position.x = firstMonster.position.x;
    } else {
      // If there are no more monsters in the grid, remove the grid from the grids array
      grids.splice(gridIndex, 1);
    }
  }
}

// Handle collision between monster shot and player
function handleMonsterShotPlayerCollision(monsterShot) {
  const monsterShotIndex = monsterShots.indexOf(monsterShot);

  // Check if the monster shot exists in the array
  if (monsterShotIndex !== -1) {
    audio.explode.play()
    monsterShots.splice(monsterShotIndex, 1);
    player.opacity = 0;
    game.over = true;

    setTimeout(() => {
      audio.gameOver.play()
      audio.backgroundMusic.stop();
      game.active = false;
    }, 2000);

    createParticles({
      object: player,
      color: '#A95F00',
      fades: true
    });
  }
}

function createParticles({object, color, fades}) {
  for (let i = 0; i < 15; ++i) {
    particles.push(new Particle({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },

      speed: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },

      radius : Math.random() * 5,
      color : color,
      fades: fades
    }));
  }
}