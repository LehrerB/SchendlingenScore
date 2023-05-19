import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Chess } from 'chess.js';
import parseLichessGame from './parser';
import * as castling from './trophies/castling';
import * as underdog from './trophies/underdog';
import * as winwithless from './trophies/lessmaterial';
import * as won from './trophies/won';

const checks = [
  won.wonWithWhite,
  won.wonWithBlack,
  castling.midCastle,
  underdog.small_underdog,
  underdog.big_underdog,
  winwithless.winwithless

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
  const [amount, setAmount] = useState(10);
  const [achievements, setAchievement] = useState([{title: 'Achievements come here', descritpion: 'Just wait', urls: ['https://lichess.org/']}]);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isDev = process.env.NODE_ENV !== 'production';

  const fetchAndAnalyzeGames = (local) => {
    setLoading(true);
    setErrorMsg('');

    let url = `https://lichess.org/api/games/user/${name}?max=${amount}&perfType=ultraBullet,bullet,blitz,rapid,classical`;
    if(local === true) {
      url = '/custom.pgn'
    }
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const games = data.split('\n\n\n');
        let newAch = checks.map(value => { return {'title': value.title, 'description': value.description, 'check': value.check, 'urls': []}});

        games.forEach(game => {
          const chess = parseLichessGame(game, name);
          if(chess === null) {
            return;
          }
          
          chess.isWhite = chess.header().White === name;
          chess.isBlack = chess.header().Black === name;

          newAch.forEach(ach => {
            if(ach.check(chess)) {
              ach.urls.push(chess.header().Site);
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
