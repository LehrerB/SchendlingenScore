
function wonVsHigherElo(diff) {
  return function(game) {
    let plElo = parseInt(game.isWhite ? game.header().WhiteElo : game.header().BlackElo)
    let opElo = parseInt(game.isWhite ? game.header().BlackElo : game.header().WhiteElo)
    return plElo + diff <= opElo;
  }
}

export let small_underdog = {
  title: 'Small underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 40 ELO mehr hat.',
  check: wonVsHigherElo(40)
}

export let middle_underdog = {
  title: 'Underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 80 ELO mehr hat.',
  check: wonVsHigherElo(80)
}

export let big_underdog = {
  title: 'Big underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 120 ELO mehr hat.',
  check: wonVsHigherElo(120)
}
