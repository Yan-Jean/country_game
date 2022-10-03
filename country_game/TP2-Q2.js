"use strict";

let prev = document.getElementById('prev');
let next = document.getElementById('next');
let item = document.getElementById('item');
let form = document.querySelector('form');
let scoreDisplay = document.getElementById('score');
let carrousel = document.getElementById('carrousel');
let counter = 0;
let score = 0;
let cacheReponse = [];
let reponse = document.querySelector('input');
let start = document.getElementById('start');
start.addEventListener('click', init);

var quiz = [
  { country: "Grèce", capital: "athènes" },
  { country: "Irlande", capital: "dublin" },
  { country: "Écosse", capital: "édimbourg" },
  { country: "Mexique", capital: "mexico" },
  { country: "Canada", capital: "ottawa" }
];

let counterTime = 30;
let timerSet;

function timer(){
  let time = document.getElementById('time-left');
  timerSet = setInterval(function(){
    time.innerHTML = counterTime;
    counterTime--;
    if(counterTime === 0){
      clearInterval(timerSet);
      document.getElementById('time').innerHTML = "Temps écoulé";
      form.style.display = "none";
      let divBravo = document.getElementsByClassName('score');
      divBravo.innerHTML = "Perdu !";
      divBravo.classList.add('bravo');
    }
  }, 1000);
}

function init(){
  start.style.display = 'none';
  carrousel.style.display = 'block';
  timer();
  item.children[0].src = 'img/' + counter + '.jpg';
  item.children[1].firstChild.textContent = 'Capitale : ' + quiz[counter].country;
  prev.addEventListener('click', prevItem);
  next.addEventListener('click', nextItem);
  form.addEventListener('submit', validation);
  displayReponse();
}

function prevItem(){
  counter--;
  if(counter == -1) counter = quiz.length - 1;
  displayImg();
}

function nextItem(){
  counter++;
  if(counter == quiz.length) counter = 0;
  displayImg();
}

function displayImg(){
  item.children[0].style.opacity = 0.5; 
  item.addEventListener('transitionend', function(){
    item.children[0].src = 'img/' + counter + '.jpg';
    item.children[0].style.opacity = 1; 
  })
  item.children[1].firstChild.textContent = 'Capitale : ' + quiz[counter].country;
  displayReponse();
}

function validation(e){
  e.preventDefault()
  if (reponse.value.toLowerCase() == quiz[counter].capital && cacheReponse[counter] == undefined){
    score++
    cacheReponse[counter] = reponse.value.toLowerCase();
  }
  if ((counter == 2 && reponse.value.toLowerCase() == "edimbourg") || (counter == 0 && reponse.value.toLowerCase() == "athenes")){
    score++
    cacheReponse[counter] = reponse.value.toLowerCase();
  }

  if (score == quiz.length){
    let divBravo = document.getElementsByClassName('score')[0];
    divBravo.innerHTML = "Bravo! <br>Votre temps est de " + (30 - counterTime - 1) + " secondes";
    divBravo.classList.add('bravo');
    clearInterval(timerSet);
  }
  reponse.value = '';
  reponse.focus();
  scoreDisplay.textContent = score;
  nextItem();
}

function displayReponse(){
  if (cacheReponse[counter] != undefined){
    reponse.value = cacheReponse[counter];
  } else {
    reponse.value = "";
  }
}


// window.addEventListener('load', init);
