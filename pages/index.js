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
import * as classes from '../public/classes';
//import saved_data from '../api/saved_data.json';
let opponents_school_unique = [];
export { opponents_school_unique };

const dataurl = '/saved_data.json'; // Relative URL to your JSON file
let bigdata;
fetch(dataurl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    bigdata = data;
    console.log('Bigdata:', data); // Use the JSON data in your application
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });
/**/

const checks = {
  wonWithWhite: result.wonWithWhite,
  wonWithBlack: result.wonWithBlack,

  new_opponent: underdog.new_opponent,
  small_underdog: underdog.small_underdog,
  /*big_underdog: underdog.big_underdog,*/
  rookSniper: opening.rookSniper,

  textbookOpening: opening.textbookOpening,
  noFool: opening.noFool,
  onlyPawnMoves: opening.onlyPawnMoves,

  mateWithQueen: checkmates.mateWithQueen,
  mateWithRook: checkmates.mateWithRook,
  mateWithBishop: checkmates.mateWithBishop,
  mateWithKnight: checkmates.mateWithKnight,
  mateWithPawn: checkmates.mateWithPawn,
  mateWithKing: checkmates.mateWithKing,
  mateOnBackRank: checkmates.mateOnBackRank,
  mateWithLess: checkmates.mateWithLess,
  mateAfterCapture: checkmates.mateAfterCapture,

  secondQueen: endgames.secondQueen,
  underpromote: endgames.underpromote,
  withTwoRooks: endgames.withTwoRooks,
  withOneQueen: endgames.withOneQueen,
  withOneRook: endgames.withOneRook,
  withTwoBishops: endgames.withTwoBishops,
  withBishopKnight: endgames.withBishopKnight,
  drawWithKing: result.drawWithKing,
  justTwoKings: result.justTwoKings,

  enpeasant: specialmoves.enpeasant,
  castleWithCheck: specialmoves.castleWithCheck,
  battlefield: captures.battlefield,
  peacefulmode: captures.peacefulmode,

  wonVsComputer1: computer.wonVsComputer1,
  wonVsComputer2: computer.wonVsComputer2,
  wonVsComputer3: computer.wonVsComputer3,
  wonVsComputer8NoQueen: computer.wonVsComputer8NoQueen,
  basicPawnEndgame1: computer.basicPawnEndgame1,
  basicPawnEndgame2: computer.basicPawnEndgame2,

  mattStattPatt1: computer.mattStattPatt1,
  mattStattPatt2: computer.mattStattPatt2,
  mattStattPatt3: computer.mattStattPatt3,
  mattStattPatt4: computer.mattStattPatt4,
  mattStattPatt5: computer.mattStattPatt5,
  mattStattPatt6: computer.mattStattPatt6,

  spellGG: pawnwords.spellGG,
  spellDAB: pawnwords.spellDAB,
  spellHaha: pawnwords.spellHaha,
  spellAffe: pawnwords.spellAffe,

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

        <div className={styles.iconbox}>
          {(checks[name].pref != undefined && checks[name].pref.win != undefined) && <img className={styles.icon} src='/check_trophy.svg' alt="Gewinnen"></img>}
          {(checks[name].pref != undefined && checks[name].pref.win != undefined && checks[name].pref.win === 1) && <img className={styles.icon} src='/check_1exclamation.svg' alt="Muss"></img>}
          {(checks[name].pref != undefined && checks[name].pref.win != undefined && checks[name].pref.win === 2) && <img className={styles.icon} src='/check_2haken.svg' alt="Erlaubt"></img>}
          {(checks[name].pref != undefined && checks[name].pref.win != undefined && checks[name].pref.win === 3) && <img className={styles.icon} src='/check_3x.svg' alt="Nicht erlaubt"></img>}

          {(checks[name].pref != undefined && checks[name].pref.bullet != undefined) && <img className={styles.icon} src='/check_bullet.svg' alt="Bullet"></img>}
          {(checks[name].pref != undefined && checks[name].pref.bullet != undefined && checks[name].pref.bullet === 1) && <img className={styles.icon} src='/check_1exclamation.svg' alt="Muss"></img>}
          {(checks[name].pref != undefined && checks[name].pref.bullet != undefined && checks[name].pref.bullet === 2) && <img className={styles.icon} src='/check_2haken.svg' alt="Erlaubt"></img>}
          {(checks[name].pref != undefined && checks[name].pref.bullet != undefined && checks[name].pref.bullet === 3) && <img className={styles.icon} src='/check_3x.svg' alt="Nicht erlaubt"></img>}

          {(checks[name].pref != undefined && checks[name].pref.computer != undefined) && <img className={styles.icon} src='/check_monitor.svg' alt="Computer"></img>}
          {(checks[name].pref != undefined && checks[name].pref.computer != undefined && checks[name].pref.computer === 1) && <img className={styles.icon} src='/check_1exclamation.svg' alt="Muss"></img>}
          {(checks[name].pref != undefined && checks[name].pref.computer != undefined && checks[name].pref.computer === 2) && <img className={styles.icon} src='/check_2haken.svg' alt="Erlaubt"></img>}
          {(checks[name].pref != undefined && checks[name].pref.computer != undefined && checks[name].pref.computer === 3) && <img className={styles.icon} src='/check_3x.svg' alt="Nicht erlaubt"></img>}

          {(checks[name].pref != undefined && checks[name].pref.time != undefined) && <img className={styles.icon} src='/check_hourglass.svg' alt="Zeit"></img>}
          {(checks[name].pref != undefined && checks[name].pref.time != undefined && checks[name].pref.time === 1) && <img className={styles.icon} src='/check_1exclamation.svg' alt="Muss"></img>}
          {(checks[name].pref != undefined && checks[name].pref.time != undefined && checks[name].pref.time === 2) && <img className={styles.icon} src='/check_2haken.svg' alt="Erlaubt"></img>}
          {(checks[name].pref != undefined && checks[name].pref.time != undefined && checks[name].pref.time === 3) && <img className={styles.icon} src='/check_3x.svg' alt="Nicht erlaubt"></img>}
        </div>
      </div>
    </div>
  );
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const LOADING_STATUS_PRE = 0;
const LOADING_STATUS_RUNNING = 1;
const LOADING_STATUS_ERROR = 2;
const LOADING_STATUS_DONE = 3;
let secondview = false;
let nameArray = [];
let objectArray = [];



