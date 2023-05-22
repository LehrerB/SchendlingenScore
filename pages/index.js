import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Chess } from 'chess.js';
import parseLichessGame from './parser';
import * as castling from './trophies/castling';
import * as underdog from './trophies/underdog';
import * as lessmaterial from './trophies/lessmaterial';
import * as result from './trophies/result';
import * as computer from './trophies/computer';
import * as checkmates from './trophies/checkmates';
import * as opening from './trophies/opening';

const checks = [
  result.didNotLose,
  checkmates.mateOnBackRank,
  opening.rookiemistake,
  opening.textbookOpening,
  lessmaterial.timewithless,
  opening.noFool,
  checkmates.mateAfterCastling,
  computer.mattStattPatt1,
  computer.wonVsComputer1,
  computer.wonVsComputer8NoQueen,
  checkmates.endedWithMate,
  checkmates.mateWithQueen,
  checkmates.mateWithRook,
  checkmates.mateWithBishop,
  checkmates.mateWithKnight,
  checkmates.mateWithKing,
  checkmates.mateWithPawn,
  result.wonWithWhite,
  result.wonWithBlack,
  result.drawWithWhite,
  result.drawWithBlack,
  castling.midCastle,
  underdog.small_underdog,
  underdog.big_underdog,
  lessmaterial.winwithless,
  checkmates.mateWithLess,
  result.favoredByTime,
  computer.againstComputer,
]

function Achievement({ title, description, urls }) {
  return (
    <div className={styles.card} >
      <h2>{title}</h2>
      <p>{description}</p>
      {urls.map((url, index) => <a key={index} href={url} target="_blank">🏆</a>)}
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState('lawtrafalgar02');
  const [amount, setAmount] = useState(20);
  const [achievements, setAchievement] = useState([{title: 'Achievements come here', descritpion: 'Just wait', urls: ['https://lichess.org/']}]);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isDev = process.env.NODE_ENV !== 'production';

  const fetchAndAnalyzeGames = (local) => {
    setLoading(true);
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
          //console.log(game)
          //console.log("test")
          const chess = parseLichessGame(game);
          if(chess === null) {
            return;
          }
          
          chess.isWhite = chess.header().White === name;
          chess.isBlack = chess.header().Black === name;
          chess.isWon = ((chess.isWhite && chess.header().Result==='1-0')||(chess.isBlack && chess.header().Result==='0-1'))
          chess.noLoss = !((chess.isWhite && chess.header().Result==='0-1')||(chess.isBlack && chess.header().Result==='1-0'))
          chess.oppNoTime = chess.header().Termination === 'Time forfeit'  && ((chess.isWhite && (chess.history().length % 2 == 1)) || (chess.isBlack && (chess.history().length % 2 == 0)));
          chess.isStandard = chess.header().Variant === 'Standard';
          chess.isFromPosition = chess.header().Variant === 'From Position';
          chess.isBullet = false; //chess.header().Event.includes('Bullet');
          chess.isComputer = chess.header().White.includes('lichess AI level') || chess.header().Black.includes('lichess AI level');
          if(chess.isWhite){chess.oppName = chess.header().Black} else {chess.oppName = chess.header().White}

          
          newAch.forEach(ach => {
            if(ach.check(chess)) {
              const add = chess.isBlack ? "/black" : "";
              const site = chess.header().Site + add;
              ach.urls.push(site)
            }
          });
        });

        setAchievement(newAch);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching games:', error);
        setErrorMsg('Error: ' + error);
      });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>List trophies</h1>
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
          <button className={styles.button} disabled={isLoading} onClick={fetchAndAnalyzeGames}>{isLoading ? 'Loading...' : 'Analyze'}</button>
          {isDev && <button onClick={() => fetchAndAnalyzeGames(true)}>Load local</button>}
        </div>
        <p>{errorMsg}</p>
        <div className={styles.grid}>
          {achievements.map((trophy, index) => (
            <Achievement key={index} title={trophy.title} description={trophy.description} urls={trophy.urls} />
          ))}
        </div>
      </main>
    </div>
  )
}
