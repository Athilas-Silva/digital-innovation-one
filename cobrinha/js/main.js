var canvas = document.getElementById("snake");
var contexto = canvas.getContext("2d");
var caixa = 32
var snake = [];
snake[0] = {
    x: 8 * caixa,
    y: 8 * caixa
}

var direcao = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
    //Math.floor retira a parte flutuante do Mth.random
}

//criarBG - criando background
function criarFundo(){
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i++) {
        contexto.fillStyle = "green";
        contexto.fillRect(snake[i].x, snake[i].y, caixa, caixa);
    }
}

function criarComida(){
    contexto.fillStyle = "red"
    contexto.fillRect(food.x, food.y, caixa, caixa);
}

document.addEventListener("keydown", update);

//Função para impedir a cobra de voltar o mesmo caminho
function update(event){
    if(event.keyCode == 37 && direcao !="right") direcao = "left";
    if(event.keyCode == 38 && direcao != "down") direcao = "up";
    if(event.keyCode == 39 && direcao != "left") direcao = "right";
    if(event.keyCode == 40 && direcao != "up") direcao = "down";
}

function iniciarJogo(){
    //Condição para a cobrar aparecer do outro lado da tabela
    if(snake[0].x > 15 * caixa && direcao == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direcao =="left") snake[0].x = 16 * caixa;
    if(snake[0].y > 15 * caixa && direcao == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direcao == "up") snake[0].y = 16 * caixa;

    //loop e condição para decretar fim de jogo quando se chocar com o proprio corpo
    for(let i = 1; i <snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Fim de jogo :(")
        }
    }

    criarFundo();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //condição para fazer a cobra andar pela caixa
    if(direcao == "right") snakeX += caixa;
    if(direcao == "left") snakeX -= caixa;
    if(direcao == "up") snakeY -= caixa;
    if(direcao == "down") snakeY += caixa;

    //condição para a cobra aumentar de tamanho quando comer
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //Remove o ultimo elemento da Array
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * caixa;
        food.y = Math.floor(Math.random() * 15 + 1) * caixa;
    }

    let cabeca = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(cabeca); //criando a cabeça da cobra
}

var jogo = setInterval(iniciarJogo, 100);