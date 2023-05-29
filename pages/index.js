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

function Achievement({ ach }) {
  return (
    <div className={styles.card} >
      <h2>{ach.title}</h2>
      <p>{ach.description}</p>
      {ach.urls && ach.urls.map((url, index) => <a key={index} href={url} target="_blank" rel="noopener noreferrer">🏆</a>)}
    </div>
  );
}

const LOADING_STATUS_PRE = 0;
const LOADING_STATUS_RUNNING = 1;
const LOADING_STATUS_DONE = 2;

export default function Home() {
  const isDev = process.env.NODE_ENV !== 'production';

  const [name, setName] = useState(isDev ? 'lawtrafalgar02': 'msch-');
  const [amount, setAmount] = useState(20);
  const [achievements, setAchievement] = useState([{title: 'Achievements come here', descritpion: 'Just wait', urls: ['https://lichess.org/']}]);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUS_PRE);
  const [errorMsg, setErrorMsg] = useState('');


  const fetchAndAnalyzeGames = (local) => {
    setLoadingStatus(LOADING_STATUS_RUNNING);
    setErrorMsg('');

    let url = `https://lichess.org/api/games/user/${name}?max=${amount}`;
    //let url = `https://lichess.org/api/games/user/${name}?max=${amount}&perfType=ultraBullet,bullet,blitz,rapid,classical`;
    if(local === true) {
      url = 'http://localhost:3000/custom.txt'
    }
    fetch(url, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
      .then(response => response.text())
      .then(data => {
        let games;
        if(local === true){
          games = data.trim().split('\r\n\r\n\r\n'); //local files are encoded with \r\n instead of \n
        } else {
          games = data.trim().split('\n\n\n')
        }
        let newAch = checks.map(value => { return {'title': value.title, 'description': value.description, 'check': value.check, 'urls': []}});
        games.forEach(game => {

          const chess = parseLichessGame(game, name);
          if(chess === null || chess.history().length < 3) {
            return;
          }

          newAch.forEach(ach => {
            if(ach.check(chess)) {
              const add = chess.isBlack ? "/black" : "";
              const site = chess.header().Site + add;
              ach.urls.push(site)
            }
          });
        });

        setAchievement(newAch);
        setLoadingStatus(LOADING_STATUS_DONE);
      })
      .catch(error => {
        setLoadingStatus(LOADING_STATUS_DONE);
        console.error('Error fetching games:', error);
        setErrorMsg('Error: ' + error);
      });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Schendlingen Score</h1>
        <div className={styles.description}>
          <label>
            Your lichess name
            <input className={styles.input} value={name} onChange={e => setName(e.target.value)} name="lichessName" />
          </label>
          <br />
          <label>
            Number of games to analyze
            <input className={styles.input} value={amount} onChange={e => setAmount(e.target.value)} name="amount" />
          </label>
          <br />
          <button className={styles.button} disabled={loadingStatus == LOADING_STATUS_RUNNING} onClick={fetchAndAnalyzeGames}>{(loadingStatus == LOADING_STATUS_RUNNING) ? 'Loading...' : 'Analyze'}</button>
          {isDev && <button onClick={() => fetchAndAnalyzeGames(true)}>Load local</button>}
          <p></p>
        {achievements.length > 1 && <>Gesamt: {achievements.map(ach => ach.urls.length).reduce((partialSum, a) => partialSum + a, 0)} Trophäen</>}
        <p></p>
        {achievements.length > 1 && <>Gesamt: {achievements.map(ach => ach.urls.length > 0).reduce((partialSum, a) => partialSum + a, 0)} / {achievements.length} Challenges</>}
        
        </div>
        <p>{errorMsg}</p>
        <div className={styles.grid}>
          <h3>Resultate</h3>
          <Achievement ach={result.drawWithKing} />
          <Achievement ach={result.justTwoKings} />
          <Achievement ach={endgames.onlyPawnsLeft} />
          <Achievement ach={computer.basicPawnEndgame1} />
          <Achievement ach={computer.basicPawnEndgame2} />
          <Achievement ach={opening.onlyPawnMoves} />

          <h3>Gewinnstrategien</h3>
          <Achievement ach={endgames.withBishopKnight} />
          <Achievement ach={endgames.withTwoBishops} />
          <Achievement ach={endgames.withOneQueen} />
          <Achievement ach={endgames.withOneRook} />
          <Achievement ach={endgames.withTwoRooks} />
          <Achievement ach={endgames.getQueenBack} />
          <Achievement ach={endgames.secondQueen} />
          <Achievement ach={endgames.underpromote} />
          <Achievement ach={specialmoves.enpeasant} />
          <Achievement ach={checkmates.mateAfterCapture} />
          <Achievement ach={checkmates.mateAfter1capture} />
          <Achievement ach={checkmates.mateAfter2capture} />
          <Achievement ach={result.wonWithWhite} />
          <Achievement ach={result.wonWithBlack} />
          <Achievement ach={underdog.small_underdog} />
          <Achievement ach={underdog.big_underdog} />
          <Achievement ach={opening.textbookOpening} />
          <Achievement ach={opening.noFool} />
          <Achievement ach={captures.battlefield} />
          <Achievement ach={captures.peacefulmode} />
          <Achievement ach={checkmates.mateWithQueen} />
          <Achievement ach={checkmates.mateWithRook} />
          <Achievement ach={checkmates.mateWithBishop} />
          <Achievement ach={checkmates.mateWithKnight} />
          <Achievement ach={checkmates.mateWithKing} />
          <Achievement ach={checkmates.mateWithPawn} />
          <Achievement ach={computer.wonVsComputer1} />
          <Achievement ach={computer.wonVsComputer2} />
          <Achievement ach={computer.wonVsComputer3} />
          <Achievement ach={computer.wonVsComputer8NoQueen} />
          <Achievement ach={computer.mattStattPatt1} />
          <Achievement ach={computer.mattStattPatt2} />
          <Achievement ach={computer.mattStattPatt3} />
          <Achievement ach={computer.mattStattPatt4} />
          <Achievement ach={computer.mattStattPatt5} />
          <Achievement ach={computer.mattStattPatt6} />
          <Achievement ach={pawnwords.spellGG} />
          <Achievement ach={pawnwords.spellDAB} />
          <Achievement ach={pawnwords.spellHaha} />
          <Achievement ach={pawnwords.spellAffe} />
          <Achievement ach={specialmoves.castleWithCheck} />
          <Achievement ach={checkmates.mateOnBackRank} />
          {/* <Achievement ach={result.didNotLose} />
          <Achievement ach={result.drawWithWhite} />
          <Achievement ach={result.drawWithBlack} />
          <Achievement ach={castling.midCastle} />
          <Achievement ach={underdog.small_underdog} />
          <Achievement ach={underdog.big_underdog} />
          <Achievement ach={lessmaterial.winwithless} />
          <Achievement ach={checkmates.mateWithLess} />
          <Achievement ach={result.favoredByTime} />
          <Achievement ach={computer.againstComputer} />
          <Achievement ach={opening.rookSniper} />
          <Achievement ach={opening.rookiemistake} />
          <Achievement ach={lessmaterial.timewithless} />
          <Achievement ach={checkmates.mateAfterCastling} />
          <Achievement ach={checkmates.endedWithMate} /> */}

        </div>
      </main>
    </div>
  )
}
