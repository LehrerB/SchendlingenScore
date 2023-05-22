export let castleWithCheck = {
    title: 'O-O+',
    description: <p>Rochiere und gibt gleichzeitig Schach. Gewinne anschließend das Spiel.</p>,
    check: function(game) {
    if(!(game.isStandard)||game.isBullet){return false}
    const hist = game.history();
    const addwb = game.isWhite ? 1 : 0;
    const playerhist = hist.filter((_, index) => index % 2 !== addwb);
    return game.noLoss && playerhist.includes('O-O+') || playerhist.includes('O-O-O+')
  }
}