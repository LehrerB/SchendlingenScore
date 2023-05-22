export default [];

export let check_for_pawn_word = (game, word) => {
    //get player history
    const hist = game.history();
    const addwb = game.isWhite ? 1 : 0;
    let playerhist = hist.filter((_, index) => index % 2 !== addwb);
    //start checking for correct letters
    for(let i = 0; i < word.length; i++){
        if(!(playerhist[i].includes(word[i]))){return false}
    }
    //check if no pieces were used
    for(let i = 0; i < word.length; i++){
        if(playerhist[i].includes('N')||playerhist[i].includes('B')||playerhist[i].includes('R')||playerhist[i].includes('Q')||playerhist[i].includes('K')){return false}
    }
    return true
  }

  export let spellGG = {
    title: 'GG',
    description: 'Buchstabiere am Anfang das Wort "gg" mit deinen Bauern und gewinne das Spiel.',
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
      return check_for_pawn_word(game,'gg');
    }
  }

  export let spellDAB = {
    title: 'DAB',
    description: 'Buchstabiere am Anfang das Wort mit deinen Bauern und gewinne das Spiel.',
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
      return check_for_pawn_word(game,'dab');
    }
  }

  export let spellHaha = {
    title: 'Haha',
    description: 'Buchstabiere am Anfang das Wort mit deinen Bauern und gewinne das Spiel.',
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
      return check_for_pawn_word(game,'haha');
    }
  }

  export let spellAffe = {
    title: 'Affe',
    description: 'Buchstabiere am Anfang das Wort mit deinen Bauern und gewinne das Spiel.',
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
      return check_for_pawn_word(game,'affe');
    }
  }

  export let spellAchbach = {
    title: 'Achbach',
    description: 'Buchstabiere am Anfang das Wort mit deinen Bauern und gewinne das Spiel.',
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
      return check_for_pawn_word(game,'achbach');
    }
  }

  export let spellGaga = {
    title: 'GAGA',
    description: 'Buchstabiere am Anfang das Wort mit deinen Bauern und gewinne das Spiel.',
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
      return check_for_pawn_word(game,'gaga');
    }
  }