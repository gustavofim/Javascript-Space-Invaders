"use strict";

class Engine {

    constructor() {
        // Enemy Matrix

        let enemyMatrix = [ [1,1,1,1,0,0,1,1,1],
                            [1,0,1,1,0,0,1,0,0],
                            [1,1,1,1,0,0,1,1,1],
                            [1,0,0,1,0,0,0,0,1],
                            [1,0,0,1,1,1,1,1,1] ]

        ////////////////
        this.canvas = new Canvas();
        this.canvas.draw();
        this.player = new Player(this.canvas);
        this.rockets = [];
        this.cluster = new Cluster(this.canvas, enemyMatrix);
    }

    run() {
        document.addEventListener("keydown", ev => this.keyPress(ev));
        this.mainLoop();
    }

    mainLoop() {
        setTimeout(() => {
            this.canvas.draw(this.player.score, this.player.lifes);

            for (let i = 0; i < this.rockets.length; i++) {
                this.rockets[i].move();
                this.rockets[i].draw();
                if (this.rockets[i].y <= 0) {
                    this.rockets.splice(i, 1);
                }
            }

            this.player.draw();

            for (let invader of this.cluster.invaders) {
                invader.draw();
            }

            this.mainLoop();
        }, 7);
    }

    keyPress(event) {
        let keyPressed = event.key;

        //this.map = {};
        //this.map[keyPressed] = event.type == "keydown";

        this.validActions = {
            ArrowLeft() {
                this.player.move(-20);
            },
            ArrowRight() {
                this.player.move(20);
            },
            " "() {
                this.rockets.push(this.player.shoot());
            }
        }

        this.action = this.validActions[keyPressed];
        this.action();
    }

    // Checa a colisão de dois objetos retangulares
    isColision(one, two){
        if( one.x < two.x + two.width &&
            one.x + one.width > two.x &&
            one.y < two.y + two.height &&
            one.y + one.height > two.y 
            ) return true         
    }
}
