//prevent sloppy codes
'use strict';

// Enemies our player must avoid
//define enemy class before making the enemy array
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = (~~(Math.random() * 200) + 50);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //loop enemies
    if (this.x >= 505) {
        this.x = 101 * dt;
    } 
    else {
        this.x += this.speed * dt;
    }

    //link collision
    this.collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function() {
    if (this.x < player.x + 50 && this.x + 75 > player.x &&
        this.y < player.y + 50 && this.y + 75 > player.y) {
        player.resetGame();
        player.life -= 1;
        player.lives();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    //lives
    this.life = 5;

};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//input 'keys' so that player will not move off screen
Player.prototype.handleInput = function(keys) {
   if (keys === 'left' && this.x > 33) {
    this.x -= 101;
   }
   else if (keys === 'right' && this.x < 400) {
    this.x += 101;
   }
   else if (keys === 'up' && this.y > - 20) {
    this.y -= 85;
   }
   else if (keys === 'down' && this.y < 400) {
    this.y += 85;
   }

   this.win();
};

Player.prototype.resetGame = function () {
     //reset player position
        this.x = 200;
        this.y = 400;
};

//lose lives
Player.prototype.lives = function () {
    this.heart = document.getElementsByClassName('heart-icon');
    if (this.life === 4) {
        this.heart[4].style.visibility ='hidden';
    }
    if (this.life === 3) {
        this.heart[3].style.visibility ='hidden';
    }
    if (this.life === 2) {
        this.heart[2].style.visibility ='hidden';
    }        
    if (this.life === 1) {
        this.heart[1].style.visibility ='hidden';
    }
    if (this.life === 0) {
        this.heart[0].style.visibility = 'hidden';
        document.querySelector('.lose-modal').style.display = "block";
        allEnemies = [];
        this.sprite = 'images/char-horn-girl.png';
    }
};

// let win = document.querySelector('.win-modal');
//win alert
Player.prototype.win = function () {
    if (this.y <= -20) {
        document.querySelector('.win-modal').style.display = "block";   
        allEnemies = [];
        this.sprite = 'images/char-horn-girl.png';
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
    let firstEnemy = new Enemy(0, 60);
    let secondEnemy = new Enemy(0, 145);
    let thirdEnemy = new Enemy(0, 228);

allEnemies.push(firstEnemy);
allEnemies.push(secondEnemy);
allEnemies.push(thirdEnemy);

//ready Player one
const player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//UNDER CONSTRUCTIONS!
//select character 
// document.querySelector('.player-selection').addEventListener('click', function(e) {
//     if (e.target.nodeName === 'IMG') {
//         player.update(e.target.getAttribute('src'));
//     }
// });
