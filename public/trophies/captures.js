export default [];

export let battlefield = {
    title: 'Sch(l)achtfeld',
    description: <p>Spiele ein Spiel, in dem mindestens 6 Mal hintereinander geschlagen wird.</p>,
    check: function(game) {
    //Standard Game, win
    if(!(game.isStandard) || !(game.isWon)){return false}
    const hist = game.history();
    //max of captures
    let maxConsecutiveCount = 0;
    let currentConsecutiveCount = 0;
    for (let i = 0; i < hist.length; i++) {
        if (hist[i].includes('x')) {
          currentConsecutiveCount++;
          if (currentConsecutiveCount > maxConsecutiveCount) {
            maxConsecutiveCount = currentConsecutiveCount;
          }
        } else {
          currentConsecutiveCount = 0;
        }
      }
    //console.log(game.header().Site)
    //console.log(maxConsecutiveCount)
    if(maxConsecutiveCount > 5){return true} else {return false}
  }
  }

  export let peacefulmode = {
    title: 'Friedensbote',
    description: <p>Die ersten 12 Züge darf keine Figur geschlagen werden und du musst das Spiel gewinnen.</p>,
    check: function(game) {
    //Standard Game, win and not white
    if(!(game.isStandard) || !(game.isWon)){return false}
    const hist = game.history();
    //peaceful moves
    let currentConsecutiveCount = 0;
    for (let i = 0; i < hist.length; i++) {
        if (hist[i].includes('x')) {break}
        currentConsecutiveCount++;
      }
    
    if(currentConsecutiveCount > 24){
        //console.log(game.header().Site)
        //console.log(currentConsecutiveCount)
        return true} else {return false}
  }
  }