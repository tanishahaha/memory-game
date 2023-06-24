const deckCards=["cake.png", "cake.png", "cup.png", "cup.png", "double.png", "double.png", "ingredients.png", "ingredients.png", "mixer.png", "mixer.png", "pastry.png","pastry.png", "spoons.png", "spoons.png", "wisk.png", "wisk.png"];

const deck=document.querySelector('.deck');

let opened=[];

let matched=[];

let wincont=document.querySelector('.win_cont');

let playagain=document.querySelector('.play_again_btn');

let reset=document.querySelector('.reset_butt');

let movescount=document.querySelector('.moves_count');
let moves=0;

const star=document.getElementById("star_rating").querySelectorAll(".star");
let starcount=3;

let timercounter=document.querySelector('.timer');
let time=0;
let min=0;
let seconds=0;
let timestart=false;

function shuffle(array){
  let currentind=array.length,tempval,randomind;
  while(currentind!==0){
    randomind=Math.floor(Math.random()*currentind);
    currentind-=1;
    tempval=array[currentind];
    array[currentind]=array[randomind];
    array[randomind]=tempval;
  }
  return array;
}

function startGame(){
  const shuffleCards=shuffle(deckCards);
  for(let i=0;i<shuffleCards.length;i++){
    const liTag=document.createElement('LI');
    liTag.classList.add('card');

    const imgTag=document.createElement('IMG');
    liTag.appendChild(imgTag);
    imgTag.setAttribute("src",""+shuffleCards[i]);

    deck.appendChild(liTag);
  }
}
startGame();

function removeCard(){
  while(deck.hasChildNodes()){
    deck.removeChild(deck.firstChild);
  }
}

function timer(){
  time=setInterval(function(){
    seconds++;
    if(seconds===60){
      min++;
      seconds=0;
    }
    timercounter.innerHTML="<i class='fa fa-hourglass-start'></i>"+"Timer: "+min+" minutes "+seconds+" seconds";
    
  }, 1000)
}

function stopTIme(){
  clearInterval(time);
}

function resetEverything(){
  stopTIme();
  timestart=false;
  seconds=0;
  min=0;
  timercounter.innerHTML="<i class='fa fa-hourglass-start'></i>"+"  Timer: 00:00";
  star[1].firstElementChild.classList.add("fa-star");
  star[2].firstElementChild.classList.add("fa-star");
  starcount=3;
  moves=0;
  movescount.innerHTML=0;
  matched=[];
  opened=[];
  removeCard();
  startGame();

}

function movesCounter(){
  movescount.innerHTML++;
  moves++;
}

function starRating(){
  if(moves===14){
    star[2].firstElementChild.classList.remove("fa-star");
    starcount--;
  }
  if(moves===18){
    star[1].firstElementChild.classList.remove("fa-star");
    starcount--;
  }
}

function comparetwo(){
  if(opened.length===2){
    document.body.style.pointerEvents='none';
  }
  if(opened.length===2 && opened[0].src===opened[1].src){
    match();
  }
  else if(opened.length===2 && opened[0].src!==opened[1].src){
    noMatch();
  }
}

function match(){
  setTimeout(function(){
    opened[0].parentElement.classList.add("match");
    opened[1].parentElement.classList.add("match");
    matched.push(...opened);;
    document.body.style.pointerEvents="auto";
    winGame();
    opened=[];
  },600);
  movesCounter();
  starRating();
}

function noMatch(){
  setTimeout(function(){
    opened[0].parentElement.classList.remove("flip");
    opened[1].parentElement.classList.remove("flip");
    document.body.style.pointerEvents="auto";
    opened=[];
  },700);
  movesCounter();
  starRating();
}

function addStats(){
  const stats=document.querySelector(".win_info");
  for(let i=1;i<=3;i++){
    const statsElement=document.createElement("p");
    statsElement.classList.add("stats");
    stats.appendChild(statsElement);
  }

  let p=stats.querySelectorAll("p.stats");
  p[0].innerHTML="Time to complete: "+min+" minutes and "+seconds+" seconds";
  p[1].innerHTML="Moves taken: "+moves;
  p[2].innerHTML="Your star rating is: "+starcount+" out of 3";
}

function displayinfo(){
  const contclose=document.getElementsByClassName("close")[0];
  wincont.style.display="block";
  contclose.onclick=function(){
    wincont.style.display="none";
  };
  window.onclick=function(event){
    if(event.target==wincont){
      wincont.style.display="none";
    }
  };
}

function winGame(){
  if(matched.length===16){
    stopTIme();
    addStats();
    displayinfo();
  }
}

deck.addEventListener("click", function(e){
  if(e.target.nodeName==="LI"){
    console.log(e.target.nodeName+" was clicked");
    if(timestart===false){
      timestart=true;
      timer();
    }
    flipCard();
  }

  function flipCard(){
    e.target.classList.add("flip");
    addToOpened();
  }
  function addToOpened(){
    if(opened.length===0 ||opened.length===1){
      opened.push(e.target.firstElementChild);
    }
    comparetwo();
  }
});

reset.addEventListener("click", resetEverything);

playagain.addEventListener("click",function(){
  wincont.style.display="none";
  resetEverything();
});