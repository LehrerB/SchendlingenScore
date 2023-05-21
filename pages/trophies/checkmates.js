export let endedWithMate = {
    title: 'Check Mate',
    description: <p>Won by Checkmate.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#')
  }
}

export let mateWithQueen = {
    title: 'Queen',
    description: <p>Checkmate with Queen.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    console.log(hist[hist.length-1])
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('Q')
  }
}

export let mateWithRook = {
    title: 'Rook',
    description: <p>Checkmate with Rook.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('R')|| hist[hist.length-1].includes('O-O'))
  }
}

export let mateWithBishop = {
    title: 'Bishop',
    description: <p>Checkmate with Bishop.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('B')
  }
}

export let mateWithKnight = {
    title: 'Knight',
    description: <p>Checkmate with Knight.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('N')
  }
}

export let mateWithKing = {
    title: 'King',
    description: <p>Checkmate with King.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('K') || hist[hist.length-1].includes('O-O'))
  }
}

export let mateWithPawn = {
    title: 'Pawn',
    description: <p>Checkmate with Pawn.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('=') || (!(hist[hist.length-1].includes('K')) && !(hist[hist.length-1].includes('Q')) && !(hist[hist.length-1].includes('R')) && !(hist[hist.length-1].includes('B')) && !(hist[hist.length-1].includes('N')) && !(hist[hist.length-1].includes('O-O')) && !(hist[hist.length-1].includes('='))))
  }
}

export let mateWithPromotion = {
    title: 'Promotion',
    description: <p>Checkmate with Promotion.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-1].includes('=')
  }
}

export let mateAfterCastling = {
    title: 'Schade Rochade',
    description: <p>Dein Gegner hat ins Matt rochiert.</p>,
    check: function(game) {
    if(!(game.isStandard)){return false}
    const hist = game.history();
    return game.noLoss && hist[hist.length-1].includes('#') && hist[hist.length-2].includes('O-O')
  }
}

export let mateOnBackRank = {
    title: 'Grundreihen Matt',
    description: <p>Dein Gegner hat seinen König zu wenig beschützt.</p>,
    check: function(game) {
    //Bullet allowed, Computer allowed
    if(!(game.isStandard)){return false}
    const hist = game.history();
    //mate because of Queen or Rook
    if(!(game.noLoss && hist[hist.length-1].includes('#') && (hist[hist.length-1].includes('R')|| hist[hist.length-1].includes('Q')))){return false}
    //define backrank and king letter
    const kingletter = game.isWhite ? 'k' : 'K';
    const rank = game.isWhite ? '8' : '1';
    /*const backra = game.get('a'+ rank)
    const backrb = game.get('b'+ rank)
    const backrc = game.get('c'+ rank)
    const backrd = game.get('d'+ rank)
    const backre = game.get('e'+ rank)
    const backrf = game.get('f'+ rank)
    const backrg = game.get('g'+ rank)
    const backrh = game.get('h'+ rank)
    if(!(backra.type.includes(kingletter)||backrb.type.includes(kingletter)||backrc.type.includes(kingletter)||backrd.type.includes(kingletter)||backre.type.includes(kingletter)||backrf.type.includes(kingletter)||backrg.type.includes(kingletter)||backrh.type.includes(kingletter))){return false}
    */
    return true
  }
}