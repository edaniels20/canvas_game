export class Character {
    constructor(ctx, tileSize, canvas, playerSpeed) {
        this.direction = 0;
        this.playerSpeed = playerSpeed;
        this.ctx = ctx;
        this.canvas = canvas
        this.tileSize = tileSize;
        this.location = {
            x: this.tileSize * 4,
            y: this.tileSize * 4
        }

        // Movement Variables
        this.from = {
            x: this.location.x,
            y: this.location.y
        }
        this.to = {
            x: 0,
            y: 0,
        }
        this.moving = true;
        this.characterImages = {
            up: {
                walk1: '../assets/character-up-1.png',
                walk2: '../assets/character-up-2.png',
                standing: '../assets/character-up.png'
            },
            right: {
                walk1: '../assets/character-right-1.png',
                walk2: '../assets/character-right-2.png',
                standing: '../assets/character-right.png'
            },
            down: {
                walk1: '../assets/character-down-1.png',
                walk2: '../assets/character-down-2.png',
                standing: '../assets/character-down.png'
            },
            left: {
                walk1: '../assets/character-left-1.png',
                walk2: '../assets/character-left-2.png',
                standing: '../assets/character-left.png'
            }
        }

        this.loadedImages = {};

        for(let key in this.characterImages) {
            this.loadedImages[key] = {}
            for(let item in this.characterImages[key]) {
                let src = this.characterImages[key][item];
                let image = new Image(this.tileSize, this.tileSize);
                image.src = src;
                this.loadedImages[key][item] = image
            }
        }

        this.loadedImages.up.standing.onload = () => {
            this.ctx.drawImage(this.loadedImages.up.standing, this.location.x, this.location.y, this.tileSize, this.tileSize);
        }

        this.delay = ms => new Promise(res => setTimeout(res, ms));
        
    }

    async animateCharacter() {
        let frameCount = 0;
        if(this.direction == 0) {
            for(let key in this.loadedImages.up) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                if(frameCount == 0) {
                    this.ctx.drawImage(this.loadedImages.up[key], this.from.x, this.from.y - (this.tileSize / 2), this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 1) {
                    this.ctx.drawImage(this.loadedImages.up[key], this.from.x, this.from.y - (this.tileSize * 2 / 3), this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 2) {
                    this.ctx.drawImage(this.loadedImages.up[key], this.to.x, this.to.y, this.tileSize, this.tileSize);
                    frameCount++
                }
                await this.delay(this.playerSpeed)
            }
        } else if(this.direction == 1) {
            for(let key in this.loadedImages.right) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                if(frameCount == 0) {
                    this.ctx.drawImage(this.loadedImages.right[key], this.from.x + (this.tileSize / 2), this.from.y, this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 1) {
                    this.ctx.drawImage(this.loadedImages.right[key], this.from.x + (this.tileSize * 2 / 3), this.from.y, this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 2) {
                    this.ctx.drawImage(this.loadedImages.right[key], this.to.x, this.to.y, this.tileSize, this.tileSize);
                    frameCount++
                }
                await this.delay(this.playerSpeed)
            }
        } else if(this.direction == 2) {
            for(let key in this.loadedImages.down) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                if(frameCount == 0) {
                    this.ctx.drawImage(this.loadedImages.down[key], this.from.x, this.from.y + (this.tileSize / 2), this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 1) {
                    this.ctx.drawImage(this.loadedImages.down[key], this.from.x, this.from.y + (this.tileSize * 2 / 3), this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 2) {
                    this.ctx.drawImage(this.loadedImages.down[key], this.to.x, this.to.y, this.tileSize, this.tileSize);
                    frameCount++
                }
                await this.delay(this.playerSpeed)
            }
        } else if(this.direction == 3) {
            for(let key in this.loadedImages.left) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                if(frameCount == 0) {
                    this.ctx.drawImage(this.loadedImages.left[key], this.from.x - (this.tileSize / 3), this.from.y, this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 1) {
                    this.ctx.drawImage(this.loadedImages.left[key], this.from.x - (this.tileSize * 2 / 3), this.from.y, this.tileSize, this.tileSize);
                    frameCount++
                } else if (frameCount == 2) {
                    this.ctx.drawImage(this.loadedImages.left[key], this.to.x, this.to.y, this.tileSize, this.tileSize);
                    frameCount++
                }
                await this.delay(this.playerSpeed)
            }
        }

    }

    moveCharacter(e) {
        // Setting direction for animations and rendering the correct sprites
        if(e.key == 'w' || e.key == 'ArrowUp') {
            this.direction = 0;
            this.from.x = this.location.x;
            this.from.y = this.location.y
            this.location.y -= this.tileSize;
            this.to.y = this.location.y
            this.to.x = this.location.x
            this.moving = true;
        } else if (e.key == 'd' || e.key == 'ArrowRight') {
            this.direction = 1;
            this.from.x = this.location.x;
            this.from.y = this.location.y
            this.location.x += this.tileSize;
            this.to.y = this.location.y
            this.to.x = this.location.x
            this.moving = true;
        } else if (e.key == 's' || e.key == 'ArrowDown') {
            this.direction = 2
            this.from.x = this.location.x;
            this.from.y = this.location.y
            this.location.y += this.tileSize;
            this.to.y = this.location.y
            this.to.x = this.location.x
            this.moving = true;
        } else if (e.key == 'a' || e.key == 'ArrowLeft') {
            this.direction = 3
            this.from.x = this.location.x;
            this.from.y = this.location.y
            this.location.x -= this.tileSize;
            this.to.y = this.location.y
            this.to.x = this.location.x
            this.moving = true;
        }

        this.animateCharacter();

    }
}