// Code Practice: Tiny Tween Chain
// Name: Lyssa Li
// Date: 2024 03 06

// CODE ARMOR
'use strict'

// define game object
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [ Basics ]
}

const game = new Phaser.Game(config)

let cursors = null