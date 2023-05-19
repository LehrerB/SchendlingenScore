
export let wonWithWhite = {
  title: 'Won as white',
  description: <p>Won with the <i>white</i> pieces</p>,
  check: function(game) {
    return game.isWhite && game.header().Result === '1-0'
  }
}

export let wonWithBlack = {
  title: 'Won as black',
  description: 'Won with the black pieces.',
  check: function(game) {
    return game.isBlack && game.header().Result === '0-1';
  }
}
