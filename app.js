/***  Глобаль хувьсагчид ***/
// Тоглоомын төлвийн хувьсагч
var isGameOver;

// Идэвхтэй тоглогчийг илтгэх хувьсагч
var activePlayer;

// 2тоглогчийн оноог хадгалах хувьсагч
var scores;

// 1 ээлжиндээ авч байгаа оноог хадгалах ээлжийн хувьсагч
var roundScore;

// Шооны Dom обьект
var diceDom = document.querySelector('.dice');

// Тоглоомыг эхлүүлэх функц
function initGame() {
  // Тоглоомыг эхлүүлэх төлөвт шилжүүлнэ
  isGameOver = false;

  // 2 тоглогчийн оноонууд
  scores = [0, 0];

  // 1 ээлжинд авах оноог 0-с эхлүүлнэ
  roundScore = 0;

  // 1-р тоглогч идэвхтэй байвал 0, 2-р тоглогч идэвхтэй байвал 1-р тэмдэглэе
  activePlayer = 0;

  // Шоог дэлгэцэн дээр алга болгох
  diceDom.style.display = 'none';

  // Тоглогчдын оноог дэлгэцэн дээр 0 болгож харагдуулах
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;

  // Ээлжийн оноог дэлгэцэн дээр 0 болгож харагдуулах
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  // Тоглогчдын нэрийг дэлгэцэнд гаргаж ирнэ
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // Хожсон тоглогчийн WINNER бичгий улаан өнгийг арилгах
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Идэвхтэй тоглогчийг 1-р тоглогч болгоно
  document.querySelector('.player-0-panel').classList.add('active');
}

// Тоглоомыг эхлүүлнэ
initGame();

// Шоог шидэх үеийн эвент листенер
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (!isGameOver) {
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    if (diceNumber !== 1) {
      // Ээлжийн оноог буусан шооны нүхээр нэмэгдүүлнэ
      roundScore += diceNumber;

      // Идэвхтэй тоглогчийн ээлжийн оноог дэлгэцэн дээр харуулна
      document.getElementById('current-' + activePlayer).textContent =
        roundScore;

      // Шоог дэлгэцэн дээр гаргаж ирнэ
      diceDom.style.display = 'block';

      // Яг ямар нүхээр буусныг зурганд нь тохируулна
      diceDom.src = 'dice-' + diceNumber + '.png';
    } else {
      // 1 буусан тул ээлжээ солино
      switchToNextPlayer();
    }
  }
});

function switchToNextPlayer() {
  // Шоог алга болгоно
  diceDom.style.display = 'none';

  // Ээлжийн оноог 0 болгох
  roundScore = 0;

  // Дэлгэцэн дэх ээлжийн оноог 0 болгож харуулах
  document.getElementById('current-' + activePlayer).textContent = 0;

  // 1 буусан тоглогчийн Улаан цэгийг арилгана
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('active');

  // Хэрвээ идэвхтэй тоглогч 1-р тоглогч байвал 2-р тоглогч руу, 2-р тоглогч байвал 1-р тоглогч руу шилжүүлнэ
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Идэвхтэй тоглогчийг илтгэх Улаан цэгийг шилжүүлнэ
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.add('active');
}

// Hold товчны эвент листенер
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (!isGameOver) {
    // Тоглогчийн ээлжиндээ авсан оноог үндсэн оноон дээр нэмэгдүүлнэ
    scores[activePlayer] += roundScore;

    // Дэлгэцэнд нэмэгдүүлсэн оноог харагдуулах
    document.getElementById('score-' + activePlayer).textContent =
      scores[activePlayer];

    // Идэвхтэй тоглогчийн 1 ээлжиндээ авсан оноог 0 болгох
    document.getElementById('current-' + activePlayer).textContent = 0;

    if (scores[activePlayer] >= 100) {
      // Тоглоомыг дуусгах төлөвт шилжүүлнэ
      isGameOver = true;
      // Хожсон тоглогчийн нэрний оронд WINNER гэсэн бичиг дэлгэцэнд гаргана
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!!!';

      // Хожсон тоглогчийн WINNER бичгийг улаан болгоно
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');

      // Улаан цэгийг алга болгоно
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
    } else {
      switchToNextPlayer();
    }
  }
});

// New Game товчны эвент листенер
document.querySelector('.btn-new').addEventListener('click', initGame);
