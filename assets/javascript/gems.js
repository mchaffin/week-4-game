// Global Variables
var gems = $("#gems");
var yourScore = 0;
var wins = 0;
var losses = 0;

// Game Object 
var game = {
    theNumber: 0,
    theNumMin: 19,
    theNumMax: 120,
    theGemMin: 1,
    theGemMax: 12,
    numGems: 4,
    gemImage: "",
    
    // initGame Function - initializes the game
    initGame: function () 
    {       
        // show game scores
        document.getElementById("pWins").innerHTML = "Wins: "+wins;
        document.getElementById("pLosses").innerHTML = "Losses: "+losses;

        // generate random number to guess
        this.theNumber = this.getRandomInt(this.theNumMin,this.theNumMax);
        
        // show the number to player
        $("#magic-number").text(this.theNumber);

        // loop to create gems
        for ( i = 0; i < this.numGems; i++) {

            // create new image
            this.gemImage = $("<img>");

            // add class to each image
            this.gemImage.addClass("gem-image");

            // add image source
            this.gemImage.attr("src", "assets/images/gem"+i+".jpg");

            // add random number value to each gem 
            this.gemImage.attr("gem-value", this.getRandomInt(this.theGemMin,this.theGemMax) );

            // append images to html
            gems.append(this.gemImage);
        }
    },

    // resetGame Function - reset all arrays and variables, clear screen
    resetGame: function() {
        //reset score for user
        yourScore = 0;
        $("#your-number").text(yourScore);
        //select the gems to remove
        var gemsToRemove = $(".gem-image");
        gemsToRemove.remove();
    
    },

    // get random number between two values
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }

  }; //end game object
  
// Game Events
gems.on("click", ".gem-image", function() {

    // select gem value from clicked gem
    var gemValue = ($(this).attr("gem-value"));
    
    // convert gem value string to integer
    gemValue = parseInt(gemValue);
    
    // add gem value to users score
    yourScore += gemValue;

    // show the number to player
     $("#your-number").text(yourScore);

    // check to see if user has won or lost
    if (yourScore === game.theNumber) {
        // let user know they've won
        alert("You have the Magic powers!!");
        // add win
        wins++;
        // reset game
        game.resetGame();
        game.initGame();
    }
    else if (yourScore >= game.theNumber) {
        // let user know they've lost
        alert("You must continue to seek the Magic power.");
        // add loss
        losses++;
        // reset game
        game.resetGame();
        game.initGame();
    }

})