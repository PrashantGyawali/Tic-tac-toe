const tile= document.querySelectorAll(".tile");
const Player_X="X";
const Player_O="O";
let won=0;
let turn= Player_X;

const boardState= Array(tile.length);
boardState.fill(null);

//elements
const strike= document.getElementById("strike");
const gameOverArea=document.getElementById("game-over-area");
const gameOverText=document.getElementById("game-over-text");
const playAgain=document.getElementById("play-again");
playAgain.addEventListener("click",statnewgame);




//Sounds
// const click= new Audio();
// const gameOverSound= new Audio();

tile.forEach(tiles=>tiles.addEventListener("click",tileClick));

tile.forEach((tiles)=>{ tiles.classList.remove("x-hover"); tiles.classList.remove("o-hover");})
function setHoverText(){
   tile.forEach((tiles)=>{ tiles.classList.remove("x-hover"); tiles.classList.remove("o-hover");})
    const hoverClass=  `${turn.toLowerCase()}-hover`;

    tile.forEach((tiles)=>{ if(tiles.innerText==""&&won!=1){tiles.classList.add(hoverClass);};  })
}

setHoverText();


document.getElementById("alltime_draws").innerText=localStorage.getItem("draws");
document.getElementById("alltime_x_wins").innerText=localStorage.getItem("x_wins");
document.getElementById("alltime_o_wins").innerText=localStorage.getItem("o_wins");
document.getElementById("alltime_matches").innerText=localStorage.getItem("matches");



//tileclick
function tileClick(event)
{
    if(gameOverArea.classList.contains("visible"))
    {
        return;
    }

    if(won==1)
    {
        return;
    }
    const tile= event.target;
    const tileNumber= tile.dataset.index;
    if(tile.innerText !="")
    {
        return;
    }

    if( turn===Player_X)
    {
        tile.innerText=Player_X;
        tile.classList.add("X-color");
        boardState[tileNumber-1]=Player_X;
        turn=Player_O;
    }

    else{
        tile.innerText=Player_O;
        tile.classList.add("O-color");
        boardState[tileNumber-1]=Player_O;
        turn=Player_X;
    }
    setHoverText();
    checkWinner();
}



const winningcombo = [
    {combo:[1,2,3], strikeClass:"strike-row-1"},
    {combo:[4,5,6], strikeClass:"strike-row-2"},
    {combo:[7,8,9], strikeClass:"strike-row-3"},

    {combo:[1,4,7], strikeClass:"strike-col-1"},
    {combo:[2,5,8], strikeClass:"strike-col-2"},
    {combo:[3,6,9], strikeClass:"strike-col-3"},

    {combo:[1,5,9],strikeClass:"strike-diag-1"},
    {combo:[3,5,7],strikeClass:"strike-diag-2"}
]















//Checkwinner fn
function checkWinner(){
    const allTilesfilled= boardState.every((tile)=> tile!=null);

    
    for(let winningcombos of winningcombo)
    {
        const {combo,strikeClass}=winningcombos;

        const tile1=boardState[combo[0]-1];
        const tile2=boardState[combo[1]-1];
        const tile3=boardState[combo[2]-1];

        if(tile1!=null && tile1===tile2 && tile2===tile3 && won!=1)
        {
            strike.classList.add(strikeClass);
            gameOverScreen(tile1);
            won=1;
            if(tile1=="X")
            {
                 if(sessionStorage.x_wins){
                    sessionStorage.x_wins=Number(sessionStorage.x_wins)+1;}
                 else{sessionStorage.x_wins=1;}

                 if(localStorage.x_wins){
                    localStorage.x_wins=Number(localStorage.x_wins)+1;}
                 else{localStorage.x_wins=1;}
            }
            if(tile1=="O")
            {
                 if(sessionStorage.o_wins){
                    sessionStorage.o_wins=Number(sessionStorage.o_wins)+1;}
                 else{sessionStorage.o_wins=1;}

                 
                 if(localStorage.o_wins){
                    localStorage.o_wins=Number(localStorage.o_wins)+1;}
                 else{localStorage.o_wins=1;}
            }

            if(sessionStorage.matches)
            {sessionStorage.matches=Number(sessionStorage.matches)+1;}
            else{sessionStorage.matches=1;}  

           if(localStorage.matches)
            {localStorage.matches=Number(localStorage.matches)+1;}
            else{localStorage.matches=1;}   
    }
}
if(allTilesfilled&&won==0){ 
    gameOverScreen(null);

     if(sessionStorage.draws){
        sessionStorage.draws=Number(sessionStorage.draws)+1;}
     else{sessionStorage.draws=1;}
   

     if(localStorage.matches)
     {localStorage.matches=Number(localStorage.matches)+1;}
     else{localStorage.matches=1;}     
    }
}





//gameover fn
function gameOverScreen(winnerText)
{      document.querySelector(':root').style.setProperty('--opacity', '0');
    let text="Draw!";
    if(winnerText!=null)
    {
        text=`Winner is ${winnerText}!`;
    }
    setTimeout(function(){gameOverArea.className="visible";},1000);
    
    gameOverText.innerText=text;
 
}








//New game fn
function statnewgame(){
    strike.className="strike";
    gameOverArea.className="hidden";
    boardState.fill(null);
    tile.forEach((tiles)=>{tiles.innerText="";
                           tiles.classList.remove("X-color");
                           tiles.classList.remove("O-color");                                 });
     turn=Player_X;
     document.querySelector(':root').style.setProperty('--opacity', '0');
    show_chooseplayer();
    document.getElementById("Session_draws").innerText=sessionStorage.getItem("draws");
    document.getElementById("Session_x_wins").innerText=sessionStorage.getItem("x_wins");
    document.getElementById("Session_o_wins").innerText=sessionStorage.getItem("o_wins");
    document.getElementById("Session_matches").innerText=sessionStorage.getItem("matches");

    document.getElementById("alltime_draws").innerText=localStorage.getItem("draws");
    document.getElementById("alltime_x_wins").innerText=localStorage.getItem("x_wins");
    document.getElementById("alltime_o_wins").innerText=localStorage.getItem("o_wins");
    document.getElementById("alltime_matches").innerText=localStorage.getItem("matches");
}







//choose player fn
console.log(document.getElementById("Player-select"));
function show_chooseplayer()
{
   document.getElementById("Player-select").classList.remove("hidden");
   
   document.getElementById("X").addEventListener("click",function(){turn="X"; document.querySelector(':root').style.setProperty('--opacity', '0.4');  document.getElementById("Player-select").classList.add("hidden");     won=0;   setHoverText();});
   document.getElementById("O").addEventListener("click",function(){turn="O"; document.querySelector(':root').style.setProperty('--opacity', '0.4');  document.getElementById("Player-select").classList.add("hidden");      won=0;  setHoverText(); });

   if(Number(localStorage.getItem("matches")<(Number(localStorage.getItem("o_wins"))+Number(localStorage.getItem("x_wins"))+Number(localStorage.getItem("draws"))))){localStorage.clear();}
}

