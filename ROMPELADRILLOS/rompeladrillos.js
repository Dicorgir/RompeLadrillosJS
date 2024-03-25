/* Obtener el elemento canvas y su contexto 2D */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/* Variables para controlar la pelota */
var ballRadius = 10;  /* Radio de la pelota */
var x = canvas.width / 2;  /* Posición inicial horizontal de la pelota */
var y = canvas.height - 30;  /* Posición inicial vertical de la pelota */
var dx = 2;  /* Velocidad horizontal de la pelota */
var dy = -2;  /* Velocidad vertical de la pelota */

/* Variables para controlar la paleta */
var paddleHeight = 10;  /* Altura de la paleta */
var paddleWidth = 75;  /* Ancho de la paleta */
var paddleX = (canvas.width - paddleWidth) / 2;  /* Posición inicial horizontal de la paleta */

/* Variables para detectar teclas presionadas */
var rightPressed = false;  /* Indicador de si la tecla de dirección derecha está presionada */
var leftPressed = false;   /* Indicador de si la tecla de dirección izquierda está presionada */

/* Configuración de ladrillos */
var brickRowCount = 5;          /* Número de filas de ladrillos */
var brickColumnCount = 3;       /* Número de columnas de ladrillos */
var brickWidth = 75;            /* Ancho de cada ladrillo */
var brickHeight = 20;           /* Altura de cada ladrillo */
var brickPadding = 10;          /* Espaciado entre ladrillos */
var brickOffsetTop = 30;        /* Espacio superior entre los ladrillos y el borde superior del canvas */
var brickOffsetLeft = 30;       /* Espacio izquierdo entre los ladrillos y el borde izquierdo del canvas */

/* Puntuación y vidas */
var score = 0;  /* Puntuación del jugador */
var lives = 3;  /* Cantidad de vidas disponibles del jugador */


// Matriz bidimensional para representar ladrillos
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Event listeners para el teclado y el ratón
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

/* Función para manejar la tecla presionada */
function keyDownHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = true;  /* Si la tecla presionada es la flecha derecha, establecer rightPressed en true */
    } else if (e.code == 'ArrowLeft') {
        leftPressed = true;   /* Si la tecla presionada es la flecha izquierda, establecer leftPressed en true */
    }
}


/* Función para manejar la tecla liberada */
function keyUpHandler(e) {
    if (e.code == 'ArrowRight') {
        rightPressed = false;  /* Si la tecla liberada es la flecha derecha, establecer rightPressed en false */
    } else if (e.code == 'ArrowLeft') {
        leftPressed = false;   /* Si la tecla liberada es la flecha izquierda, establecer leftPressed en false */
    }
}


/* Función para manejar el movimiento del ratón */
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;  /* Calcular la posición horizontal del ratón relativa al canvas */
    if (relativeX > 0 && relativeX < canvas.width) {  /* Verificar si el ratón está dentro de los límites horizontales del canvas */
        paddleX = relativeX - paddleWidth / 2;  /* Actualizar la posición horizontal de la paleta para seguir el movimiento del ratón */
    }
}

// Función para detectar colisiones con ladrillos
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0; // Marca el ladrillo como golpeado
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

/* Función para dibujar la pelota */
function drawBall() {
    ctx.beginPath();  /* Iniciar un nuevo trazo en el contexto de dibujo */
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);  /* Dibujar un círculo con las coordenadas (x, y), radio ballRadius, desde el ángulo 0 hasta 2 * PI (un círculo completo) */
    ctx.fillStyle = "#0095DD";  /* Establecer el color de relleno del círculo en azul */
    ctx.fill();  /* Rellenar el círculo con el color especificado */
    ctx.closePath();  /* Finalizar el trazo */
}

/* Función para dibujar la paleta */
function drawPaddle() {
    ctx.beginPath();  /* Iniciar un nuevo trazo en el contexto de dibujo */
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);  /* Dibujar un rectángulo (paleta) con las coordenadas y dimensiones especificadas */
    ctx.fillStyle = "#0095DD";  /* Establecer el color de relleno del rectángulo en azul */
    ctx.fill();  /* Rellenar el rectángulo con el color especificado */
    ctx.closePath();  /* Finalizar el trazo */
}


/* Función para dibujar los ladrillos */
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {  /* Ciclo para iterar a través de las columnas de ladrillos */
        for (var r = 0; r < brickRowCount; r++) {  /* Ciclo para iterar a través de las filas de ladrillos */
            if (bricks[c][r].status == 1) {  /* Verificar si el ladrillo está activo (status igual a 1) */
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;  /* Calcular la posición horizontal del ladrillo */
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;  /* Calcular la posición vertical del ladrillo */
                bricks[c][r].x = brickX;  /* Actualizar la propiedad 'x' del ladrillo en la matriz de ladrillos */
                bricks[c][r].y = brickY;  /* Actualizar la propiedad 'y' del ladrillo en la matriz de ladrillos */
                ctx.beginPath();  /* Iniciar un nuevo trazo en el contexto de dibujo */
                ctx.rect(brickX, brickY, brickWidth, brickHeight);  /* Dibujar un rectángulo (ladrillo) en la posición calculada */
                ctx.fillStyle = "#0095DD";  /* Establecer el color de relleno del ladrillo en azul */
                ctx.fill();  /* Rellenar el rectángulo con el color especificado */
                ctx.closePath();  /* Finalizar el trazo */
            }
        }
    }
}


// Función para dibujar la puntuación
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// Función para dibujar las vidas restantes
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

/* Función principal de dibujo y lógica del juego */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  /* Limpiar el canvas */

    drawBricks();  /* Dibujar los ladrillos en el canvas */
    drawBall();  /* Dibujar la pelota en el canvas */
    drawPaddle();  /* Dibujar la paleta en el canvas */
    drawScore();  /* Dibujar la puntuación en el canvas */
    drawLives();  /* Dibujar la cantidad de vidas en el canvas */
    collisionDetection();  /* Detectar colisiones entre la pelota y los ladrillos */

    /* Lógica de rebote de la pelota */
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx; // Cambia la dirección horizontal de la pelota
    }
    if (y + dy < ballRadius) {
        dy = -dy; // Cambia la dirección vertical de la pelota
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy; // Rebota en la paleta
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");  /* Alerta de fin del juego si se quedan sin vidas */
                document.location.reload();  /* Recarga la página para reiniciar el juego */
            } else {
                x = canvas.width / 2;  /* Resetea la posición de la pelota */
                y = canvas.height - 30;
                dx = 3;  /* Resetea la velocidad de la pelota */
                dy = -3 ;
                paddleX = (canvas.width - paddleWidth) / 2;  /* Resetea la posición de la paleta */
            }
        }
    }

    /* Control de movimiento de la paleta */
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7; // Mueve la paleta hacia la derecha
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7; // Mueve la paleta hacia la izquierda
    }

    x += dx; // Actualiza la posición x de la pelota
    y += dy; // Actualiza la posición y de la pelota
    requestAnimationFrame(draw); // Continúa la animación en el siguiente fotograma
}


draw(); // Inicia el bucle de animación del juego