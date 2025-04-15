
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 520, width: 40, height: 40, color: "orange" };
let bullets = [];
let enemies = [];
let score = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= 15;
    if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 15;
    if (e.key === " ") {
        bullets.push({ x: player.x + 15, y: player.y, width: 10, height: 20 });
    }
});

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "yellow";
    bullets = bullets.filter((b) => b.y > -20);
    bullets.forEach((b) => {
        b.y -= 6;
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });
}

function drawEnemies() {
    ctx.fillStyle = "red";
    if (Math.random() < 0.02) {
        enemies.push({ x: Math.random() * 360, y: 0, width: 40, height: 40 });
    }

    enemies = enemies.filter((e) => e.y < canvas.height + 40);
    enemies.forEach((e) => {
        e.y += 2;
        ctx.fillRect(e.x, e.y, e.width, e.height);

        bullets.forEach((b, j) => {
            if (b.x < e.x + e.width && b.x + b.width > e.x &&
                b.y < e.y + e.height && b.y + b.height > e.y) {
                e.hit = true;
                b.hit = true;
                score += 10;
            }
        });
    });

    enemies = enemies.filter(e => !e.hit);
    bullets = bullets.filter(b => !b.hit);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score + " / النقاط", 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
