const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

//Verificando se a tecla pressionada é o "Espaço".
function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

//Função de Pular
function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else
                {
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 20)
        }
        else
        {
            //Subindo
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

//Função de adição do cacto e impacto com o dinossauro
function createCactus(){
    const cactus = document.createElement("div"); //Adicionando a div cactus via Js.
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + "px";

        if(cactusPosition <= -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60)
        {
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Fim de Jogo</h1>"

            const btn = document.createElement("button");
            btn.innerHTML = "Novo Jogo";
            btn.setAttribute("type", "button");
            btn.onclick = function(){window.history.go(0);}
            document.body.appendChild(btn);
        }
        else
        {
            cactusPosition -=10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

//Verificando se o usuário apertou uma tecla || keyup é quem recebe se a tecla foi pressionada
document.addEventListener("keyup", handleKeyUp);