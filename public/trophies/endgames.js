export default [];

import { Chess } from 'chess.js';
import * as utils from '../utils/javachess';

export let getQueenBack = {
    title: 'Wiedergeburt',
    description: <>Hol dir deine Dame zurück und gewinne das Spiel.</>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    const playerhist = game.playerhistory;
    const opphist = game.opphistory;
    let conditionmet = 0
    let secondqmove
    //was a pawn promoted to a queen?
    for (let i = 0; i < playerhist.length; i++) {
        if(playerhist[i].includes('=Q')){
          conditionmet = 1
          secondqmove = i
          break
        }
      }
    if(conditionmet != 1){return false}
    conditionmet = 0
    //was a queen on the board before that
    let playbefore = 2 * secondqmove - game.addwb - 1
    let chess = utils.go_to_position_after_n_plays(game,playbefore)
    let fen = chess.fen().split(" ")[0];
    let queen = game.isWhite ? 'Q' : 'q'
    if(fen.includes(queen)){return false}
    //was the queen captured the move after that
    let moveafter = game.isWhite ? secondqmove : (secondqmove + 1)
    if(opphist.length > moveafter){ //in case opp resigned right after queening
    if(opphist[moveafter].includes('xQ')){return false}
    }
    //doesn't check if you lose your queen immediately and get ANOTHER one later
    return true
  }
}

export let secondQueen = {
    title: 'Zweite Dame',
    description: <>Hol dir eine zweite Dame und gewinne das Spiel.</>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    const playerhist = game.playerhistory;
    let queenplay
    let position
    let queen = game.isWhite ? 'Q' : 'q'
    //was a pawn promoted to a queen?
    for (let i = 0; i < playerhist.length; i++) {
        if(playerhist[i].includes('=Q')){
          queenplay = 2 * i + game.addwb //queen can be captured immediately after
          position = utils.go_to_position_after_n_plays(game,queenplay).fen().split(" ")[0];
          const count = position.split('').filter((char) => char === queen).length;
          if(count > 1){return true}     
        }
      }
    return false
  }
}

export let underpromote = {
    title: 'Mal was anderes',
    description: <>Wandle deinen Bauer in eine andere Figur als die Dame um. Gewinne das Spiel.</>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    const playerhist = game.playerhistory;
    let conditionmet = 0
    //was a pawn promoted to a queen? //can start on move 8
    for (let i = 8; i < playerhist.length; i++) {
        if(playerhist[i].includes('=')&&!(playerhist[i].includes('Q'))){
          conditionmet = 1
          break
        }
      }
    if(conditionmet != 1){return false}
    return true
  }
}

export let withTwoRooks = {
    title: '2 Türme',
    description: <>Gewinne mit 2 Türmen. <a href="https://nimble.li/2d55l5d3" target="_blank">(LINK)</a></>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    let lastfen = game.lastfen
    //define rook and rook of opponent
    let rook = game.isWhite ? 'R' : 'r'
    let opp_rook = game.isWhite ? 'r' : 'R'
    //check for bishop, knight and queen, pawns allowed
    if(lastfen.includes(opp_rook)||lastfen.includes('N')||lastfen.includes('n')||lastfen.includes('B')||lastfen.includes('b')||lastfen.includes('Q')||lastfen.includes('q')){return false}
    //count rooks
    const count = lastfen.split('').filter((char) => char === rook).length;
    if(count != 2){return false}
    return true
  }
}

export let withOneQueen = {
    title: '1 Dame',
    description: <>Gewinne mit einer Dame. <a href="https://nimble.li/qm2kgem2" target="_blank">(LINK)</a></>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(game.isBullet||!(game.isWon)){return false} 
    if(game.history().length < 6){return false} //not standard, but not just 2 moves
    let lastfen = game.lastfen
    //define pieces if white and black
    let rook = game.isWhite ? 'R' : 'r'
    let bishop = game.isWhite ? 'B' : 'b'
    let knight = game.isWhite ? 'N' : 'n'
    let queen = game.isWhite ? 'Q' : 'q'
    let pawn = game.isWhite ? 'P' : 'p'
    //check for bishop, knight and rooks, pawns NOT allowed
    if(lastfen.includes(bishop)||lastfen.includes(knight)||lastfen.includes(rook)||lastfen.includes(pawn)){return false}
    //count queens
    const count = lastfen.split('').filter((char) => char === queen).length;
    if(count != 1){return false}
    return true
  }
}

