export default [];
import * as utils from '../utils/javachess';

export let castleWithCheck = {
    title: 'O-O+',
    description: <>Rochiere und gibt gleichzeitig Schach. Gewinne anschließend das Spiel.</>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
    const playerhist = game.playerhistory
    return game.noLoss && playerhist.includes('O-O+') || playerhist.includes('O-O-O+')
  }
}

export let enpeasant = {
  title: 'En Peasant',
  description: <>Schlage einen Bauern En Peasant und gewinne danach das Spiel.</>,
  check: function(game) {
  if(!(game.isStandard)||game.isBullet||!(game.isWon)){return false}
  const playerhist = game.playerhistory;
  //find moves, that include x and 6 that are pawn moves, get letter
  let enpmovelist=[]
  let enpmovenumbers=[]
  for (let i = 0; i < playerhist.length; i++) {
    if(playerhist[i].includes('x') && playerhist[i].includes('6') && utils.isPawnMove(playerhist[i])){
      enpmovelist.push(playerhist[i])
      enpmovenumbers.push(i)
    }
  }
  //return if list empty
  if(enpmovelist.length==0){return false}
  //check opponent move before that if it was a pawn move to same square
  const opphist = game.opphistory;
  for (let i = 0; i < enpmovelist.length; i++) {
  let square = enpmovelist[i].split('x')[1].replace('6','5')
  let j=game.isWhite ? (enpmovenumbers[i]-1) : enpmovenumbers[i]
  if(opphist[j].includes(square) && utils.isPawnMove(opphist[j])){
    return true
  }
  }
  return false
}
}