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
console.log(tile);


function setHoverText(){

    tile.forEach((tiles)=>{ tiles.classList.remove("x-hover"); tiles.classList.remove("o-hover");})
    const hoverClass=  `${turn.toLowerCase()}-hover`;

    tile.forEach((tiles)=>{ if(tiles.innerText==""){tiles.classList.add(hoverClass);};  })
}

setHoverText();



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
        boardState[tileNumber-1]=Player_X;
        turn=Player_O;
    }

    else{
        tile.innerText=Player_O;
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


function checkWinner(){

    const allTilesfilled= boardState.every((tile)=> tile!=null);
    if(allTilesfilled){ gameOverScreen(null);}
    
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
        }
    }
}

function gameOverScreen(winnerText)
{ 
    let text="Draw!";
    if(winnerText!=null)
    {
        text=`Winner is ${winnerText}!`;
    }
    setTimeout(function(){gameOverArea.className="visible";},1000);
    
    gameOverText.innerText=text;
 

}


function statnewgame(){
    strike.className="strike";
    gameOverArea.className="hidden";
    boardState.fill(null);
    tile.forEach((tiles)=>(tiles.innerText=""));
    turn=Player_X;
    won=0;
    setHoverText();

}