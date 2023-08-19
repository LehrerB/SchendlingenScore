export default [];

function wonVsHigherElo(diff1, diff2) { //returns true if opponent is higher between range
  return function(game) {               //ignores diff2 if it's smaller than diff1 (no upper limit)
    if(!(game.isWon)){return false}
    let plElo = parseInt(game.isWhite ? game.header().WhiteElo : game.header().BlackElo)
    let opElo = parseInt(game.isWhite ? game.header().BlackElo : game.header().WhiteElo)
  if(diff1 < diff2) {return (plElo + diff1 <= opElo)&&!(plElo + diff2 <= opElo)}
  return plElo + diff1 <= opElo;
  }
}

export let small_underdog = {
  title: 'Small underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 40 ELO mehr hat.',
  pref: {
    win: 1,
    bullet: 2,
    computer: 3,
    time: 2
  },
  check: wonVsHigherElo(40,120)
}

export let middle_underdog = {
  title: 'Underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 80 ELO mehr hat.',
  pref: {
    win: 1,
    bullet: 2,
    computer: 3,
    time: 2
  },
  check: wonVsHigherElo(80,120)
}

export let big_underdog = {
  title: 'Big underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 120 ELO mehr hat.',
  pref: {
    win: 1,
    bullet: 2,
    computer: 3,
    time: 2
  },
  check: wonVsHigherElo(120,0)
}


let opponents_school_unique = []

export let new_opponent = {
  title: 'Verschiedene Gegner',
  description: 'Spiele gegen verschiedene Schülerinnen der Schule.',
  pref: {
    win: 2,
    bullet: 3,
    computer: 3,
    time: 2
  },
  check: function(game) {
    if(!(game.oppName.toLowerCase().includes("msch-")||game.oppName.toLowerCase().includes("misch-"))){
      return false
    }
    if(opponents_school_unique.includes(game.oppName.toLowerCase())){
      return false
    }
    opponents_school_unique.push(game.oppName.toLowerCase());
    console.log(opponents_school_unique);
    return true
  }
}