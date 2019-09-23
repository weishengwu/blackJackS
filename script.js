//
// blackJackS
// by Weisheng
//

// card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten','Nine',
  'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two',
];

// DOM variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    palyerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  console.log(playerCards);
  
  // textArea.innerText = 'Started...';
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
})

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
})

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for (let i = 0; i < deck.length; i++){
    let swapIdx = Math.trunc(Math.random() * deck.length)
    let temp = deck[i];
    deck[i] = deck[swapIdx];
    deck[swapIdx] = temp;
  }
}

function getCardString(card){
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8; 
    case 'Nine':
      return 9;
    default:
      return 10;     
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for (let i=0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value === 'Ace'){
      hasAce = true;
    }
  }
  if(hasAce && score + 10 <=21){
    return score +10;
  }
  return score;
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
  updateScores();
  if(gameOver){
    while(dealerScore < playerScore &&
      playerScore <= 21 &&
      dealerScore <= 21){
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if(playerScore > 21){
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21){
    playerWon = true;
    gameOver = true;
  }else if (gameOver){
    if(playerScore > dealderScore){
      playerWon = true;
    }else {
      playerWon = false;
    }

    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}

function showStatus(){
  if(!gameStarted){
    textArea.innerText = 'Welcome to blackJackS!';
    return;
  }

  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++){
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  console.log(playerCards);
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++){
    playerCardString += getCardString(playerCards[i]) + '\n';
    console.log("CHECK ME"+playerCardString);
  }

  updateScores();

  console.log(dealerCardString);
  console.log(playerCardString);

  textArea.innerText = 
    'Dealer has:\n' +
    dealerCardString +
    '(Score: ' + dealerScore + ')\n\n' +
    'Player has:\n' +
    playerCardString +
    '(Score: ' + playerScore + ')\n\n';

  if (gameOver) {
    if (playerWon){
      textArea.innerText += "YOU WIN!!";
    }
    else{
      textArea.innerText += "DEALER WINS!";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

  // for (var i = 0; i < deck.length; i++){
  //   textArea.innerText += '\n' + getCardString(deck[i]);
  // }
}

function getNextCard() {
  return deck.shift();
}

// textArea.style.display = 'none';

// okButton.addEventListener('click', function(){
//   textArea.innerText = 'Button clicked!';
//   textArea.style.display = 'block';
// });


// console.log('You are delt: ');
// console.log(' ' + getCardString(playerCards[0]));
// console.log(' ' + getCardString(playerCards[1]));
