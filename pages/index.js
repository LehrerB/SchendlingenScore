import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Chess } from 'chess.js';
import parseLichessGame from '../public/parser';
import * as castling from '../public/trophies/castling';
import * as underdog from '../public/trophies/underdog';
import * as lessmaterial from '../public/trophies/lessmaterial';
import * as result from '../public/trophies/result';
import * as computer from '../public/trophies/computer';
import * as checkmates from '../public/trophies/checkmates';
import * as opening from '../public/trophies/opening';
import * as captures from '../public/trophies/captures';
import * as specialmoves from '../public/trophies/specialmoves';
import * as pawnwords from '../public/trophies/pawnwords';
import * as endgames from '../public/trophies/endgames';

const checks = {
  basicPawnEndgame1: computer.basicPawnEndgame1,
  basicPawnEndgame2: computer.basicPawnEndgame2,
  onlyPawnMoves: opening.onlyPawnMoves,
  withBishopKnight: endgames.withBishopKnight,
  withTwoBishops: endgames.withTwoBishops,
  withOneQueen: endgames.withOneQueen,
  withOneRook: endgames.withOneRook,
  withTwoRooks: endgames.withTwoRooks,
  secondQueen: endgames.secondQueen,
  enpeasant: specialmoves.enpeasant,
  mateAfterCapture: checkmates.mateAfterCapture,
  wonWithWhite: result.wonWithWhite,
  wonWithBlack: result.wonWithBlack,
  small_underdog: underdog.small_underdog,
  /*big_underdog: underdog.big_underdog,*/
  new_opponent: underdog.new_opponent,
  textbookOpening: opening.textbookOpening,
  noFool: opening.noFool,
  battlefield: captures.battlefield,
  peacefulmode: captures.peacefulmode,
  mateWithQueen: checkmates.mateWithQueen,
  mateWithRook: checkmates.mateWithRook,
  mateWithBishop: checkmates.mateWithBishop,
  mateWithKnight: checkmates.mateWithKnight,
  mateWithKing: checkmates.mateWithKing,
  mateWithPawn: checkmates.mateWithPawn,
  wonVsComputer1: computer.wonVsComputer1,
  wonVsComputer2: computer.wonVsComputer2,
  wonVsComputer3: computer.wonVsComputer3,
  wonVsComputer8NoQueen: computer.wonVsComputer8NoQueen,
  mattStattPatt1: computer.mattStattPatt1,
  mattStattPatt2: computer.mattStattPatt2,
  mattStattPatt3: computer.mattStattPatt3,
  mattStattPatt4: computer.mattStattPatt4,
  mattStattPatt5: computer.mattStattPatt5,
  mattStattPatt6: computer.mattStattPatt6,
  rookSniper: opening.rookSniper,
  mateOnBackRank: checkmates.mateOnBackRank,
  mateWithLess: checkmates.mateWithLess,
  spellGG: pawnwords.spellGG,
  spellDAB: pawnwords.spellDAB,
  spellHaha: pawnwords.spellHaha,
  spellAffe: pawnwords.spellAffe,
  justTwoKings: result.justTwoKings,
  drawWithKing: result.drawWithKing,
  castleWithCheck: specialmoves.castleWithCheck,
  underpromote: endgames.underpromote
  /*didNotLose           : result.didNotLose,
  mateAfter1capture    : checkmates.mateAfter1capture,
  mateAfter2capture    : checkmates.mateAfter2capture,
  endedWithMate        : checkmates.endedWithMate,
  getQueenBack         : endgames.getQueenBack,

  onlyPawnsLeft        : endgames.onlyPawnsLeft,
  drawWithWhite        : result.drawWithWhite,
  drawWithBlack        : result.drawWithBlack,
  midCastle            : castling.midCastle,
  winwithless          : lessmaterial.winwithless,
  favoredByTime        : result.favoredByTime,
  againstComputer      : computer.againstComputer,
  rookiemistake        : opening.rookiemistake,
  timewithless         : lessmaterial.timewithless,
  mateAfterCastling    : checkmates.mateAfterCastling,*/

}

function createAchievementsDict() {
  let d = {}
  for (const [key, _] of Object.entries(checks)) {
    d[key] = { urls: [] }
  }
  return d;
}

function Achievement({ name, ach }) {
  return (
    <div className={styles.card} >
      <h2>{checks[name].title}</h2>
      {/* zero width character &#8203; such that the height of every card is the same */}
      <div className={styles.trophyList}>&#8203;{ach.urls.map((url, index) => <a key={index} href={url} target="_blank" rel="noopener noreferrer">🏆</a>)}</div>
      <div className={styles.details}>
        <p>{checks[name].description}</p>
      </div>
    </div>
  );
}

const LOADING_STATUS_PRE = 0;
const LOADING_STATUS_RUNNING = 1;
const LOADING_STATUS_ERROR = 2;
const LOADING_STATUS_DONE = 3;

