import { Chess } from 'chess.js';

function attachHeaders(chess, str) {
  /*
  [Event "Rated Blitz game"]
  [Site "https://lichess.org/CiZuQ3R6"]
  [Date "2023.04.08"]
  [White "erifetim"]
  [Black "jalaleddine"]
  [Result "0-1"]
  [UTCDate "2023.04.08"]
  [UTCTime "08:48:21"]
  [WhiteElo "1464"]
  [BlackElo "1409"]
  [WhiteRatingDiff "-19"]
  [BlackRatingDiff "+6"]
  [Variant "Standard"]
  [TimeControl "180+0"]
  [ECO "A40"]
  [Termination "Normal"]
  */
  const regx = /^\[(\w+) "?(.*?)"?\]$/;
  str.split('\n').forEach(line => {
    const matches = line.match(regx);
    if(matches && matches.length >= 3) {
      chess.header(matches[1], matches[2]);
    }
  });
}

export default function parseLichessGame(str) {
  const chess = new Chess();
  let moves;
  
  if(str.includes('\r\n')){
    moves = str.split('\r\n\r\n') //local files are encoded with \r\n instead of \n
  } else {
    moves = str.split('\n\n')
  }
  if(moves.length < 2) {
    return null;
  }
  //check for variants
  if(!(str.includes('[Variant "From Position"]')||str.includes('[Variant "Standard"]')    )){ //||str.includes('[Variant "Chess960"]')
    return null;
  }

  //console.log(str);
  chess.loadPgn(str); //can import from whole string instead of moves[1] //.replace('[Variant "Chess960"]','[Variant "From Position"]')
  moves[0].split('\n').forEach(line => {
    let comps = /^\[(\w+) "?(\w+)"?\]$/g;
  });

  attachHeaders(chess, moves[0]);
  return chess;
}