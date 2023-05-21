export let didNotLose = {
  title: 'Did not Lose',
  description: <p>Either won or drew the game.</p>,
  check: function(game) {
    return game.noLoss
  }
}

export let wonWithWhite = {
  title: 'Won as white',
  description: <p>Won with the <i>white</i> pieces</p>,
  check: function(game) {
    return game.isWhite && game.header().Result === '1-0'
  }
}

export let wonWithBlack = {
  title: 'Won as black',
  description: <p>Won with the <i>black</i> pieces</p>,
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