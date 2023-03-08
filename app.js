// Тоглогчийн ээлжийг хадгалах хувьсагч
// Хэрвээ 1-р тоглогчийн ээлж бол 0-оор, 2-р тоглогч бол 1-р тэмдэглэе
var activePlayer = 0;

// Тоглогчын цуглуулсан оноог хадгалах хувьсагч, эхний элемент нь 1-р тоглогч 1-р элемент нь 2-р тоглогч
var scores = [0, 0];

//Тоглогчын ээлжиндээ авсан оноог хадгалах хувьсагч
var roundScore = 0;

// Шооны буусан талыг харуулах хувьсагч
var diceNumber;

// Програм эхлэхэд бэлтгэх
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

// Шооны DOM
var diceDOM = document.querySelector('.dice');

// Шооны зургийг алга болгох
diceDOM.style.display = 'none';

// Шоог шидэх товчны эвент листенер(Roll Dice)
document.querySelector('.btn-roll').addEventListener('click', function () {
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
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  } else {
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
});
