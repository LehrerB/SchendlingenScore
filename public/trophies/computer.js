export default [];

export let againstComputer = {
    title: 'Computer',
    description: 'Played against Computer.',
    check: function(game) {
      return game.isComputer;
    }
  }

//vs Computer
export let wonVsComputer1 = {
    title: 'Computer Stufe 1',
    description: <> Besiege den Computer auf Stufe 1.</>,
    check: function(game) {
    return (game.isComputer && game.isWon && game.isStandard && game.oppName.includes("1"))
  }
}

export let wonVsComputer2 = {
  title: 'Computer Stufe 2',
  description: <>Besiege den Computer auf Stufe 2.</>,
  check: function(game) {
  return (game.isComputer && game.isWon && game.isStandard && game.oppName.includes("2"))
}
}

export let wonVsComputer3 = {
  title: 'Computer Stufe 3',
  description: <>Besiege den Computer auf Stufe 3.</>,
  check: function(game) {
  return (game.isComputer && game.isWon && game.isStandard && game.oppName.includes("3"))
}
}

export let wonVsComputer4 = {
  title: 'Computer Stufe 4',
  description: <>Besiege den Computer auf Stufe 4.</>,
  check: function(game) {
  return (game.isComputer && game.isWon && game.isStandard && game.oppName.includes("4"))
}
}

export let wonVsComputer8NoQueen = {
  title: 'Stufe 8 ohne Dame',
  description: <>Besiege den Computer auf Stufe 8 ohne Dame. <a href="https://lichess.org/editor/rnb1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR_w_KQkq_-_0_1?color=white">(LINK)</a></>,
  check: function(game) {
  if(game.isStandard){return false}
  return (game.isComputer && game.isWon && game.oppName.includes("8") && (game.header().FEN === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1KBNR w KQkq - 0 1')||(game.header().FEN === 'rnb1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'))

}
}

//Matt statt Patt

export let mattStattPatt1 = {
  title: 'Matt statt Patt Level 1',
  description: <><a href="https://lichess.org/editor/8/8/4k3/8/6R1/1R1K3R/R7/8_w_-_-_0_1?color=white">Matt statt Patt Level 1</a> (Computer Stufe 2+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 2 && (game.header().FEN === '8/8/4k3/8/6R1/1R1K3R/R7/8 w - - 0 1'))

}
}

export let mattStattPatt2 = {
  title: 'Matt statt Patt Level 2',
  description: <><a href="https://lichess.org/editor/1k6/7p/8/8/8/4P2P/PPP5/3R1K2_w_-_-_0_1?color=white">Matt statt Patt Level 2</a> (Computer Stufe 2+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 2 && (game.header().FEN === '1k6/7p/8/8/8/4P2P/PPP5/3R1K2 w - - 0 1'))

}
}

export let mattStattPatt3 = {
  title: 'Matt statt Patt Level 3',
  description: <><a href="https://lichess.org/editor/8/5k1p/8/3P4/8/7P/8/3R1K2_w_-_-_0_1?color=white">Matt statt Patt Level 3</a> (Computer Stufe 2+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 2 && (game.header().FEN === '8/5k1p/8/3P4/8/7P/8/3R1K2 w - - 0 1'))

}
}

export let mattStattPatt4 = {
  title: 'Matt statt Patt Level 4',
  description: <><a href="https://lichess.org/editor/8/8/5Pk1/p3P3/2P5/1P6/P3K3/8_w_-_-_0_1?color=white">Matt statt Patt Level 4</a> (Computer Stufe 2+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 2 && (game.header().FEN === '8/8/5Pk1/p3P3/2P5/1P6/P3K3/8 w - - 0 1'))

}
}

export let mattStattPatt5 = {
  title: 'Matt statt Patt Level 5',
  description: <><a href="https://lichess.org/editor/8/7p/1kP5/1P3p2/6p1/8/4KPPP/8_w_-_-_0_1?color=white">Matt statt Patt Level 5</a> (Computer Stufe 6+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 6 && (game.header().FEN === '8/7p/1kP5/1P3p2/6p1/8/4KPPP/8 w - - 0 1'))

}
}

export let mattStattPatt6 = {
  title: 'Matt statt Patt Level 6',
  description: <><a href="https://lichess.org/editor/8/8/8/4k3/8/8/8/3RKR2_w_-_-_0_1?color=white">Matt statt Patt Level 6</a> (Computer Stufe 6+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 6 && (game.header().FEN === '8/8/8/4k3/8/8/8/3RKR2 w - - 0 1'))

}
}


export let basicPawnEndgame1 = {
  title: '1 Bauer im Endspiel',
  description: <><a href="https://lichess.org/editor/4k3/8/8/8/8/8/4P3/4K3_w_-_-_0_1?color=white">Gewinne dieses klassische Endspiel gegen den Computer.</a> (Stufe 6+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 6 && (game.header().FEN === '4k3/8/8/8/8/8/4P3/4K3 w - - 0 1'))

}
}


export let basicPawnEndgame2 = {
  title: 'Bauer gegen Bauer',
  description: <><a href="https://lichess.org/editor/8/8/8/4p1K1/2k1P3/8/8/8_w_-_-_0_1?color=white">Gewinne dieses klassische Endspiel gegen den Computer.</a> (Stufe 6+)</>,
  check: function(game) {
  if(game.isStandard || !(game.isComputer) || !(game.isWon)){return false}
  const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
  return (game.isWon && complvl >= 6 && (game.header().FEN === '8/8/8/4p1K1/2k1P3/8/8/8 w - - 0 1'))

}
}