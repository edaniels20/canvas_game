import { Character } from './character.js';
import { Maps } from './maps.js';

export class Game {
    constructor(tileSize, gameSpeed) {
        this.tileSize = tileSize;
        this.gameSpeed = gameSpeed;
        this.mapCanvas = document.getElementById("mapCanvas");

        this.mapCtx = this.mapCanvas.getContext("2d");
        this.mapCtx.fillStyle = "#6daa2c";
        this.mapCtx.fillRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);

        this.playerCanvas = document.getElementById("playerCanvas");
        this.playerCtx = this.playerCanvas.getContext("2d");

        this.player = new Character(this.playerCtx, this.tileSize, this.playerCanvas, this.gameSpeed / 3);
        this.map = new Maps(this.mapCtx, this.tileSize);

        this.renderMap(this.map.homeMap)
        this.movePlayer();
    }

    renderMap(renderedMap) {
        this.map.drawMap(renderedMap);
    }

    movePlayer() {
        let canMove = true;
        document.addEventListener('keydown', (e) => {
            if(!canMove) return false;
            canMove = false;
            setTimeout(() => {canMove = true;}, this.gameSpeed)
            this.player.moveCharacter(e)
        }, true)
    }

    updateCanvas() {

    }
}