/*-------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------Initialise required variables---------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
var gamePattern = [];                                   // array for game pattern
var buttonColors = ["red", "blue", "green", "yellow"];  // values of buttons
var userClickPattern = [];                              // array of user clicks
var level = 0;                                          // level number
var started = false;                                    // flag for starting game
var userChoosenColor = "None";


/*-------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------STARTS THE GAME----------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
$(document).keydown((event) => {
    if (!started && event.key === "p") {                // if P is pressed then game will start
        setTimeout(nextSequence, 500);
        started = true;                                 // flag is set to true hence pressing p again won't reset game
    }
    else if (event.key === "r")
        location.reload();
});


/*-------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------SEQUENCE OF NEXT GAME------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
const nextSequence = () => {
    var randInt = Math.floor(Math.random() * 4);        // generates random number between 0-3
    var randomChoosenColor = buttonColors[randInt];     // fetches the respective color value from that random number
    gamePattern.push(randomChoosenColor);               // appends that color value to game pattern
    animateButton(randomChoosenColor);                  // displays animation of button
    makeSound(randomChoosenColor);                      // plays sound of that button
    $("#level-title").text("Level " + level);           // changes the title of page to current level
    userClickPattern = [];                              // resets the user click pattern on each level
    level++;                                            // increases level by 1
}


/*-------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------CHECKS WHICH BUTTON IS CLICKED--------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
$(".btn").on("click", () => {
    if (started) {
        userChoosenColor = $(this).attr("id");          // takes the id i.e. color value of button which is clicked
        checkClick(userChoosenColor)                    // calls check clicks function
    }
});


/*-------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------Checks for keyboard clicks--------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
$(document).keydown((event) => {
    switch (event.key) {
        case "q":                                       // if q is pressed then color value = green
            userChoosenColor = "green";
            break;

        case "w":                                       // if w is pressed then color value = red
            userChoosenColor = "red";
            break;

        case "s":                                       // if s is pressed then color value = blue                                                       
            userChoosenColor = "blue";
            break;

        case "a":                                       // if a is pressed then color value = yellow
            userChoosenColor = "yellow";
            break;

        default:
            console.log(event.key, "wrong key");        // logs the wrong key
            break;
    }

    // only if above four keys are pressed and the game is started then calls the checkClick function 
    if (started === true && (event.key === "w" || event.key === "q" || event.key === "a" || event.key === "s"))
        checkClick(userChoosenColor);
});


/*-------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------Checks keyborad or mouse clicks on buttons--------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
const checkClick = (color_id) => {
    userClickPattern.push(color_id);                    // appends the color value which user clicks in user click pattern
    animateButton(color_id);                            // animates the button
    makeSound(color_id);                                // plays specific sound
    checkAnswer(userClickPattern.length - 1);           // calls check answer and passed the user's playing level
    // and not the actual game level 
}


/*-------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------MAIN FUNCTION WHICH CHECKS THE ANSWER-----------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
const checkAnswer = (current_level) => {

    // here the cuurent_level we get is the user's playing level, for eg: if game pattern is red, blue, green
    // then red=0, blue=1, green=2 so user will first click on red and hence value of current_level will be 0
    // then 1, 2 so on.
    // So in first if statement we check that the recent color clicked by user is equal to corresponding value
    // on that level in game pattern. If yes then we go on to check the length of both arrays and if it matches
    // then we call next sequence otherwise we wait for users next input

    if (gamePattern[current_level] === userClickPattern[current_level]) {
        if (gamePattern.length === userClickPattern.length)
            setTimeout(nextSequence, 1000);             // calls next sequence after 1 sec of click
    }
    else {
        startOver();                                    // if patterns don't match then game gets over
    }
}


/*-------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------Plays SOUND------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
const makeSound = (color_id) => {
    var sound = new Audio("sounds/" + color_id + ".mp3");   // creates new object for playing sound file
    sound.play();                                           // plays sound    
}


/*-------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ADDS ANIMATION-----------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
const animateButton = (color_id) => {
    var button = $("#" + color_id)                          // selects the button by its id

    button.fadeIn(100).fadeOut(100).fadeIn(100);            // flash animation
    button.addClass("pressed");                             // adds the button pressed class

    setTimeout(() => {
        button.removeClass("pressed");                      // removes the pressed class after 100 miliseconds
    }, 100);
}


/*-------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------RESTART------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------*/
const startOver = () => {
    makeSound("wrong");                                     // plays the wrong sound when game gets over
    $("body").addClass("game-over")                         // adds the game-over class
    $("#level-title").text("Game Over, Press P Key to Restart or Press R key to exit"); // changes the title
    setInterval(() => {
        $("body").removeClass("game-over");                 // removes the game-over class after 200ms
    }, 200);
    started = false;                                        // resets the started flag
    level = 0;                                              // resets the game level
    gamePattern = [];                                       // resets the game pattern array
    userClickPattern = [];                                  // resets the user click pattern      
}

