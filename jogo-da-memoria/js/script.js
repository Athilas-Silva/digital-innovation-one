const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return; //Impedindo duplo click na mesma carta

    this.classList.add("flip"); //Adicionando a classe flip para os cards
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

//Checando se as cartas são iguais
function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

//Desativando as cartas
function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

// Resetando as variaveis
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Embaralhando as cartas
(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})(); //Função imediata

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});