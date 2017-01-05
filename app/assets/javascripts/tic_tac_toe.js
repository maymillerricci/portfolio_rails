var ticTacToe = (function() {
  "use strict";

  var game;

  // on click start button, hide start page and show board
  $("#start-game").on("click", function(e) {
    e.preventDefault();
    $("#start").addClass("hidden");
    $("#board").removeClass("hidden");

    // instantiate game object starting with player 1
    game = new Game(1);
  });

  // on click new game button, hide finish page and reset game
  $("#new-game").on("click", function(e) {
    e.preventDefault();
    $("#finish").addClass("hidden");
    $("#board").removeClass("hidden");

    game.resetBoard();
    game = new Game(1);
  });

  // show light x/o over square if not filled on hover
  $(".box").on("mouseenter", function() {
    if (!($(this).hasClass("filled"))) {
      $(this).addClass("hover-" + game.playerNumber);
    }
  });

  // remove x/o on stop hovering
  $(".box").on("mouseleave", function() {
    $(this).removeClass("hover-1").removeClass("hover-2");
  });

  // play turn on click a square if not filled
  $(".box").on("click", function() {
    if (!($(this).hasClass("filled"))) {
      game.playHumanTurn($(this));
    }
  });

  // game object constructor
  function Game(playerNumber) {
    this.playerNumber = playerNumber;
    $("#player" + this.playerNumber).addClass("active");
    this.winningIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    this.player1 = prompt("Player 1, enter your name:");
    this.player2 = prompt("Player 2, enter your name, or to play against the computer type Computer:");
    $("#board header").after("<div class='name name-player-1'>" + this.player1 + "</div>");
    $("#board header").after("<div class='name name-player-2'>" + this.player2 + "</div>");
    $(".name-player-" + this.playerNumber).addClass("active");

    if (this.player2.toLowerCase() === "computer") {
      this.mode = "computer";
    }
  }

  // fill in square with x/o of clicked box and finish turn
  // if in play against computer mode and it's the computer's turn, computer plays its turn
  Game.prototype.playHumanTurn = function(clickedBox) {
    clickedBox.addClass("filled").addClass("box-filled-" + this.playerNumber);

    this.finishTurn();

    if (this.mode === "computer" && this.playerNumber === 2) {
      this.playComputerTurn();
    }
  };

  // computer fills in random unfilled box and finishes turn
  Game.prototype.playComputerTurn = function() {
    var unfilledBoxes = $(".box:not(.filled)");
    var boxToFill = getRandomElement(unfilledBoxes);
    $(boxToFill).addClass("filled").addClass("box-filled-" + this.playerNumber);

    this.finishTurn();
  };

  // check for win, switch players, remove active classes,
  // and set active classes to indicate next player's turn
  Game.prototype.finishTurn = function() {
    this.checkForWin();
    this.playerNumber = this.switchPlayer();
    $(".players").removeClass("active");
    $(".name").removeClass("active");
    $("#player" + this.playerNumber).addClass("active");
    $(".name-player-" + this.playerNumber).addClass("active");
  };

  // switch between player 1 and 2
  Game.prototype.switchPlayer = function() {
    if (this.playerNumber === 1) {
      return 2;
    }
    else {
      return 1;
    }
  };

  // determine if o or x has won the game, if so show win screen
  // if all squares filled and no winner, show tie screen
  Game.prototype.checkForWin = function() {
    var xsOs = this.getXsOs();
    var winner = this.check3InARow(xsOs.oIndexes, xsOs.xIndexes);

    if (winner === "o") {
      this.finishGame("screen-win-one", this.player1 + " is the winner!");
    } else if (winner === "x") {
      this.finishGame("screen-win-two", this.player2 + " is the winner!");
    } else if (xsOs.oIndexes.length + xsOs.xIndexes.length === 9) {
      this.finishGame("screen-win-tie", "It's a tie!");
    }
  };

  // return arrays for o and x of the indexes of the boxes they have filled in
  Game.prototype.getXsOs = function() {
    var oIndexes = [];
    var xIndexes = [];
    $(".box").each(function(i) {
      if ($(this).hasClass("box-filled-1")) {
        oIndexes.push(i);
      } else if ($(this).hasClass("box-filled-2")) {
        xIndexes.push(i);
      }
    });
    return {oIndexes: oIndexes, xIndexes: xIndexes};
  };

  // for each set of winning indexes, check if o or x has them all filled in
  Game.prototype.check3InARow = function(oIndexes, xIndexes) {
    for (var i = 0; i < this.winningIndexes.length; i++) {
      if (arrayIsSubset(this.winningIndexes[i], oIndexes)) {
        return "o";
      } else if (arrayIsSubset(this.winningIndexes[i], xIndexes)) {
        return "x";
      }
    }
  };

  // hide board and show finish win/tie screen with passed in css class and message
  Game.prototype.finishGame = function(cssClass, message) {
    $("#board").addClass("hidden");
    $("#finish").removeClass("hidden").addClass(cssClass);
    $(".message").text(message);
  };

  // reset game board
  Game.prototype.resetBoard = function() {
    $(".players").removeClass("active");
    $(".box").removeClass("filled").removeClass("box-filled-1").removeClass("box-filled-2");
    $("#finish").removeClass("screen-win-one").removeClass("screen-win-two").removeClass("screen-win-tie");
    $(".name").remove();
  };

  // check if all items in subset array are in larger array
  function arrayIsSubset(subsetArray, largeArray) {
    return subsetArray.every(function(val) { return largeArray.indexOf(val) >= 0; });
  }

  // get random element from array of objects
  function getRandomElement(objects) {
    var randomNumber = Math.floor(Math.random() * objects.length);
    return objects[randomNumber];
  }
}());
