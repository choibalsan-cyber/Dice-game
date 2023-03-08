// Тоглогчийн ээлжийг хадгалах хувьсагч
// Хэрвээ 1-р тоглогчийн ээлж бол 0-оор, 2-р тоглогч бол 1-р тэмдэглэе
var activePlayer = 0;

// Тоглогчын цуглуулсан оноог хадгалах хувьсагч, эхний элемент нь 1-р тоглогч 1-р элемент нь 2-р тоглогч
var scores = [0, 0];

//Тоглогчын ээлжиндээ авсан оноог хадгалах хувьсагч
var roundScore = 0;

// Шооны буусан талыг харуулах хувьсагч
var diceNumber = Math.floor(Math.random() * 6) + 1;
console.log(diceNumber);

// Програм эхлэхэд бэлтгэх
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.dice').style.display = 'none';
