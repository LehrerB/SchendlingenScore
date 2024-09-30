import { Chess } from 'chess.js';

let banned_games = [
  "https://lichess.org/uMQzhegX",
  "https://lichess.org/BIAVenHR",
  "https://lichess.org/xmH5XVVJ",
  "https://lichess.org/DPENkKoJ",
]

function checkForBannedGames(str, banned_games) {
  for (const bannedGame of banned_games) {
    if (str.includes(bannedGame)) {
      // Match found, return or perform the desired action
      return true;
    }
  }
  // No match found, continue with your code
  return false;
  // If you want to return something specific in case of no match, do it here
}

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

function bulletCheck(chess) {
  let timeControl = chess.header().TimeControl;
  let bulletByTimeBoolean = false;
  if(timeControl.includes('+')) {
    let timeControlPlus = timeControl.split('+');
    if(timeControlPlus[1] == 0 || timeControlPlus[0] < 61) {
      bulletByTimeBoolean = true;
    }
  }
  return chess.header().Event.includes('Bullet') || bulletByTimeBoolean;
}

export default function parseLichessGame(str, name) {
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
  if(!(str.includes('[Variant "From Position"]')||str.includes('[Variant "Standard"]'))){ //||str.includes('[Variant "Chess960"]')
    return null;
  }
  //check for banned games
  if(checkForBannedGames(str, banned_games)){ 
    return null}

  //console.log(str);
  chess.loadPgn(str); //can import from whole string instead of moves[1] //.replace('[Variant "Chess960"]','[Variant "From Position"]')
  moves[0].split('\n').forEach(line => {
    let comps = /^\[(\w+) "?(\w+)"?\]$/g;
  });
  chess.deleteComments();
  attachHeaders(chess, moves[0]);

  chess.isWhite = chess.header().White.toLowerCase() === name.toLowerCase();
  chess.isBlack = chess.header().Black.toLowerCase() === name.toLowerCase();
  chess.isWon = ((chess.isWhite && chess.header().Result==='1-0')||(chess.isBlack && chess.header().Result==='0-1'))
  chess.noLoss = !((chess.isWhite && chess.header().Result==='0-1')||(chess.isBlack && chess.header().Result==='1-0'))
  chess.oppNoTime = chess.header().Termination === 'Time forfeit'  && ((chess.isWhite && (chess.history().length % 2 == 1)) || (chess.isBlack && (chess.history().length % 2 == 0)));
  chess.isStandard = chess.header().Variant === 'Standard';
  chess.isFromPosition = chess.header().Variant === 'From Position';
  chess.isWeirdVariant = chess.header().Variant != 'Standard' && chess.header().Variant != 'From Position';
  chess.isBullet = chess.header().Event.includes('Bullet') || chess.header().TimeControl == '60+0';
  chess.addwb = chess.isWhite ? 1 : 0;
  chess.playerhistory = chess.history().filter((_, index) => index % 2 !== chess.addwb);
  chess.addbw = chess.isWhite ? 0 : 1;
  chess.opphistory = chess.history().filter((_, index) => index % 2 !== chess.addbw);
  chess.isComputer = chess.header().White.includes('lichess AI level') || chess.header().Black.includes('lichess AI level');
  chess.lastfen = chess.fen().split(" ")[0];
  chess.oppName = "";
  if(chess.isWhite){chess.oppName = chess.header().Black} else {chess.oppName = chess.header().White}

  return chess;
  
}