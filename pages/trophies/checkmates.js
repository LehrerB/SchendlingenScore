import * as utils from '../utils/javachess';
import { winwithless } from './lessmaterial';

export let endedWithMate = {
    title: 'Check Mate',
    description: <p>Won by Checkmate.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#')
  }
}

export let mateWithQueen = {
    title: 'Queen',
    description: <p>Checkmate with Queen.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('Q')
  }
}

export let mateWithRook = {
    title: 'Rook',
    description: <p>Checkmate with Rook.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('R')|| hist[hist.length-1].includes('O-O'))
  }
}

export let mateWithBishop = {
    title: 'Bishop',
    description: <p>Checkmate with Bishop.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('B')
  }
}

export let mateWithKnight = {
    title: 'Knight',
    description: <p>Checkmate with Knight.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('N')
  }
}

export let mateWithKing = {
    title: 'King',
    description: <p>Checkmate with King.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('K') || hist[hist.length-1].includes('O-O'))
  }
}

export let mateWithPawn = {
    title: 'Pawn',
    description: <p>Checkmate with Pawn.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('=') || (!(hist[hist.length-1].includes('K')) && !(hist[hist.length-1].includes('Q')) && !(hist[hist.length-1].includes('R')) && !(hist[hist.length-1].includes('B')) && !(hist[hist.length-1].includes('N')) && !(hist[hist.length-1].includes('O-O')) && !(hist[hist.length-1].includes('='))))
  }
}

export let mateWithPromotion = {
    title: 'Promotion',
    description: <p>Checkmate with Promotion.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('=')
  }
}

export let mateAfterCastling = {
    title: 'Schade Rochade',
    description: <p>Dein Gegner hat ins Matt rochiert.</p>,
    check: function(game) {
    if(!(game.isStandard)){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-2].includes('O-O')
  }
}

export let mateOnBackRank = {
    title: 'Grundreihen Matt',
    description: <p>Dein Gegner hat seinen König zu wenig beschützt.</p>,
    check: function(game) {
    //Bullet allowed, Computer allowed
    if(!(game.isStandard)){return false}
    const hist = game.history();
    //mate because of Queen or Rook
    if(!(game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('R')|| hist[hist.length-1].includes('Q')))){return false}
    //define king color and rank, then get position
    const kingcolor = game.isWhite ? 'b' : 'w';
    const rank = game.isWhite ? '8' : '1';
    const kingposition = utils.get_piece_positions(game,{ type: 'k', color: kingcolor})[0]; //only one king
    //check if king is on backrank
    if(!(kingposition.includes(rank))){return false}
    //check if checking piece is on backrank as well
    const piecetype = hist[hist.length-1].includes('R') ? 'r' : 'q';
    const piececolor = game.isWhite ? 'w' : 'b';
    const piecepositions = utils.get_piece_positions(game,{ type: piecetype, color: piececolor}); //possibly multiple rooks or queens
    const pieceonbackrank = piecepositions.some(pos => pos.includes(rank));
    if(!(pieceonbackrank)){return false}
    //define squares in front of king (only two for a and h file)
    const files = 'abcdefgh'
    const kingfilenum = files.indexOf(kingposition.replace(rank,""));
    const pawnrank = game.isWhite ? '7' : '2';
    let pawnpositions;
    if(kingfilenum===0) {
      pawnpositions = [files[kingfilenum]+pawnrank,files[kingfilenum+1]+pawnrank]
      } else if (kingfilenum===7) {
      pawnpositions = [files[kingfilenum-1] + pawnrank,files[kingfilenum]+pawnrank]
      } else {
      pawnpositions = [files[kingfilenum-1] + pawnrank,files[kingfilenum]+pawnrank,files[kingfilenum+1]+pawnrank]
      }
    //check if there are at least two pieces in front of the king, and not white
    let emptysquares = 0; //will count how many squares are empty
    for(let pos in pawnpositions){
      const squareinfo = game.get(pawnpositions[pos]);
      if(squareinfo===false){emptysquares += 1} else {
        if(squareinfo.color===piececolor){return false} //if any piece is white in front of the king, that's not backrank checkmate
      }
      if(emptysquares > 1){return false} //if two or more are empty
    }
    return true
  }
}

export let mateWithLess = {
  title: 'Der König zählt.',
  description: <p>Matt mit weniger Material als der Gegner.</p>,
  check: function(game) {
  if(!(game.isStandard)||game.isBullet){return false}
  const hist = game.history();
  if(!(game.noLoss && hist[hist.length-1].includes('#'))){return false}
  return winwithless.check(game);
}
}