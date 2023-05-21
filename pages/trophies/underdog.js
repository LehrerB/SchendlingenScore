
function wonVsHigherElo(diff) {
  return function(game) {
    let plElo = parseInt(game.isWhite ? game.header().WhiteElo : game.header().BlackElo)
    let opElo = parseInt(game.isWhite ? game.header().BlackElo : game.header().WhiteElo)
    return plElo + diff <= opElo;
  }
}

export let small_underdog = {
  title: 'The small underdog',
  description: 'Won against someone whose ELO is at least 40 higher.',
  check: wonVsHigherElo(40)
}

export let middle_underdog = {
  title: 'The underdog',
  description: 'Won against someone whose ELO is at least 80 higher.',
  check: wonVsHigherElo(80)
}

export let big_underdog = {
  title: 'The big underdog',
  description: 'Won against someone whose ELO is at least 120 higher.',
  check: wonVsHigherElo(120)
}