export default function Home() {
  const isDev = process.env.NODE_ENV !== 'production';

  const [name, setName] = useState(isDev ? 'lawtrafalgar02' : 'msch-'); //smart
  const [amount, setAmount] = useState(isDev ? '20' : '50');
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUS_PRE);
  const [errorMsg, setErrorMsg] = useState('');
  const [achievements, setAchievement] = useState(createAchievementsDict());


  const fetchAndAnalyzeGames = (local) => {
    setLoadingStatus(LOADING_STATUS_RUNNING);
    setErrorMsg('');

    let newAch = createAchievementsDict();

    let url = `https://lichess.org/api/games/user/${name}?max=${amount}`;
    //let url = `https://lichess.org/api/games/user/${name}?max=${amount}&perfType=ultraBullet,bullet,blitz,rapid,classical`;
    if (local === true) {
      url = 'http://localhost:3000/custom.txt'
    }
    fetch(url, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
      .then(response => response.text())
      .then(data => {
        let games;
        if (local === true) {
          games = data.trim().split('\r\n\r\n\r\n'); //local files are encoded with \r\n instead of \n
        } else {
          games = data.trim().split('\n\n\n')
        }
        //let newAch = checks.map(value => { return { 'title': value.title, 'description': value.description, 'check': value.check, 'urls': [] } });
        games.forEach(game => {

          const chess = parseLichessGame(game, name);
          if (chess === null || chess.history().length < 3) {
            return;
          }

          for (const [key, ach] of Object.entries(checks)) {
            if (ach.check(chess)) {
              const add = chess.isBlack ? "/black" : "";
              const site = chess.header().Site + add;
              newAch[key].urls.push(site);
            }
          }
        });


        setAchievement(newAch);
        setLoadingStatus(LOADING_STATUS_DONE);
      })
      .catch(error => {
        setLoadingStatus(LOADING_STATUS_ERROR);
        console.error('Error fetching games:', error);
        setErrorMsg('Error: ' + error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logobox}>
        <a href="https://ms-schendlingen.at/" target="_blank" rel="noopener noreferrer">
          <img className={styles.logo} src='/schendlingen_logo.png' alt="MS Schendlingen"></img>
        </a>

        <a href="https://lichess.org/" target="_blank" rel="noopener noreferrer">
          <img className={styles.logor} src='/lichess_logo.png' alt="MS Schendlingen"></img>
        </a>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Schendlingen Score</h1>
        <div className={styles.description}>

          <label>
            Lichess Benutzername
            <input className={styles.input} value={name} onChange={e => setName(e.target.value)} name="lichessName" />
          </label>
          <br />
          <label>
            Anzahl der Spiele
            <input className={styles.input} type='number' value={amount} onChange={e => setAmount(e.target.value)} name="amount" />
          </label>
          <br />
          <button className={styles.button} disabled={loadingStatus == LOADING_STATUS_RUNNING} onClick={fetchAndAnalyzeGames}>{(loadingStatus == LOADING_STATUS_RUNNING) ? 'Ladet...' : 'Start'}</button>
          {isDev && <button onClick={() => fetchAndAnalyzeGames(true)}>Load local</button>}
          <p></p>
          {loadingStatus == LOADING_STATUS_DONE && <>
            {Object.values(achievements).map(ach => ach.urls.length).reduce((partialSum, a) => partialSum + a, 0)} Trophäen<br />
            {Object.values(achievements).map(ach => ach.urls.length > 0).reduce((partialSum, a) => partialSum + a, 0)} / {Object.keys(achievements).length} Challenges
          </>}

        </div>
        {loadingStatus == LOADING_STATUS_ERROR && <p>{errorMsg}</p>}
        {loadingStatus == LOADING_STATUS_DONE && <>
          <div className={styles.column}>
        <h3>Allgemein</h3>
            <div className={styles.achWrap}>
              <Achievement name={"wonWithWhite"} ach={achievements.wonWithWhite} />
              <Achievement name={"wonWithBlack"} ach={achievements.wonWithBlack} />
            </div>
        </div>
        <div className={styles.categoryCol}>
        
          
          <div className={styles.column}>
            <h3>Gemeinschaft</h3>
            <div className={styles.achWrap}>
              <Achievement name={"new_opponent"} ach={achievements.new_opponent} />
              <Achievement name={"small_underdog"} ach={achievements.small_underdog} />

              {achievements.small_underdog.urls.length < 0 && <Achievement name={"big_underdog"} ach={achievements.big_underdog} />}
            </div>

            <h3>Eröffnung</h3>
            <div className={styles.achWrap}>
              <Achievement name={"textbookOpening"} ach={achievements.textbookOpening} />
              <Achievement name={"noFool"} ach={achievements.noFool} />
              <Achievement name={"onlyPawnMoves"} ach={achievements.onlyPawnMoves} />
              <Achievement name={"rookSniper"} ach={achievements.rookSniper} />
            </div>

            <h3>Schach Matt</h3>
            <div className={styles.achWrap}>
              <Achievement name={"mateWithQueen"} ach={achievements.mateWithQueen} />
              <Achievement name={"mateWithRook"} ach={achievements.mateWithRook} />
              <Achievement name={"mateWithBishop"} ach={achievements.mateWithBishop} />
              <Achievement name={"mateWithKnight"} ach={achievements.mateWithKnight} />
              <Achievement name={"mateWithPawn"} ach={achievements.mateWithPawn} />
              <Achievement name={"mateWithKing"} ach={achievements.mateWithKing} />
              <Achievement name={"mateOnBackRank"} ach={achievements.mateOnBackRank} />
              <Achievement name={"mateAfterCapture"} ach={achievements.mateAfterCapture} />
              <Achievement name={"mateWithLess"} ach={achievements.mateWithLess} />
            </div>

            <h3>Endspiel</h3>
            <div className={styles.achWrap}>
              <Achievement name={"secondQueen"} ach={achievements.secondQueen} />
              <Achievement name={"underpromote"} ach={achievements.underpromote} />
              <Achievement name={"withTwoRooks"} ach={achievements.withTwoRooks} />
              <Achievement name={"withOneQueen"} ach={achievements.withOneQueen} />
              <Achievement name={"withOneRook"} ach={achievements.withOneRook} />
              <Achievement name={"withTwoBishops"} ach={achievements.withTwoBishops} />
              <Achievement name={"withBishopKnight"} ach={achievements.withBishopKnight} />
              <Achievement name={"drawWithKing"} ach={achievements.drawWithKing} />
              <Achievement name={"justTwoKings"} ach={achievements.justTwoKings} />
            </div>
          </div>

          <div className={styles.column}>
            <h3>Besondere Züge</h3>
            <div className={styles.achWrap}>
              <Achievement name={"enpeasant"} ach={achievements.enpeasant} />
              <Achievement name={"castleWithCheck"} ach={achievements.castleWithCheck} />
              <Achievement name={"battlefield"} ach={achievements.battlefield} />
              <Achievement name={"peacefulmode"} ach={achievements.peacefulmode} />
            </div>

            <h3>Mensch gegen Maschine</h3>
            <div className={styles.achWrap}>
              <Achievement name={"wonVsComputer1"} ach={achievements.wonVsComputer1} />
              <Achievement name={"wonVsComputer2"} ach={achievements.wonVsComputer2} />
              <Achievement name={"wonVsComputer3"} ach={achievements.wonVsComputer3} />
              <Achievement name={"wonVsComputer8NoQueen"} ach={achievements.wonVsComputer8NoQueen} />
              <Achievement name={"basicPawnEndgame1"} ach={achievements.basicPawnEndgame1} />
              <Achievement name={"basicPawnEndgame2"} ach={achievements.basicPawnEndgame2} />
            </div>

            <h3>Matt statt Patt</h3>
            <div className={styles.achWrap}>
              <Achievement name={"mattStattPatt1"} ach={achievements.mattStattPatt1} />
              <Achievement name={"mattStattPatt2"} ach={achievements.mattStattPatt2} />
              <Achievement name={"mattStattPatt3"} ach={achievements.mattStattPatt3} />
              <Achievement name={"mattStattPatt4"} ach={achievements.mattStattPatt4} />
              <Achievement name={"mattStattPatt5"} ach={achievements.mattStattPatt5} />
              <Achievement name={"mattStattPatt6"} ach={achievements.mattStattPatt6} />
            </div>
            {Object.values(achievements).map(ach => ach.urls.length > 0).reduce((partialSum, a) => partialSum + a, 0)>20 && <>
            <h3>Blödeleien</h3>
            <div className={styles.achWrap}>
              <Achievement name={"spellGG"} ach={achievements.spellGG} />
              <Achievement name={"spellDAB"} ach={achievements.spellDAB} />
              <Achievement name={"spellHaha"} ach={achievements.spellHaha} />
              <Achievement name={"spellAffe"} ach={achievements.spellAffe} />
            </div></>
            }

            {/* 
            <Achievement ach={checkmates.mateAfter1capture} />
            <Achievement ach={checkmates.mateAfter2capture} />
            <Achievement ach={endgames.onlyPawnsLeft} />
            <Achievement ach={endgames.getQueenBack} />
            <Achievement ach={result.didNotLose} />
            <Achievement ach={result.drawWithWhite} />
            <Achievement ach={result.drawWithBlack} />
            <Achievement ach={castling.midCastle} />
            <Achievement ach={underdog.small_underdog} />
            <Achievement ach={underdog.big_underdog} />
            <Achievement ach={lessmaterial.winwithless} />
            <Achievement ach={result.favoredByTime} />
            <Achievement ach={computer.againstComputer} />
            <Achievement ach={opening.rookiemistake} />
            <Achievement ach={lessmaterial.timewithless} />
            <Achievement ach={checkmates.mateAfterCastling} />
            <Achievement ach={checkmates.endedWithMate} /> */}
          </div>

        </div></>}
      </main>
    </div>
  )
}
