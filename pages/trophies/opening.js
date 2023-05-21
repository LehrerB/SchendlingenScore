export let noFool = {
  title: 'Netter Versuch',
  description: <p>Vermeide das Schäfermatt und gewinne das Spiel.</p>,
  check: function(game) {
  //Standard Game, no Computer, win and not white
  if(!(game.isStandard) || (game.isComputer) || !(game.isWon) || game.isWhite){return false}
  const hist = game.history();
  //move two and three need to include Bc4 and Qf3 or Qh5
  const move2and3 = hist[2] + " " + hist[4];
  console.log(move2and3);
  if(!(move2and3.includes("Bc4")&&(move2and3.includes("Qf3")||move2and3.includes("Qh5")))){return false}
  //d5 and e6 need to be empty, f4, f5, f6 for Qf3 or if Qh5 g6 should be empty 
  //and please don't play Qe7 yourself
  const squared5 = game.get('d5');
  const squaree6 = game.get('e6');
  const squaref4 = game.get('f4');
  const squaref5 = game.get('f5');
  const squaref6 = game.get('f6');
  const squareg6 = game.get('g6');
  const squaree7 = game.get('e7'); //squaree7.type and .color
  //if value is false, it's empty
  //check d5 and e6
  if(!(squared5===false)||!(squaree6===false)){return false}
  //check g6 if Qh5
  if(move2and3.includes("Qh5") && !(squareg6===false)){return false}
  //check f4, f5, f6 if Qf3
  if(move2and3.includes("Qf3") && !(squaref4===false) && !(squaref5===false) && !(squaref6===false)){return false}
  //e7 should be empty, we don't encourage Qe7, Be7, Ne7 OR Ke7 for black for this
  if(!(squaree7===false)){return false}
  //finally, you did it
  return true
}
}