class Basics extends Phaser.Scene {
    constructor() {
        super('basicsScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.atlas('fruitandveg', 'img/fruitandveg.png', 'img/fruitandveg.json')
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
    }

    create() {
        // do camera stuff
        const centerX = this.cameras.main.centerX
        const centerY = this.cameras.main.centerY
        const w = this.cameras.main.width
        const h = this.cameras.main.height
        this.cameras.main.setBackgroundColor(0x11dc00)

        // add sprites
        let tomato = this.add.sprite(centerX, centerY, 'fruitandveg', 'tomato') // the last value is a key instead of a frame number
        let verygoodpear = this.add.sprite(64, 64, 'fruitandveg', 'pear') // fruitandveg is the texture atlas

        // add text
        this.instructionText = this.add.bitmapText(centerX, centerY, 'gem_font', '', 24).setOrigin(0.5)

        // add tween
        let basicTween = this.tweens.add({
            targets: tomato,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 18 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 1,
            yoyo: true,
            hold: 1000,
            // built into phaser, the callback methods
            onStart: () => {
                this.instructionText.text = 'Tomato tween, let\'s gooooooo'
            },
            onYoyo: () => {
                this.instructionText.text = 'Time to yoyo this tomato tween'
            },
            onRepeat: () => {
                this.instructionText.text = 'Let\s repeat the tween'
            },
            onComplete: () => {
                this.instructionText.text = 'Tomato tween complete!'
            }
        })

        let pearTweenChain = this.tweens.chain({ // remember it's NOT .add
            targets: verygoodpear,
            // ease: 'Bounce.easeOut', // most of these times it's just a number behind the string
            // string used to make it easier to remember
            loop: 1,
            paused: true, // do you want it to pause it so you can run it?
            // ^^ so it doesn't start automatically
            tweens: [ // an arrays of tweens
                {
                    x: w - 64,
                    duration: 500,
                    ease: 'Bounce.easeOut', // appararently you can't define it globally?
                    onComplete: () => {
                        this.tweens.add({
                            targets: verygoodpear,
                            angle: { from: 0, to: 90 },
                            duration: 50,
                        })
                    },
                },
                {
                    y: h - 64,
                    duration: 1000,
                    scale: {
                        from: 1, to: 2.25,
                    },
                    ease: 'Sine.easeOut', // we can overwrite the easing at any moment
                    onComplete: () => {
                        this.tweens.add({
                            targets: verygoodpear,
                            angle: { from: 90, to: 180 },
                            duration: 50,
                        })
                    },
                },
                {
                    x: 64,
                    duration: 2000,
                    onComplete: () => {
                        this.tweens.add({
                            targets: verygoodpear,
                            angle: { from: 180, to: 270 },
                            duration: 50,
                        })
                    },
                },
                {
                    y: 64,
                    scale: {
                        from: 2.25, to: 1,
                    },
                    duration: 1500,
                    onComplete: () => {
                        this.tweens.add({
                            targets: verygoodpear,
                            angle: { from: 270, to: 360 },
                            duration: 50,
                        })
                    },
                },
            ],
        });

        this.input.on('pointerdown', () => {
            verygoodpear.setPosition(64, 64);
            verygoodpear.setAngle(0);
            pearTweenChain.restart();
        });

        // enable scene reload key
        this.reload = this.input.keyboard.addKey('R')

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>Basics.js</strong><br>R: Restart current scene<br>MouseClick: Restart Pear Tween'
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
    }
}