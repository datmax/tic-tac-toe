//GLOBAL VARIABLES
var charChoosen = false;
var otherChoosen = false;


//----------CLASSES------------
class Board{
    constructor(){
        this.table = {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
        };
    }

    clearTable(){
        for(let i = 1; i < 10; i++){
            this.table[i] = "";
        }
    }

    isFull(){
        for(var i in this.table){
            if(this.table[i] === null){
                return false;
            } 
        }
        return true;
    }

}

class Player{
    constructor(){
        this.turn = true;

    }
    setOtherCharacter(){
        this.otherCharacter = this.character === "0" ? "x" : "0";
    }

    reset(){
        this.turn = true;
    }

}
//------------------------------------------------------------



var board = new Board();
var player1 = new Player();



newGame = () => {
    player1.reset();
    otherChoosen = false;
    charChoosen = false;
    checkForEvents();
}


hasWon = () => {
    

    function win(char){
        $("#main-table").append("<tr><td class='action'>" + char + " won!</td></tr>");
        $(".action").css("opacity", "1");

        newGame();
        

    }

    for(let i = 1; i < 10; i+= 3){
        //ROWS
        if(board.table[i] === 'x' && board.table[i+1] === 'x' && board.table[i+2] === 'x' ){
            win('x');
        }
        else if(board.table[i] === '0' && board.table[i+1] === '0' && board.table[i+2] === '0'){
            win('0');
            
        }
    }
    for(let i = 1; i < 10; i++){
        //COLUMNS
        if(board.table[i] === '0' && board.table[i+3] === '0' && board.table[i+6] === '0'){
            win('0');
            ;
            
        }
        else if(board.table[i] === 'x' && board.table[i+3] === 'x' && board.table[i+6] === 'x'){
            win('x');
            
        }

    }
    if(board.table[1] === 'x' && board.table[5] === 'x' && board.table[9] === 'x' ){
            win('x');
            
            
    }
    else if(board.table[1] === '0' && board.table[5] === '0' && board.table[9] === '0' ){
            win('0');
            
            
    }
    if(board.table[3] === 'x' && board.table[5] === 'x' && board.table[7] === 'x' ){
            win('x');
            
            
    }
    if(board.table[3] === '0' && board.table[5] === '0' && board.table[7] === '0' ){
            win('0');
            
            
    }
    
}

AiMove = () => {  
    if(!board.isFull()){     
        var move = Math.floor((Math.random() * 9)) +1;
        console.log(board.table[move]);
        console.log(board.table[move] === null);
        if(board.table[move] === null){
            console.log(board.table);
            console.log(move);
            board.table[move] = player1.otherCharacter;
            $("#"+move).text(player1.otherCharacter);
            player1.turn = true;
            hasWon();
        }
        else{
            AiMove();
        }
    }
    
}


checkForEvents = () => {
    if(charChoosen === true && otherChoosen === true){
        player1.setOtherCharacter();
        
        if(player1.enemy === "friend"){
            playWithFriend();
        }
        
        else{

            playWithPc();
        }
    }
    else if (charChoosen === false && otherChoosen === false){
        $("#bot-form").fadeIn();
        $("#top-form").fadeIn();
    }
}

clear = () =>{
    $("#main-table").html("");
    $(".square").text("");
}


playWithPc = () =>{
    for(let i = 1; i < 10; i++){
        $("#" + i.toString()).text(board.table[i]);
    }
    $("td").click(function(){
        if($(this).text() === ""){  
            if(player1.turn === true){
                $(this).text(player1.character);
                board.table[this.id] = player1.character;
                player1.turn = false;
                hasWon();
            }
        }
    if(player1.turn === false){
        setTimeout(AiMove, 500);
    }

    });
}

playWithFriend = () =>{
        for(let i = 1; i < 10; i++){
            $("#" + i.toString()).text(board.table[i]);
    }
        $("td").click(function(){
            if($(this).text() === ""){  
                if(player1.turn === true){
                    $(this).text(player1.character);
                    board.table[this.id] = player1.character;
                    player1.turn = false;
                }
                else{
                    $(this).text(player1.otherCharacter); 
                    board.table[this.id] = player1.otherCharacter;                 
                    player1.turn = true;
                }
            }
            hasWon();
                
        });

}



$(document).ready(function(){

    $("button").click(function(){
        if($(this).hasClass("char")){
            player1.character = this.value;
            player1.setOtherCharacter();
            charChoosen = true;
            $("#top-form").fadeOut(200);

        }
        else if($(this).hasClass("other")){
            if(this.value === "friend"){
                otherChoosen = true;   
                player1.enemy = this.value;
                $("#bot-form").fadeOut(200);
            }

            else{
                player1.enemy = this.value;                
                $("#bot-form").fadeOut(200);
                otherChoosen = true;
            }
        }

    $("#clear").click(function(){
        clear();
    });
        checkForEvents();
    });

});