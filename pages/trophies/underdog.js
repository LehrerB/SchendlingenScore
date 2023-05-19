
function wonVsHigherElo(diff) {
  return function(game) {
    let plElo = parseInt(game.isWhite ? game.header().WhiteElo : game.header().BlackElo)
    let opElo = parseInt(game.isWhite ? game.header().BlackElo : game.header().WhiteElo)
    return plElo + diff <= opElo;
  }
}

export let small_underdog = {
  title: 'The small underdog',
  description: 'Won against someone whose ELO is at least 20 higher.',
  check: wonVsHigherElo(20)
}

export let big_underdog = {
  title: 'The underdog',
  description: 'Won against someone whose ELO is at least 200 higher.',
  check: wonVsHigherElo(200)
}
