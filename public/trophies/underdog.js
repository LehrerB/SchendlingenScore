export default [];
import { opponents_school_unique } from '../../pages/index';
import { blackSheepList } from '../classes';
import { teacherList } from '../classes';

function wonVsHigherElo(diff1, diff2) { //returns true if opponent is higher between range
  return function(game) {               //ignores diff2 if it's smaller than diff1 (no upper limit)
    if(!(game.isWon)){return false}
    let plElo = parseInt(game.isWhite ? game.header().WhiteElo : game.header().BlackElo)
    let opElo = parseInt(game.isWhite ? game.header().BlackElo : game.header().WhiteElo)
  if(plElo === 1500 || opElo === 1500){return false} //new accounts have exactly 1500 and mess this up
  if(diff1 < diff2) {return (plElo + diff1 <= opElo)&&!(plElo + diff2 <= opElo)}
  return plElo + diff1 <= opElo;
  }
}

export let small_underdog = {
  title: 'Small underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 40 ELO mehr hat, aber nicht genau 1500.',
  pref: {
    win: 1,
    bullet: 2,
    computer: 3,
    time: 2
  },
  check: wonVsHigherElo(40,120)
}

export let middle_underdog = {
  title: 'Underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 80 ELO mehr hat, aber nicht genau 1500.',
  pref: {
    win: 1,
    bullet: 2,
    computer: 3,
    time: 2
  },
  check: wonVsHigherElo(80,120)
}

export let big_underdog = {
  title: 'Big underdog',
  description: 'Gewinne gegen einen Spieler, der mindestens 120 ELO mehr hat, aber nicht genau 1500.',
  pref: {
    win: 1,
    bullet: 2,
    computer: 3,
    time: 2
  },
  check: wonVsHigherElo(120,0)
}

export let new_opponent = {
  title: 'Verschiedene Gegner',
  description: 'Spiele gegen verschiedene Schülerinnen der Schule.',
  pref: {
    win: 2,
    bullet: 3,
    computer: 3,
    time: 2
  },
  check: function(game) {
    if(!(game.oppName.toLowerCase().includes("msch-") || blackSheepList.includes(game.oppName) || game.oppName.toLowerCase().includes("misch-"))){
      return false
    }
    if(opponents_school_unique.includes(game.oppName.toLowerCase())){
      return false
    }
    opponents_school_unique.push(game.oppName.toLowerCase());
    return true
  }
}

export let against_teacher = {
  title: 'Gegen einen Lehrer',
  description: 'Trau dich und spiele gegen einen Lehrer der Schule.',
  pref: {
    win: 2,
    bullet: 3,
    computer: 3,
    time: 2,
  },
  check: function(game) {
    if(!(teacherList.includes(game.oppName))){
      return false
    }
    return true
  }
}