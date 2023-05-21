export let endedWithMate = {
    title: 'Check Mate',
    description: <p>Won by Checkmate.</p>,
    check: function(game) {
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#')
  }
}

export let mateWithQueen = {
    title: 'Queen',
    description: <p>Checkmate with Queen.</p>,
    check: function(game) {
    const hist = game.history();
    console.log(hist[hist.length-1])
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('Q')
  }
}

export let mateWithRook = {
    title: 'Rook',
    description: <p>Checkmate with Rook.</p>,
    check: function(game) {
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('R')|| hist[hist.length-1].includes('O-O'))
  }
}

export let mateWithBishop = {
    title: 'Bishop',
    description: <p>Checkmate with Bishop.</p>,
    check: function(game) {
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('B')
  }
}

export let mateWithKnight = {
    title: 'Knight',
    description: <p>Checkmate with Knight.</p>,
    check: function(game) {
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('N')
  }
}

export let mateWithKing = {
    title: 'King',
    description: <p>Checkmate with King.</p>,
    check: function(game) {
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('K') || hist[hist.length-1].includes('O-O'))
  }
}

export let mateWithPawn = {
    title: 'Pawn',
    description: <p>Checkmate with Pawn.</p>,
    check: function(game) {
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('=') || (!(hist[hist.length-1].includes('K')) && !(hist[hist.length-1].includes('Q')) && !(hist[hist.length-1].includes('R')) && !(hist[hist.length-1].includes('B')) && !(hist[hist.length-1].includes('N')) && !(hist[hist.length-1].includes('O-O'))))
  }
}