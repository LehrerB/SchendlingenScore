export default [];
import * as utils from '../utils/javachess';

export let didNotLose = {
  title: 'Nicht verloren',
  description: <>Entweder gewinnen oder unentschieden spielen.</>,
  check: function(game) {
    return game.noLoss
  }
}

export let wonWithWhite = {
  title: 'Gewinne mit Weiß',
  description: <>Gewinne ein Spiel mit den <i>weißen</i> Figuren.</>,
  pref: {
    win: 1,
    bullet: 3,
    computer: 2,
    time: 2
  },
  check: function(game) {
    return game.isWhite && game.header().Result === '1-0'
  }
}

export let wonWithBlack = {
  title: 'Gewinne mit Schwarz',
  description: <>Gewinne ein Spiel mit den <i>schwarzen</i> Figuren.</>,
  pref: {
    win: 1,
    bullet: 3,
    computer: 2,
    time: 2
  },
  check: function(game) {
    return game.isBlack && game.header().Result === '0-1';
  }
}

export let drawWithWhite = {
  title: 'Drew as white',
  description: 'Drew with the white pieces.',
  check: function(game) {
    return game.isWhite && game.header().Result === '1/2-1/2';
  }
}

export let drawWithBlack = {
  title: 'Drew as black',
  description: 'Drew with the black pieces.',
  check: function(game) {
    return game.isBlack && game.header().Result === '1/2-1/2';
  }
}


export let favoredByTime = {
  title: 'Favored by time',
  description: 'Opponent ran out of time.',
  check: function(game) {
    return game.oppNoTime;
  }
}


export let justTwoKings = {
  title: 'Bis zum Schluss',
  description: 'Gib nicht auf und spiele, bis nur noch zwei Könige übrig sind.',
  pref: {
    win: 3,
    bullet: 2,
    computer: 2,
    time: 3
  },
  check: function(game) {
  //draw, standard game, bullet allowed
  if(!(game.isStandard)||!(game.header().Result === '1/2-1/2')){return false}
  let lastfen = game.lastfen
  //is board empty
  if(lastfen.includes('p')||lastfen.includes('r')||lastfen.includes('q')||lastfen.includes('b')||lastfen.includes('n')){return false}
  if(lastfen.includes('P')||lastfen.includes('R')||lastfen.includes('Q')||lastfen.includes('B')||lastfen.includes('N')){return false}
  //was the last opponent move a x?
  if(game.playerhistory[game.playerhistory.length-1].includes('x')){return true}
  return false
  }
}


export let drawWithKing = {
  title: 'Pattser',
  description: 'Patt nur mit dem König und Bauern, wenn dein Gegner deutlich mehr Material hat.',
  pref: {
    win: 3,
    bullet: 2,
    computer: 2,
    time: 3
  },
  check: function(game) {
  //draw, standard game, bullet allowed
  if(!(game.isStandard)||!(game.header().Result === '1/2-1/2')){return false}
  let lastfen = game.lastfen
  //is board empty
  let rook = game.isWhite ? 'R' : 'r'
  let bishop = game.isWhite ? 'B' : 'b'
  let knight = game.isWhite ? 'N' : 'n'
  let queen = game.isWhite ? 'Q' : 'q'
  let pawn = game.isWhite ? 'P' : 'p'
  if(lastfen.includes(rook)||lastfen.includes(queen)||lastfen.includes(bishop)||lastfen.includes(knight)){return false}
  //did the opponent make the last move?

  //did it end on time?
  if(game.oppNoTime){return false}
  //does the opponent have more material?
  let sign = game.isWhite ? 1 : -1;
  let material = sign * utils.get_material_score(game)
  if(material < -4){return true}
  return false
  }
}