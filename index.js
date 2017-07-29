var board = {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,
        seven: null,
        eight: null,
        nine: null,
    };

class Player{
    constructor(character, score, enemy){
        this.character = character;
        this.turn = true;

    }

    setOtherCharacter(){
        this.otherCharacter = this.character === "0" ? "x" : "0";
    }

}

class Pc{
    constructor(character){
        this.character = character;
        this.depth = 9;
    }

};




var $square = $(".square");
var charChoosen = false;
var otherChoosen = false;

var player1 = new Player();

var actions = [];

checkForEvents = () => {
    if(charChoosen === true && otherChoosen === true){
        player1.setOtherCharacter();
        console.log(player1);
        
        if(player1.enemy === "friend"){
            playWithFriend();
        }
        
        else{
            var pc = new Pc(player1.otherCharacter);
            playWithPc();
        }
    }
}

clear = (data) =>{
    
}

createAction = (action) => {
}

playWithPc = () =>{
    if(player1.turn === true){
    $(this).text(player1.character);

    player1.turn = false;
    pc.makeMove();
    }
}

playWithFriend = () =>{
        $square.click(function(){
            console.log($(this).text());
            if($(this).text() === ""){     
                if(player1.turn === true){
                    $(this).text(player1.character);
                    player1.turn = false;
                }
                else{
                    $(this).text(player1.otherCharacter);
                    player1.turn = true;
                }
            }

    });
}



$(document).ready(function(){

    $("button").click(function(){
        if($(this).hasClass("char")){
            player1.character = this.value;
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
        checkForEvents();
    });

});