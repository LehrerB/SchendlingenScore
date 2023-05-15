import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { Chess } from 'chess.js'; // Make sure to install chess.js: `npm install chess.js`

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
    console.log(matches);
    if(matches && matches.length >= 3) {
      chess.header(matches[1], matches[2]);
    }
  });
}


const checks = [{
  title: 'Won as black',
  description: 'Won with the black pieces.',
  check: function(game) {
    return game.isBlack && game.header().Result === '0-1';
  }
}, {
  title: 'Won as white',
  description: 'Won with the white pieces.',
  check: (game) => (game.isWhite && game.header().Result === '1-0')
}, {
  title: 'Mit-castle',
  description: 'Castled after move 10.',
  check: (game) => {
    let i = game.isWhite ? 9 : 10;
    const hist = game.history();
    while(i < hist.length) {
      if(hist[i].startsWith('O-O')) return true;
      i += 2;
    }
    return false;
  }
}]

function Achievement({ title, description, urls }) {
  return (
    <div className={styles.card} >
      <h2>{title}</h2>
      <p>{description}</p>
      {urls.map((url, index) => <a key={index} href={url}>🏆</a>)}
    </div>
  );
}



export default function Home() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(10);
  const [achievements, setAchievement] = useState([{title: 'Achievements come here', descritpion: 'Just wait', urls: ['https://lichess.org/']}]);

  const fetchAndAnalyzeGames = () => {

    let metaRegex = /^\[(\w+) "?(\w+)"?\]$/g;
    fetch(`https://lichess.org/api/games/user/${name}?max=10&perfType=ultraBullet,bullet,blitz,rapid,classical`)
      .then(response => response.text())
      .then(data => {
        const games = data.split('\n\n\n');
        console.log(games[0]);

        let newAch = checks.map(value => { return {'title': value.title, 'description': value.description, 'check': value.check, 'urls': []}});

        games.forEach(game => {
          
          const chess = new Chess();
          
          const moves = game.split('\n\n');
          if(moves.length < 2) {
            return;
          }

          chess.loadPgn(moves[1]);
          chess.setComment(moves[0]);
          moves[0].split('\n').forEach(line => {
            let comps = /^\[(\w+) "?(\w+)"?\]$/g;
          });

          attachHeaders(chess, moves[0]);
          chess.isWhite = chess.header().White === name;
          chess.isBlack = chess.header().Black === name;

          newAch.forEach(ach => {
            if(ach.check(chess)) {
              ach.urls.push(chess.header().Site);
            }
          });
        });

        setAchievement(newAch);
        console.log(newAch);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
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
          <button className={styles.button} onClick={fetchAndAnalyzeGames}>Analyze</button>
        </div>
        <div className={styles.grid}>
          {achievements.map((trophy, index) => (
            <Achievement key={index} title={trophy.title} description={trophy.description} urls={trophy.urls} />
          ))}
        </div>
      </main>
    </div>
  )
}
