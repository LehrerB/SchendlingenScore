import { Chess } from 'chess.js';
import * as utils from '../utils/javachess';

export let noFool = {
  title: 'Netter Versuch',
  description: <p>Vermeide das Schäfermatt und gewinne das Spiel.</p>,
  check: function(game) {
  //Standard Game, no Computer, win and not white
  if(!(game.isStandard) || (game.isComputer) || !(game.isWon) || game.isWhite){return false}
  const hist = game.history();
  //move two and three need to include Bc4 and Qf3 or Qh5
  const move2and3 = hist[2] + " " + hist[4];
  if(!(move2and3.includes("Bc4")&&(move2and3.includes("Qf3")||move2and3.includes("Qh5")))){return false}
  //d5 and e6 need to be empty, f4, f5, f6 for Qf3 or if Qh5 g6 should be empty 
  //and please don't play Qe7 yourself
  const posafter3moves = utils.go_to_position_after_n_plays(game,5)
  //console.log(posafter3moves.fen());
  const squared5 = posafter3moves.get('d5');
  const squaree6 = posafter3moves.get('e6');
  const squaref4 = posafter3moves.get('f4');
  const squaref5 = posafter3moves.get('f5');
  const squaref6 = posafter3moves.get('f6');
  const squareg6 = posafter3moves.get('g6');
  const squaree7 = posafter3moves.get('e7'); //squaree7.type and .color
  //if value is false, it's empty
  //check d5 and e6
  if(!(squared5===false)||!(squaree6===false)){return false}
  //check g6 if Qh5
  if(move2and3.includes("Qh5") && !(squareg6===false)){return false}
  //check f4, f5, f6 if Qf3
  if(move2and3.includes("Qf3") && (!(squaref4===false) || !(squaref5===false) || (!(squaref6===false)&&!(squaref6.type==='n')))){return false}
  //e7 should be empty, we don't encourage Qe7, Be7, Ne7 OR Ke7 for black for this
  if(!(squaree7===false)){return false}
  //finally, you did it
  return true
}
}

export let textbookOpening = {
  title: 'Vorbildlich',
  description: <p>Vorbildliche Eröffnung: Besetze das Zentrum, entwickle alle Leichtfiguren und mache die Rochade. Gewinne danach das Spiel.</p>,
  check: function(game) {
    if(!(game.isStandard)){return false}
    const hist = game.history();
    if(!(game.isWon && hist.includes('O-O'))){return false}
    //reduce history to first moves
    const maxmoves = 15;
    const slicenum = Math.min((2*maxmoves),hist.length);
    const ophist = hist.slice(0,slicenum);
    const addwb = game.isWhite ? 1 : 0;
    const ownophist = ophist.filter((_, index) => index % 2 !== addwb);
    //check if you castled
    if(!(ownophist.includes('O-O'))){return false}

    //at least 2 knight and 2 bishop moves
    let countN = 0;
    let countB = 0;
    for (let i = 0; i < ownophist.length; i++) {
      if (ownophist[i].includes('N')){countN++}
      if (ownophist[i].includes('B')){countB++}
    }

    if(countN < 2 || countB < 2){return false}
    //move position to one move before castling
    let currentpos = new Chess();
    let castleindex = 2*ownophist.indexOf('O-O') - addwb +1;
    for (let i = 0; i < castleindex; i++){
      currentpos.move(ophist[i])
    }
    //below outputs fen before and after castling
    /*console.log(currentpos.fen())
    currentpos.move(ophist[castleindex])
    console.log(currentpos.fen())*/

    //define conditions
    let conditionmet
    let piececolor = game.isWhite ? 'w' : 'b'
    let rank = game.isWhite ? '1' : '8'
    let posN1 = 'b' + rank;
    let posB1 = 'c' + rank;
    let posB2 = 'f' + rank;
    let posN2 = 'g' + rank;
    let condNB
    let conde4
    let conde5
    let condd4
    let condd5
    let score
    let prevscore
    //castle and then start checking
    score = 0;
    for (let i = castleindex; i < ophist.length; i++){
    currentpos.move(ophist[i])
    //no Knights or Bishops on those squares, NO MATTER WHAT COLOR
    condNB = !(currentpos.get(posN1).type==='n' || currentpos.get(posN2).type==='n' || currentpos.get(posB1).type==='b' || currentpos.get(posB2).type==='b')
    //one of the center squares needs a pawn of the correct color
    conde4 = currentpos.get('e4').type==='p' && currentpos.get('e4').color===piececolor;
    conde5 = currentpos.get('e5').type==='p' && currentpos.get('e5').color===piececolor;
    condd4 = currentpos.get('d4').type==='p' && currentpos.get('d4').color===piececolor;
    condd5 = currentpos.get('d5').type==='p' && currentpos.get('d5').color===piececolor;
    prevscore = score //can't be down material 2 turns in a row. Small issue with in between moves
    score = utils.get_material_player(currentpos);
    if(condNB && (conde4 || conde5 || condd4 || condd5)&& score > -2 && prevscore > -2){return true}
    
    //for debugging
    /*
    console.log(currentpos.fen())
    console.log(condNB)
    console.log(conde4)
    console.log(conde5)
    console.log(condd4)
    console.log(condd5)
    console.log(score)
    console.log(conditionmet)*/
  }
    return false
  }
}