export default function Home() {
  const isDev = process.env.NODE_ENV !== 'production';

  const [name, setName] = useState(isDev ? 'msch-jakhal' : 'msch-'); //smart
  const [amount, setAmount] = useState(isDev ? 'all' : 'all');
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUS_PRE);
  const [errorMsg, setErrorMsg] = useState('');
  const [achievements, setAchievement] = useState(createAchievementsDict());
  const [view, setView] = useState(0);
  const [namelist, setUsername] = useState('LehrerB\nmsch-oliwel\nmsch-xenhof\nmisch-andhof');
  const [skipFetch, setSkipFetch] = useState(true);

  const toggleView = () => {
    // Toggle between View 0 and View 1
    setView(view === 0 ? 1 : 0);
  };


  const fetchAndAnalyzeGames = (local) => {
    if (name === "view") {
      setName("msch-");
      secondview = true;
      return;
    }
    setLoadingStatus(LOADING_STATUS_RUNNING);
    setErrorMsg('');
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const timestampOneMonthAgo = oneMonthAgo.getTime();

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const timestampOneYearAgo = oneYearAgo.getTime();

    let usernames = namelist.trim().split('\n');
    nameArray = view === 0 ? [name] : usernames;
    console.log('Usernamen:', nameArray);

    objectArray = [];

    function processPlayerData(currentname, index, forceDownloadBoolean) {
      return new Promise((resolve, reject) => {
        let newAch = createAchievementsDict();

        function getURLofPlayer(currentname) {
          let url;
          if (amount === "all") {
            url = `https://lichess.org/api/games/user/${currentname}`;
            const userobjectIndex = bigdata.findIndex(item => item.username.toLowerCase() === currentname.toLowerCase());
            if (userobjectIndex != -1) {
              let userobject = bigdata[userobjectIndex];
              if (userobject.unique != null) { opponents_school_unique = userobject.unique }
              console.log('Found userobject:', userobjectIndex)
              newAch = userobject.ach;
              url = `https://lichess.org/api/games/user/${currentname}?since=${userobject.timestamp}`;
            }
          } else if (amount === "month") {
            url = `https://lichess.org/api/games/user/${currentname}?since=${timestampOneMonthAgo}`;
          } else if (amount === "year") {
            url = `https://lichess.org/api/games/user/${currentname}?since=${timestampOneYearAgo}`;
          } else {
            // For other cases (50, 200, 1000), use the provided amount
            url = `https://lichess.org/api/games/user/${currentname}?max=${amount}`;
          }
          if (local === true) {
            url = 'http://localhost:3000/custom.txt'
          }
          return url;
        }


        let url = getURLofPlayer(currentname);
        //let games = getGamesOfURL(url);
        //getGamesOfURL(url)

        console.log('Name', currentname)
        if (view === 0 || !skipFetch || forceDownloadBoolean) {
        fetch(url, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
          .then(response => response.text())
          .then(data => {
            let games;
            if (local === true) {
              games = data.trim().split('\r\n\r\n\r\n'); //local files are encoded with \r\n instead of \n
            } else {
              games = data.trim().split('\n\n\n');
            }

            //let newAch = checks.map(value => { return { 'title': value.title, 'description': value.description, 'check': value.check, 'urls': [] } });
            games.forEach(game => {

              const chess = parseLichessGame(game, currentname);
              if (chess === null || chess.history().length < 3 || chess.isWeirdVariant) {
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
          })
          .then(data => {
            if (view === 0) {
              setAchievement(newAch); //Achievements get updated to show user
            }
            if (isDev || secondview) {
              console.log('Object', { username: currentname, timestamp: Math.floor(Date.now() / 1000) * 1000, ach: newAch, unique: opponents_school_unique })
              objectArray.push({ username: currentname, timestamp: Math.floor(Date.now() / 1000) * 1000, ach: newAch, unique: opponents_school_unique })
              opponents_school_unique = []; //empty again
            }
            resolve();
          })
          .catch(error => {
            setLoadingStatus(LOADING_STATUS_ERROR);
            console.error('Error fetching games:', error);
            setErrorMsg('Error: ' + error);
            if (isDev || secondview) {
              console.log('Object', { username: currentname, timestamp: Math.floor(Date.now() / 1000) * 1000, ach: newAch, unique: opponents_school_unique })
              objectArray.push({ username: currentname, timestamp: Math.floor(Date.now() / 1000) * 1000, ach: newAch, unique: opponents_school_unique })
              opponents_school_unique = []; //empty again
            }
            reject(error);
          });
        } else {
          resolve();
        }


      });
    } //end processPlayerData

    async function fetchDataForPlayers() {
      const delayTimeShort = 800; // Minimum delay time in milliseconds
      const delayTimeLong = 4500; // Minimum delay time in milliseconds
      const LongPauseAfter = 4;
      for (let i = 0; i < nameArray.length; i++) {
        let currentname = nameArray[i];
        const startTime = Date.now();
        let delayTime = (i%LongPauseAfter != 0 || i === 0) ? delayTimeShort : delayTimeLong;
        if(skipFetch){delayTime = 2}
        console.log('delay', delayTime)
        await processPlayerData(currentname, i);

        const processingTime = Date.now() - startTime;
        const remainingTime = Math.max(delayTime - processingTime, 0);

        // Implementing a minimum delay logic
        if (remainingTime > 0) {
          await Promise.all([new Promise(res => setTimeout(res, remainingTime))]);
        }
      }
    }


    // Call the async function to fetch data for players

    doMainPart();

    async function doMainPart() {
      await fetchDataForPlayers();
      setLoadingStatus(LOADING_STATUS_DONE);
      doRest();
    }

    function doRest() {
      if ((view === 1 || view === 0) && (isDev || secondview)) {
        console.log('ObjectArray:')
        console.log(objectArray)
        let new_bigdata = bigdata;

        // Loop through objectArray
        objectArray.forEach(newObj => {
          const existingObjIndex = new_bigdata.findIndex(obj => obj.username === newObj.username);

          if (existingObjIndex !== -1) {
            // If the username exists, replace the object in new_bigdata

            new_bigdata[existingObjIndex] = newObj;
          } else {
            // If the username doesn't exist, add the object to new_bigdata
            new_bigdata.push(newObj);
          }

        });
        objectArray = [];
        //to prevent that new achs can be added again and again
        bigdata = new_bigdata //just in case we don't want to do it like this later
        if (view === 1) {
          const checks_keys_array = Object.keys(checks);
          createAchievementTable("table1", new_bigdata, nameArray, checks, 0, (checks_keys_array.length / 2)-2);
          createAchievementTable("table2", new_bigdata, nameArray, checks, (checks_keys_array.length / 2)-2, checks_keys_array.length-4);
        }
        console.log('New Big Data', new_bigdata);
      }
    }

    //green
    const greenAchievement = [
      "mattStattPatt1",
      "mattStattPatt2",
      "mattStattPatt3",
      "mattStattPatt4",
      "mattStattPatt5",
      "mattStattPatt6",
    ];

    let greenAchievementTitle = []
    
    for(let green of greenAchievement){
    greenAchievementTitle.push(checks[green].title)
    }


    function createAchievementTable(tableid, bigdata_input, nameArray_input, checks_input, start, end) {
      const table = document.getElementById(tableid);
      table.innerHTML = '';
    
      const headerRow = document.createElement('tr');
      const usernameCell = document.createElement('th');
      usernameCell.textContent = 'Benutzernamen';
      headerRow.appendChild(usernameCell);
    
      const uniqueAchievements = Object.keys(checks_input);
      
      if(start === 0){
        const th = document.createElement('th');
        th.classList.add('rotated_cell');
        let title = "Challenges";
        const div = document.createElement('div');
        div.classList.add('rotate_text');
        div.textContent = title;
        th.appendChild(div);
        headerRow.appendChild(th);
      }

      for (let i = start; i < end; i++) {
        const achKey = uniqueAchievements[i];
        const th = document.createElement('th');
        const title = checks_input[achKey].title;
    
        th.classList.add('rotated_cell');

    
        const div = document.createElement('div');
        div.classList.add('rotate_text');
        div.textContent = title;
        th.appendChild(div);
        headerRow.appendChild(th);
      }
    
      table.appendChild(headerRow);
    
      for (const name of nameArray_input) {
        for (const user of bigdata_input) {
          if (name === user.username) {
            const row = document.createElement('tr');
            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.username;
            usernameCell.style.cursor = 'pointer';
            usernameCell.onclick = () => reloadUser(user.username,uniqueAchievements);
            row.appendChild(usernameCell);
    
            //count challenges
            if(start === 0){
              let challengeCount = 0;
              for (let achKey of uniqueAchievements){
                const ach = user.ach[achKey];
                if(ach.urls.length > 0){challengeCount += 1}
              }
              const cell = document.createElement('td');
              cell.textContent = challengeCount;
              row.appendChild(cell);
            }

            for (let i = start; i < end; i++) {
              const achKey = uniqueAchievements[i];
              const ach = user.ach[achKey];
              const cell = document.createElement('td');
    
              if (greenAchievement.includes(achKey) && ach.urls.length > 0) {
                cell.classList.add('green_ach');
              } else if (ach.urls.length === 0) {
                cell.classList.add('grey_zero');
              }
    
              cell.textContent = ach.urls.length;
              row.appendChild(cell);
            }
    
            table.appendChild(row);
          }
        }
      }
      updateTableStyles(tableid,greenAchievementTitle);
    }
    async function reloadUser(username,uniqueAchievements) {
      try {
        await processPlayerData(username, 0, true);
        const checks_keys_array = Object.keys(checks);
        reloadUserTable(username,"table1",uniqueAchievements,0, (checks_keys_array.length / 2)-2);
        reloadUserTable(username,"table2",uniqueAchievements,(checks_keys_array.length / 2)-2,checks_keys_array.length-4);  
      } catch (error) {

      }
    }

    function reloadUserTable(username, tableId, uniqueAchievements,start,end) {
      // Find the row corresponding to the username
      const table = document.getElementById(tableId); // replace with your actual table id
      const rows = table.getElementsByTagName('tr');
    
      //construct innerHMTL
      let rowInnerHTML
      for (const user of bigdata) {
          if (username === user.username) {
            rowInnerHTML = `<td style="cursor: pointer;">${user.username}</td>`;

            //count challenges
            if(start === 0){
              let challengeCount = 0;
              for (let achKey of uniqueAchievements){
                const ach = user.ach[achKey];
                if(ach.urls.length > 0){challengeCount += 1}
              }
            rowInnerHTML = rowInnerHTML + `<td>${challengeCount}</td>`;
            }

            for (let i = start; i < end; i++) {
              const achKey = uniqueAchievements[i];
              const ach = user.ach[achKey];
              rowInnerHTML = rowInnerHTML + `<td>${ach.urls.length}</td>`;
            }
          }
        }

        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].getElementsByTagName('td');
          if (cells.length > 0 && cells[0].textContent === username) {
            // Your logic to update the row goes here
            // For example, you can clear the existing content and re-append the updated content
            rows[i].innerHTML = rowInnerHTML;
            cells[0].onclick = () => reloadUser(username,uniqueAchievements);
            break;
          }
        }
      updateTableStyles(tableId,greenAchievementTitle);  
    }  

    function updateTableStyles(tableId, highlightStrings) {
      const table = document.getElementById(tableId);
    
      // Iterate through the columns
      for (let col = 1; col < table.rows[0].cells.length; col++) {
        let maxNonZeroValue = 0;
        let maxNonZeroRowIndices = [];
    
        // Iterate through the rows (skipping the header row)
        for (let row = 1; row < table.rows.length; row++) {
          const cell = table.rows[row].cells[col];
          const cellValue = parseInt(cell.textContent, 10);
    
          // Apply background color based on the cell value
          if (cellValue === 0) {
            //cell.style.backgroundColor = 'lightgrey';
            cell.style.color = 'lightgrey';
          } else {
            cell.style.backgroundColor = '#ffdd99';
            cell.style.color = 'black';
          }
    
        // Find cells with the highest non-zero value
        if (cellValue > maxNonZeroValue) {
          maxNonZeroValue = cellValue;
          maxNonZeroRowIndices = [row];
          } else if (cellValue === maxNonZeroValue && cellValue != 0) {
              maxNonZeroRowIndices.push(row);
          }
        }

        // Apply red text to cells with the highest non-zero value in the column
        for (const rowIndex of maxNonZeroRowIndices) {
          table.rows[rowIndex].cells[col].style.color = 'red';
        }
    
        // Apply green background to cells in the column with top cells matching the array
        const topCellText = table.rows[0].cells[col].textContent.trim();
        if (highlightStrings.includes(topCellText)) {
          for (let row = 0; row < table.rows.length; row++) {
            const cell = table.rows[row].cells[col];
            const cellValue = parseInt(cell.textContent, 10);
            if(cellValue != 0){
            cell.style.backgroundColor = '#9bf09b';
            }
          }
        }
      }
    }
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

          {(isDev || secondview) && (
            <button onClick={toggleView}>Change view</button>
          )}

          <br />
          {view === 0 ? (
            <>
              <label>
                Lichess Benutzername
                <input
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="lichessName"
                />
              </label>
            </>
          ) : (
            <>
              <div className={styles.inputContainer}>
                <label>
                  Usernamen
                  <textarea
                    className={styles.input}
                    rows="5"
                    value={namelist}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                  />
                </label>
              </div>
            </>
          )}
          <br />
          <label>
            Anzahl der Spiele
            <select
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              name="amount"
            >
              <option value="all">Alle</option>
              <option value="50">50 Spiele</option>
              <option value="200"> 200 Spiele</option>
              <option value="1000">1000 Spiele</option>
              <option value="month">Letzter Monat</option>
              <option value="year">Letztes Jahr</option>

            </select>
          </label>
          <br />
          <button className={styles.button} disabled={loadingStatus == LOADING_STATUS_RUNNING} onClick={fetchAndAnalyzeGames}>{(loadingStatus == LOADING_STATUS_RUNNING) ? 'Ladet...' : 'Start'}</button>
          {view === 1 && (
            <label>
              <input type="checkbox" checked={skipFetch} onChange={() => setSkipFetch(!skipFetch)} />
              fast
            </label>
          )}
          

          {view === 1 && (
            
            <>
              <br />
              {[
                { label: 'Schach', class: classes.classChess },
                { label: '2c', class: classes.class2c },
                { label: '3b', class: classes.class3b },
                { label: '4a', class: classes.class4a },
                { label: '4b', class: classes.class4b },
                { label: '4c', class: classes.class4c },
              ].map(({ label, class: buttonClass }, index, array) => (
                <span key={label}>
                  <button disabled={loadingStatus === LOADING_STATUS_RUNNING} onClick={() => setUsername(buttonClass)}>
                    {label}
                  </button>
                  {index < array.length - 1 && ' '}
                </span>
              ))}
              <br />
              <table id="table1"></table>
              <br />
              <table id="table2"></table>
            </>
          )}

          {isDev && <button onClick={() => fetchAndAnalyzeGames(true)}>Load local</button>}
          <p></p>
          {loadingStatus == LOADING_STATUS_DONE && <>
            {Object.values(achievements).map(ach => ach.urls.length > 0).reduce((partialSum, a) => partialSum + a, 0)} / {Object.keys(achievements).length} Challenges<br/>
            {Object.values(achievements).map(ach => ach.urls.length).reduce((partialSum, a) => partialSum + a, 0)} Trophäen
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
              {Object.values(achievements).map(ach => ach.urls.length > 0).reduce((partialSum, a) => partialSum + a, 0) > 29 && <>
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
