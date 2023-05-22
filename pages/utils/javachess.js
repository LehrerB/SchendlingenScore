const myDefaultExport = 'This is the default export';
export default myDefaultExport;

import { Chess } from 'chess.js';

export let get_piece_positions = (game, piece) => {
    return [].concat(...game.board()).map((p, index) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        return index
      }
    }).filter(Number.isInteger).map((piece_index) => {
      const row = 'abcdefgh'[piece_index % 8]
      const column = Math.ceil((64 - piece_index) / 8)
      return row + column
    })
  }

export let get_legal_moves_by_piece = (game, piece) => {
    return game.moves({ verbose: true })
                .filter((move) => move.piece === piece.type && move.color === piece.color)
                .map((move) => move.san)
  }

  //let fen = game.fen().split(" ")[0];
  export let get_material_score = (game) => {
    let fen = game.fen().split(" ")[0]; //careful, fen includes a small b at the end if it's blacks turn
    let score = 0
    let points = {
        P:1,
        N:3,
        B:3,
        R:5,
        Q:9,
        p:-1,
        n:-3,
        b:-3,
        r:-5,
        q:-9
    }
    for(let c of fen){
        //console.log(c)
        score+=points[c]||0       //0 wenn er keinen Buchstaben findet.
    }
    return score;
  }

  export let get_material_player = (game) => {
    let sign = game.isWhite ? 1 : -1;
    let regscore = get_material_score(game)
    let score = sign*Math.abs(regscore)
    return score
  }

  export let go_to_position_after_n_plays = (game, plays) => {
    let chess = new Chess();
    const hist = game.history();
    for (let i = 0; i < plays; i++){
      chess.move(hist[i])
    }
    return chess;
  }

  export let what_piece_was_captured = (game, play) => {
    const hist = game.history();
    //check if capture was made
    if(!(hist[play].includes('x'))){return false}
    //go to position before
    let position = go_to_position_after_n_plays(game,play);
    //stuff behind x
    let square = hist[play].split('x')[1];
    //get square info
    let piece = position.get(square).type
    return piece
  }