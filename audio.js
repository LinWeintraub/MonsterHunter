Howler.volume(0.5)
const audio = {
  backgroundMusic: new Howl({
    src: './audio/backgroundMusic.mp3',
    loop: true
  }),
  monsterShoot: new Howl({
    src: './audio/monsterShoot.mp3'
  }),
  monsterSplat: new Howl({
    src: './audio/monsterSplat.mp3'
  }),
  explode: new Howl({
    src: './audio/explode.mp3'
  }),
  gameOver: new Howl({
    src: './audio/gameOver.mp3'
  }),
  arrow: new Howl({
    src: './audio/arrow.mp3'
  })
}
