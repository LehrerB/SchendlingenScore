export default [];

import { Chess } from 'chess.js';
import * as utils from '../utils/javachess';

export let getQueenBack = {
    title: 'Wiedergeburt',
    description: <p>Hol dir deine Dame zurück und gewinne das Spiel.</p>,
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
    if(opphist[moveafter].includes('xQ')){return false}
    //doesn't check if you lose your queen immediately and get ANOTHER one later
    return true
  }
}

export let secondQueen = {
    title: 'Zweite Dame',
    description: <p>Hol dir eine zweite Dame und gewinne das Spiel.</p>,
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
    description: <p>Wandle deinen Bauer in eine andere Figur als die Dame um. Gewinne das Spiel.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    const playerhist = game.playerhistory;
    let conditionmet = 0
    let secondqmove
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