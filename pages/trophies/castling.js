
function castledLate(moveNum) {
  return function(game) {
    let i = moveNum * 2;
    if(game.isBlack)
      i += 1;
    
    const hist = game.history();
    while(i < hist.length && i < moveNum) {
      if(hist[i].startsWith('O-O')) return true;
      i += 2;
    }
    return false;
  }
}

export let midCastle = {
  title: 'Mit-castle',
  description: 'Castled after move 10.',
  check: castledLate(9)
}
