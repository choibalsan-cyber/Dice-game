/* Тоглоомын бүх газарт ашиглах глобал хувьсагчид
Тоглогчийн ээлжийг хадгалах хувьсагч */
var activePlayer;

// Тоглогчын цуглуулсан оноог хадгалах хувьсагч, эхний элемент нь 1-р тоглогч 1-р элемент нь 2-р тоглогч
var scores;

//Тоглогчын ээлжиндээ авсан оноог хадгалах хувьсагч
var roundScore;

// Тоглоомын төлвийн хувьсагч
var isGameOver;

// Шооны буусан талыг харуулах хувьсагч
var diceNumber;

// Шооны DOM
var diceDOM = document.querySelector('.dice');

/********************************************************************/
/********************************************************************/
/********************************************************************/

// Тоглоомыг эхлүүлэхэд бэлтгэнэ
function initGame() {
  // Програм эхлэхэд бэлтгэх

  isGameOver = false;
  // Идэвхтэй тоглогчийг 1-р тоглогч болгох
  activePlayer = 0;

  // Бүх хувьсагчдыг 0 болгох
  scores = [0, 0];
  roundScore = 0;

  // Шооны зургийг алга болгох
  diceDOM.style.display = 'none';

  // Вэб дээр харагдаж байгаа утгуудыг 0 болгох
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  // Тоглогчдын нэрийг буцааж гаргах
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // Хожсон тоглогчоос winner class-г авах
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Идэвхтэй тоглогчийг 1-р тоглогч болгох
  document.querySelector('.player-0-panel').classList.add('active');
}

// Тоглоомыг эхлүүлнэ
initGame();

// Шоог шидэх товчны эвент листенер(Roll Dice)
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (!isGameOver) {
    // 1-6хооронд санамсаргүй утга гаргаж авна
    diceNumber = Math.floor(Math.random() * 6) + 1;

    // Шооны зургийг вэб дээр гаргаж ирнэ
    diceDOM.style.display = 'block';

    // Шооны нүхэнд таарсан зургыг вэб дээр гаргаж ирнэ
    diceDOM.src = `dice-${diceNumber}.png`;

    // Буусан тоо 1-ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
    if (diceNumber !== 1) {
      //1-ээс ялгаатай буусан тул ээлжийн оноог нэмэгдүүлнэ
      roundScore += diceNumber;

      // Идэвхтэй тоглогчийн оноог вэб дээр харуулна
      document.getElementById(`current-${activePlayer}`).textContent =
        roundScore;
    } else {
      switchToNextPlayer();
    }
  } else {
    alert('Тоглоом дууссан байна. New Game товчлуурыг дарж шинээр эхлүүлнэ үү');
  }
});

// Hold товчны эвент листенер
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (!isGameOver) {
    // Тоглогчийн үндсэн оноог нэмэгдүүлнэ
    scores[activePlayer] += roundScore;

    // Вэб дээр харуулна
    document.getElementById('score-' + activePlayer).textContent =
      scores[activePlayer];

    // 100-с их оноотой бол хожно
    if (scores[activePlayer] >= 10) {
      // Тоглогчийн нэрний оронд WINNER гэсэн бичиг харагдуулна
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!!!';
      isGameOver = true;
      // WINNER гэсэн бичгийг улаан өнгөтэй болгохын тулд winner класстай болгоно
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');

      // Улаан бөөрөнхий дүрсийг алга болгоно
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
    } else {
      // Тоглогчийн ээлжийг солино
      switchToNextPlayer();
    }
  } else {
    alert('Тоглоом дууссан байна. New Game товчлуурыг дарж шинээр эхлүүлнэ үү');
  }
});

// Тоглоомыг шинээр эхлүүлэх New Game товчны эвент листенер
document.querySelector('.btn-new').addEventListener('click', initGame);

// Ээлжийг солих функц
function switchToNextPlayer() {
  // 1 буусан тул ээлжийн оноог 0 болгоно
  roundScore = 0;

  // Энэ тоглогчийн ээлжийн оноог 0 болгож харуулна
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  // Идэвхтэй тоглогч байхаа больсон тул Улаан цэгийг алга болгоно
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('active');

  // Шооны зургийг алга болгох
  diceDOM.style.display = 'none';

  // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
  // 1тэй тэнцүү тул идэвхтэй тоглогчийн ээлжийг солино
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Идэвхтэй тоглогч болсон ту Улаан цэгийг гаргаж ирэх
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add('active');
}