export let rookiemistake = {
  title: 'Rookie Mistake',
  description: <p>Schlage den Turm mit dem Läufer, wenn er am Anfang versucht auf a3 oder h3 ins Spiel zu kommen.</p>,
  check: function(game) {
  //Standard Game, win and not white
  if(!(game.isStandard) || !(game.isWon)){return false}
  const hist = game.history();
  //reduce history to first moves
  const maxmoves = 6;
  const slicenum = Math.min((2*maxmoves),hist.length);
  const shorthist = hist.slice(0,slicenum);
  //check for Rook Moves Ra6, Rh6, Ra3 or Rh3
  const addwb = game.isWhite ? 1 : 0;
  const addbw = game.isWhite ? 0 : 1;
  const rank = game.isWhite ? '6' : '3';
  const asquare = 'a'+rank
  const hsquare = 'h'+rank
  const opphist = shorthist.filter((_, index) => index % 2 !== addbw);
  if(!(opphist.includes('R' + asquare)||opphist.includes('R' + hsquare))){return false}
  //check if Bishop took on one of the squares
  const playerhist = shorthist.filter((_, index) => index % 2 !== addwb);
  if(!(playerhist.includes('Bx' + asquare)||playerhist.includes('Bx' + hsquare))){return false}
  return true
}
}


export let rookSniper = {
  title: 'Eckenfressen',
  description: <p>Schlage einen Turm in der Ecke mit deinem Läufer.</p>,
  check: function(game) {
  //Standard Game, win and not white
  if(!(game.isStandard) || !(game.isWon)){return false}
  const hist = game.history();
  //reduce history to first moves
  const maxmoves = 10;
  const slicenum = Math.min((2*maxmoves),hist.length);
  const shorthist = hist.slice(0,slicenum);
  //check for Bx Moves a8, h8, a1 or h1
  const addwb = game.isWhite ? 1 : 0;
  const rankx = game.isWhite ? '8' : '1';
  const asquare = 'a'+rankx
  const hsquare = 'h'+rankx
  const playerhist = shorthist.filter((_, index) => index % 2 !== addwb);
  if(!(playerhist.includes('Bx' + asquare)||playerhist.includes('Bx' + hsquare))){return false}
  //check if bishop was fiancheto...ed on b2, g2, b6, g6
  const rankb = game.isWhite ? '2' : '7';
  const bsquare = 'b'+rankb
  const gsquare = 'g'+rankb
  if(!(playerhist.includes('B' + bsquare)||playerhist.includes('B' + gsquare))){return false}
  //check if it was a rook that was taken
  let xsquare;
  if(playerhist.includes('Bx' + asquare)){xsquare = hist.indexOf('Bx' + asquare)}
  if(playerhist.includes('Bx' + hsquare)){xsquare = hist.indexOf('Bx' + hsquare)}
  let takenpiece = utils.what_piece_was_captured(game,xsquare)
  return true
}
}