export let withOneRook = {
    title: '1 Turm',
    description: <>Gewinne mit einem Turm. <a href="https://nimble.li/6dwa4x9l" target="_blank">(LINK)</a></>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(game.isBullet||!(game.isWon)){return false} //not standard, but not just 2 moves
    if(game.history().length < 6){return false}
    let lastfen = game.lastfen
   //define rook and rook of opponent
   let rook = game.isWhite ? 'R' : 'r'
   let opp_rook = game.isWhite ? 'r' : 'R'
   //check for bishop, knight and queen, pawns allowed
   if(lastfen.includes(opp_rook)||lastfen.includes('N')||lastfen.includes('n')||lastfen.includes('B')||lastfen.includes('b')||lastfen.includes('Q')||lastfen.includes('q')){return false}
   //count rooks
    const count = lastfen.split('').filter((char) => char === rook).length;
    //console.log(game.header().Site)
    //console.log(count)
    if(count != 1){return false}
    return true
  }
}


export let withTwoBishops = {
    title: '2 Läufer',
    description: <>Gewinne mit 2 Läufern. <a href="https://nimble.li/omzv2pd6" target="_blank">(LINK)</a></>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(game.isBullet||!(game.isWon)){return false} //not standard, but not just 2 moves
    if(game.history().length < 10){return false}
    let lastfen = game.lastfen
    //define pieces if white and black
    let rook = game.isWhite ? 'R' : 'r'
    let bishop = game.isWhite ? 'B' : 'b'
    let knight = game.isWhite ? 'N' : 'n'
    let queen = game.isWhite ? 'Q' : 'q'
    let pawn = game.isWhite ? 'P' : 'p'
    //check for bishop, knight and queen, pawns NOT allowed
    if(lastfen.includes(rook)||lastfen.includes(knight)||lastfen.includes(queen)||lastfen.includes(pawn)){return false}
    //count rooks
    const count = lastfen.split('').filter((char) => char === bishop).length;
    //console.log(game.header().Site)
    //console.log(count)
    if(count != 2){return false}
    return true
  }
}


export let withBishopKnight = {
    title: '1 Läufer und 1 Pferd',
    description: <>Gewinne mit einem Läufer und einem Pferd. <a href="https://nimble.li/vdrzp29y" target="_blank">(LINK)</a> (Stufe 6+)</>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(game.isBullet||!(game.isWon)){return false} //not standard, but not just 2 moves
    if(game.history().length < 10){return false}
    if(game.isComputer){
      const complvl = parseInt(game.oppName.replace("lichess AI level ",""));
      if(complvl < 6) { return }
    }
    let lastfen = game.lastfen
    //define pieces if white and black
    let rook = game.isWhite ? 'R' : 'r'
    let bishop = game.isWhite ? 'B' : 'b'
    let knight = game.isWhite ? 'N' : 'n'
    let queen = game.isWhite ? 'Q' : 'q'
    let pawn = game.isWhite ? 'P' : 'p'
    //check for bishop, knight and queen, pawns NOT allowed
    if(lastfen.includes(rook)||lastfen.includes(queen)||lastfen.includes(pawn)){return false}
    //count rooks
    const bishops = lastfen.split('').filter((char) => char === bishop).length;
    const knights = lastfen.split('').filter((char) => char === knight).length;
    if(bishops != 1 || knights != 1){return false}
    return true
  }
}


export let onlyPawnsLeft = {
    title: 'Nur noch Bauern',
    description: <>Gewinne ein Spiel, in dem du an einem Punkt nur noch Bauern hattest.</>,
    pref: {
      win: 1,
      bullet: 3,
      computer: 2,
      time: 2
    },
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    let lastfen = game.lastfen
    //define pieces if white and black
    let rook = game.isWhite ? 'R' : 'r'
    let bishop = game.isWhite ? 'B' : 'b'
    let knight = game.isWhite ? 'N' : 'n'
    let queen = game.isWhite ? 'Q' : 'q'
    //check end position
    if(!(lastfen.includes(rook)||lastfen.includes(queen)||lastfen.includes(bishop)||lastfen.includes(knight))){return true}
    //then there must have been a promotion
    let conditionmet
    let promotions = []
    const playerhist = game.playerhistory;
    if(playerhist.length < 15){return false} //not happening in under 15 moves...
    //check if there were promotions and on what move
    for (let i = 14; i < playerhist.length; i++) {
        if(playerhist[i].includes('=')){
          conditionmet = 1
          promotions.push(2*i-game.addwb)
        }
      }
    if(conditionmet != 1){return false}
    //go through all promotions and check the position for only pawns
    for (let i = 0; i < promotions.length; i++){
       const position = utils.go_to_position_after_n_plays(game,promotions[i]-1+2).fen().split(" ")[0];
       if(!(position.includes(rook)||position.includes(queen)||position.includes(bishop)||position.includes(knight))){return true}
    }
    //could count pawns to check for 1 pawn only
    return false
  }
}