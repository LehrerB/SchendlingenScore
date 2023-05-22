export let didNotLose = {
  title: 'Nicht verloren',
  description: <p>Entweder gewinnen oder unentschieden spielen.</p>,
  check: function(game) {
    return game.noLoss
  }
}

export let wonWithWhite = {
  title: 'Gewinne mit Weiß',
  description: <p>Gewinne ein Spiel mit den <i>weißen</i> Figuren.</p>,
  check: function(game) {
    return game.isWhite && game.header().Result === '1-0'
  }
}

export let wonWithBlack = {
  title: 'Gewinne mit Schwarz',
  description: <p>Gewinne ein Spiel mit den <i>schwarzen</i> Figuren.</p>,
  check: function(game) {
    return game.isBlack && game.header().Result === '0-1';
  }
}

export let drawWithWhite = {
  title: 'Drew as white',
  description: 'Drew with the white pieces.',
  check: function(game) {
    return game.isWhite && game.header().Result === '1/2-1/2';
  }
}

export let drawWithBlack = {
  title: 'Drew as black',
  description: 'Drew with the black pieces.',
  check: function(game) {
    return game.isBlack && game.header().Result === '1/2-1/2';
  }
}


export let favoredByTime = {
  title: 'Favored by time',
  description: 'Opponent ran out of time.',
  check: function(game) {
    return game.oppNoTime;
  }
}